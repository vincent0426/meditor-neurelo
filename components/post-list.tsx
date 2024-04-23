"use client";

import { Posts } from "neurelo-sdk";
import Link from "next/link";
import React from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { extractFirstParagraph } from "@/lib/utils";

const PostList = ({ posts }: { posts: Posts[] }) => {
  return (
    <div className="mx-auto my-24 max-w-4xl space-y-4">
      {posts.map((post) => (
        <PostCard key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default PostList;

const PostCard = ({ post }: { post: Posts }) => {
  const firstParagraph = extractFirstParagraph(post.content!);

  return (
    <div>
      <Link href={`/posts/${post.post_id}`}>
        <Card className="p-2">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{post.title}</CardTitle>
              <p className="text-gray-500">
                {new Date(post.posted_at!).toDateString()}
              </p>
            </div>
            <CardDescription className="max-h-6 overflow-hidden">
              {firstParagraph && firstParagraph.content[0].text}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};