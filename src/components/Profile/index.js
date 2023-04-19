import Header from "../Header";
import { BsGrid3X3 } from "react-icons/bs";
import { BiCamera } from "react-icons/bi";
import errorConnection from "../../assets/images/errorConnection.svg";
import "./index.css";
import Loader from "../Loader";
import NetworkError from "../NetworkError";

export default function Profile({
  data: profile,
  loader,
  onHandle,
  errorCode
}) {
  return (
    <div className="bg_container">
      <Header />
      <div className="body_screen">
        <div>
          {!loader ? (
            errorCode ? (
              <NetworkError onHandle={onHandle} image={errorConnection} />
            ) : (
              <>
                {/* Profile Info */}
                <div>
                  <h1 className="bio_title bio_mobile">{profile?.userName}</h1>
                  <div className="bio_container">
                    <img src={profile?.profilePic} alt="/pro" />
                    <div>
                      <h1 className="bio_title bio_desk">
                        {profile?.userName}
                      </h1>
                      <div className="bio_stats">
                        <p>
                          <span className="stats_count">
                            {profile?.postsCount}
                          </span>{" "}
                          <br /> posts
                        </p>
                        <p>
                          <span className="stats_count">
                            {profile?.followersCount}
                          </span>{" "}
                          <br /> followers
                        </p>
                        <p>
                          <span className="stats_count">
                            {profile?.followingCount || 0}
                          </span>{" "}
                          <br /> following
                        </p>
                      </div>
                      <p className="bio_id_desk">{profile?.userId}</p>
                      <p className="bio_text_desk">{profile?.userBio}</p>
                    </div>
                  </div>
                  <p className="bio_id_mobile">{profile?.userId}</p>
                  <p className="bio_text_mobile">{profile?.userBio}</p>
                </div>
                {/* Stories */}
                <div className="story_list">
                  {profile?.stories.map((story) => (
                    <div key={story.id} className="stories_item">
                      <img src={story.image} alt="/" />
                    </div>
                  ))}
                </div>
                {/* Posts */}
                <div className="posts_container">
                  <div className="posts_title">
                    <BsGrid3X3 size={20} />
                    <h1>Posts</h1>
                  </div>
                  {profile?.posts.length ? (
                    <div className="posts_grid">
                      {profile?.posts.map((post, index) => (
                        <div key={post.id}>
                          <img src={post.image} alt="/" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no_post">
                      <BiCamera size={24} />
                      <p>No Posts Yet</p>
                    </div>
                  )}
                </div>
              </>
            )
          ) : (
            <Loader
              style={{
                minHeight: "663px",
                alignItems: "center"
              }}
            />
          )}{" "}
        </div>
      </div>
    </div>
  );
}
