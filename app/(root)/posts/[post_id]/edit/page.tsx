import PublishPostButton from "@/components/button/publish-post-button";
import Meditor from "@/components/meditor";
import { getPostById } from "@/lib/query/posts/get-post-by-id";
import getCurrentUser from "@/lib/session";

const Page = async ({ params: { post_id } }: { params: { post_id: string } }) => {
  console.log(post_id);
  const user = await getCurrentUser();
  const post = await getPostById(post_id);
  
  if(!user) {
    return (
      <div className="mx-auto my-24 max-w-3xl">
        <h1 className="mb-4 text-2xl font-bold">You are not logged in</h1>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="mx-auto my-24 max-w-3xl">
        <h1 className="mb-4 text-2xl font-bold">Post not found</h1>
      </div>
    );
  }
  
  if(user && user.user_id !== post.data.user_id) {
    return (
      <div className="mx-auto my-24 max-w-3xl">
        <h1 className="mb-4 text-2xl font-bold">You are not authorized to edit this post</h1>
      </div>
    );
  }
  
  return (
    <div className="mx-auto my-24 max-w-3xl">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">Edit Post</h1>
        <PublishPostButton postId={post_id} user={user} />
      </div>
      <Meditor content={post.data.content ?? ""} />
    </div>
  );
};

export default Page;