import { Link } from "react-router-dom";
import { AppBar, Button, Avatar, Toolbar, Typography } from "@mui/material";

import headerImg from "../../assets/images/happy-thoughts.png";
import styles from "./Navbar.module.css";

function Navbar() {
  const user = null;

  return (
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
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="error">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
