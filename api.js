import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const client = axios.create({
  baseURL: API,
  timeout: 15000,
});

export async function fetchEpisodes(limit = 6) {
  const { data } = await client.get(`/episodes`, { params: { limit } });
  return data;
}

export async function subscribeNewsletter({ email, first_name }) {
  const { data } = await client.post(`/newsletter/subscribe`, {
    email,
    first_name: first_name || null,
  });
  return data;
}
