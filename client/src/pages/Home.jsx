import { useEffect } from "react";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import {
  allPostSlice,
  getPostFailure,
  getPostStart,
  getPostSuccess,
} from "../app/features/PostSlice";
import api from "../api/axios";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(allPostSlice);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        dispatch(getPostStart());
        const res = await api.get(`/post/recent-posts`);
        console.log(res.data);
        dispatch(getPostSuccess(res.data));
      } catch (error) {
        dispatch(getPostFailure(error));
      }
    };

    if (!posts) {
      fetchPostData();
    }
  }, []);

  return (
    <div className="py-16 bg-white sm:py-32">
      <div className="max-w-4xl px-6 mx-auto lg:px-8">
        <div className="grid grid-cols-1 mx-auto gap-y-16">
          {posts &&
            posts.map((post) => <PostList post={post} key={post._id} />)}
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
