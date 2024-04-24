"use client";

import { CreateOnePosts201Response, Users } from "neurelo-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/query/posts/creat-post";
import { updatePost } from "@/lib/query/posts/update-post";
import { useEditorStore } from "@/lib/store/editor";

const PublishPostButton = ({ user, postId }: { user: Users, postId?: string }) => {
  const router = useRouter();
  const content = useEditorStore((state) => state.content);
  const pureContent = useEditorStore((state) => state.pureContent);
  const { resetContent } = useEditorStore((state) => state.actions);
  
  // Publish post, postId will be undefined if it's a new post
  const publishPost = async (postId?: string) => {
    if(!user || !user.user_id) {
      toast.error("User not found");

      return;
    }
    
    // Check if the content is empty
    if(!pureContent) {
      toast.error("Post content is empty");

      return;
    }
    
    if(!content!.content![0].content) {
      toast.error("Post title is empty");

      return;
    }
    
    // Content is an array, the first element is the title
    const newTitle = content!.content![0].content![0].text!;
    const newContent = JSON.stringify(content)!;
    
    if(postId) {
      // const res = await updatePost(postId, newContent);
      toast.promise(
        updatePost({ title: newTitle, content: newContent, postId: postId }),
        {
          loading: "Updating your post...",
          success: (data: CreateOnePosts201Response | undefined) => {
            resetContent();
            router.push(`/posts/${data?.data.post_id}`);
  
            return "Successfully updated post, redirecting...";
          },
          error: (err) => `Error updating post: ${err}`
        }
      );

      return;
    }
    
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
  
  if(postId) {
    return (
      <Button className="font-mono" variant="secondary" onClick={() => publishPost(postId)}>
        Update Post
      </Button>
    );
  }
  
  return (
    <Button className="font-mono" variant="secondary" onClick={() => publishPost()}>
      Publish Post
    </Button>
  );
};

export default PublishPostButton;