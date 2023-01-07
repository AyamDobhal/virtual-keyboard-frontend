export default class BaseService {
  constructor(axios, endpoint, config) {
    this.$axios = axios;
    this.$config = config;
    this.endpoint = `${config.API_URL}/${endpoint}`;
    this.query = "";
  }

  clearQuery() {
    this.query = "";
  }

  equals(key, val) {
    // append key and value to query string
    this.query += `${key}=${val}&`;
  }

  async getAll(session_token = null) {
    const headers = {};
    return await this.$axios.$get(`${this.endpoint}?${this.query}`, {
      headers,
    });
  }

  async create(item, session_token) {
    try {
      const headers = {};
      if (session_token) {
        headers["Authorization"] = `Bearer ${session_token}`;
      }
      return await this.$axios.$post(this.endpoint, item, { headers });
    } catch (error) {
      throw error;
    }
  }

  async getById(id, session_token) {
    const headers = {};
    if (session_token) {
      headers["Authorization"] = `Bearer ${session_token}`;
    }
    return await this.$axios.$get(`${this.endpoint}/${id}`, { headers });
  }

  async update(id, item, session_token) {
    const headers = {};
    if (session_token) {
      headers["Authorization"] = `Bearer ${session_token}`;
    }
    return await this.$axios.$patch(`${this.endpoint}/${id}`, item, {
      headers,
    });
  }

  async delete(id, session_token) {
    const headers = {};
    if (session_token) {
      headers["Authorization"] = `Bearer ${session_token}`;
    }
    return await this.$axios.$delete(`${this.endpoint}/${id}`, { headers });
  }
}
