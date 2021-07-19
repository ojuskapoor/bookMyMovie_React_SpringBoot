import React, { useEffect, useState } from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Link } from 'react-router-dom';


export default function TitlebarImageList({ moviesDataList, movieClickHandler, selectedFilters }) {

  const [filteredReleasedMoviesDataList, setFilteredReleasedMoviesDataList] = useState([]);


  const onMovieClicked = (movieID) => {

    var movieDetail = moviesDataList.filter(function (el) {
      return el.id === movieID;
    });

    movieClickHandler(movieDetail[0]);
  }

  function prepareFilteredMoviesData() {

    //Method to filter the Released Movies

    var numberOfFilters = 0;

    if (selectedFilters) {
      if (selectedFilters.moviename || selectedFilters.genres.length > 0 || selectedFilters.artists.length > 0 || selectedFilters.enddate || selectedFilters.startdate) {
        numberOfFilters = 1;
      }
    }

    var tempArray = [];

    for (let i = 0; i < moviesDataList.length; i++) {
      const getallData = {
        id: moviesDataList[i].id,
        title: moviesDataList[i].title,
        storyline: moviesDataList[i].storyline,
        duration: moviesDataList[i].duration,
        poster_url: moviesDataList[i].poster_url,
        trailer_url: moviesDataList[i].trailer_url,
        wiki_url: moviesDataList[i].wiki_url,
        release_date: moviesDataList[i].release_date,
        censor_board_rating: moviesDataList[i].censor_board_rating,
        rating: moviesDataList[i].rating,
        status: moviesDataList[i].status,
        genres: moviesDataList[i].genres,
        artists: moviesDataList[i].artists
      }
      tempArray.push(getallData);

    }

    if (numberOfFilters > 0) {
      //implies filters have been applied and we need to filter out the temp array

      //based on name
      if (selectedFilters.moviename) {
        tempArray = tempArray.filter(function (item) {
          return item.title.toUpperCase() === selectedFilters.moviename.toUpperCase();
        });
      }

      //based on genres
      if (selectedFilters.genres.length > 0) {

        tempArray = tempArray.filter(function (item) {

          for (var i = 0; i < selectedFilters.genres.length; i++) {
            if (item.genres.includes(selectedFilters.genres[i])) {
              return true;
            }
          }
          return false;
        });

      }

      //based on artists
      if (selectedFilters.artists.length > 0) {

        tempArray = tempArray.filter(function (item) {

          for (var i = 0; i < selectedFilters.artists.length; i++) {

            for (var j = 0; j < item.artists.length; j++) {
              if (item.artists[j].first_name === selectedFilters.artists[i]) {
                return true;
              }
            }
          }
          return false;
        });
      }

      //based on start date
      if (selectedFilters.startdate) {
        tempArray = tempArray.filter(function (item) {
          var d1 = new Date(item.release_date);
          var d2 = new Date(selectedFilters.startdate);
          return d1 >= d2;
        });
      }


      //based on end date
      if (selectedFilters.enddate) {
        tempArray = tempArray.filter(function (item) {
          var d1 = new Date(item.release_date);
          var d2 = new Date(selectedFilters.enddate);
          return d1 <= d2;
        });
      }

    }

    setFilteredReleasedMoviesDataList(tempArray);

  }


  useEffect(() => {
    prepareFilteredMoviesData();

  }, [moviesDataList])


  return (
    <div>
      <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={350} gap={32} >
        {filteredReleasedMoviesDataList.map((item) => (

          <ImageListItem key={item.poster_url} >

            <Link to="/details" onClick={() => onMovieClicked(item.id)}>
              <img
                srcSet={`${item.poster_url}?w=248&fit=crop&auto=format 1x,
                    ${item.poster_url}?w=248&fit=crop&auto=format&dpr=2 1x`}
                alt={item.title}
                loading="lazy"
              />
            </Link>

            <ImageListItemBar
              title={item.title}
              subtitle={<span>Release Date: {new Date(item.release_date).toDateString()}</span>}
            />
          </ImageListItem>

        ))}
      </ImageList>
    </div>
  );
}


