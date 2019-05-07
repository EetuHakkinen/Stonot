import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom';
import Home from './components/Home';
import Registeration from './components/Registeration';
import Login from './components/Login';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';
import LightTheme from './constants/lightTheme';
import classNames from 'classnames';

function App() {
    return (
        <div className="container">
            <Router>
                <MuiThemeProvider theme={LightTheme}>
                    <Bar />
                    <Route exact path="/" render={() => <Home />} />
                    <Route path="/registeration" render={() => <Registeration />} />
                    <Route path="/login" render={() => <Login />} />
                </MuiThemeProvider>
            </Router>
        </div>
    );
}

const drawerWidth = 240;

const styles = ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    root: {
        display: 'flex',
    },
    /*appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            //easing: theme.transitions.easing.sharp,
            duration: 1,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            //easing: theme.transitions.easing.easeOut,
            duration: 1,
        }),
    },*/
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        //...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: '5px',
        /*transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),*/
        marginLeft: -drawerWidth,
    },
    contentShift: {
        /*transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),*/
        marginLeft: 0,
    },
});

const Appbar = ({ classes }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton className={classNames(classes.menuButton, open && classes.hide)} color="inherit" aria-label="Menu" onClick={() => setOpen(!open)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Stonot
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    <ListItem button>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Text here" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </div>
    );
}

const Bar = withStyles(styles, { withTheme: false })(Appbar);


export default App;
