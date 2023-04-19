import { BsHeart } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./index.css";

export default function Posts({ handleLike, postList }) {
  return (
    <div className="post_container">
      {postList?.map((posts) => (
        <div key={posts.postId} className="post_card">
          <div className="user_info">
            <div>
              <img src={posts.profilePic} alt="/post" />
            </div>
            <Link to={`/users/${posts.userId}`}>{posts.userName}</Link>
          </div>
          <img src={posts.postDetails.imageUrl} alt="/" />
          <div className="post_info">
            <div className="share_actions">
              {!posts.like ? (
                <button type="button" testid="likeIcon">
                  <FcLike
                    onClick={handleLike?.bind(null, posts.postId)}
                    size={20}
                  />
                </button>
              ) : (
                <button type="button" testid="unLikeIcon">
                  <BsHeart
                    onClick={handleLike?.bind(null, posts.postId)}
                    size={18}
                  />
                </button>
              )}
              <FaRegComment size={18} />
              <BiShareAlt size={18} />
            </div>
            <p className="like_post">{posts.likesCount} likes</p>
            <p className="post_caption">{posts.postDetails.caption}</p>
            {posts.comments.map((item) => (
              <div className="comments_list" key={item.userId}>
                <p className="comment_user">{item.userName}</p>
                <p>{item.comment}</p>
              </div>
            ))}
            <p className="post_added">{posts.createdAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
