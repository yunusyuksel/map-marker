import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box, Dialog, IconButton } from '@material-ui/core';
import { Field, Form, Formik, getIn } from 'formik';

import {connect} from "react-redux"
import * as marker from "modules/Marker/_redux/markerRedux"
import { TextField } from 'formik-material-ui';
import { select } from '@redux-saga/core/effects';

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
    console.log(popupOpen)
  const classes = useStyles();
  console.log(selectedMarker)

  const getLocationString = () => {
     return `${getIn(selectedMarker,"coordinates[0]")} ${getIn(selectedMarker,"coordinates[1]")}`
  }

  const removePlace = () => {
      deleteMarkerRequest(selectedMarker.uuid)
      handleClose()
  }

  const initialValues = {
      uuid:getIn(selectedMarker,"uuid"),
      name:getIn(selectedMarker,"name")

  }

  return (

    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={popupOpen}> 
     <Card >
        <Formik
            initialValues = {initialValues}
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
                        <Typography gutterBottom variant="h5" component="h2">
                            <Field
                                        component={TextField}
                                        name="name"
                                        variant="outlined"
                                        fullWidth
                                        InputProps = {{disabled:false}}
                                    />
                        
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {getLocationString()}
                        </Typography>
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