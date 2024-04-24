"use server";

import { PostsApiService } from "neurelo-sdk";

interface DeletePostProps {
  postId: string;
}

export const deletePost = async ({ postId }: DeletePostProps) => {
  try {
    const res = await PostsApiService.deletePostsByPostId(postId);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};