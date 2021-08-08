import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Dialog,CardActions,CardContent,Card} from '@material-ui/core';
import { Field, Form, Formik, getIn } from 'formik';
import {connect} from "react-redux"
import * as marker from "modules/Marker/_redux/markerRedux"
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  media: {
    height: 140,
    cursor:'pointer'
  },
  input: {
    display: "none",
  },
}));

function MarkerDetail({editMarkerRequest,deleteMarkerRequest,selectedMarker,handleClose,popupOpen}) {
    
  const classes = useStyles();
  
  const getLocationString = () => {
     return `${getIn(selectedMarker,"coordinates[1]")}° N  ${getIn(selectedMarker,"coordinates[0]")}° E`
  }

  const removePlace = () => {
      deleteMarkerRequest(selectedMarker.uuid)
      handleClose()
  }

  const initialValues = {
      uuid:getIn(selectedMarker,"uuid"),
      name:getIn(selectedMarker,"name")
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
  });

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={popupOpen}> 
      <Card >
          <Formik
            initialValues = {initialValues}
            validationSchema={validationSchema}
            onSubmit = {(values) => {
                editMarkerRequest(values)
                handleClose()
            }}
              >{(formProps) => (
                  <Form>
                    <div className={`${classes.root}`}>
                        <input onChange={(event) =>{
                                        formProps.setFieldValue("photo",event.target.files[0])
                                        
                                    }} accept="image/*"  className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                        <img className={classes.media} src={getIn(selectedMarker,"photo")}/>
                        </label>
                    </div>
                      
                    <span>{getIn(formProps.values.photo,"name")}</span>
                        
                    <CardContent>
                      <Box marginBottom={0.5}>
                              <span>Name</span>
                      </Box>
                      <Box  bgcolor="white">
                        <Field
                            component={TextField}
                            name="name"
                            variant="outlined"
                            fullWidth
                            InputProps = {{disabled:false}}
                        />
                      </Box>
                      <Box mt={3}>
                        <Typography variant="body2" component="p">
                         Coordinates: 
                        </Typography>
                        <Typography variant="body2" component="p">
                        {getLocationString()}
                        </Typography>
                      </Box>
                     
                    </CardContent>
                    <CardActions>
                            <Button type="button" onClick={removePlace} size="small" color="primary">
                          Delete
                        </Button>
                        <Button type="submit" size="small" color="primary">
                            Edit
                    </Button>
                    </CardActions>
                  </Form>
              )}
            </Formik>     
          </Card>
    </Dialog>
  );
}

export default connect(null,marker.actions) (MarkerDetail)