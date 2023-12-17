import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import api from "../api/axios";
import LoadingComponent from "../components/ui/LoadingComponent";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/post/recent-posts`);
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchPostData();
  }, []);

  return (
    <div className="py-16 bg-white sm:py-32">
      <div className="max-w-4xl px-6 mx-auto lg:px-8">
        <div className="grid grid-cols-1 mx-auto gap-y-16">
          {posts &&
            posts.map((post) => <PostList post={post} key={post._id} />)}
          {loading && <LoadingComponent />}
        </div>
      </div>
    </div>
  );
};

export default Home;
