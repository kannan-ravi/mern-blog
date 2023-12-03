import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostEditor from "../components/PostEditor";
import api from "../api/axios";
import { allUserSlice } from "../app/features/UserSlice";
import { allPostSlice, editingPost } from "../app/features/PostSlice";
import InputComponent from "../components/ui/InputComponent";
import ButtonComponent from "../components/ui/ButtonComponent";
import ErrorComponent from "../components/ui/ErrorComponent";
const NewPost = () => {
  const { currentUser } = useSelector(allUserSlice);
  const { editPost } = useSelector(allPostSlice);

  const dispatch = useDispatch();

  const [initData, setInitData] = useState({});
  const [formData, setFormData] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagOnKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedInput = tagInput.trim();
      if (trimmedInput && !tags.includes(trimmedInput)) {
        setTags([...tags, trimmedInput]);
        setTagInput("");
      }
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      author: currentUser,
      category: tags,
      content: initData,
    });

    if (formData?.title?.length > 120 || formData?.title?.length === 0) {
      setErrorMessage("Title length should be 0-120 characters");
    } else if (
      formData?.subtitle?.length > 180 ||
      formData?.subtitle?.length == 0
    ) {
      setErrorMessage("Subtitle length should be 0-180 characters");
    } else if (
      formData?.category?.length < 1 ||
      formData?.category?.length > 5
    ) {
      setErrorMessage("Please select between 1-5 tags.");
    } else if (Object.keys(formData?.content || {}).length < 1) {
      setErrorMessage("Content cannot be empty.");
    } else {
      try {
        const res = await api.post("/post/new-post", formData);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  return (
    <main className="flex flex-col max-w-2xl gap-3 px-4 mx-auto mt-20 mb-20">
      <ErrorComponent isError={errorMessage} message={errorMessage} />
      <InputComponent
        type="text"
        placeholder="TITLE"
        name="title"
        onChange={handleOnChange}
      />
      <InputComponent
        type="text"
        placeholder="SUBTITLE"
        name="subtitle"
        onChange={handleOnChange}
      />
      <div className="flex flex-wrap items-center gap-3 my-3">
        {tags.map((tag, index) => (
          <p
            key={index}
            onClick={() => removeTag(tag)}
            role="button"
            className="px-2 py-1 bg-gray-200 rounded-sm"
          >
            {tag}
          </p>
        ))}
      </div>

      <InputComponent
        type="text"
        value={tagInput}
        placeholder="Categories"
        name="tag"
        onKeyDown={handleTagOnKeyDown}
        onChange={(e) => setTagInput(e.target.value)}
      />
      <PostEditor data={initData} onChange={setInitData} />

      <ButtonComponent
        type="submit"
        onClick={handlePublish}
        buttonText="publish"
        isdisable={formData}
      />
    </main>
  );
};

export default NewPost;
