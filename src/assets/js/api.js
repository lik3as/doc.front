const defaultHeaders = [
  ["Content-Type", "application/json; charset=utf-8"],
]

const getToken = () => {
  return localStorage.getItem("token");
}

const getUserByEmail = async (email) => {
  const res = await fetch("@@API_URL/users", {
    body: JSON.stringify({
      user: email,
      method: "email"
    }),
    headers: [
      ...defaultHeaders,
      ["Authorization", "Bearer " + getToken()]
    ],
    method: "POST"
  });

  const body = res.json();
  return body;
}

const getCurrentUser = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("Missing token in getAuthenticatedUser");
  }

  const res = await fetch("@@API_URL/users/me", {
    body: JSON.stringify({

    }),
    method: "POST",
    headers: [
      ...defaultHeaders <
      ["Authentication", "Bearer " + token]
    ]
  });

  if (res.status === 401) {
    throw new Error("Invalid token in getAuthenticatedUser");
  }

  const body = await res.json();
  return body;
}

export const getUser = async (email = undefined) => {
  if (!email) {
    return await getCurrentUser();
  }

  return await getUserByEmail(email);
}

export const createUser = async ({
  email,
  fullname,
  password,
  username,
}) => {
  const res = await fetch("@@API_URL/users/create", {
    body: JSON.stringify({
      email: email,
      fullname: fullname,
      password: password,
      username: username,
      activated: true
    }),
    method: "POST"
  });

}

export const auth = async (email, password) => {
  const res = await fetch("@@API_URL/auth/login", {
    body: JSON.stringify({
      user: email,
      password: password,
      method: "email"
    }),
    method: "POST",
    headers: [
      ...defaultHeaders
    ]
  })

  return res;
}
