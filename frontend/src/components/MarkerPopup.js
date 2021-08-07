import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';


import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { Box, DialogContent, Input} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import * as marker from "modules/Marker/_redux/markerRedux"
import { connect } from 'react-redux';



function MarkerPopup(props) {
    

    const initialValues = {
    longitude: props.coordinate[0],
    latitude: props.coordinate[1],
    name: "",
    image: null
    }

    const validationSchema = Yup.object().shape({
        properties: Yup.object().shape({
            name: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required')
        })
        
      });

    

  return (
    <div>
      
      <br />
      
        <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.popUpOpen}>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    
                    onSubmit={(values) => {
                        console.log(values)
                        props.createMarkerRequest(values)
                        props.handleClose()
                    }}
                >
                    {(formProps) => (
                        <Form>
                        <Box  marginY={1.5}>
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
                            
                             <Box  bgcolor="white">

                                <Input 
                                    type="file"
                                    name="image"
                                    onChange={(event) =>{
                                        formProps.setFieldValue("image",event.target.files[0])
                                        
                                    }}
                                />
                            </Box>  

                        </Box>
                        <Button style={{float:'right'}} type="submit" autoFocus  color="primary">
                                            Create Marker
                        </Button>
                    </Form>

                    )}
                    
                </Formik>
               
            </DialogContent>
            

        </Dialog>
    </div>
  );
}

export default connect(null,marker.actions)(MarkerPopup)