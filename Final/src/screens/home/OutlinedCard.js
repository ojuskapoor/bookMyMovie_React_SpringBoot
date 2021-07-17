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
  },
  title: {
    fontSize: 14,
    color: theme.palette.primary.light,
  },
  formControl: {
    paddingRight: '90px'
  }
}));


const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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


export default function OutlinedCard({genresData, artistsData}) {
  const classes = useStyles();

  const [selectedStartDate, setSelectedStartDate] = React.useState(null);

  const [selectedEndDate, setSelectedEndDate] = React.useState(null);

  const [genreName, setGenreName] = React.useState([]);

  const [artistName, setArtistName] = React.useState([]);

  const handleChangeGenre = (event) => {
    setGenreName(event.target.value);
    console.log(genreName);
  };

  const handleChangeArtist = (event) => {
    setArtistName(event.target.value);
    console.log(artistName);
    console.log(genreName);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          FIND MOVIES BY:
        </Typography>
        <ValidatorForm className="subscriber-form" >
          <TextValidator
            id="moviename"
            label="Movie Name"
            type="text"
            name="moviename"
          // onChange={inputChangedHandler}
          // value={username}
          >
          </TextValidator>
          <br />
          <div style={{ paddingRight: '100px' }}>
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
              >
                {genresData.map((item) => (
                  <MenuItem key={item.genre} value={item.genre}>
                    <Checkbox checked={genreName.indexOf(item.genre) > -1} />
                    <ListItemText primary={item.genre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

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
            />
          </MuiPickersUtilsProvider>

          <br /><br />
          <Button type="submit" variant="contained" color="primary">APPLY</Button>
        </ValidatorForm>
      </CardContent>
    </Card>
  );
}
