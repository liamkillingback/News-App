import { useEffect, useState, useRef } from "react";
import { BlogPost } from "../components";
import "@coreui/coreui/dist/css/coreui.min.css";
import { blogPosts } from "../constants";
import { hero } from "../assets";

const Home = () => {
  return (
    <>
      <div className="overflow-y-scroll scrollbar-hide h-screen w-screen pt-16 ">
        <div className="w-full flex flex-col justify-center items-center bg-[#00000098]">
          <img className="p-5 w-3/5" src={ hero } alt="" />
          
        </div>
        <div className=" w-full h-full p-5">
          {blogPosts.map((post, index) => (
            <BlogPost props={post} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
