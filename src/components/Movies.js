import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMovies } from "../actions/postActions";
import { Route, Redirect } from "react-router-dom";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      sortValue: "",
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const getUsername = localStorage.getItem("username");
    if (!getUsername) {
      alert("Sorry! you are not authorized user, Please login first");
      return <Redirect to={{ pathname: "/" }} />;
    } else {
      const getMovieList = JSON.parse(localStorage.getItem("movieList"));
      console.log("getMovieList", getMovieList);
      if (!getMovieList) {
        this.props.fetchMovies().then((data) => {
          this.setState({ movies: data });
        });
      } else {
        this.setState({ movies: getMovieList });
      }
    }
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({ sortValue: value });
    console.log(event.target.value);
    const { movies } = this.state;
    if (value === "name") {
      const newMovieList = movies.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
      this.setState({ movies: [...newMovieList] });
    } else if (value === "rating") {
      const newMovieList = movies.sort(function (a, b) {
        return b.vote_average - a.vote_average;
      });
      this.setState({ movies: [...newMovieList] });
    } else if (value === "popularity") {
      const newMovieList = movies.sort(function (a, b) {
        return b.popularity - a.popularity;
      });
      this.setState({ movies: [...newMovieList] });
    }
  }

  render() {
    let { movies } = this.state || [];
    const username = localStorage.getItem("username");
    const movieItems =
      movies &&
      movies.map((movie) => (
        <div key={movie.id} className="movie-item">
          <a href={`/details/${movie.id}`}>
            <div className="movie-image">
              <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path} />
            </div>
            </a>
            <div className="movie-name">{movie.title}</div>
            <div className="movie-rating"> * {movie.vote_average}</div>
         
        </div>
      ));

    return (
      <div className="wrapper-movie">
        <div className="movie-sort">
          <h5>Movie List</h5>
          <div className="user">
            {" "}
            <span> </span> {username}{" "}
          </div>
          <div className="sort-option">
            Sort By
            <select
              name="sort"
              onChange={this.onChange}
              value={this.state.sortValue}
            >
              <option value="">Select </option>
              <option value="name">Sort By Name</option>
              <option value="rating">Sort By Rating</option>
              <option value="popularity">Sort By Popularity</option>
            </select>
          </div>
        </div>
        <div className="movie-list">{movieItems}</div>
      </div>
    );
  }
}

Movies.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.lists,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: () => dispatch(fetchMovies()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Movies);
