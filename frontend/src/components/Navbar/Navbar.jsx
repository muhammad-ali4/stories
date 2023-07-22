import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { AppBar, Button, Avatar, Toolbar, Typography } from "@mui/material";

import headerImg from "../../assets/images/happy-thoughts.png";
import styles from "./Navbar.module.css";

function Navbar(props) {
  const { setAuthor } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [teller, setTeller] = useState(null);

  const handleLogout = () => {
    setTeller(null);
    setAuthor("");
    localStorage.removeItem("profile");
    navigate("/");
  };

  useEffect(() => {
    if (teller?.token) {
      const decodedToken = jwt_decode(teller.token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }

    setTeller(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <AppBar className={styles.appBar} position="static" color="inherit">
        <div className={styles.brandContainer}>
          <Typography
            component={Link}
            to="/"
            variant="h3"
            align="center"
            className={styles.header}
          >
            Stories
          </Typography>
          <img className={styles.img} src={headerImg} />
        </div>
        <Toolbar className={styles.toolbar}>
          {teller ? (
            <div className={styles.profile}>
              <Avatar
                className={styles.purple}
                alt={teller?.name}
                src={teller?.picture}
              >
                {teller?.name.charAt(0)}
              </Avatar>
              <Typography className={styles.name} variant="h6">
                {teller?.name}
              </Typography>
              <Button
                variant="contained"
                className={styles.logout}
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="error"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Navbar;
