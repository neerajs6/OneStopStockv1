import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Drawer, List, ListItem, ListItemIcon, IconButton, Divider, ListItemText }from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";


const styles = {
  list: {
    width: 250,
    fontFamily: 'Airbnb Cereal App Light',
  },
  colorAlternative: {
    color: "#ffffff"
  },
  item: {
    "&:hover": {
      backgroundColor: "#bdbdbd"
    },
    fontFamily: 'Airbnb Cereal App Light',
  },
  text: {
    color: 'black'
  },


};

class DrawerNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,

    };

    
    this.logOut = this.logOut.bind(this)

  }




  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  logOut() {
    localStorage.clear();
    this.setState({
      user: false
    });
  };


  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {localStorage.getItem("username") ? 
          <ListItem component={Link} to={`/account/${localStorage.getItem("username")}`} className={ classes.item }>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText className={classes.text}>
              {localStorage.getItem("username") }
            </ListItemText>
          </ListItem>
          :
          <ListItem component={Link} to="/login" className={ classes.item }>
            <ListItemText primary="Log In" className={classes.text} />
          </ListItem>
          }

          <Divider />
          <ListItem component={Link} to="/" className={classes.item}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" className={classes.text} />
          </ListItem>

          <ListItem
            component={Link}
            to="/who-we-are"
            className={classes.item}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Who We Are" className={classes.text}/>
          </ListItem>
          <Divider />
          {localStorage.getItem("username") ? 
          <ListItem component={Link} to="/" onClick={this.logOut} className={classes.item}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
            <ListItemText primary="Log Out" className={classes.text} />
          </ListItem>
          :
          <div></div>}
        </List>
      </div>
    );

    return (
      <div>
        <IconButton
          onClick={this.toggleDrawer("left", true)}
          style={classes.icon}
          
        >
          <MenuIcon  />
        </IconButton>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

DrawerNav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DrawerNav);
