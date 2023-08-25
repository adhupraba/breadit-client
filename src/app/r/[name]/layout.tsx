import { getAuthSession } from "@/lib/auth";
import { serverAxios } from "@/lib/server-axios";
import { TSubredditData } from "./types";
import { notFound } from "next/navigation";
import { TSubscription } from "@/types/model";
import { format } from "date-fns";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";

interface ILayoutProps {
  children: React.ReactNode;
  params: { name: string };
}

const Layout = async ({ children, params: { name } }: ILayoutProps) => {
  const session = await getAuthSession();
  const { data: subreddit, status } = await serverAxios().get<TSubredditData>(`/api/subreddit/${name}`, {
    validateStatus: () => true,
  });

  if ((status >= 400 && status < 600) || !subreddit.id) {
    console.error("error response =>", subreddit);
    return notFound();
  }

  let subscription: TSubscription | null = null;

  if (session?.user) {
    const { data, status } = await serverAxios().get<TSubscription | null>(
      `/api/subscription/subreddit/${subreddit.id}`,
      {
        validateStatus: () => true,
        withCredentials: true,
      }
    );

    if (status >= 200 && status < 300 && data?.id) {
      subscription = data;
    }
  }

  const isSubscribed = !!subscription;

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        {/* todo: button to take us back */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>

          {/* info sidebar */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About r/{subreddit.name}</p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={new Date(subreddit.createdAt).toDateString()}>
                    {format(new Date(subreddit.createdAt), "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{subreddit.memberCount}</div>
                </dd>
              </div>

              {subreddit.creatorId == session?.user.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-500">You created this community</p>
                </div>
              ) : null}

              {subreddit.creatorId !== session?.user.id ? (
                <SubscribeLeaveToggle
                  subredditId={subreddit.id}
                  subredditName={subreddit.name}
                  isSubscribed={isSubscribed}
                />
              ) : null}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;