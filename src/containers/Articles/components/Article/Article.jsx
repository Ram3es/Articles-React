import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES_PATH } from "../../../../router/constants";
import { getArticle } from "../../store/selectors";
import { withRouter } from "react-router";
import { actions } from "../../../../store/actions";
import { Form, Field, Formik } from "formik";
import FORMS from "../../constants/forms";
import {
  Grid,
  Container,
  TextField,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

export default withRouter(
  ({
    match: {
      params: { id },
    },
  }) => {
    const dispatch = useDispatch();
    //const [article, setArticle] = useState(null);
    const classes = useStyles();

    useEffect(() => {
      if (id !== "new") {
        dispatch(actions.FETCH_ARTICLE.REQUEST(Number(id)));
      }
    }, [dispatch]);

    const selectedArticle =
      id !== "new" ? useSelector(getArticle(Number(id))) : null;

    useEffect(() => {
      setArticle(selectedArticle);
    }, [selectedArticle]);

    const handleChangeArticle = (data) => {
      dispatch(actions.EDIT_ARTICLES.REQUEST(data));
    };

    const handleRemoveArticle = () => {
      dispatch(actions.REMOVE_ARTICLES.REQUEST(Number(id)));
      dispatch(push(ROUTES_PATH.ARTICLES));
    };

    const handleSubmit = (data) => {
      const payload = {
        ...data,
        image_url: "https://picsum.photos/id/237/200/300",
      };
      console.log(data, "data submit");
      delete paylad.image; //  to do

      if (id) {
        handleChangeArticle(payload); //  data ?
      } else {
        dispatch(actions.ADD_ARTICLES.REQUEST(payload));
        dispatch(push(ROUTES_PATH.ARTICLES));
      }
    };

    const getErrors = (errors, touched, name) => {
      if (errors[name] && touched[name]) {
        return <div>{errors[name]}</div>;
      } else {
        return null;
      }
    };

    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={
            selectedArticle
              ? { ...selectedArticle, image: selectedArticle.image_url }
              : FORMS.ARTICLE.INIT
          }
          validateOnChange={true}
          validateOnBlur={true}
          validationSchema={FORMS.ARTICLE.SCHEME}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const {
              errors,
              touched,
              values: { title, description, image },
              handleChange,
            } = props;
            return (
              <Form>
                <div className={classes.heroContent}>
                  <Container>
                    <div className={classes.heroButtons}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Button
                            className={classes.button}
                            onClick={() => dispatch(push(ROUTES_PATH.ARTICLES))}
                            variant="contained"
                          >
                            &larr; Back
                          </Button>
                          <Button
                            type="submit"
                            className={classes.button}
                            variant="contained"
                            color="primary"
                          >
                            {id !== "new"
                              ? "Save changes"
                              : "Create new Article"}
                          </Button>
                          {id !== "new" ? (
                            <Button
                              className={classes.button}
                              variant="contained"
                              color="secondary"
                              onClick={handleRemoveArticle}
                            >
                              Remove
                            </Button>
                          ) : null}
                        </Grid>
                      </Grid>
                    </div>
                  </Container>
                </div>
                <Container className={classes.cardGrid}>
                  <div className={classes.formFieldWrapper}>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        {image ? (
                          <img className={classes.image} src={image} alt="" />
                        ) : null}
                        <FormControl fullWidth margin="dense">
                          <OutlinedInp
                            ut
                            fullWidth
                            error={touched.image && Boolean(errors.image)}
                            onChange={async (e) => {
                              e.persist();
                              const [image] = e.target.files;

                              if (image) {
                                const base64ImageUrl = await fileReaderToBase64(
                                  image
                                );
                                setFieldValue("image", base64ImageUrl);
                                setFieldTouched(e.target.name, true, false);
                              }
                            }}
                            id="image"
                            inputProps={{ name: "image" }}
                            type="file"
                          />
                          <FormHelperText error={Boolean(errors.image)}>
                            {touched.image && errors.image}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={9}>
                        <TextField
                          error={touched.title && Boolean(errors.title)}
                          fullWidth
                          name="title"
                          id="title"
                          onChange={(e) => {
                            setFieldValue("title", e.target.value);
                            setFieldTouched("title", true, false);
                          }}
                          value={title}
                          margin="dense"
                          label="Title"
                          variant="outlined"
                          helperText={touched.name && errors.name}
                        />
                        <FormControl className={classes.editor}>
                          <CKEditor
                            name="description"
                            id="description"
                            editor={ClassicEditor}
                            data={description}
                            onChange={(e, editor) => {
                              const data = editor.getData();
                              setFieldValue("description", data);
                              setFieldTouched("description", true, false);
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </Container>
              </Form>
            );
          }}
        </Formik>
        <button type="button" onClick={handleRemoveArticle}>
          Remove
        </button>
      </>
    );
  }
);
