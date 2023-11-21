import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import PrivateRouter from "./components/PrivateRouter";
import PageLayout from "./components/PageLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
