import { Metadata } from "next";

import PostList from "@/components/post-list";
import { getAllPosts } from "@/lib/query/posts/get-all-posts";

export const metadata: Metadata = {
  title: "Posts",
};

const Page = async() => {
  const posts = await getAllPosts({ orderBy: { posted_at: "desc" } });

  return (
    <PostList posts={posts?.data ?? []} />
  );
};

export default Page;