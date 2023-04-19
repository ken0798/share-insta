import { useState, useContext, useEffect } from "react";
import Posts from "../../components/Posts";
import { UserCredContext } from "../../context";
import Cookies from "js-cookie";
import { TOKEN, instaPosts, postLike, JWT } from "../../services";
import { useParams } from "react-router-dom";
import alert from "../../assets/images/alert.svg";
import searchNotFound from "../../assets/images/searchNotFound.svg";
import { FaSearch } from "react-icons/fa";
import close from "../../assets/images/close.svg";

import Loader from "../../components/Loader";

import NetworkError from "../../components/NetworkError";
import "./index.css";
import Header from "../../components/Header";

export default function Search() {
  const [postList, setPostList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { errorCode, setErrorCode, loader, setLoader } =
    useContext(UserCredContext);
  const token = Cookies.get(TOKEN);
  const dummyToken = token || JWT;

  useEffect(() => {
    handleInstaPosts();
  }, [searchText]);

  async function handleInstaPosts() {
    setLoader(true);
    try {
      const data = await instaPosts(dummyToken, searchText);
      const { posts, status_code: code } = data;
      if (code) setErrorCode(code);
      setPostList(
        posts?.map((item) => ({
          postId: item.post_id,
          userId: item.user_id,
          userName: item.user_name,
          profilePic: item.profile_pic,
          postDetails: {
            imageUrl: item?.post_details?.image_url,
            caption: item?.post_details?.caption,
          },
          likesCount: item.likes_count,
          comments: item.comments?.map((cm) => ({
            userName: cm.user_name,
            userId: cm.user_id,
            comment: cm.comment,
          })),
          createdAt: item.created_at,
          like: false,
        }))
      );
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }

  async function handleLike(id) {
    setPostList((pre) =>
      pre.map((item) => {
        const { like, likesCount } = item;
        if (item.postId === id) {
          const update = like ? false : true;
          return {
            ...item,
            like: update,
            likesCount: !update ? likesCount + 1 : likesCount - 1,
          };
        }
        return item;
      })
    );
    const like = postList.find((item) => item.postId === id).like;

    await postLike({
      data: {
        like_status: like,
      },
      id,
      token: dummyToken,
    });
  }

  function onSearchText(e) {
    setSearchText(e.target.value);
  }

  return (
    <div className="bg_container">
      <Header />
      <div className="body_screen">
        <div>
          <div className="search_bar">
            <div>
              <div>
                <input
                  value={searchText}
                  onChange={onSearchText}
                  placeholder="Search Caption"
                />
                {searchText && (
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => setSearchText("")}
                    src={close}
                    alt="/"
                  />
                )}
              </div>
              <button
                disabled={!Boolean(searchText)}
                onClick={handleInstaPosts}
                type="button"
                testid="searchIcon"
              >
                <FaSearch size={24} color="#989898" />
              </button>
            </div>
          </div>
          <h1>Search Results</h1>
          <div>
            {!loader ? (
              !errorCode ? (
                <Posts handleLike={handleLike} postList={postList} />
              ) : (
                <NetworkError onHandle={handleInstaPosts} image={alert} />
              )
            ) : (
              <Loader
                style={{
                  minHeight: "663px",
                  alignItems: "center",
                }}
              />
            )}
          </div>

          {postList.length === 0 && (
            <div className="not_found non_search">
              <img src={searchNotFound} alt="/" />
              <h1>Search Not Found</h1>
              <p>Try different keyword or search again</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
