import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/routes/AnimatedRoutes";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "./api/axios";
import {
  allUserSlice,
  authStart,
  isAuthFalse,
  isAuthTrue,
} from "./app/features/UserSlice";

function App() {
  const { currentUser } = useSelector(allUserSlice);
  const dispatch = useDispatch();

  const isAuthenticated = async () => {
    if (currentUser) {
      try {
        dispatch(authStart());
        const res = await api.get(`/auth/isauthenticated/${currentUser._id}`);
        dispatch(isAuthTrue(res.data));
      } catch (error) {
        dispatch(isAuthFalse(error.response.data.message));
      }
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
