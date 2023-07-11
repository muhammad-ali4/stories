import { DateTime } from "luxon";
import {
  Typography,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
} from "@mui/material/";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  useLikeStoryMutation,
  useDeleteStoryMutation,
} from "../../../features/api";

import storyImg from "../../../assets/images/chainsawman.jpg";
import styles from "./Story.module.css";

function Story(props) {
  const { story, setCurId } = props;
  const [likeStory] = useLikeStoryMutation();
  const [deleteStory] = useDeleteStoryMutation();

  const timeAgo = DateTime.fromISO(story.createdAt).toRelative();

  return (
    <Card className={styles.card}>
      <CardMedia
        className={styles.media}
        image={story.image || storyImg}
        title={story.title}
      />
      <div className={styles.overlay}>
        <Typography variant="h6">{story.author}</Typography>
        <Typography variant="body2">{timeAgo}</Typography>
      </div>
      <div className={styles.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurId(story._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={styles.tags}>
        <Typography variant="body2">
          {story.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={styles.title} variant="h6" component="div">
        {story.title}
      </Typography>
      <CardContent className={styles.content}>
        <Typography variant="body2" color="textSecondary">
          {story.content}
        </Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button size="small" color="primary" onClick={() => likeStory(story)}>
          <ThumbUpIcon fontSize="small" />
          &nbsp;Like:&nbsp;
          <span className={styles.likes}>{story.likeCount}</span>
        </Button>
        <Button size="small" color="error" onClick={() => deleteStory(story)}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Story;
