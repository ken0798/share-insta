export const JWT = process.env.TOKEN;
const BaseUrl = "https://apis.ccbp.in";
const TYPE = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE"
};

export const TOKEN = "JWT_TOKEN";

const options = (type, headers, data) => {
  return {
    method: type,
    ...headers,
    body: JSON.stringify(data)
  };
};

export async function loginUser(data) {
  const url = BaseUrl + "/login";
  const response = await fetch(url, options(TYPE.POST, null, data));
  const result = await response.json();
  return result;
}

export async function userStories(token) {
  const url = BaseUrl + "/insta-share/stories";
  const response = await fetch(
    url,
    options(TYPE.GET, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  );
  const result = await response.json();
  return result;
}

export async function instaPosts(token, query) {
  const url = BaseUrl + `/insta-share/posts${query ? `?search=${query}` : ""}`;
  const response = await fetch(
    url,
    options(TYPE.GET, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  );
  const result = await response.json();
  return result;
}

export async function postLike({ data, id, token }) {
  const url = BaseUrl + `/insta-share/posts/${id}/like`;
  const response = await fetch(
    url,
    options(
      TYPE.POST,
      {
        headers: {
          Authorization: "Bearer " + token
        }
      },
      data
    )
  );
  const result = await response.json();
  return result;
}

export async function myProfile(token) {
  const url = BaseUrl + "/insta-share/my-profile";
  const response = await fetch(
    url,
    options(TYPE.GET, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  );
  const result = await response.json();
  return result;
}

export async function usersProfile({ token, id: userId }) {
  const url = BaseUrl + `/insta-share/users/${userId}`;
  const response = await fetch(
    url,
    options(TYPE.GET, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
  );
  const result = await response.json();
  return result;
}
