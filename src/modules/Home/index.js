import { useState, useEffect, useContext, useRef } from "react";
import Header from "../../components/Header";
import { UserCredContext } from "../../context";
import { instaPosts, JWT, postLike, TOKEN, userStories } from "../../services";
import Slider from "react-slick";
import { LeftArrow, RightArrow, CarouselItem } from "../../components/Carousel";
import Loader from "../../components/Loader";
import Cookies from "js-cookie";
import alert from "../../assets/images/alert.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import Posts from "../../components/Posts";
import NetworkError from "../../components/NetworkError";

function Home() {
  const slickRef = useRef(null);
  const { loader, setLoader, errorCode, setErrorCode } = useContext(
    UserCredContext
  );
  const [userStoriesList, setUserStoriesList] = useState([]);
  const [postList, setPostList] = useState([]);
  const token = Cookies.get(TOKEN);
  const dummyToken = token || JWT;

  useEffect(() => {
    (async function () {
      setLoader(true);
      try {
        const data = await userStories(dummyToken);
        setLoader(false);
        const { users_stories } = data;
        setUserStoriesList(
          users_stories?.map((item) => {
            return {
              url: item.story_url,
              userId: item.user_id,
              userName: item.user_name
            };
          })
        );
      } catch (error) {
        setLoader(false);
      }
    })();
    handleInstaPosts();
  }, [dummyToken]);

  async function handleInstaPosts() {
    setLoader(true);
    try {
      const data = await instaPosts(dummyToken);
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoPlay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <RightArrow ref={slickRef.current} />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="bg_container">
      <Header />
      <div className="body_screen">
        <div>
          {/* Carousel */}
          {!loader ? (
            userStoriesList.length ? (
              <Slider ref={slickRef} {...settings}>
                {userStoriesList?.map((item) => (
                  <CarouselItem item={item} />
                ))}
              </Slider>
            ) : (
              <p>NotFound</p>
            )
          ) : (
            <Loader />
          )}
          {/* Posts */}
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
      </div>
    </div>
  );
}

export default Home;
