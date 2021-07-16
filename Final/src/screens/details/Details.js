import React, { Component, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import Header from "../../common/header/Header";
import './Details.css';
import { Link,useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArtistsTitlebarImageList from './ArtistsTitlebarImageList';

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
      marginLeft: '24px',
      marginTop: '8px',
      marginBottom: '0px',
      height: '24px'
    },
  });

export default function Details({movieDetailJSON}) {
    const classes = useStyles();

    const youtubePlayerStyle = {
        width: '100%',
    };

    var videoID = movieDetailJSON.trailer_url.split('v=')[1]

    var genres = "";
    for (var i = 0 ; i < movieDetailJSON.genres.length; i++) {
        genres = genres + movieDetailJSON.genres[i] + ", ";
    }
    genres = genres.substring(0, genres.length - 2);

    var releaseDate = new Date(movieDetailJSON.release_date);

    var aristsDataList = movieDetailJSON.artists;

    return (
        <Fragment>

            <Header fromDetails={true}/>

            <Link to="/" style={{ textDecoration: 'none', color : 'black' }} >
                <Typography variant="body1" display="block" gutterBottom className={classes.root}>
                    &#60; Back to Home
                </Typography>
            </Link>

            <div className="flex-containerDetail">
                <div className="flex-child-detail child1">
                    <img src={movieDetailJSON.poster_url} className="child1Img"/>
                </div>
                <div className="flex-child-detail child2">

                    <Typography variant="h4" gutterBottom>
                        {movieDetailJSON.title}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        <b>Genre:</b> {genres}
                        <br/>
                        <b>Duration:</b> {movieDetailJSON.duration}
                        <br/>
                        <b>Release Date:</b> {releaseDate.toDateString()}
                        <br/>
                        <b>Rating:</b> {movieDetailJSON.rating}
                        <br/><br/>
                        <b>Plot:</b> (<a href={movieDetailJSON.wiki_url} target="_blank">Wiki Link</a>) {movieDetailJSON.storyline}
                        <br/><br/>
                        <b>Trailer:</b>
                    </Typography>

                    <YouTube videoId={videoID} opts={youtubePlayerStyle}/>

                </div>
                <div className="flex-child-detail child3">
                    <Typography variant="body2" gutterBottom>
                        <b>Rate this movie:</b> 
                        <br/>
                        <Rating
                            defaultValue={0}
                            precision={1}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        <b>Artists:</b>
                        <br/>
                        <br/>
                        <ArtistsTitlebarImageList aristsDataList={aristsDataList} className="artistImageComponent"/>
                    </Typography>
                </div>
            </div>

        </Fragment>
    )
}