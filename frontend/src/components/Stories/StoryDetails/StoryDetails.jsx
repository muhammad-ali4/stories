import { useParams, Link } from "react-router-dom";
import { DateTime } from "luxon";
import {
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useGetStoryQuery } from "../../../features/api";

import storyImg from "../../../assets/images/thumb.jpg";

import styles from "./StoryDetails.module.css";

function StoryDetails() {
  const { id } = useParams();

  const {
    data: story,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStoryQuery(id);

  let content;

  if (isLoading) {
    content = (
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  } else if (isSuccess) {
    content = (
      <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
        <div className={styles.card}>
          <div className={styles.section}>
            <Typography variant="h3" component="h2">
              {story.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {story.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
              className={styles.content}
            >
              {story.content}
            </Typography>

            <div className={styles.info}>
              <Divider style={{ margin: "20px 0" }} />
              <Typography variant="h6">
                Created by:
                {` ${story.author}`}
              </Typography>
              <Typography variant="body1">
                {DateTime.fromISO(story.createdAt).toRelative()}
              </Typography>
            </div>
          </div>
          <div className={styles.imageSection}>
            <img
              className={styles.media}
              src={story.image || storyImg}
              alt={story.title}
            />
          </div>
        </div>
      </Paper>
    );
  } else if (isError) {
    content = (
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Typography variatn="h4">{error.error}</Typography>
        </Grid>
      </Grid>
    );
  }

  return content;
}

export default StoryDetails;
