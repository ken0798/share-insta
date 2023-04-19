import { useState, useContext, useEffect } from "react";
import Posts from "../../components/Posts";
import { UserCredContext } from "../../context";
import Cookies from "js-cookie";
import { TOKEN, instaPosts, postLike, JWT } from "../../services";
import alert from "/src/assets/images/alert.svg";
import searchNotFound from "/src/assets/images/searchNotFound.svg";

import Loader from "../../components/Loader";

import NetworkError from "../../components/NetworkError";
import "./index.css";

export default function Search({ searchText, viewSearch }) {
  const [postList, setPostList] = useState([]);
  const { errorCode, setErrorCode, loader, setLoader } = useContext(
    UserCredContext
  );
  const token = Cookies.get(TOKEN);
  const dummyToken = token || JWT;

  useEffect(() => {
    if (searchText?.length > 0) handleInstaPosts();
    else viewSearch(false);
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
            caption: item?.post_details?.caption
          },
          likesCount: item.likes_count,
          comments: item.comments?.map((cm) => ({
            userName: cm.user_name,
            userId: cm.user_id,
            comment: cm.comment
          })),
          createdAt: item.created_at,
          like: false
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
            likesCount: !update ? likesCount + 1 : likesCount - 1
          };
        }
        return item;
      })
    );
    const like = postList.find((item) => item.postId === id).like;

    await postLike({
      data: {
        like_status: like
      },
      id,
      token: dummyToken
    });
  }

  return (
    <div className="modal">
      <div className="body_screen">
        <div>
          <>
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
                    alignItems: "center"
                  }}
                />
              )}
            </div>
          </>
          <div className="not_found">
            <img src={searchNotFound} alt="/" />
            <h1>Search Not Found</h1>
            <p>Try different keyword or search again</p>
          </div>
        </div>
      </div>
    </div>
  );
}
