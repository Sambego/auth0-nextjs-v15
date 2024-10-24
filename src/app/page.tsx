import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth0Client } from "@/lib/auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth0Client.getSession();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center justify-center">
          <Image
            src="/auth0.svg"
            alt="Auth0 logo"
            width={152}
            height={40}
            priority
            className="dark:invert"
          />
          <span className="font-mono text-2xl mx-4 inlin-block">❤️</span>
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={113}
            height={24}
            className="dark:invert"
          />
          <Badge variant="secondary" className="ml-2 super">
            v15
          </Badge>
        </div>
        {session?.user && (
          <div className="w-full">
            <div className="flex w-full items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="relative w-12 h-12">
                <Avatar>
                  <AvatarImage
                    src={session?.user?.picture}
                    alt={`${session?.user?.nickname}'s avatar`}
                  />
                  <AvatarFallback>
                    {session?.user?.nickname
                      ?.split(" ")
                      .map((n) => n[0])
                      .join(".")}
                  </AvatarFallback>
                </Avatar>
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
        <div className="w-full">
          <Alert>
            <AlertTitle>Try it out, and give us feedback!</AlertTitle>
            <span className="font-mono">
              npm install @auth0/nextjs-auth0
              <span className="bg-neutral-700 py-1 px-2 rounded-full">
                @v4.0.0-alpha.0
              </span>
            </span>
          </Alert>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {session?.user ? (
            <Button asChild variant="secondary">
              <Link href="/auth/logout">Log out</Link>
            </Button>
          ) : (
            <Button asChild variant="secondary">
              <Link href="/auth/login">Log in</Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link
              href="https://github.com/auth0/nextjs-auth0/tree/v4.0.0-alpha.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon />
              Auth0 Next.js SDK v4-alpha
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
