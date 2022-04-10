import axios from 'axios';
import { FETCH_POSTS, NEW_POST } from './types';
axios.defaults.baseURL = 'http://api.themoviedb.org';
axios.defaults.headers.common['Authorization'] = '12345678';
axios.defaults.headers.post['Content-Type'] = 'application/json';
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const  fetchMovies = () => {
  return (dispatch) => {
    return axios.get("/3/list/1?api_key=ee3f9462b1eccd01a2d74243b3f7329c")
      .then(({ data }) => {
        localStorage.setItem("movieList", JSON.stringify(data.items));
       dispatch({ type: FETCH_POSTS,posts:data.items})       
       return data.items;
    });
  };
}


export const  createPost = (postData) => {
  return (dispatch) => {
    return axios.post("/posts", postData)
      .then(({ data }) => {
        dispatch({ type: NEW_POST,item:data})
        return data;
    });
  };
}
