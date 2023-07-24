import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import styles from "./Error.module.css";

function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <div className={styles.container}>
      <h1>Page not found :/</h1>
      <h4>Redircting back to stories...</h4>
    </div>
  );
}

export default Error;
