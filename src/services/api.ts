// 🧠 Central API module
import axios from "axios";

const BASE = "/api/auth";

// Include credentials like cookies
const config = {
  withCredentials: true,
};

// ========== AUTH API ==========

export async function autoLogin() {
  const res = await axios.get(`${BASE}/auto_login`, config);
  return res.data;
}

export async function getProfile(token: string) {
  const res = await axios.get(`${BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
    ...config,
  });
  return res.data;
}

export async function refreshToken() {
  const res = await axios.post(`${BASE}/refresh`, {}, config);
  return res.data.access_token;
}

// ========== SYSTEM PANEL API ==========

// Formerly getAtlasSnapshot → MycoCore
export async function getMycoCoreSnapshot() {
  const res = await axios.get("/api/system/mycocore", config); // 🔄 Adjusted endpoint
  return res.data;
}

// Formerly Cortexa
export async function fetchNeuroweaveData() {
  const res = await axios.get("/api/neuroweave", config);
  return res.data;
}

// Formerly Daphne
export async function fetchRootBloomData(type: string, token: string) {
  const res = await axios.get(`/api/${type}`, {
    headers: { Authorization: `Bearer ${token}` },
    ...config,
  });
  return res.data;
}

// ========== ADMIN OPS ==========

export async function verifyAdmin(code: string) {
  const res = await axios.post(`${BASE}/admin_auth`, { code }, config);
  return res.data;
}
