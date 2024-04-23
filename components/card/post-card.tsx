"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Posts } from "neurelo-sdk";

const generateHTMLFromJSON = (json: any) =>
  generateHTML(JSON.parse(json), [
    StarterKit,
    Underline,
    Link,
    Image,
  ]);

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