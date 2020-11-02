import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  FormGroup,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
  Button,
  ThemeProvider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import { themeOrangeGrey } from "./themes";
import axios from "axios";

export default function BroadcasterForm(props) {
  // can the broadcaster state be contained in a single object instead of using state 5 times?
  //const [broadcaster, setBroadcaster] = useState(emptyBroadcaster);

  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("");

  useEffect( () => {
    if(props.broadcasterData) {
      const bData = props.broadcasterData;
      setHandle(bData.handle);
      setName(bData.name);
      setDescription(bData.description);
      setLogo(bData.image);
      setTheme(bData.theme);
    }
  }, [props.broadcasterData]);

  const reset = () => {
    setHandle("");
    setName("");
    setDescription("");
    setLogo("");
  };

  const saveBroadcaster = (broadcaster) => {
    // event.preventDefault();
    // const broadcaster = {
    //   handle,
    //   name,
    //   description,
    //   logo,
    //   theme,
    //   authenticity_token: "7Q6hhcViECR6WibzTIdQVwufBs8K7C+MfzrpIeW+SlUrwEvXHzjZuOp42FAf+0vRLV36n27++5iLTHuV+gS/Eg=="
    // }
    props.broadcasterData ? editBroadcaster(broadcaster) : createBroadcaster(broadcaster);
  };

  // const editBroadcaster = function(broadcaster) {
  //   axios.put('/broadcasters.json', { broadcaster })
  //   .then(function (response) {
  //     setBroadcasterData(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //   reset();
  //   handleClose();
  // }

  const createBroadcaster = function(broadcaster) {
    axios.post('/broadcasters.json', { broadcaster })
    .then(function (response) {
      props.loginAndRedirect(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    // reset();
    // handleClose();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <ThemeProvider theme={themeOrangeGrey}>
      <Button variant="outlined" size="large" color="primary" onClick={handleClickOpen}>
        {props.text || 'Create My Site'}
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Broadcaster Information</DialogTitle>
          <DialogContent>
          
          <FormGroup>
            
            <FormControl>
              <InputLabel htmlFor="handle">Handle</InputLabel>
              <Input 
                name="handle" 
                id="handle" 
                aria-describedby="my-helper-text" 
                required={true}
                value={handle}
                onChange={(event) => setHandle(event.target.value)}
              />
              <FormHelperText id="my-helper-text">
                Enter your station's handle or call sign.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input 
                name="name"
                id="name" 
                aria-describedby="my-helper-text"
                required={true}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />              
            <FormHelperText id="my-helper-text">
                Enter your station's name.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input 
                name="description" 
                id="description" 
                aria-describedby="my-helper-text"
                required={true}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <FormHelperText id="my-helper-text">
                Enter a short summary that describes your station.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="station-logo">Logo</InputLabel>
              <Input name="logo"
                 id="station_logo" 
                 aria-describedby="my-helper-text"
                 required={true}
                 value={logo}
                 onChange={(event) => setLogo(event.target.value)}/>
              <FormHelperText id="my-helper-text">
                Enter an image URL that represents your station.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-label">Theme</InputLabel>
              <Select
                type="select"
                name="showTheme"
                label="Theme"
                id="demo-simple-select"
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
              >
                <MenuItem value="Choose a Theme"></MenuItem>
                {  
                ['themePurpleYellow', 'themeOrangeGrey', 'themeTeal'].map((theme, index) =>
                    <MenuItem
                      key={index}
                      value={theme}
                      // selected={props.showId === show.id}
                      >
                      {theme}
                    </MenuItem>)
                }
              </Select>
            </FormControl>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => saveBroadcaster({handle, name, description, logo, theme })} color="primary">
                Save
              </Button>          
            </DialogActions>
            
          </FormGroup>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
