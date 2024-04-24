"use server";

import { PostsApiService } from "neurelo-sdk";

interface UpdatePostProps {
  postId: string;
  content: string;
  title: string;
}

export const updatePost = async ({ postId, content, title }: UpdatePostProps) => {
  try {
    const res = await PostsApiService.updatePostsByPostId(postId, {
      posted_at: new Date().toISOString(),
      title,
      content,
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};