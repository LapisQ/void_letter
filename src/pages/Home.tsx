import Hero from "../components/hero/Hero";
import ActionCards from "../components/home/ActionCards";
import About from "../components/home/About";
import FeaturedLetters from "../components/home/FeaturedLetters";
import RelationshipTimeline from "../components/home/RelationshipTimeline";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  return (
    <>
  {location.state?.accessDenied && (
    <div className="fixed left-1/2 top-24 z-40 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-lg border border-red-400/30 bg-[#2a171b] px-5 py-4 text-center text-sm font-medium text-red-100 shadow-2xl">
      You are not allowed to access Treasure.
    </div>
  )}
  <Hero />
  <About />
  <ActionCards />
  <RelationshipTimeline />
  <FeaturedLetters />
    </>
  );
}

export default Home;