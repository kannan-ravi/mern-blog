import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PostList from "../components/PostList";
import { useSelector } from "react-redux";
import { allUserSlice } from "../app/features/UserSlice";

const MyPost = () => {
  const { currentUser } = useSelector(allUserSlice);
  const [myPosts, setMyPosts] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      const res = await api.get(`/post/my-posts/${currentUser._id}`);
      setMyPosts(res.data);
      console.log(res.data);
    };

    fetchPostData();
  }, []);

  return (
    <div className="py-16 bg-white sm:py-32">
      <div className="max-w-4xl px-6 mx-auto lg:px-8">
        <div className="grid grid-cols-1 mx-auto gap-y-16">
          {myPosts &&
            myPosts.map((post) => <PostList post={post} key={post._id} />)}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
