"use server";

import { PostsApiService } from "neurelo-sdk";

export const getAllPosts = async () => {
  try {
    console.log("Fetching all posts");
    const res = await PostsApiService.findPosts();

    return res.data;
  } catch (error) {
    console.error(error);
  }
};