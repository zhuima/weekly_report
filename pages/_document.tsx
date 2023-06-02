import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <meta
            name="上上签"
            content="一键解读你今年运势，运势，风水，八卦，阴阳，算命."
          />
          <meta property="og:site_name" content="Chat Simplifier" />
          <meta
            property="og:上上签"
            content="一键解读你今年运势，运势，风水，八卦，阴阳，算命."
          />
          <meta
            property="og:title"
            content="上上签,一键解读你今年运势，运势，风水，八卦，阴阳，算命."
          />
          <meta
            name="twitter:card"
            content="上上签,一键解读你今年运势，运势，风水，八卦，阴阳，算命."
          />
          <meta
            name="twitter:title"
            content="上上签,一键解读你今年运势，运势，风水，八卦，阴阳，算命."
          />
          <meta
            name="twitter:上上签"
            content="一键解读你今年运势，运势，风水，八卦，阴阳，算命."
          />
          <meta
            property="og:image"
            content="https://chat-simplifier.vercel.app/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://chat-simplifier.vercel.app/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
