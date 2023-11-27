import posts from "../api/demoData";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <div className="py-16 bg-white sm:py-32">
      <div className="max-w-4xl px-6 mx-auto lg:px-8">
        <div className="grid grid-cols-1 mx-auto gap-y-16">
          {posts.map((post) => (
            <PostList post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
