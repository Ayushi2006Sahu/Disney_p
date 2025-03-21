import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key =  'dcb3f2a7cf1304940df56ca9a8f2c67e';
const getTrendingVideos = () => {
    return axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`);
};
const getMovieByGenreId = (id) => {
    return axios.get(`${movieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}`);
};
    export default {
        getTrendingVideos,
        getMovieByGenreId
    }