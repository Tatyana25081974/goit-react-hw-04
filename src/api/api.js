import axios from "axios";
const API_KEY = "8qk-iI2v6Hdcvmn1PtMJNif3Ch2YFLk0ZUgjYcW6rbU";
const BASE_URL = "https://api.unsplash.com";
export const fetchImages = async (query, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/photos`, {
            params: {
                query,
                page,
                per_page: 12,
                client_id: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    };
};