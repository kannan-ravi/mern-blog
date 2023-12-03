import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostEditor from "../components/PostEditor";

import { allUserSlice } from "../app/features/UserSlice";
import { editingPost } from "../app/features/PostSlice";

const NewPost = () => {
  const { currentUser } = useSelector(allUserSlice);

  const dispatch = useDispatch();

  const [initData, setInitData] = useState({});
  const [formData, setFormData] = useState({});
  const [tags, setTags] = useState([]);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      content: initData,
      author: currentUser,
    });
    dispatch(editingPost(formData));
  };

  return (
    <main className="max-w-2xl px-4 mx-auto mt-20 mb-20">
      <input
        type="text"
        placeholder="TITLE"
        maxLength={100}
        name="title"
        className="w-full py-2 mb-4 text-4xl font-bold border-b-2 border-transparent focus:outline-none focus:border-black"
        onChange={handleOnChange}
        autoFocus
        autoComplete="false"
        required
      />

      <input
        type="text"
        placeholder="SUBTITLE"
        maxLength={200}
        name="subtitle"
        className="w-full py-2 mb-4 text-2xl font-semibold border-b-2 border-transparent focus:outline-none focus:border-black"
        onChange={handleOnChange}
        autoComplete="false"
        required
      />
      {tags.map((tag) => (
        <div className="tag">{tag}</div>
      ))}
      <input placeholder="Enter a tag" />
      <PostEditor data={initData} onChanges={setInitData} />
    </main>
  );
};

export default NewPost;
