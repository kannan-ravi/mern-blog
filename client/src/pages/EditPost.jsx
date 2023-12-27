import { useEffect, useState } from "react";
import ErrorComponent from "../components/ui/ErrorComponent";
import InputComponent from "../components/ui/InputComponent";
import PostEditor from "../components/PostEditor";
import ButtonComponent from "../components/ui/ButtonComponent";
import LoadingComponent from "../components/ui/LoadingComponent";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import useTags from "../hooks/useTags";
import { useSelector } from "react-redux";
import { allUserSlice } from "../app/features/UserSlice";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector(allUserSlice);
  const [initData, setInitData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState();

  const { tags, setTags, setTagInput, tagInput, handleTagInput, removeTag } =
    useTags();

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/post/${id}`);
        setFormData(res.data);
        setInitData(res.data.content);
        setTags(res.data.category);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getPost();
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
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
        const res = await api.put(`/post/${id}`, newFormData);
        navigate("/my-post");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="mt-20">
          <LoadingComponent />
        </div>
      ) : (
        <main className="flex flex-col max-w-2xl gap-3 px-4 mx-auto mt-20 mb-20">
          <ErrorComponent isError={errorMessage} message={errorMessage} />
          <InputComponent
            type="text"
            placeholder="TITLE"
            value={formData?.title}
            name="title"
            onChange={handleOnChange}
          />
          <InputComponent
            type="text"
            placeholder="SUBTITLE"
            value={formData?.subtitle}
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
            onClick={handleUpdate}
            buttonText="update"
          />
        </main>
      )}
    </>
  );
};

export default EditPost;
