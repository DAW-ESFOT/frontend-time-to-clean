import {useAuth} from '../lib/auth';
import React from "react";
import {User} from "../lib/users";
import withoutAuth from "../hocs/withoutAuth";
import {useForm} from "react-hook-form";
const login =()=>{
     const {login}=useAuth();
     const {register,handleSubmit}=useForm();
    const onSubmit=async (data)=>{
        console.log('data',data);
        try{
            const userData=await login(data);
            console.log('userdata',userData);
        }catch (error) {
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

/*const handleViewDetails=async ()=>{
      try{
            const user=await User.getById(1)
             console.log('usuario1',user)
    }catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);//d
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
    }*/

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='email'>Email</label>
                <input type='email'name='email' id='email' ref={register} />
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' ref={register}/>
                <input type="submit"/>
            </form>
        </>
    );
};
export default withoutAuth(login);