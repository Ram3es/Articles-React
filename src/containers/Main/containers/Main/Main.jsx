import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { useDispatch, connect, useSelector } from "react-redux";
import { actions } from "../../../../store/actions"; ///A_FetchAllArticlesRequest
import { CssBaseline, Grid } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { Header } from "../../../Header/containers";
import { SideBar } from "../../../SideBar/containers";

import { push } from "connected-react-router";
import { ROUTES_PATH } from "../../../../router/constants";
import { getStateAuth } from "../../../Auth/store/selectors";

import jwt from "jsonwebtoken";

const Main = ({ children, actions: { A_FetchAllArticlesRequest } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const { isAuth } = useSelector(getStateAuth());

  if (!isAuth) {
    dispatch(push(ROUTES_PATH.SIGN_IN));
  } else {
    const token = localStorage.getItem("Token");
    const decoded = jwt.decode(token);
    console.log(decoded, "decoded");

    if (decoded.exp < new Date().getTime()) {
      localStorage.removeItem("Token");
      dispatch(push(ROUTES_PATH.SIGN_IN));
    }
  }

  useEffect(() => {
    dispatch(actions.FETCH_ARTICLES.REQUEST());
    //A_FetchAllArticlesRequest();
  }, [dispatch]);

  return isAuth ? (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} />
      <SideBar open={open} setOpen={setOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid container spacing={1} className={classes.container}>
          <Grid item>{children}</Grid>
        </Grid>
      </main>
    </div>
  ) : null;
};

const mapdispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        //A_FetchAllArticlesRequest,
      },
      dispatch
    ),
  };
};

export default connect(null, mapdispatchToProps)(Main);
/// some text
