"use client";

import "@/styles/editor.css";

import Blockquote from "@tiptap/extension-blockquote";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, HTMLContent, JSONContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";

import CodeBlockSelect from "@/components/code-block-select";
import EditorBubbleMenu from "@/components/menu/editor-bubble-menu";
import EditorFloatingMenu from "@/components/menu/editor-floating-menu";
import lowlight from "@/lib/lowlight";
import { useEditorStore } from "@/lib/store/editor";

import { generateHTMLFromJSON } from "./card/post-card";

const CustomDocument = Document.extend({
  content: "heading block*",
});

const Meditor = ({ content }: {content?: string}) => {
  const [showLinkSelector, setShowLinkSelector] = useState(false);
  const [showBubbleMenu, setShowBubbleMenu] = useState(true);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showPlusButton, setShowPlusButton] = useState(false);
  const pureContent = useEditorStore((state) => state.pureContent);
  const { updateContent, updatePureContent } = useEditorStore((state) => state.actions);
  // const [content, setContent] = useState<string>("");
  const [jsonContent, setJSONContent] = useState<JSONContent | null>(null);
  const [htmlContent, setHTMLContent] = useState<HTMLContent | null>(null);
  
  const editor = useEditor({
    // This can be used to add a new paragraph after an image is inserted
    // but issue is that it adds a new paragraph when the image is updated
    // If user delete the new paragraph, the image is activated again
    // and the new paragraph is added again
    // onUpdate({ editor }) {
    //   if(editor.isActive("image")) {
    //     const endPos = editor.state.selection.$to.pos;
    //     editor.commands.focus("start");
    //     editor
    //       .chain()
    //       .insertContentAt(endPos, { type: "paragraph" })
    //       .focus(endPos)
    //       .run();
    //   }
    // },
    onUpdate({ editor }) {
      // Get the content of the editor
      updateContent(editor.getJSON());
      updatePureContent(editor.getText());
      setJSONContent(editor.getJSON());
      setHTMLContent(editor.getHTML());
    },
    onSelectionUpdate({ editor }) {
      if (editor.isActive("heading", { level: 1 }) || editor.isActive("image") || editor.isActive("horizontalRule") || editor.isActive("codeBlock")) {
        setShowBubbleMenu(false);
        setShowPlusButton(false);

        return;
      }
      
      setShowBubbleMenu(true);
      setShowPlusButton(true);
    },
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link,
      Blockquote,
      Image,
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
      TextAlign.configure({
        types: ["image", "paragraph", "heading"],
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockSelect);
        },
      }).configure({
        lowlight,
      })
    ],
    enableInputRules: ["bulletList", "orderedList", "codeBlock"],
    editorProps: {
      attributes: {
        // before:prose-p:content-none after:prose-p:content-none is used to disable tailiwinds default qutoation marks added to blockquote
        // https://github.com/tailwindlabs/tailwindcss-typography/issues/66
        class: "before:prose-p:content-none after:prose-p:content-none prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none prose-img:mx-auto prose-img:m-0 prose-img:mt-[43px]",
      },
    },
    content: pureContent,
  });
  
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!editor) return;
    
    // focus the editor
    editor.commands.focus();
    
    if (content) {
      editor.commands.setContent(generateHTMLFromJSON(content));
    }
  }, [editor]);
  
  if(!editor) return null;

  return (
    <>
      <EditorBubbleMenu 
        editor={editor} 
        showBubbleMenu={showBubbleMenu} 
        showLinkSelector={showLinkSelector} 
        setShowLinkSelector={setShowLinkSelector} 
      />
      <EditorFloatingMenu
        editor={editor}
        showPlusButton={showPlusButton}
        showFloatingMenu={showFloatingMenu}
        setShowFloatingMenu={setShowFloatingMenu}
      />
      <EditorContent editor={editor} ref={ref} />
    </>
  );
};

export default Meditor;