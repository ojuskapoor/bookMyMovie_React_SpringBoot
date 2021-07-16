import React, { Component, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import Header from "../../common/header/Header";
import './Home.css';
import SingleLineImageList from './SingleLineImageList';
import TitlebarImageList from './TitlebarImageList';

export default function Home({ moviesDataList, detailsPageHandler }) {

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

            <Header fromDetails={false}/>
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
                    Flex Column 2
                </div>
            </div>

        </Fragment>
    )
}