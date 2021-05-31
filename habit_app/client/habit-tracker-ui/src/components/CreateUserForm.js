import {useState, useRef} from "react";
import {TextField, Button} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

function CreateUserForm(props) {
    const { register, handleSubmit,getValues, watch, control, formState: { errors, isValid }, } = useForm();
    const password = useRef({});
    password.current = watch("password");


    /*function handleFormSubmit(e) {
        setUsername(e.target[0].value);
        setPassword(e.target[1].value);
    }*/
    //TODO: Remove console.log(data) once backend communication is working
    const onSubmit= (data) => {console.log(data);console.log(errors);
        console.log("backend post");
    }
    return (
        <div>
            <h1>Create New User</h1>
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
                    render={({ field }) => <TextField label="Password" type="password"value={field.value} inputRef={field.ref} onChange={field.onChange} />}
                    /></ul>
                <ul><Controller
                    name="confirm_password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField label="Confirm Password" type="password" value={field.value} inputRef={field.ref} onChange={field.onChange} />}
                    rules={{required: true,
                        validate: () => getValues("confirm_password") === password.current || "The passwords do not match"
                    }}
                />
                </ul>
                <p>{errors.confirm_password && errors.confirm_password.message}</p>

                <ul><Button type="submit" value="submit" onClick={handleSubmit(onSubmit)}>Submit</Button></ul>

            </form>
        </div>
    );


}
export default CreateUserForm;