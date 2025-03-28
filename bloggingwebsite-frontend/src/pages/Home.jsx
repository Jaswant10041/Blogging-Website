import React, { useState } from "react";
import { useUserQuery } from "../hooks";
import axios from "axios";
import useArticlesQuery from "../hooks/useArticlesQuery";
import { Link } from "react-router-dom";

const Home = () => {
  // const { userData, isUserDataLoading } = useUserQuery();
  const ArticlesData = useArticlesQuery();
  const data = ArticlesData?.data?.data;
  
  const [expandedArticle, setExpandedArticle] = useState(null); // State to track expanded article

  const formatDate = (createdAt) => {
    const date = new Date(createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return date;
  };

  const formatTime = (createdAt) => {
    const time = new Date(createdAt).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  };

  const handleDelete = async (item) => {
    const response = await axios.post(
      "http://localhost:3001/api/articles/deletepost",
      { data: item }
    );
    console.log(response);
  };

  const toggleReadMore = (index) => {
    // If the clicked article is already expanded, collapse it
    if (expandedArticle === index) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(index); // Otherwise, expand the clicked article
    }
  };

  return (
    <div>
      <div className="text-center bg-green-500 text-white p-5 m-4">
        <h1 className="text-5xl font-bold m-3">Blogging</h1>
        <div className="text-xl">A place to share your knowledge.</div>
      </div>
      <div className="text-green-500 text-xl font-medium m-4">Your Feed</div>
      <hr className="m-4 bg-gradient-to-r from-green-500 to-gray-300 w-full h-1" />

      <ul>
        {data?.map((item, index) => (
          <li key={index} className="m-5 my-6 ml-10">
            <div className="flex justify-between mr-10">
              <div className="flex">
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.ipfGiyG7ctjSkhmjCpNfTAHaFj&pid=Api&P=0&h=180"
                  className="rounded-full h-10 w-10"
                />
                <div className="flex my-auto mx-3">
                  <div>{formatDate(item.createdAt)}</div>
                  <div className="mx-2">{formatTime(item.createdAt)}</div>
                </div>
              </div>
            </div>
            <Link to={`/article/${item.slug}`} state={{item}}>
            <div className="text-xl font-semibold mt-2">{item.title}</div>
            </Link>
            <div className="mt-2">{item.description}</div>
            
            {/* Conditionally show the body if this article is expanded */}
            {expandedArticle === index && (
              <div className="mt-2 text-gray-700">{item.body}</div>
            )}

            <button
              onClick={() => toggleReadMore(index)}
              className="text-blue-500 mt-2"
            >
              {expandedArticle === index ? "Show Less" : "Read More"}
            </button>

            <hr className="mt-3" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
