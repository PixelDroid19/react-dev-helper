import axios from "axios";

const createRequestOptions = (
  method = "GET",
  contentType = null,
  body = null,
  token = null
) => {
  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
  };

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  const requestOptions = {
    method,
    headers,
  };

  if (method !== "GET" && body) {
    requestOptions.data = body;
  }

  return requestOptions;
};

export const options = {
  postJSON: (token, body) => {
    return createRequestOptions("POST", "application/json", body, token);
  },
  postFormData: (token, body) => {
    return createRequestOptions("POST", "multipart/form-data", body, token);
  },
  get: (token) => {
    return createRequestOptions("GET", null, null, token);
  },
};

export const executeHTTPRequest = async (endpoint, options) => {
  const res = await axios(endpoint, options);
  return res;
};
