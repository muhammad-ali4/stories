import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { Typography, TextField, Paper, Button } from "@mui/material/";

import {
  useGetStoryQuery,
  useAddNewStoryMutation,
  useUpdateStoryMutation,
} from "../../features/api";
import styles from "./Form.module.css";

export default function Form(props) {
  const { curId, setCurId } = props;
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);

  const [addNewStory, { isLoading }] = useAddNewStoryMutation();
  const { data: story } = useGetStoryQuery(curId);
  const [updateStory] = useUpdateStoryMutation();

  useEffect(() => {
    if (curId) {
      setAuthor(story.author);
      setTitle(story.title);
      setContent(story.content);
      setTags(story.tags.join(" "));
    }
  }, [story]);

  const handelCancelEdit = () => {
    setCurId(null);
    setAuthor("");
    setTitle("");
    setContent("");
    setTags("");
  };

  const canSave = [author, title, content, tags].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (curId && canSave) {
      try {
        await updateStory({
          id: curId,
          author,
          title,
          content,
          tags,
          image,
        }).unwrap();
        setAuthor("");
        setTitle("");
        setContent("");
        setTags("");
        setImage("");
        setCurId(null);
      } catch (error) {
        console.error("Failed to save post:", error);
      }
    } else if (canSave) {
      try {
        await addNewStory({
          author,
          title,
          content,
          tags,
          image,
        }).unwrap();
        setAuthor("");
        setTitle("");
        setContent("");
        setTags("");
        setImage("");
      } catch (error) {
        console.error("Failed to save post:", error);
      }
    }
  };

  return (
    <Paper className={styles.paper}>
      <form
        className={styles.postForm}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {curId ? "Editing" : "Tell"} a Story
        </Typography>
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          fullWidth
          value={author}
          onChange={handleAuthorChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          name="story"
          variant="outlined"
          label="Story"
          fullWidth
          multiline
          rows={3}
          value={content}
          onChange={handleContentChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={tags}
          onChange={handleTagsChange}
        />
        <div className={styles.fileInput}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setImage(base64)}
          />
        </div>
        {curId ? (
          <>
            <Button
              className={styles.submitButton}
              variant="contained"
              color="error"
              size="lg"
              type="submit"
              fullWidth
            >
              Update
            </Button>
            <Button
              color="primary"
              size="lg"
              fullWidth
              onClick={handelCancelEdit}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            className={styles.submitButton}
            variant="contained"
            color="error"
            size="lg"
            type="submit"
            fullWidth
          >
            Post
          </Button>
        )}
      </form>
    </Paper>
  );
}
