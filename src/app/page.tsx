import { auth0Client } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth0Client.getSession();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/auth0.svg"
          alt="Auth0 logo"
          width={180}
          height={38}
          priority
        />

        {session?.user && (
          <div>
            <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="relative w-12 h-12">
                <img
                  src={session?.user?.picture}
                  alt={`${session?.user?.nickname}'s avatar`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {session?.user?.nickname}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {session?.user ? (
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/auth/logout"
            >
              Log out
            </a>
          ) : (
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/auth/login"
            >
              Log in
            </a>
          )}
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://auth0.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
    </div>
  );
}
