import React from "react";
import withoutAuth from "@/hocs/withoutAuth";
import {useForm} from "react-hook-form";
// import {yupResolver} from '@hookform/resolvers/yup';
// import * as yup from "yup";

// const schema = yup.object().shape({
//
// });

export default function Home() {
  const {register, handleSubmit} = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);
  };
  return (
      <>
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
      </>
  );
}


