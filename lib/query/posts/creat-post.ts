"use server";

import { PostsApiService } from "neurelo-sdk";

interface CreatePostProps {
  userId: string;
  content: string;
  title: string;
}

export const createPost = async ({ userId, content, title }: CreatePostProps) => {
  try {
    const res = await PostsApiService.createOnePosts({
      title: title,
      content: content,
      posts_users_ref: {
        "connect": {
          "user_id": userId,
        }
      },
    });
  
    return res.data;
  } catch (error) {
    console.error(error);
  }
};