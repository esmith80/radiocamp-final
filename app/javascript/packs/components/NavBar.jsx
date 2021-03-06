import React, { useState } from "react";
import { AppBar, Button, Toolbar, Typography, InputBase } from "@material-ui/core";
// import AppBar from "@material-ui/core/AppBar";
// import Button from "@material-ui/core/Button";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Login from './Login';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    hover: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar(props) {
  // const classes = { menuButton: 'blank', title: 'blank' }
  const [searchResults, setSearchResults] = useState([]);
  const [queryString, setQueryString] = useState("");
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const doSearch = async function (queryString) {
    history.push(
      `/${props.broadcasterData.handle}/search?query=${encodeURIComponent(
        queryString
      )}`
    );
  };

  const classes = useStyles();
  const locationPath = location.pathname;
  return (
    <div>
      <AppBar style={{top:"0", }}position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={`/${
                props.broadcasterData ? props.broadcasterData.handle : ""
              }`}
              style={{ textDecoration: "none", color: "secondary" }}
            >
              {props.title}
            </Link>
          </Typography>

        {props.currentUser || props.broadcasterData ? null : <Login handleLogin={props.handleLogin}/>}

          {props.currentUser && props.broadcasterData && props.currentUser === props.broadcasterData.handle && (
            <Button variant="outlined" color="secondary" onClick={props.handleLogOut}>
            Logout
            </Button>
          )}

          {locationPath !== "/" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  doSearch(queryString);
                  return null;
                }}
              >
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  value={queryString}
                  onChange={(event) => setQueryString(event.target.value)}
                />
              </form>
            </div>
          )}
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
