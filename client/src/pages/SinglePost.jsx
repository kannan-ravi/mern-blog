import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { Parser } from "@alkhipce/editorjs-react";
import LoadingComponent from "../components/ui/LoadingComponent";
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
        <LoadingComponent />
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
