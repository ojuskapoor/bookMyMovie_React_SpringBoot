import React, { Component, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './home/Home';
import Details from './details/Details';

export default function Controller() {

    const [moviesDataList, setMoviesDataList] = useState([]);

    async function loadMoviesData() {

        const rawResponse = await fetch("http://localhost:8085/api/v1/movies?page=1&limit=20");
        const data = await rawResponse.json();
        const moviesArray = data.movies;
        setMoviesDataList(moviesArray);

    }

    useEffect(() => {
        loadMoviesData();
    }, [])

    var movieDetailJSON;
    async function detailsPageHandler(movieDetail) {
        movieDetailJSON = movieDetail;
    }

    return (
        <Fragment>
            <Router>
                <div>
                    <Route exact path="/" render={(props) => <Home {...props} moviesDataList={moviesDataList} detailsPageHandler={(movieDetail) => detailsPageHandler(movieDetail)} />} />
                    <Route exact path="/details" render={(props) => <Details {...props} movieDetailJSON={movieDetailJSON} />} />
                </div>
            </Router>
        </Fragment>
    )
}