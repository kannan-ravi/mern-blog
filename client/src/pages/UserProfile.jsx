import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/ui/LoadingComponent";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/user/${id}`);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <div className="py-16 bg-white sm:py-32">
      <div className="max-w-4xl px-6 mx-auto lg:px-8">
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="container max-w-4xl p-8 mx-auto my-10 bg-white shadow-lg">
            <div className="flex items-center mb-4 space-x-6">
              <span className="relative flex w-20 h-20 overflow-hidden rounded-full shrink-0">
                <span className="flex items-center justify-center w-full h-full rounded-full bg-muted">
                  <img
                    src={user.profilePicture}
                    alt={user.fullname}
                    className="object-cover w-full h-full"
                  />
                </span>
              </span>
              <div>
                <h2 className="text-2xl font-semibold">{user.fullname}</h2>
                <p className="mt-2 text-gray-500">@{user.username}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
