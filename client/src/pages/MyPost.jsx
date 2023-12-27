import React, { useEffect, useState } from "react";
import api from "../api/axios";
import PostList from "../components/PostList";
import { useSelector } from "react-redux";
import { allUserSlice } from "../app/features/UserSlice";
import LoadingComponent from "../components/ui/LoadingComponent";

const MyPost = () => {
  const { currentUser } = useSelector(allUserSlice);
  const [myPost, setMyPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/post/my-posts/${currentUser._id}`);
        setMyPost(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchPostData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/post/${id}`);
      setMyPost(myPost.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-16 bg-white sm:py-32">
      <div className="max-w-4xl px-6 mx-auto lg:px-8">
        <div className="grid grid-cols-1 mx-auto gap-y-16">
          {loading ? (
            <LoadingComponent />
          ) : error ? (
            <p>Error {error}</p>
          ) : myPost && myPost.length > 0 ? (
            myPost.map((post) => (
              <PostList
                post={post}
                key={post._id}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center">No Post to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
