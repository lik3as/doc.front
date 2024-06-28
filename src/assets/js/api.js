const defaultHeaders = [
  ["Content-Type", "application/json; charset=utf-8"],
]

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location = "/pages/login-v3.html";
  }
  return token;
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

export const signUp = async ({
  email,
  fullname,
  password,
  username,
  activated
}) => {
  const res = await fetch("@@API_URL/users/create", {
    body: JSON.stringify({
      email: email,
      fullname: fullname,
      password: password,
      username: username,
      activated: activated
    }),
    method: "POST",
    headers: [
      ...defaultHeaders
    ]
  });
 
  return res;
}

export async function findCustomer(cpf) {
  const res = await fetch("@@API_URL/customers/find", {
    body: JSON.stringify({
      cpf: cpf,
    }),
    credentials: "include",
    method: "POST",
    headers: [
      ["Content-Type", "application/json; charset=utf-8"],
      ["Authorization", `Bearer ${getToken()}`]
    ]
  });
  const data = await res.json();
  return data;
}

export async function fetchFiles() {
  const res = await fetch(`@@API_URL/files?lim=3&id=${0}`, {
    headers: [
      ["Authorization", `Bearer ${getToken()}`]
    ]
  });

  if (res.status == 401) {
    return null;
  }

  return await res.json();
}
