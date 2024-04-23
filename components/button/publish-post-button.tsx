"use client";

import { CreateOnePosts201Response, Users } from "neurelo-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/query/posts/creat-post";
import { useEditorStore } from "@/lib/store/editor";

const PublishPostButton = ({ user }: { user: Users }) => {
  const router = useRouter();
  const content = useEditorStore((state) => state.content);
  const pureContent = useEditorStore((state) => state.pureContent);
  const { resetContent } = useEditorStore((state) => state.actions);
  
  const publishPost = async () => {
    if(!user || !user.user_id) {
      toast.error("User not found");

      return;
    }
    
    // Check if the content is empty
    if(!pureContent) {
      toast.error("Post content is empty");

      return;
    }
    
    // Content is an array, the first element is the title
    const newTitle = content!.content![0].content![0].text!;
    const newContent = JSON.stringify(content)!;

    // const res = await createPost(user.user_id!, newContent);
    toast.promise(
      createPost({ title: newTitle, content: newContent, userId: user.user_id }),
      {
        loading: "Publishing your post...",
        success: (data: CreateOnePosts201Response | undefined) => {
          resetContent();
          router.push(`/posts/${data?.data.post_id}`);

          return "Successfully published post, redirecting...";
        },
        error: (err) => `Error publishing post: ${err}`
      }
    );
  };
  
  return (
    <Button className="self-end font-mono" variant="secondary" onClick={publishPost}>
      Publish Post
    </Button>
  );
};

export default PublishPostButton;