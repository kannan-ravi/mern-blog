import React from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

import NotFound from "../../pages/NotFound";
import Profile from "../../pages/Profile";
import PrivateRouter from "../../components/routes/PrivateRouter";
import PageLayout from "../../components/routes/PageLayout";

import { AnimatePresence } from "framer-motion";
import NewPost from "../../pages/NewPost";
import MyPost from "../../pages/MyPost";
import SinglePost from "../../pages/SinglePost";
import EditPost from "../../pages/EditPost";
import SingleCategory from "../../pages/SingleCategory";
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/category/:category" element={<SingleCategory />} />
          <Route element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/new-post" element={<NewPost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/my-post" element={<MyPost />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
