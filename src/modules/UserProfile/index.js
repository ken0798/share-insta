import Profile from "../../components/Profile";
import { useContext, useEffect, useState } from "react";
import { UserCredContext } from "../../context";
import { useParams } from "react-router-dom";
import { JWT, TOKEN, usersProfile } from "../../services";
import Cookies from "js-cookie";

export default function UserProfile() {
  const { id } = useParams();
  const { loader, setLoader, setErrorCode, errorCode } = useContext(
    UserCredContext
  );
  const [userProfile, setUserProfileInfo] = useState(null);
  const token = Cookies.get(TOKEN);
  const dummyToken = token || JWT;

  useEffect(() => {
    handleUserProfile();
  }, []);

  async function handleUserProfile() {
    setLoader(true);
    try {
      const data = await usersProfile({ token: dummyToken, id });
      const { user_details: userData, status_code: code } = data;
      setUserProfileInfo({
        id: userData.id,
        userId: userData.user_id,
        userName: userData.user_name,
        profilePic: userData.profile_pic,
        followersCount: userData.followers_count,
        followingCount: userData.following_count,
        userBio: userData.user_bio,
        posts: userData.posts,
        postsCount: userData.posts_count,
        stories: userData.stories
      });
      if (code) setErrorCode(code);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }
  return (
    <>
      <Profile
        errorCode={errorCode}
        onHandle={handleUserProfile}
        loader={loader}
        data={userProfile}
      />
    </>
  );
}
