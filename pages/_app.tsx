// import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { NextIntlProvider } from "next-intl";
import { useState } from "react";
import { Modal } from "antd";

import "../styles/globals.css";
import "../styles/markdown.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [showModal, setShowModal] = useState(true);
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Modal
        title="通知"
        className="text-center flex justify-center items-center mt-20"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[]}
      >
        <div className="bg-teal-100  border-teal-500 text-teal-900 px-4 py-3 shadow-md w-full mt-10">
          <p className="font-bold">由于访问量过大，本站接受赞助</p>
          <p className="text-sm">
            您的赞助将使我能够持续维护该网站，让您的体验更加舒适和满意。感谢您的支持！
          </p>
        </div>
      </Modal>
      <Component {...pageProps} />
      {/* <Analytics /> */}
    </NextIntlProvider>
  );
}

export default MyApp;
