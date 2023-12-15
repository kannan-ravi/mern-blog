import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { Parser } from "@alkhipce/editorjs-react";
const SinglePost = () => {
  const { id } = useParams();

  const [postData, setPostData] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      const res = await api.get(`/post/${id}`);

      setPostData(res.data);
    };

    getPost();
  }, []);

  return (
    <main className="flex justify-center px-5 my-20">
      {!postData ? (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        <article className="prose lg:prose-xl">
          <h1>{postData && postData["title"]}</h1>
          <h2 className="capitalize">{postData && postData["subtitle"]}</h2>
          {postData && <Parser data={postData["content"]} />}
        </article>
      )}
    </main>
  );
};

export default SinglePost;
