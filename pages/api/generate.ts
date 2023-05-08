import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (process.env.NEXT_PUBLIC_USE_USER_KEY !== "true") {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
  }
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  var { prompt, api_key } = (await req.json()) as {
    prompt?: string;
    api_key?: string
  };
  //todo make this variable into messages
  var p = `你是一位优秀的算命先生和命理大师，你对中国的传统文化非常了解，熟读《易经》和《老黄历》《四柱预测学入门》《四柱预测技术入门》《四柱算命术》《高岛断易》《铁板神数》，每当我输入知姓名、性别和生日，你需要完成以下任务：
task1：对提供的姓名进行易经和阴阳五行的姓名释义
task2：请根据提供的信息查询对应的八字、星座、属相，并给出一段对今年运势的描述
task3：请根据提供的信息给出他的命理推算
task4：依据流年九宫飞星提出相关的改进建议，要足够清晰，限4条内
task5：依据九宫八卦和紫微斗数给出日常生活注意事项，要足够清晰，限3条内

将以上任务结果按以下Markdown格式排版输出：
将以上任务结果按以下Markdown格式排版输出： 
姓名释义 
<task1 result> 
今年运势 
<task2 result> 
命理推算
<task3 result> 
改进建议
<task4 result> 
注意事项
<task5 result> `
  prompt = p + prompt
  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  // if (!process.env.OPENAI_MODEL) {
  //   throw new Error("Missing env var from OpenAI")
  // }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
    api_key,
  }

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
