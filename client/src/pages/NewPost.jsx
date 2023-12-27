import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostEditor from "../components/PostEditor";
import api from "../api/axios";
import { allUserSlice } from "../app/features/UserSlice";
import InputComponent from "../components/ui/InputComponent";
import ButtonComponent from "../components/ui/ButtonComponent";
import ErrorComponent from "../components/ui/ErrorComponent";
import useTags from "../hooks/useTags";
const NewPost = () => {
  const { currentUser } = useSelector(allUserSlice);

  const navigate = useNavigate();

  const [initData, setInitData] = useState({});
  const [formData, setFormData] = useState(null);

  const [errorMessage, setErrorMessage] = useState();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { tags, setTags, setTagInput, tagInput, handleTagInput, removeTag } =
    useTags();

  const handlePublish = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const newFormData = {
      ...formData,
      author: currentUser,
      category: tags,
      content: initData,
    };

    if (
      !newFormData.title ||
      newFormData.title.length < 5 ||
      newFormData.title.length > 120
    ) {
      setErrorMessage("Title Characters should be atleast from 5 to 120");
    } else if (
      !newFormData.subtitle ||
      newFormData.subtitle.length < 5 ||
      newFormData.subtitle.length > 180
    ) {
      setErrorMessage("SubTitle Characters should be atleast from 5 to 180");
    } else if (
      !newFormData.category ||
      newFormData.category.length === 0 ||
      newFormData.category.length > 5
    ) {
      setErrorMessage("There should be atleast 1 to 5 categories should used");
    } else if (
      !newFormData.content ||
      newFormData.content["blocks"].length === 0
    ) {
      setErrorMessage("Content is missing");
    } else {
      try {
        const res = await api.post(
          `/post/new-post/${currentUser._id}`,
          newFormData
        );
        navigate("/my-post");
      } catch (error) {
        console.log(error);
      }
    }
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
        onKeyDown={handleTagInput}
        onChange={(e) => setTagInput(e.target.value)}
      />
      <PostEditor data={initData} setInitalData={setInitData} />

      <ButtonComponent
        type="submit"
        onClick={handlePublish}
        buttonText="publish"
      />
    </main>
  );
};

export default NewPost;
