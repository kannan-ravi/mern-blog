import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { allUserSlice } from "../../app/features/UserSlice";

const PrivateRouter = () => {
  const { currentUser } = useSelector(allUserSlice);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
