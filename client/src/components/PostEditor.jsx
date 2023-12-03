import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import ImageTool from "@editorjs/image";

import { useEffect, useRef } from "react";
import "./posteditor.css";

const PostEditor = ({ data, onChanges }) => {
  const editorRef = useRef();
  const editorJsTools = {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: "Heading...",
        levels: [2, 3, 4],
        defaultlevel: 2,
      },
    },

    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: "/api/post/images",
        },
      },
    },

    list: {
      class: List,
      inlineToolbar: true,
    },

    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: "Quote",
        captionPlaceholder: "Quote Caption",
      },
    },

    code: CodeTool,

    delimiter: Delimiter,
  };

  const editorJsInit = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      data: data,
      tools: editorJsTools,
      autofocus: false,
      placeholder: "Tell Us Your Story...",
      defaultBlock: "",
      onReady: () => {
        editorRef.current = editor;
      },
      onChange: async () => {
        let content = await editor.saver.save();
        onChanges(content);
      },
    });
  };

  useEffect(() => {
    if (editorRef.current === null) {
      editorJsInit();
    }

    return () => {
      editorRef?.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  return <div id="editorjs" className="mt-4"></div>;
};

export default PostEditor;
