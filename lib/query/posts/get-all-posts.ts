"use server";

import { PostsApiService, PostsOrderByWithRelationInput } from "neurelo-sdk";

export const getAllPosts = async ({ orderBy }: {orderBy: PostsOrderByWithRelationInput}) => {
  try {
    const selectInput = {
      post_id: true,
      title: true,
      content: true,
      posted_at: true,
      posts_users_ref: true,
    };
    const res = await PostsApiService.findPosts(selectInput, {}, [orderBy]);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};