import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Complaint} from "@/lib/complaints";
import Icon from '@material-ui/core/Icon';

const FormSection = () => {

    const styles = {
        container: {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "450px",
            backgroundImage: `url(${"/fondo1.png"})`
        },
        none:{
            opacity: null,
        }
    };

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


    return (
        <>
            <div style={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)} style={styles.none}>
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
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>
                        ENVIAR
                    </Button>
                </form>
            </div>
        </>
    );
}

export default FormSection;