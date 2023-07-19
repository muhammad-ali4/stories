import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { AppBar, Button, Avatar, Toolbar, Typography } from "@mui/material";

import headerImg from "../../assets/images/happy-thoughts.png";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("profile");
    navigate("/");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
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
          {user ? (
            <div className={styles.profile}>
              <Avatar
                className={styles.purple}
                alt={user?.name}
                src={user?.picture}
              >
                {user?.name.charAt(0)}
              </Avatar>
              <Typography className={styles.name} variant="h6">
                {user?.name}
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
