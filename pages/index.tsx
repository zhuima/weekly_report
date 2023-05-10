import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { FormType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";

import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import { marked } from "marked";
import { Button, Modal } from "antd";

const Home: NextPage = () => {
  const t = useTranslations("Index");

  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState("");
  const [form, setForm] = useState<FormType>("paragraphForm");
  const [api_key, setAPIKey] = useState("");
  const [generatedChat, setGeneratedChat] = useState<String>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showPayModal = () => {
    setIsPayModalOpen(true);
  };

  const handlePayOk = () => {
    setIsPayModalOpen(false);
  };

  const handlePayCancel = () => {
    setIsPayModalOpen(false);
  };

  const showPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  const handlePrivacyOk = () => {
    setIsPrivacyModalOpen(false);
  };

  const handlePrivacyCancel = () => {
    setIsPrivacyModalOpen(false);
  };

  console.log("Streamed response: ", generatedChat);

  const prompt = form === "paragraphForm" ? `${chat}` : `${chat}`;

  const useUserKey =
    process.env.NEXT_PUBLIC_USE_USER_KEY === "true" ? true : false;

  const generateChat = async (e: any) => {
    e.preventDefault();
    setGeneratedChat("");
    setLoading(true);
    if (useUserKey && api_key == "") {
      toast.error(t("API key不能为空"));
      setLoading(false);
      return;
    }
    if (chat == "") {
      toast.error(t("内容不能为空"));
      setLoading(false);
      return;
    }

    const myArray = chat.split(" ");
    const male = ["男", "女"];
    if (
      myArray[0].length > 4 ||
      !male.includes(myArray[1]) ||
      myArray.length != 3
    ) {
      toast.error(t("输入内容无效"));
      setLoading(false);
      return;
    }

    const response = useUserKey
      ? await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            api_key,
          }),
        })
      : await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        });

    console.log("Edge function returned.");

    if (!response.ok) {
      toast.error("服务繁忙，请稍后再试");
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value).replace("<|im_end|>", "");
      setGeneratedChat((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>{t("title")}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header showModal={showModal} />

      <Modal
        title="加个好友，了解更多"
        className="text-center flex justify-center items-center mt-20"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Image src="/chatme.jpeg" width={220} alt="" loading="lazy" />
      </Modal>

      <Modal
        title="谢谢你的咖啡"
        className="text-center flex justify-center items-center mt-20"
        open={isPayModalOpen}
        onOk={handlePayOk}
        onCancel={handlePayCancel}
        footer={[]}
      >
        <Image src="/wechatpay.jpeg" width={240} alt="" loading="lazy" />
      </Modal>

      <Modal
        title="隐私声明"
        className="text-center flex justify-center items-center mt-20"
        open={isPrivacyModalOpen}
        onOk={handlePrivacyOk}
        onCancel={handlePrivacyCancel}
        footer={[]}
      >
        <p>
          我们重视您的隐私。该网站不存储您上传的任何内容。所有内容将被直接上传到
          OpenAI，OpenAI
          将承担所有与该内容相关的责任。该网站不对任何与上传内容有关的法律责任负责。请确保您了解
          <Link
            href="https://openai.com/policies/privacy-policy"
            className="text-blue-200 hover:text-blue-400"
          >
            {" "}
            OpenAI 的隐私政策{" "}
          </Link>
          ，并同意其所涵盖的内容。
        </p>
      </Modal>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          {t("description1")} <br></br>
          <div className=" px-4 py-2 sm:mt-3 mt-8  w-full"></div>
          {t("description2")}
        </h1>
        <p className="text-slate-500 mt-5">{t("slogan")}</p>

        <div className="max-w-xl w-full">
          {useUserKey && (
            <>
              <div className="flex mt-10 items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M7 14q-.825 0-1.412-.588Q5 12.825 5 12t.588-1.413Q6.175 10 7 10t1.412.587Q9 11.175 9 12q0 .825-.588 1.412Q7.825 14 7 14Zm0 4q-2.5 0-4.25-1.75T1 12q0-2.5 1.75-4.25T7 6q1.675 0 3.038.825Q11.4 7.65 12.2 9H21l3 3l-4.5 4.5l-2-1.5l-2 1.5l-2.125-1.5H12.2q-.8 1.35-2.162 2.175Q8.675 18 7 18Zm0-2q1.4 0 2.463-.85q1.062-.85 1.412-2.15H14l1.45 1.025L17.5 12.5l1.775 1.375L21.15 12l-1-1h-9.275q-.35-1.3-1.412-2.15Q8.4 8 7 8Q5.35 8 4.175 9.175Q3 10.35 3 12q0 1.65 1.175 2.825Q5.35 16 7 16Z"
                  />
                </svg>
                <p className="text-left font-medium">{t("step0")} </p>
              </div>
              <input
                value={api_key}
                onChange={(e) => setAPIKey(e.target.value)}
                className="w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-black focus:ring-black p-2"
                placeholder={t("openaiApiKeyPlaceholder")}
              />
            </>
          )}

          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 xs:mb-0"
              loading="lazy"
            />
            <p className="text-left font-medium">{t("step1")} </p>
          </div>

          <textarea
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-2"
            placeholder={t("placeholder")}
          />

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-5 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateChat(e)}
            >
              {t("simplifierButton")} &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
          <br></br>
          <br></br>
          <div className="mt-1 items-center space-x-3">
            <span className="text-slate-200">
              {t("privacyPolicy1")}
              <Link
                href=""
                className="text-blue-200 hover:text-blue-400"
                onClick={showPrivacyModal}
              >
                {" "}
                {t("privacyPolicy2")}
              </Link>
            </span>
            <br></br>

            <br />
          </div>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedChat && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      {t("simplifiedContent")}
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedChat.trim());
                        toast("已复制完整内容", {
                          icon: "✂️",
                        });
                      }}
                    >
                      {/* <p className="sty1">{generatedChat}</p> */}
                      <p
                        className="sty1 markdown-body"
                        dangerouslySetInnerHTML={{
                          __html: marked(generatedChat.toString(), {
                            gfm: true,
                            breaks: true,
                            smartypants: true,
                          }),
                        }}
                      ></p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <div
        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-full"
        role="alert"
      >
        <div className="flex justify-between items-center w-full ">
          <div className="flex py-1">
            <Image
              alt="1 icon"
              src="/coffee.svg"
              width="40"
              height="30"
              decoding="async"
              data-nimg="1"
              className="mb-5 xs:mb-0 text-right mr-5"
              loading="lazy"
            />
            <div>
              <p className="font-bold">如果您愿意赞助一杯咖啡</p>
              <p className="text-sm">
                您的赞助将使我能够持续维护该网站，让您的体验更加舒适和满意。感谢您的支持！
              </p>
            </div>
          </div>

          <button
            className="bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-medium px-2 py-1  items-center "
            onClick={showPayModal}
          >
            赞赏
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

export function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: {
        ...require(`../messages/${locale}.json`),
      },
    },
  };
}
