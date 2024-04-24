
import PublishPostButton from "@/components/button/publish-post-button";
import Meditor from "@/components/meditor";
import SubText from "@/components/subtext";
import { Card } from "@/components/ui/card";
import getCurrentUser from "@/lib/session";

export default async function Page() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto mt-16 flex max-w-4xl flex-col">
      <main className="flex w-full flex-col items-center">
        <h1 className="font-mono text-6xl font-bold">
          <span className="inline bg-gradient-to-br from-purple-300 to-blue-500 bg-clip-text text-transparent">
            Meditor
          </span>
        </h1>
        <h2 className="mt-4 text-2xl text-gray-500">
          <div className='relative hidden items-center justify-center md:flex'>
            <div className="absolute inset-0 size-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
            <SubText />
          </div>
        </h2>
        <div className="my-12 flex w-full flex-col space-y-4">
          {user && (
            <div className="self-end">
              <PublishPostButton user={user} />
            </div>)}
          <Card className="min-h-[400px] w-full px-16 py-12">
            <Meditor />
          </Card>
        </div>
      </main>
    </div>
  );
}
