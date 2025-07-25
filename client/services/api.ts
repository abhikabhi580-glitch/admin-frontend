import axios from "axios";

const API_BASE_URL = "https://admin-backend-f9p5.onrender.com";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getSummary: async () => {
    const response = await api.get("/api/dashboard/summary");
    return response.data;
  },
};

// Characters API
export const charactersAPI = {
  getAll: async () => {
    const response = await api.get("/api/characters");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/characters/${id}`);
    return response.data;
  },
  create: async (formData: FormData) => {
    const response = await api.post("/api/characters", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id: string, formData: FormData) => {
    const response = await api.put(`/api/characters/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/characters/${id}`);
    return response.data;
  },
};

// Pets API
export const petsAPI = {
  getAll: async () => {
    const response = await api.get("/api/pets");
    return response.data;
  },
  create: async (formData: FormData) => {
    const response = await api.post("/api/pets", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id: string, formData: FormData) => {
    const response = await api.put(`/api/pets/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/pets/${id}`);
    return response.data;
  },
};

// Vehicles API
export const vehiclesAPI = {
  getAll: async () => {
    const response = await api.get("/api/vehicles");
    return response.data;
  },
  create: async (formData: FormData) => {
    const response = await api.post("/api/vehicles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id: string, formData: FormData) => {
    const response = await api.put(`/api/vehicles/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/vehicles/${id}`);
    return response.data;
  },
};

// Types
export interface Character {
  id: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  description: string;
  ability: string;
  redeemed: number;
  image?: string;
}

export interface Pet {
  id: string;
  name: string;
  sub_title: string;
  description: string;
  ability: string;
  image?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  hp: number;
  acceleration_torque: number;
  speed: number;
  control: number;
  seats: number;
  ideal_use_case: string;
  image?: string;
}

export interface DashboardSummary {
  totalCharacters: number;
  totalPets: number;
  totalVehicles: number;
}
