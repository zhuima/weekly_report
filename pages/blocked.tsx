import Link from "next/link";
import Image from "next/image";
const Blocked = () => {
  return (
    <div>
      <main>
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <Image src="/chatme.jpeg" width={250} height={400} alt="" />
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
              访问被限制
            </p>
            <p className="md:text-sm lg:text-xl text-gray-600 mt-8 px-10">
              本网站每天只允许免费使用2次，请保存该网站明天再来访问，如有其他问题可添加我微信.
            </p>
            <Link
              href="/"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
              title="Return Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>返回主页</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blocked;
