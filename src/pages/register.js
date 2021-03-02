import React from 'react';
import { useForm } from "react-hook-form";
import withAuth from "../hocs/withAuth";
import {useAuth} from "../lib/auth";
const Register = ()=>{
    const {register: doRegister}=useAuth();
    const {register,handleSubmit,control}=useForm();
    const onSubmit=async (data)=>{
        console.log('data',data);
        try{
            const userData=await doRegister({...data,role:'ROLE_DRIVER'});
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
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label >Nombre</label>
                    <input type='text' name='name' id='name' ref={register} />
                </div>
                <div>
                    <label htmlFor='email'>Apellido</label>
                    <input type='text' name='lastname' id='lastname' ref={register} />
                </div>
                <div>
                    <label htmlFor='email'>Correo</label>
                    <input type='email'name='email' id='email' ref={register} />
                </div>
                <div>
                    <label htmlFor='date'>Fecha de Nacimiento</label>
                    <input type='date'name='birthdate' id='bithdate' ref={register} />
                </div>
                <div>
                    <label >Celular</label>
                    <input type='cellphone'name='cellphone' id='cellphone' ref={register} />
                </div>
                <div>
                    <label >Tipo</label>
                    <input type='text' name='type' id='type' ref={register}/>

                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' ref={register}/>
                </div>
               <div>
                   <label htmlFor='password_confirmation'>Confirm Password</label>
                   <input type='password' name='password_confirmation' id='password' ref={register}/>
               </div>

                <input type="submit"/>
            </form>
        </>
    );
};
export default withAuth(Register);