"use server";

import { PostsApiService } from "neurelo-sdk";

export const getPostById = async (id: string) => {
  try {
    const res = await PostsApiService.findPostsByPostId(id);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};