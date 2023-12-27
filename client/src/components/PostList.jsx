import React from "react";
import { Link, useLocation } from "react-router-dom";

const PostList = ({ post, handleDelete }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <article className="flex flex-col items-start justify-between">
      <div className="flex items-center text-xs gap-x-4">
        <time dateTime={post.datetime} className="text-gray-500">
          {post.datetime}
        </time>

        {post.category.map((cat, index) => {
          return (
            <Link
              to={`/category/${cat}`}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              key={index}
            >
              {cat}
            </Link>
          );
        })}
      </div>
      <div className="relative group">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link to={`/post/${post._id}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
          {post.subtitle}
        </p>
      </div>
      <div className="relative flex flex-col justify-between w-full mt-8 sm:flex-row gap-y-8 gap-x-4">
        <div className="flex items-center gap-x-2">
          <img
            src={post.author.profilePicture}
            alt=""
            className="w-10 h-10 rounded-full bg-gray-50"
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <Link to="">{post.author.fullname}</Link>
            </p>
            <p className="text-gray-600">{post.author.username}</p>
          </div>
        </div>
        {pathname === "/my-post" && (
          <div className="flex items-center justify-between sm:gap-x-6 sm:justify-end">
            <Link
              to={`/edit-post/${post._id}`}
              className="px-3 py-1 font-semibold tracking-wide text-white capitalize duration-300 rounded bg-slate-600 hover:bg-slate-500"
              type="button"
            >
              edit
            </Link>
            <button
              className="px-3 py-1 font-semibold tracking-wide text-white capitalize duration-300 bg-red-600 rounded hover:bg-red-500"
              type="button"
              onClick={() => handleDelete(post._id)}
            >
              delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostList;
