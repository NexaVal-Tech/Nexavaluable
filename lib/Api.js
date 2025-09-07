// lib/api.js - Simplified version
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.nexavaluable.com/api";

// Generic api request method
async function apiRequest(method, endpoint, data = null) {
  const token = typeof window !== 'undefined' 
    ? (localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken"))
    : null;
    
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, options);
    const contentType = res.headers.get("content-type") || "";
    let payload;
    
    if (contentType.includes("application/json")) {
      try {
        payload = await res.json();
        console.log(payload); // Debug log
      } catch {
        payload = { error: "Invalid JSON", raw: await res.text() };
        console.log(payload); // Debug log
      }
    } else {
      payload = { html: await res.text() };
      console.log(payload); // Debug log
    }
    
    return {
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      data: payload,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      statusText: "Network Error",
      data: { error: err.message },
    };
  }
}

// Helper methods for convenience
export const apiGet = (endpoint) => apiRequest("GET", endpoint);
export const apiPost = (endpoint, data) => apiRequest("POST", endpoint, data);
export const apiPatch = (endpoint, data) => apiRequest("PATCH", endpoint, data);
export const apiPut = (endpoint, data) => apiRequest("PUT", endpoint, data);
export const apiDelete = (endpoint) => apiRequest("DELETE", endpoint);

// Simplified API functions that maintain the same interface
export const adminAuth = {
  login: async (credentials) => {
    const response = await apiPost("v1/admin/login", credentials);
    if (!response.ok) {
      throw new Error(response.data.message || `HTTP error! status: ${response.status}`);
    }
    return response.data;
  },

  verify: async () => {
    const response = await apiGet("v1/admin/verify");
    if (!response.ok) {
      throw new Error(response.data.message || "Token verification failed");
    }
    return response.data;
  },

  logout: async () => {
    const response = await apiPost("v1/admin/logout");
    return response.ok;
  }
};

export const sessions = {
  book: async (sessionData) => {
    const response = await apiPost("v1/session/book", sessionData);
    if (!response.ok) {
      throw new Error(response.data.message || "Failed to book session");
    }
    return response.data;
  },

  getAll: async () => {
    const response = await apiGet("v1/admin/sessions");
    if (!response.ok) {
      throw new Error(response.data.message || "Failed to fetch sessions");
    }
    return response.data;
  },

  getById: async (id) => {
    const response = await apiGet(`v1/admin/sessions/${id}`);
    if (!response.ok) {
      throw new Error(response.data.message || "Failed to fetch session");
    }
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await apiPut(`v1/admin/sessions/${id}`, { status });
    if (!response.ok) {
      throw new Error(response.data.message || "Failed to update session");
    }
    return response.data;
  },

  delete: async (id) => {
    const response = await apiDelete(`v1/admin/sessions/${id}`);
    if (!response.ok) {
      throw new Error(response.data.message || "Failed to delete session");
    }
    return response.data;
  }
};

export const emails = {
  send: async (emailData) => {
    const response = await apiPost("v1/admin/emails/send", emailData);
    if (!response.ok) {
      throw new Error(response.data.message || "Failed to send email");
    }
    return response.data;
  },

  saveDraft: async (emailData) => {
    const response = await apiPost("v1/admin/emails/save-draft", emailData);
    if (!response.ok) {
      throw new Error(response.data.message || "Failed to save draft");
    }
    return response.data;
  },

  getHistory: async () => {
    const response = await apiGet("v1/admin/emails/history");
    if (!response.ok) {
      throw new Error(response.data.message || "Failed to get email history");
    }
    return response.data;
  }
};

export const users = {
  getAll: async () => {
    const response = await apiGet("v1/admin/users");
    if (!response.ok) {
      throw new Error(response.data.message || "Failed to get users");
    }
    return response.data;
  }
};

// Backward compatibility exports
export const api = {
  // Admin auth
  adminLogin: adminAuth.login,
  adminVerify: adminAuth.verify,
  adminLogout: adminAuth.logout,
  
  // Sessions
  bookSession: sessions.book,
  getAdminSessions: sessions.getAll,
  getSession: sessions.getById,
  updateSession: sessions.updateStatus,
  deleteSession: sessions.delete,

  // Emails
  sendEmail: emails.send,
  saveDraft: emails.saveDraft,
  getEmailHistory: emails.getHistory,

  // Users
  getUsers: users.getAll,
};