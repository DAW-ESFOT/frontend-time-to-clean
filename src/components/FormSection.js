import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Complaint} from "@/lib/complaints";

const  FormSection = ()=> {

    const {handleSubmit, control} = useForm();

    const onSubmit = async (data) => {
        console.log("data", data);
        try {
            const complaintData = await Complaint.sendComplaint(data);
            console.log('Queja enviada: ', complaintData);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.message);
                console.log(error.response.data);
                //d
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    };


    return(
        <>
            <CssBaseline/>
            <Grid container component="main">
                <Grid item xs={12} elevation={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth variant="outlined">
                            <Controller
                                name="email"
                                as={
                                    <TextField
                                        id="email"
                                        labelWidth={40}
                                        variant="outlined"
                                        label="Email"
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'invalid email address'
                                    }
                                }}
                            />
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit">
                            ENVIAR
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </>
    );
}

export default FormSection;