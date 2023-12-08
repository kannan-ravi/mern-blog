import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { allUserSlice } from "../app/features/UserSlice";
import {
  getUserPostFailure,
  getUserPostStart,
  getUserPostSuccess,
} from "../app/features/PostSlice";
import { allPostSlice } from "../app/features/PostSlice";

const MyPost = () => {
  const { currentUser } = useSelector(allUserSlice);
  const { myPost, loading, error } = useSelector(allPostSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        dispatch(getUserPostStart());
        const res = await api.get(`/post/my-posts/${currentUser._id}`);
        dispatch(getUserPostSuccess(res.data));
      } catch (error) {
        dispatch(getUserPostFailure(error));
      }
    };

    if (!myPost) {
      fetchPostData();
    }
  }, [myPost]);

  return (
    <div className="py-16 bg-white sm:py-32">
      <div className="max-w-4xl px-6 mx-auto lg:px-8">
        <div className="grid grid-cols-1 mx-auto gap-y-16">
          {loading && <p>Loading...</p>}
          {error && <p>Error : {error}</p>}
          {myPost &&
            myPost.map((post) => <PostList post={post} key={post._id} />)}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
