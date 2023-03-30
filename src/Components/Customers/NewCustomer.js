import {useState} from "react";
import axios from "axios";

export default function CreateCustomer(){
    const [flag, setFlag] = useState(false);
    const [newUser, setNewUser] = useState({
        name: null,
        username: null,
        password: null,
        role: "1"
    });
    const handleSubmit =  (event) => {
        event.preventDefault();
        console.log("final")
         axios.post('http://localhost:8081/api/uesrs/create', newUser).then(res => {
            console.log(res)
        })
        console.log("final")
    };
    const handleChange = event =>
        setNewUser({ ...newUser, [event.target.name]: event.target.value });
    console.log(newUser)
    return(
        <>
            <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange}/>
            <br/>
            <label>UserName</label>
            <input type="text" name="username" onChange={handleChange}/>
            <br/>
            <label>Password</label>
            <input type="text" name="password" onChange={handleChange}/>
            <br/>
            <button type={"submit"} >Create</button>
            </form>
        </>
    )
}