"use client";

import {
  Ellipsis,
  Loader2,
  Pencil,
  Trash,
} from "lucide-react";
import { Posts } from "neurelo-sdk";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePost } from "@/lib/query/posts/delete-post";
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
              <PostControls post={post} />
            </div>
            <CardDescription className="max-h-6 overflow-hidden">
              {firstParagraph && firstParagraph.content[0].text}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <p className="text-gray-500">
              {post.posts_users_ref?.username}
            </p>
            <p className="text-gray-500">
              {new Date(post.posted_at!).toDateString()}
            </p>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

const PostControls = ({ post }: { post: Posts }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Stop the click event from propagating to parent elements
  const handleControlClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleControlClick}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis size={20} className="text-gray-400 hover:text-gray-900"/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{post.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/posts/${post.post_id}/edit`} className="w-full">
              <DropdownMenuItem className="hover:cursor-pointer">
                <Pencil className="mr-2 size-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="hover:cursor-pointer">
              <Trash className="mr-2 size-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDeleteDialogOpen &&<DeletePostDialog post={post} isDeleteDialogOpen={isDeleteDialogOpen} setIsDeleteDialogOpen={setIsDeleteDialogOpen} />}
    </div>
  );
};

export const DeletePostDialog = ({ post, isDeleteDialogOpen, setIsDeleteDialogOpen }: { post: Posts, isDeleteDialogOpen: boolean, setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = async () => {
    if(!post.post_id) {
      toast.error("Post not found");

      return;
    }

    setIsDeleting(true);
    
    try {
      await deletePost({ postId: post.post_id });
    } catch (error) {
      toast.error("Error deleting post");
      setIsDeleting(false);

      return;
    }
    
    toast.success("Post deleted successfully, refreshing...");
    setIsDeleting(false);
    setIsDeleteDialogOpen(false);
    
    router.refresh();
  };
  
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild className="hidden">
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className="w-16" onClick={handleDeletePost} disabled={isDeleting}>
            {isDeleting ? <Loader2 className="animate-spin"/> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};