import { useContext, useEffect, useState } from "react";
import { JWT, myProfile, TOKEN } from "../../services";
import { UserCredContext } from "../../context";
import Cookies from "js-cookie";
import Profile from "../../components/Profile";

export default function MyProfile() {
  const { loader, setLoader, errorCode, setErrorCode } = useContext(
    UserCredContext
  );
  const token = Cookies.get(TOKEN);
  const [profile, setProfileInfo] = useState(null);
  const dummyToken = token || JWT;

  useEffect(() => {
    handleMyProfile();
  }, []);

  async function handleMyProfile() {
    try {
      setLoader(true);
      const data = await myProfile(dummyToken);
      const { profile, status_code: code } = data;
      setProfileInfo({
        id: profile.id,
        userId: profile.user_id,
        userName: profile.user_name,
        profilePic: profile.profile_pic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        userBio: profile.user_bio,
        posts: profile.posts,
        postsCount: profile.posts_count,
        stories: profile.stories
      });
      if (code) setErrorCode(code);
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  }

  return (
    <Profile
      onHandle={handleMyProfile}
      errorCode={errorCode}
      loader={loader}
      data={profile}
    />
  );
}
