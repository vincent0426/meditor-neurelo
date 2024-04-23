import { Metadata } from "next";

import PostCard from "@/components/card/post-card";
import { getPostById } from "@/lib/query/posts/get-post-by-id";

export async function generateMetadata({ params }: { params: { post_id: string } }) {
  const post = await getPostById(params.post_id);
  if (!post) return null;

  const metadata: Metadata = {
    title: `${post.data.title} | Meditor`,
  };

  return metadata;
}

const Page = async ({ params: { post_id } }: { params: { post_id: string } }) => {
  const post = await getPostById(post_id);

  if (!post) {
    return null;
  }
  
  return (
    <PostCard post={post.data} />
  );
};

export default Page;