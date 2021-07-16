import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },

}));


export default function TitlebarImageList({ moviesDataList, movieClickHandler }) {
  const classes = useStyles();

  const onMovieClicked = (movieID) => {

    var movieDetail = moviesDataList.filter(function (el) {
      return el.id == movieID;
    });

    movieClickHandler(movieDetail[0]);
  }

  return (
    <div>
      <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={350} gap={32} >
        {moviesDataList.map((item) => (

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


