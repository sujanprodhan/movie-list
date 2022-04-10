import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      activeMovieId: "",
      selectedMovie: {},
      selectRowIndex: "",
      isOpen: false,
    };
    this.myrating = this.myrating.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const getUsername = localStorage.getItem("username");
    if (!getUsername) {
      alert("Sorry! you are not authorized user, Please login first");
      return <Redirect to={{ pathname: "/" }} />;
    } else {
      const getMovieList = JSON.parse(localStorage.getItem("movieList"));

      const paramId = this.props.match.params.id;
      console.log("this.props.match.params.id", paramId);
      console.log(getMovieList);
      const findRow = getMovieList.findIndex((x) => x.id == paramId);
      console.log("findRow", findRow);
      this.setState({
        selectRowIndex: findRow,
        selectedMovie: getMovieList[findRow],
        movies: getMovieList,
        activeMovieId: paramId,
      });
    }
  }
  myrating() {
    this.setState({ isOpen: true });
  }

  onChange(event) {
    const value = event.target.value;
    alert('Your rating is  '+  value);
    let {movies, selectRowIndex} = this.state;
   // movies[selectRowIndex][my_rating] = 
    // movies[selectRowIndex].my_rating ? movies[selectRowIndex][my_rating] + 1 : 1;
    // this.setState({movies: movie, selectedMovie : movies[selectRowIndex]});

  }

  render() {
    let { movies, selectedMovie , isOpen, selectRowIndex} = this.state || [];
    const username = localStorage.getItem("username");

    

    return (
      <div className="wrapper-movie">
        <div className="movie-sort">
          <h5>Movie Details</h5>
          <div className="user">
            {" "}
            <span> </span> {username}{" "}
          </div>
        </div>
        {selectedMovie && (
          <div className="movie-details">
            <div className="video">
              {/* Video is not found */}
              <img
                src={
                  "https://image.tmdb.org/t/p/w200" + selectedMovie.poster_path
                }
              />
            </div>

            <div className="movie-info">
              <div className="movie-name">{selectedMovie.title}</div>
              <div className="movie-details">{selectedMovie.overview}</div>

              <p> Overall ratting</p>
              <div className="movie-name">
                {selectedMovie.vote_average} <hr></hr>
                Vote: {selectedMovie.vote_count}
              </div>

              <p> Your ratting</p>
              <div className="my-rating" onClick={this.myrating}>
              <a href="#">* My Rating </a> 
              {
                  selectedMovie.my_rating ? selectedMovie : ""
              }
                {isOpen && (
                  <div className="rating-box">
                     <h3> Your Rating </h3>
                    <select name="rating"               onChange={this.onChange}
              value={this.state.sortValue}>
                      <option value={1}> * </option>
                      <option value={2}> * * </option>
                      <option value={3}> * * * </option>
                      <option value={4}> * * * *</option>
                      <option value={5}> * * * * * </option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DetailsPage;
