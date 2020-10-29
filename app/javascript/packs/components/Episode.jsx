import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import EpisodeList from "./EpisodeList";
import { useEffect, useState } from "react";
import axios from "axios";
import EpisodeListItem from "./EpisodeListItem";
import Player from "./Player";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
});

export default function Episode(props) {
  const classes = useStyles();

  const [episodeData, setEpisodeData] = useState({});
  const match = useRouteMatch();
  let { episodeId } = useParams();

  useEffect(async () => {
    const resp = await axios.get(`/episodes/${episodeId}.json`);
    // const thisBroadcaster = resp.data.find((x) => x.handle === props.handle);
    setEpisodeData(resp.data);
  }, []);

  return ( 
    <div>
      <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="250"
          image="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2014/02/shutterstock_163052525-730x342.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {episodeData.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {episodeData.description}
          </Typography>
          <div>
          </div>
        </CardContent>
      </Card>
      <Player className="player" episodeData={episodeData}/>
    </div>
  );
}