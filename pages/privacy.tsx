import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Privacy: NextPage = () => {
  const t = useTranslations("Index");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>隐私协议</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header showModal={showModal} />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
          <div className="max-w-md mx-auto space-y-6">
            <img
              src="https://tailwindcomponents.com/svg/logo-color.svg"
              className="h-8"
            />

            <p className="text-gray-600">
              Open source Tailwind UI components and templates to bootstrap your
              new apps, projects or landing sites!
            </p>

            <div className="text-base leading-7">
              <p className="font-medium text-gray-700">
                Looking For Free premium components?
              </p>

              <p>
                <a
                  target="_blank"
                  href="https://tailwindcomponents.com/awesome"
                  className="text-teal-400 hover:underline"
                >
                  Check out our awesome components →
                </a>
              </p>
            </div>

            <div className="text-base leading-7">
              <p className="font-medium text-gray-700">
                Looking for premium themes and landing pages?
              </p>

              <p>
                <a
                  target="_blank"
                  href="https://tailwindcomponents.com/promotes"
                  className="text-teal-400 hover:underline"
                >
                  Check out our premium page →
                </a>
              </p>
            </div>

            <div className="text-base leading-7">
              <p className="font-medium text-gray-700">
                Looking for Awesome cheatsheet for Tailwind CSS?
              </p>

              <p>
                <a
                  target="_blank"
                  href="https://tailwindcomponents.com/cheatsheet"
                  className="text-teal-400 hover:underline"
                >
                  Check out our cheatsheet →
                </a>
              </p>
            </div>

            <div className="text-base leading-7">
              <p className="font-medium text-gray-700">
                Want to dig deeper into Tailwind CSS?
              </p>
              <p>
                <a
                  target="_blank"
                  href="https://tailwindcss.com/docs"
                  className="text-teal-400 hover:underline"
                >
                  Read the docs →
                </a>
              </p>
            </div>

            <Link
              href="/"
              className="block w-full px-4 py-2 font-medium tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-teal-400 rounded-md hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
            >
              返回主页
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Privacy;
