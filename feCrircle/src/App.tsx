import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import Replies from "./components/replies/replies"
import Search from "./pages/search";
import Profile from "./pages/profile"
import Follow from "./pages/follow"

const App = () => {

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />} >
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/follow" element={<Follow />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="replies/:threadId" element={<Replies />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
