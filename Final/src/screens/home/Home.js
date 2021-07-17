import React, { Component, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import Header from "../../common/header/Header";
import './Home.css';
import SingleLineImageList from './SingleLineImageList';
import TitlebarImageList from './TitlebarImageList';
import Card from './OutlinedCard';


export default function Home({ moviesDataList, detailsPageHandler }) {


    const [artistsDataList, setArtistsDataList] = useState([]);
    const [genresDataList, setGenresDataList] = useState([]);

    async function loadGenresAndArtistsData() {

        const rawResponseGenres = await fetch("http://localhost:8085/api/v1/genres");
        const rawResponseArtists = await fetch("http://localhost:8085/api/v1/artists?page=1&limit=30");
        const genresData = await rawResponseGenres.json();
        const artistsData = await rawResponseArtists.json();
        setGenresDataList(genresData.genres);
        setArtistsDataList(artistsData.artists);

    }

    useEffect(() => {
        loadGenresAndArtistsData();
    }, [])

    var publishedMoviesDataList = moviesDataList.filter(function (el) {
        return el.status == "PUBLISHED";
    });
    var releasedMoviesDataList = moviesDataList.filter(function (el) {
        return el.status == "RELEASED";
    });

    async function movieClickHandler(movieDetail) {
        detailsPageHandler(movieDetail);
    }

    return (
        <Fragment>

            <Header fromDetails={false} />
            <div className="upcomingMoviesBar">
                Upcoming Movies
            </div>
            <div>
                <SingleLineImageList moviesDataList={publishedMoviesDataList} />
            </div>

            <div className="flex-container">
                <div className="flex-child magenta">
                    <TitlebarImageList moviesDataList={releasedMoviesDataList} movieClickHandler={(movieDetail) => movieClickHandler(movieDetail)} />
                </div>
                <div className="flex-child green">
                    <div className="filtersCardDiv">
                        <Card genresData={genresDataList} artistsData={artistsDataList}/>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}