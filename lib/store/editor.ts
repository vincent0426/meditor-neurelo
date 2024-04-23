import { JSONContent } from "@tiptap/react";
import { create } from "zustand";

interface EditorState {
  content: JSONContent | null;
  pureContent: string | null;
  actions: {
    updateContent: (content: JSONContent) => void;
    updatePureContent: (pureContent: string) => void;
    resetContent: () => void;
  }
}

export const useEditorStore = create<EditorState>((set) => ({
  content: null,
  pureContent: null,
  actions: {
    updateContent: (content) => set({ content }),
    updatePureContent: (pureContent) => set({ pureContent }),
    resetContent: () => set({ content: null, pureContent: null }),
  }
}));