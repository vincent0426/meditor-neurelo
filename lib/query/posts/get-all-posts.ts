"use server";

import { PostsApiService, PostsOrderByWithRelationInput } from "neurelo-sdk";

export const getAllPosts = async ({ orderBy }: {orderBy: PostsOrderByWithRelationInput}) => {
  try {
    console.log("Fetching all posts");
    const res = await PostsApiService.findPosts(undefined, {}, [orderBy]);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};