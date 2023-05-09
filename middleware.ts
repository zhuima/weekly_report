import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";


const redisUrl = process.env.REDIS_REST_URL || "";


const redisToken = process.env.REDIS_REST_TOKEN || "";



const redis = new Redis({
    url: redisUrl,
    token: redisToken,
})

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "86400 s"),
});

export default async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
): Promise<Response | undefined> {
    const ip = request.ip ?? "127.0.0.1";
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip);
    return success ? NextResponse.next() : NextResponse.redirect(new URL("/blocked", request.url));;
}

export const config = {
    matcher: "/",
};