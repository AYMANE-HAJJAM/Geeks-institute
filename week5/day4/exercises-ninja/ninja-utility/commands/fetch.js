import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
