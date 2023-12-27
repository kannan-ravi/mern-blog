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
      try {
        const res = await api.get(`/post/${id}`);
        setPostData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, []);

  return (
    <main className="flex justify-center px-5 my-20">
      {!postData ? (
        <LoadingComponent />
      ) : (
        <article className="w-full prose lg:prose-xl">
          <h2>{postData && postData["title"]}</h2>
          <p className="capitalize">{postData && postData["subtitle"]}</p>
          {postData && <Parser data={postData["content"]} />}
        </article>
      )}
    </main>
  );
};

export default SinglePost;
