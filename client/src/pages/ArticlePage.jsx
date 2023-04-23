import React from "react";
import { useSelector } from "react-redux";


const ArticlePage = () => {
  const article = useSelector((state) => state.article);
  
  return (
    <div className="h-screen pt-20 flex text-white justify-center ">
      <div className="w-4/5 flex md:w-2/3 flex-col items-center text-center bg-[rgba(0,0,0,0.7)] rounded-3xl">
        <h1 className="md:text-2xl lg:text-4xl font-mono rounded-t-3xl p-2 bg-[#161327]">{article.title}</h1>
        <img className="flex p-2 lg:w-3/5 w-4/5" src={article.urlToImage} alt="" />
        <div className="md:text-2xl ">
          {article.description}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
