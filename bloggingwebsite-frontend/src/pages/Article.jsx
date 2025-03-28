import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
const Article = () => {
  const data = useLocation();
  const article = data?.state?.item;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { slug } = useParams();
  console.log(slug);
  console.log(comments);
  useEffect(() => {
    async function getComments() {
      try {
        const responce = await axios.get(
          `http://localhost:3001/api/articles/comments/getcomments/${slug}`
        );
        console.log(responce);
        setComments(responce.data);
      } catch (err) {
        console.log(err);
      }
    }
    getComments();
  }, []);
  async function handleComment() {
    // e.preventDefault();
    if (comment === "") {
      alert("Comment cannot be empty");
      return;
    }
    try {
      const responce = await axios.post(
        `http://localhost:3001/api/articles/comments/addcomment/${slug}`,
        { body: comment }
      );
      console.log(responce);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  }
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
  return (
    <div className="text-center m-2 mt-8">
      <div className="text-3xl font-semibold text-zinc-900">
        {article?.title}
      </div>
      <div className="text-2xl m-2">{article?.description}</div>
      <div className="text-xl m-2">{article?.body}</div>
      <div className="">
        <textarea
          type="text"
          placeholder="Add comment"
          className="border-2 m-2 p-2 w-80"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
      </div>
      <div className="m-2">
        <button
          className="text-xl border-2 bg-green-500 rounded-xl p-2 text-white"
          onClick={handleComment}
        >
          Comment
        </button>
      </div>
      <ul>
        {comments?.map((item, index) => (
          <li key={index} className="m-5 my-6 ml-10">
            <div className="flex mr-10">
              <div className="flex">
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.ipfGiyG7ctjSkhmjCpNfTAHaFj&pid=Api&P=0&h=180"
                  className="rounded-full h-10 w-10"
                />
                <div className="pt-2 ml-3">{item.username}</div>
                <div className="flex my-auto mx-3">
                  <div>{formatDate(item.createdAt)}</div>
                  <div className="mx-2">{formatTime(item.createdAt)}</div>
                </div>
              </div>
            </div>
            <div className="flex ml-1 pl-12">
            <div>{item.body}</div>
            </div>
            
            <hr className="mt-3" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Article;
