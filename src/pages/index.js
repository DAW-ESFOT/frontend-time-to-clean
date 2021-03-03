import React from "react";
import {Complaint} from "@/lib/complaints";
import withoutAuth from "@/hocs/withoutAuth";
import {useForm} from "react-hook-form";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Footer from "@/components/Footer";


const Home = () => {
    const {register, handleSubmit} = useForm();

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
            <CssBaseline/>
            <Container maxWidth="lg">
                <main>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="username">Name</label>
                            <input type="text" name="username" id="username" ref={register}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" ref={register}/>
                        </div>
                        <div>
                            <label htmlFor="neighborhood_id">Barrio(id)</label>
                            <input name="neighborhood_id" id="neighborhood_id" ref={register}/>
                        </div>
                        <div>
                            <label htmlFor="complaint">¿Cómo podemos ayudarte?</label>
                            <textarea name="complaint" id="complaint" ref={register}/>
                        </div>
                        <div>
                            <input type="submit"/>
                        </div>
                    </form>
                </main>
            </Container>
            <Footer/>
        </>
    );
}
export default withoutAuth(Home);
