import React from "react";

const PostList = ({ post }) => {
  return (
    <article className="flex flex-col items-start justify-between">
      <div className="flex items-center text-xs gap-x-4">
        <time dateTime={post.datetime} className="text-gray-500">
          {post.datetime}
        </time>

        {post.category.map((cat, index) => {
          return (
            <a
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              key={index}
            >
              {cat}
            </a>
          );
        })}
      </div>
      <div className="relative group">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href="">
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h3>
        <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
          {post.subtitle}
        </p>
      </div>
      <div className="relative flex items-center mt-8 gap-x-4">
        <img
          src={post.author.profilePicture}
          alt=""
          className="w-10 h-10 rounded-full bg-gray-50"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="">
              <span className="absolute inset-0" />
              {post.author.fullname}
            </a>
          </p>
          <p className="text-gray-600">{post.author.username}</p>
        </div>
      </div>
    </article>
  );
};

export default PostList;
