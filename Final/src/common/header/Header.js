import React, { Component, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import mainLogo from '../../assets/logo.svg';
import { Button } from '@material-ui/core';
import BookShow from '../../screens/bookshow/BookShow';
import './Header.css';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';




function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



export default function Header({ fromDetails }) {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);

    const [openLoginSuccess, setOpenLoginSuccess] = React.useState(false);

    const [openLoginFailure, setOpenLoginFailure] = React.useState(false);

    const [openRegisterSuccess, setOpenRegisterSuccess] = React.useState(false);

    const [openRegisterFailure, setOpenRegisterFailure] = React.useState(false);

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const [value, setValue] = React.useState(0);

    const loginButtonText = "Login";

    const [open, setOpen] = React.useState(false);

    async function callLoginAPI(userLoginForm) {
        try {
            var auth = "Basic " + window.btoa(userLoginForm.username + ":" + userLoginForm.password);
            const rawResponse = await fetch("http://localhost:8085/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json;charset=UTF-8",
                        "Authorization": auth,
                        "Cache-Control": "no-cache"
                    }
                }
            );

            const data = await rawResponse.json();

            if (rawResponse.ok) {
                window.sessionStorage.setItem('user_details', JSON.stringify(data));
                window.sessionStorage.setItem('access_token', rawResponse.headers.get('access-token'));
                setOpenLoginFailure(false);
                setOpenLoginSuccess(true);
                setIsLoggedIn(true);
            } else {
                const error = new Error();
                error.message = data.message || "Something went wrong";
                setOpenLoginFailure(true);
                setOpenLoginSuccess(false);
                setIsLoggedIn(false);
            }

        } catch (e) {
            alert("Error with the request: " + e.message);
        }

    }

    async function callLogoutAPI() {
        try {
            var auth = "Bearer " + window.sessionStorage.getItem('access_token');
            const rawResponse = await fetch("http://localhost:8085/api/v1/auth/logout",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json;charset=UTF-8",
                        "Authorization": auth,
                        "Cache-Control": "no-cache",
                    },
                }
            );
        } catch (e) {
        }
    }

    async function callRegisterAPI(userRegisterForm) {
        try {

            const bodyJSON = {
                "email_address": userRegisterForm.email,
                "first_name": userRegisterForm.firstname,
                "last_name": userRegisterForm.lastname,
                "mobile_number": userRegisterForm.contact,
                "password": userRegisterForm.key
            };


            const rawResponse = await fetch("http://localhost:8085/api/v1/signup",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json;charset=UTF-8",
                        "Cache-Control": "no-cache"
                    },
                    body: JSON.stringify(bodyJSON),
                }
            );

            const data = await rawResponse.json();

            if (rawResponse.ok) {
                setOpenRegisterSuccess(true);
                setOpenRegisterFailure(false);
                setOpenLoginFailure(false);
                setOpenLoginSuccess(false);
            } else {
                setOpenRegisterSuccess(false);
                setOpenRegisterFailure(true);
                setOpenLoginFailure(false);
                setOpenLoginSuccess(false);
            }

        } catch (e) {
            alert("Error with the request: " + e.message);
        }

    }


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenLoginSuccess(false);
        setOpenLoginFailure(false);
        setOpenRegisterFailure(false);
        setOpenRegisterSuccess(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [userLoginForm, setUserLoginForm] = useState({
        id: 0,
        username: '',
        password: '',
    });

    const [userRegisterForm, setUserRegisterForm] = useState({
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
        key: '',
        contact: '',
    });

    const inputChangedHandler = (e) => {
        const state = userLoginForm;
        state[e.target.name] = e.target.value;
        setUserLoginForm({ ...state })
    }

    const inputChangedHandlerRegister = (e) => {
        const state = userRegisterForm;
        state[e.target.name] = e.target.value;
        setUserRegisterForm({ ...state })
    }


    const onLoginFormSubmitted = (e) => {
        e.preventDefault();

        callLoginAPI(userLoginForm);
        setUserLoginForm({ id: 0, username: '', password: '' });
    }

    const onRegisterFormSubmitted = (e) => {
        e.preventDefault();

        callRegisterAPI(userRegisterForm);
        setUserRegisterForm({ id: 0, firstname: '', lastname: '', email: '', key: '', contact: '' });
    }

    useEffect(() => {
        var accessToken = window.sessionStorage.getItem('access_token');
        if (accessToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    const handleLogout = () => {
        callLogoutAPI();
        window.sessionStorage.clear();
        setIsLoggedIn(false);
    }

    const { username, password } = userLoginForm;

    const { firstname, lastname, email, key, contact } = userRegisterForm;

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <AppBar position="static" color="inherit">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                >
                    <Tab label="LOGIN" {...a11yProps(0)} />
                    <Tab label="REGISTER" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div style={{ textAlign: 'center' }}>
                    <ValidatorForm className="subscriber-form" onSubmit={onLoginFormSubmitted}>
                        <TextValidator
                            id="username"
                            label="Username *"
                            type="text"
                            name="username"
                            onChange={inputChangedHandler}
                            value={username}
                            validators={['required']}
                            errorMessages={['required']}
                        >
                        </TextValidator>
                        <br />
                        <TextValidator
                            id="password"
                            type="password"
                            name="password"
                            onChange={inputChangedHandler}
                            label="Password *"
                            value={password}
                            validators={['required']}
                            errorMessages={['required']}
                        ></TextValidator>
                        <br /><br />
                        <Button type="submit" variant="contained" color="primary">LOGIN</Button>
                    </ValidatorForm>

                    <br />
                    <Collapse in={openLoginSuccess}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenLoginSuccess(false);
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            Sucessfully logged in
                    </Alert>
                    </Collapse>
                    <Collapse in={openLoginFailure}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenLoginFailure(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            severity="error"
                        >
                            Eh Oh! Please check the credentials and try again.
                    </Alert>
                    </Collapse>
                </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <div style={{ textAlign: 'center' }}>
                    <ValidatorForm className="subscriber-form" onSubmit={onRegisterFormSubmitted}>
                        <TextValidator
                            id="firstname"
                            label="First Name *"
                            type="text"
                            name="firstname"
                            onChange={inputChangedHandlerRegister}
                            value={firstname}
                            validators={['required']}
                            errorMessages={['required']}
                        >
                        </TextValidator>
                        <br />
                        <TextValidator
                            id="lastname"
                            type="text"
                            name="lastname"
                            onChange={inputChangedHandlerRegister}
                            label="Last Name *"
                            value={lastname}
                            validators={['required']}
                            errorMessages={['required']}
                        >
                        </TextValidator>
                        <br />
                        <TextValidator
                            id="email"
                            type="email"
                            name="email"
                            onChange={inputChangedHandlerRegister}
                            label="Email *"
                            value={email}
                            validators={['required']}
                            errorMessages={['required']}
                        >
                        </TextValidator>
                        <br />
                        <TextValidator
                            id="key"
                            type="password"
                            name="key"
                            onChange={inputChangedHandlerRegister}
                            label="Password *"
                            value={key}
                            validators={['required']}
                            errorMessages={['required']}
                        >
                        </TextValidator>
                        <br />
                        <TextValidator
                            id="contact"
                            type="text"
                            name="contact"
                            onChange={inputChangedHandlerRegister}
                            label="Contact No. *"
                            value={contact}
                            validators={['required']}
                            errorMessages={['required']}
                        ></TextValidator>
                        <br /><br />
                        <Button type="submit" variant="contained" color="primary">REGISTER</Button>
                    </ValidatorForm>

                    <br />
                    <Collapse in={openRegisterSuccess}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenRegisterSuccess(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            Registration Successful. Please Login!
                    </Alert>
                    </Collapse>
                    <Collapse in={openRegisterFailure}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenLoginFailure(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            severity="error"
                        >
                            Eh Oh! Please check the details and try again.
                    </Alert>
                    </Collapse>
                </div>
            </TabPanel>

        </div>
    );

    return (
        <div className="header">
            <img src={mainLogo} alt="Site Logo" />

            {isLoggedIn
                ? <Button variant="contained" onClick={handleLogout}>LOGOUT</Button>
                : <Button variant="contained" onClick={handleOpen}>LOGIN</Button>
            }

            {fromDetails
                ? <Button variant="contained" color="primary" onClick={() => BookShow()}>Book Show</Button>
                : <span></span>
            }

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>

        </div>
    );
}