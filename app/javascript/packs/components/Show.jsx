import React from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import EpisodeList from "./EpisodeList";
import ShowForm from "./ShowForm";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider
} from "@material-ui/core";

export default function Show(props) {

  const [showData, setShowData] = useState({});

  const [episodes, setEpisodes] = useState([]);
  let { showId } = useParams();

  useEffect(async () => {
    const resp = await axios.get("/episodes.json");
    const filteredData = resp.data.filter((x) => x.show_id == showId);
    // sorts episodes by episode number, highest number first
    setEpisodes(
      filteredData.sort((a, b) => {
        if (a.release_date > b.release_date) return -1;
        if (a.release_date < b.release_date) return 1;
        return 0;
      })
    );
  }, []);

  const match = useRouteMatch();

  const history = useHistory();

  const handleLogOut = (event) => {
    event.preventDefault();
    localStorage.setItem("user", null);
    history.push("/");
  };

  useEffect(async () => {
    const resp = await axios.get(`/shows/${showId}.json`);
    setShowData(resp.data);
  }, []);

  return (
    <div id="show-page-container">
      <Card style={{marginTop:"55px"}} square={true} id="show-card">
        <CardMedia
          component="img"
          alt={showData.name + "header image"}
          height="500"
          image={showData.image + "?fit=crop&h=250&w=1080&crop=entropy"}
          title={showData.name}
        />
        <CardContent class="show-card-content">
          <Typography gutterBottom variant="h5" component="h2">
            {showData.name}
          </Typography>
          <Typography variant="body2" component="p">
            {`Genre: ${showData.genre}`}
          </Typography>
          <Typography gutterBottom variant="body2" component="p">
            {showData.description}
          </Typography>
          <Typography style={{marginBottom:"10px", fontStyle:"italic"}} variant="body1" component="p">
            {`Hosted by: ${showData.host}`}
          </Typography>
          { props.isLoggedIn && <ShowForm setShowData={setShowData} text={'Edit Show'} showData={showData}/>}
        </CardContent>
      </Card>
      <Divider></Divider>
      <EpisodeList
        currentUser={props.currentUser}
        setEpisodes={setEpisodes}
        episodes={episodes}
        broadcasterData={props.broadcasterData}
        showId={showId}/>
    </div>
  );
}
