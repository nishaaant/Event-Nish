import axios from "axios";

const API_URL ="https://event-nish.vercel.app/api";

export const register = (userData) =>
	axios.post(`${API_URL}/auth/register`, userData);
export const login = (userData) =>
	axios.post(`${API_URL}/auth/login`, userData);
export const fetchEvents = () => axios.get(`${API_URL}/events`);
export const createEvent = (eventData, token) =>
	axios.post(`${API_URL}/events`, eventData, {
		headers: { Authorization: token },
	});
