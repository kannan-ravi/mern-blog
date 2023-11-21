import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { allUserSlice } from "../app/features/UserSlice";

const Profile = () => {
  const { currentUser } = useSelector(allUserSlice);
  const [formData, setFormData] = useState({});
  const imageUpload = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className="my-16">
      <section className="container mx-auto">
        <h1 className="text-2xl text-center font-semibold">
          Profile Information
        </h1>

        <form
          className="px-4 mt-12 max-w-2xl mx-auto flex flex-col gap-4 items-center"
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
            autoFocus
          />
          <input
            type="text"
            className="w-full p-2 border-2 rounded"
            name="username"
            defaultValue={currentUser.username}
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="email"
            className="w-full p-2 border-2 rounded"
            name="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            onChange={handleChange}
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

          <button className="bg-lime-200 w-full py-2 mt-6 hover:bg-lime-400 duration-300">
            Update
          </button>
        </form>
      </section>
    </main>
  );
};

export default Profile;
