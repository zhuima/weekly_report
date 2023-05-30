import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Github from "./GitHub";

export default function Header(props) {
  const t = useTranslations("Index");
  const { locale, locales, route } = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);

  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link
        href="/"
        className="flex space-x-3 align-center  text-center items-center "
      >
        <Image
          alt="header text"
          src="/logo.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight text-center">
          {t("title")}
        </h1>
      </Link>
      <div className="flex gap-2">
        <Image
          alt="WeChat qc"
          src="/wechat-seeklogo.com.svg"
          className="sm:w-8 sm:h-8 w-8 h-8 "
          width={50}
          height={50}
          onClick={props.showModal}
        />
      </div>
    </header>
  );
}
