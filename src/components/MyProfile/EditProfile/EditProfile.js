import React, { useState } from "react";
import { connect } from "react-redux";

// COMPONENTS
import EditAvatar from './EditAvatar';
import EditBirthdateDisplay from './EditBirthdateDisplay';
import EditLocationAboutMe from './EditLocationAboutMe';
import EditFaveLanguage from "./EditLang";
import EditUser from "./EditUser";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 300
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const EditProfile = props => {
  // STYLES
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <h1>edit your profile</h1>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="avatar" {...a11yProps(0)} />
          <Tab label="birthdate display" {...a11yProps(1)} />
          <Tab label="location & about me" {...a11yProps(2)} />
          <Tab label="favorite language" {...a11yProps(3)} />
          <Tab label="user settings" {...a11yProps(4)} />
        </Tabs>

        <TabPanel
          value={value}
          index={0}
          style={{ border: "2px solid green", width: "80%", height: "100%" }}
        >
          <EditAvatar />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EditBirthdateDisplay />
        </TabPanel>
        <TabPanel  value={value} index={2}>
          <EditLocationAboutMe />
        </TabPanel>
        <TabPanel
          value={value}
          index={3}
          style={{ width: "80%", height: "100%" }}
        >
          <EditFaveLanguage />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <EditUser />
        </TabPanel>
      </div>
    </>
  );
};

export default connect(null, { })(EditProfile);
