import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorCSS from "./Error.module.css";

function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <div className={ErrorCSS.container}>
      <div className={ErrorCSS.error}>
        <h2>Page not found :/</h2>
        <h3>Redircting back to home...</h3>
      </div>
    </div>
  );
}

export default Error;
