import { Grid, CircularProgress, Typography } from "@mui/material";

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
    content = (
      <Grid className={styles.mainContainer} container alignItems="stretch">
        {stories.map((story) => (
          <Grid item key={story._id} xs={12} sm={6}>
            <Story story={story} setCurId={setCurId} />
          </Grid>
        ))}
      </Grid>
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

export default Stories;
