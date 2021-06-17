//import {useState, useRef} from "react";
import {TextField, Button} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router-dom";

function LoginForm(props) {
    const { register, handleSubmit,getValues, watch, control, formState: { errors, isValid }, setError} = useForm();
    let history = useHistory();
    //console.log(props);
    const onSubmit= (data) => {
        //console.log(data);
        // console.log(errors);
        //console.log("backend post");
        axios.post(`http://localhost:5000/auth/login`, data).then(function (response){
            //console.log();
            //console.log(response.data.hasOwnProperty('access_token'));
            //console.log(response.data);
            if (response.data.hasOwnProperty('error')){
                setError("username",{type:"validate",message:response.data.error})
                //console.log(errors.username);
            } else {
                localStorage.setItem("user", JSON.stringify(response.data));
                history.push("/home");
            }
        }).catch(function (error){
            console.log(error);
        });
    }
    return (
        <div>
            <h1>Login</h1>
            <form  onSubmit={e => e.preventDefault()}>
                <ul><Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({ field }) => <TextField label="Username" value={field.value} inputRef={field.ref} onChange={field.onChange} />}
                /></ul>
                <ul><Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{required: true}}
                    render={({ field }) => <TextField label="Password" type="password" value={field.value} inputRef={field.ref} onChange={field.onChange} />}
                /></ul>
                {errors.username && <div>{errors.username.message}</div>}
                <ul><Button type="submit" value="submit" onClick={handleSubmit(onSubmit)}>Submit</Button></ul>
            </form>
        </div>
    );
}
export default LoginForm;