import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// extractContent takes a JSON string as input and removes the first element from the 'content' array
export const extractFirstParagraph = (content: string) => {
  // Parse the JSON string into an object
  const jsonObject = JSON.parse(content);

  // Find the first element of type 'paragraph'
  const firstParagraph = jsonObject.content.find((element: any) => element.type === "paragraph");

  // Return the first paragraph object, or null if no paragraph is found
  return firstParagraph || null;
};