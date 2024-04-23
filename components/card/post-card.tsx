"use client";

import { Posts } from "neurelo-sdk";

import { generateHTMLFromJSON } from "@/lib/utils";

const PostCard = ({ post }: { post: Posts }) => {
  return (
    <div className="mx-auto mt-24 flex max-w-4xl flex-col px-16">
      <div
        dangerouslySetInnerHTML={{
          __html: generateHTMLFromJSON(post.content),
        }}
        className="prose prose-sm dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none before:prose-p:content-none after:prose-p:content-none prose-img:m-0 prose-img:mx-auto prose-img:mt-[43px]"
      />
    </div>
  );
};

export default PostCard;