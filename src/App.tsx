import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

import Home from "./pages/Home";
import MakePost from "./pages/MakePost";
import ReadPost from "./pages/ReadPost";
import WriteQuestion from "./pages/WriteYS";
import ReadWorld from "./pages/ReadYS";
import Treasure from "./pages/Treasure";
import Untold from "./pages/Untold";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make-post" element={<MakePost />} />
        <Route path="/read-post" element={<ReadPost />} />
        <Route path="/write-question" element={<WriteQuestion />} />
        <Route path="/read-world" element={<ReadWorld />} />
        <Route path="/treasure" element={<Treasure />} />
        <Route path="/untold" element={<Untold />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;