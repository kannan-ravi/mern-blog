import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";

import { useCallback, useEffect, useRef } from "react";

const PostEditor = ({ data, setInitalData }) => {
  const editorRef = useRef();

  const handleContentChange = useCallback(async () => {
    const content = await editorRef.current.saver.save();
    setInitalData(content);
  }, [setInitalData]);
  const editorJsTools = {
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: "Heading...",
        levels: [3, 4, 5],
        defaultlevel: 3,
      },
    },

    paragraph: {
      class: Paragraph,
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
      onChange: handleContentChange,
    });
  };

  useEffect(() => {
    if (!editorRef.current) {
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
