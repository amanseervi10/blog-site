import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HashLoader } from "react-spinners";
import { UserContext } from "../UserContext";
import "./PostPage.css";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch(`http://localhost:3000/user`, {
    //   method: "GET",
    //   credentials: "include",
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     const stuff={id: data._id, likedPosts: data.likedPosts,username: data.username}
    //     setUserInfo(stuff);
    //   });

    fetch(`http://localhost:3000/post/${id}`).then((res) => {
      res.json().then((info) => {
        setPost(info);
      });
    });
  }, []);

  useEffect(() => {
    // console.log(post);
    const liked = userInfo?.likedPosts?.indexOf(post?._id);
    // console.log(liked);

    if (liked > -1) {
      setLike(true);
    }
  }, [post]);

  const likebutton = () => {
    // console.log(userInfo);  
    if (userInfo?.id === undefined) {
      alert("Please login to like posts");
      navigate("/login");
      return;
    }
    if (like) {
      setLike(false);
      userInfo.likedPosts.splice(userInfo.likedPosts.indexOf(post?._id), 1);
      //remove from liked posts
      fetch(`http://localhost:3000/dislike/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          // console.log("disliked");
        }
      });
    } else {
      //add to liked posts
      userInfo?.likedPosts?.push(post?._id);
      fetch(`http://localhost:3000/like/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((res) => {
        if (res.ok) {
          // console.log("liked");
        }
      });
      setLike(true);
    }
  };

  return (
    <div className="post-page">
      {!post ? (
        <div className="backdrop">
          <HashLoader color="#1a1a1a" className="loader" />
        </div>
      ) : (
        <>
          <h1 className="title-container">
            {post.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={like ? "red" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${like ? "gelatine  " : ""} `}
              onClick={likebutton}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </h1>
          <time>{format(new Date(post.createdAt), "MMM d,yyyy HH:mm")}</time>
          <div className="author">by @{post.author.username}</div>
          {userInfo?.id === post.author._id && (
            <Link to={`/edit/${id}`}>
              <div className="edit">
                <button className="button-28c" role="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Edit
                </button>
              </div>
            </Link>
          )}
          <div className="image">
            <img src={post.imageUrl} alt="img" />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </>
      )}
    </div>
  );
};

export default PostPage;
