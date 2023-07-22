import { Grid, CircularProgress, Paper, Typography } from "@mui/material";

import { useGetStoriesQuery } from "../../features/api";
import Story from "./Story/Story";
import styles from "./Stories.module.css";

function Stories(props) {
  const { setCurId } = props;
  const {
    data: stories = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStoriesQuery();

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
    if (stories.length > 0) {
      content = (
        <Grid className={styles.mainContainer} container alignItems="stretch">
          {stories.map((story) => (
            <Grid item key={story._id} xs={12} md={3} sm={6}>
              <Story story={story} setCurId={setCurId} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      content = (
        <Paper className={styles.noStories} elevation={6}>
          <Typography variant="h6">
            No stories yet... Feel free to create some!
          </Typography>
        </Paper>
      );
    }
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

export default Stories;
