import React, { Component, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';

import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 240,
    maxWidth: 300,
    float: 'right'
  },
  title: {
    fontSize: 14,
    color: theme.palette.primary.light,
  },
  formControl: {
    paddingRight: '90px'
  }
}));

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function OutlinedCard({ genresData, artistsData, filterApplyHandler }) {
  const classes = useStyles();

  const [selectedStartDate, setSelectedStartDate] = React.useState(null);

  const [selectedEndDate, setSelectedEndDate] = React.useState(null);

  const [genreName, setGenreName] = React.useState([]);

  const [artistName, setArtistName] = React.useState([]);

  const [movieName, setMovieName] = useState({
    id: 0,
    moviename: '',
  });

  const onFilterFormSubmitted = (e) => {
    e.preventDefault();

    var moviename = null;
    if (movieName.moviename) {
      moviename = movieName.moviename;
    }

    //Get everything from the state and prepare filter object
    var filter = {
      moviename: moviename,
      genres: genreName,
      artists: artistName,
      startdate: selectedStartDate,
      enddate: selectedEndDate
    }

    filterApplyHandler(filter);
  }

  const handleChangeGenre = (event) => {
    setGenreName(event.target.value);
  };

  const handleChangeArtist = (event) => {
    setArtistName(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const inputChangedHandler = (e) => {
    const state = movieName;
    state[e.target.name] = e.target.value;
    setMovieName({ ...state })
  }


  const { moviename } = movieName;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          FIND MOVIES BY:
        </Typography>
        <ValidatorForm onSubmit={onFilterFormSubmitted}>
          <TextValidator
            id="moviename"
            label="Movie Name"
            type="text"
            name="moviename"
            onChange={inputChangedHandler}
            value={moviename}
            style={{ width: '240px' }}
          >
          </TextValidator>
          <FormControl >
            <InputLabel id="demo-mutiple-checkbox-label">Genres</InputLabel>
            <Select
              labelId="genres"
              id="genres"
              multiple
              value={genreName}
              onChange={handleChangeGenre}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              style={{ width: '240px' }}
            >
              {genresData.map((item) => (
                <MenuItem key={item.genre} value={item.genre}>
                  <Checkbox checked={genreName.indexOf(item.genre) > -1} />
                  <ListItemText primary={item.genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label" className={classes.formControl}>Artists</InputLabel>
            <Select
              labelId="artists"
              id="artists"
              multiple
              value={artistName}
              onChange={handleChangeArtist}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              style={{ width: '240px' }}
            >
              {artistsData.map((item) => (
                <MenuItem key={item.first_name} value={item.first_name}>
                  <Checkbox checked={artistName.indexOf(item.first_name) > -1} />
                  <ListItemText primary={item.first_name + " " + item.last_name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd-mm-yyyy"
              emptyLabel="dd-mm-yyyy"
              margin="normal"
              id="releasedatestart"
              label="Release Date Start"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={{ width: '240px' }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd-mm-yyyy"
              emptyLabel="dd-mm-yyyy"
              margin="normal"
              id="releasedateend"
              label="Release Date End"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              style={{ width: '240px' }}
            />
          </MuiPickersUtilsProvider>
          <br /><br />
          <Button type="submit" variant="contained" color="primary" style={{ width: '240px' }}>APPLY</Button>
        </ValidatorForm>
      </CardContent>
    </Card>
  );
}
