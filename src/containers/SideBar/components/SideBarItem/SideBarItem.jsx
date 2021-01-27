import React, { useState } from "react";
import { privateRouter } from "../../../../router";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import classnames from "classnames";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
// import { SideBarItem } from "../../components/SideBarItem";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

export default ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openListItem, setOpenListItem] = useState(false);

  const handleClick = (label) => {
    setOpenListItem(openListItem === label ? false : label);
  };
  // return (
  //   <aside className="sidebar">
  //     {privateRouter().map((route) => (
  //       <SideBarItem key={route.path} route={route} />
  //     ))}
  //   </aside>
  // );

  const renderListItems = (parentRoutePath, route) => {
    const { children, icon, path, label } = route;

    const fullPath = parentRoutePath ? `${parentRoutePath}${path}` : path;

    return (
      <ListItem
        dense={Boolean(parentRoutePath)}
        key={fullPath}
        onClick={() => dispatch(push(fullPath))}
        button
        divider
        className={classnames(classes.nav, {
          [classes.childNav]: parentRoutePath,
        })}
      >
        {parentRoutePath ? null : <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </ListItem>
    );

    // if (!children.length) {
    //   return (
    //     <ListItem
    //       dense={Boolean(parentRoutePath)}
    //       key={fullPath}
    //       onClick={() => dispatch(push(fullPath))}
    //       button
    //       divider
    //       className={classnames(classes.nav, {
    //         [classes.childNav]: parentRoutePath,
    //       })}
    //     >
    //       {parentRoutePath ? null : <ListItemIcon>{icon}</ListItemIcon>}
    //       <ListItemText primary={label} />
    //     </ListItem>
    //   );
    // } else {
    //   return (
    //     <React.Fragment key={fullPath}>
    //       <ListItem
    //         dense={Boolean(parentRoutePath)}
    //         button
    //         divider
    //         className={classnames(classes.nav, {
    //           [classes.childNav]: parentRoutePath
    //         })}
    //         onClick={() => handleClick(label)}
    //       >
    //         {parentRoutePath ? null : <ListItemIcon>{icon}</ListItemIcon>}
    //         <ListItemText primary={label} />
    //         {openListItem === label ? <ExpandLess /> : <ExpandMore />}
    //       </ListItem>
    //       <Collapse in={openListItem === label} timeout="auto" unmountOnExit>
    //         <List component="div" disablePadding>
    //           {children.map(childRoute => renderListItems(path, childRoute))}
    //         </List>
    //       </Collapse>
    //     </React.Fragment>
    //   )
    // }
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classnames(
          classes.drawerPaper,
          !open && classes.drawerPaperClose
        ),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton size="small" onClick={() => setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List
        className={classes.nestedListSubheader}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {privateRouter().map((route) => (
          <React.Fragment key={Math.random()}>
            {renderListItems(null, route)}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};
