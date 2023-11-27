import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  allUserSlice,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../app/features/UserSlice";
import api from "../api/axios";

const Profile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [oldNewPassword, setOldNewPassword] = useState(false);
  const [file, setFile] = useState(null);

  const [uploadPopup, setUploadPopup] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const [textUploadStatus, setTextUploadStatus] = useState(false);
  const [imageUploadStatus, setImageUploadStatus] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTextUploadStatus(false);
    setOldNewPassword(false);
    if (
      (formData["oldpassword"] && formData["newpassword"]) ||
      (!formData["oldpassword"] && !formData["newpassword"])
    ) {
      dispatch(updateStart());
      try {
        const res = await api.put(`/user/update/${currentUser._id}`, formData);
        dispatch(updateSuccess(res.data));
        setTextUploadStatus(true);
      } catch (err) {
        dispatch(updateFailure(err.response.data.message));
      }
    } else {
      setOldNewPassword(true);
    }
  };

  const handleProfileImageUpload = async (e) => {
    e.preventDefault();
    setUploadError(false);
    if (file) {
      try {
        setImageUploadStatus(false);
        const imageData = new FormData();
        imageData.append("profileImage", file);
        dispatch(updateStart());
        const res = await api.post(
          `/user/upload/${currentUser._id}`,
          imageData
        );
        dispatch(updateSuccess(res.data));
        setUploadPopup(false);
        setImageUploadStatus(true);
      } catch (error) {
        updateFailure(error);
      }
    } else {
      setUploadError(true);
    }
  };

  const uploadPopupLogic = (
    <AnimatePresence>
      {uploadPopup && (
        <motion.form
          key="profilePicUpload"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full p-4 bg-gray-800 bg-opacity-50 h-100 fadeIn-animation"
          onSubmit={handleProfileImageUpload}
        >
          <motion.div
            className="w-full max-w-xl p-4 bg-white rounded-xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <label
              className="flex items-center justify-center w-full max-w-xl mb-4 text-center cursor-pointer bg-slate-100 aspect-video rounded-xl"
              htmlFor="profilePictureUplaod"
            >
              <input
                type="file"
                id="profilePictureUplaod"
                accept="image/*"
                name="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />

              {file ? (
                <img
                  src={file && URL.createObjectURL(file)}
                  alt="Preview Image"
                  className="object-cover w-full"
                />
              ) : (
                <p>
                  Upload your profile picture here <br />
                  {uploadError && (
                    <span className="font-semibold text-red-700">
                      Please select the image
                    </span>
                  )}
                </p>
              )}
            </label>

            <div className="flex items-center justify-between w-full max-w-xl mt-4">
              <button
                className="px-8 py-2 text-white duration-200 bg-red-700 rounded hover:bg-red-800"
                type="button"
                onClick={() => setUploadPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-8 py-2 text-black duration-200 rounded bg-lime-300 hover:bg-lime-400"
                type="submit"
              >
                Upload
              </button>
            </div>
          </motion.div>
        </motion.form>
      )}
      ;
    </AnimatePresence>
  );

  return (
    <main className="my-16">
      <section className="container mx-auto">
        <h1 className="text-2xl font-semibold text-center">
          Profile Information
        </h1>
        {uploadPopupLogic}
        <form
          className="flex flex-col items-center max-w-2xl gap-4 px-4 mx-auto mt-12"
          onSubmit={handleSubmit}
        >
          <img
            src={currentUser.profilePicture}
            alt={`${currentUser.fullname} Profile Picture`}
            className="object-cover w-2/5 mb-4 rounded-full cursor-pointer aspect-square"
            onClick={() => {
              setUploadError(false);
              setUploadPopup(true);
            }}
          />
          {imageUploadStatus && (
            <p className="max-w-2xl px-4 mx-auto mt-2 text-sm text-green-700">
              Succesfully Updated
            </p>
          )}
          <input
            type="text"
            className="w-full p-2 border-2 rounded"
            name="fullname"
            defaultValue={currentUser?.fullname}
            placeholder="Full Name"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            type="text"
            className="w-full p-2 border-2 rounded"
            name="username"
            defaultValue={currentUser.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            className="w-full p-2 border-2 rounded"
            name="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="w-full p-2 border-2 rounded"
            name="oldpassword"
            placeholder="Old Password"
            onChange={handleChange}
          />
          <input
            type="password"
            className="w-full p-2 mb-2 border-2 rounded"
            name="newpassword"
            placeholder="New Password"
            onChange={handleChange}
          />
          <button
            className="w-full py-2 mt-1 duration-300 bg-lime-200 hover:bg-lime-400"
            type="submit"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
        {error && (
          <p className="max-w-2xl px-4 mx-auto mt-2 text-sm text-red-900">
            {error}
          </p>
        )}
        {textUploadStatus && (
          <p className="max-w-2xl px-4 mx-auto mt-2 text-sm text-green-700">
            Succesfully Updated
          </p>
        )}
        {oldNewPassword && (
          <p className="max-w-2xl px-4 mx-auto mt-2 text-sm text-red-700">
            Invalid password update. Ensure both fields are filled or both are
            empty
          </p>
        )}
      </section>
    </main>
  );
};

export default Profile;
