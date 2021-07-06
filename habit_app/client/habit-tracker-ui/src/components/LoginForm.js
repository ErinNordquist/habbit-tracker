//import {useState, useRef} from "react";
import {TextField, Button} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";

function LoginForm(props) {
    let history = useHistory();
    // useEffect(() =>{
    if (props.loggedIn) {
        history.push("/home");
    };
    // });
    const { register, handleSubmit,getValues, watch, control, formState: { errors, isValid }, setError} = useForm();

    //console.log(props);
    const onSubmit= (data) => {
        axios.post(`http://localhost:5000/auth/login`, data).then((response) => {
            if (response.data.hasOwnProperty('error')){
                setError("username",{type:"validate",message:response.data.error})
            } else {
                //console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                //console.log('in local storage:')
               // console.log(localStorage.getItem('user'));
                props.logInUser();
                history.push("/home");
            }
        }).catch((error) => {
            console.log(error);
            //history.push('/');

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