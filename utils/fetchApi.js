import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
    const { data } = await axios.get(url, {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '8c35f6dbb4msh30ae6bb02c7a835p1f8ee2jsnaec07e69d330'
        },
    });

    return data;
};
