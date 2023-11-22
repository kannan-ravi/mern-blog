import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { allUserSlice } from "../app/features/UserSlice";
import api from "../api/axios";

const Profile = () => {
  const { currentUser } = useSelector(allUserSlice);
  const [formData, setFormData] = useState({});
  const imageUpload = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/user/update/${currentUser._id}`, formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="my-16">
      <section className="container mx-auto">
        <h1 className="text-2xl font-semibold text-center">
          Profile Information
        </h1>

        <form
          className="flex flex-col items-center max-w-2xl gap-4 px-4 mx-auto mt-12"
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            name="profilePicture"
            className="hidden"
            ref={imageUpload}
          />
          <img
            src={currentUser.profilePicture}
            alt={`${currentUser.fullname} Profile Picture`}
            className="w-2/5 mb-4"
            onClick={() => imageUpload.current.click()}
          />
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
            className="w-full p-2 border-2 rounded"
            name="newpassword"
            placeholder="New Password"
            onChange={handleChange}
          />

          <button className="w-full py-2 mt-6 duration-300 bg-lime-200 hover:bg-lime-400">
            Update
          </button>
        </form>
      </section>
    </main>
  );
};

export default Profile;
