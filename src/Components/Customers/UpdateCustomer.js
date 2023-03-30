import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function UpdateCustomer(){
    const { state } = useLocation();
    const [flag, setFlag] = useState(true);
    const [oldUser, setOldUser] = useState({
        name: null,
        username: null,
        password: null,
        role: "1"
    });
    useEffect(() => {
        axios.get('http://localhost:8081/api/uesrs/finduser/' + state.id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then(respon => {
            setOldUser(respon.data)
        }).catch(err => {
            console.log(err)
        })
    }, [flag])
    const handleSubmit =  (event) => {
        event.preventDefault();
        console.log("final")
        axios.post('http://localhost:8081/api/uesrs/update', oldUser).then(res => {
            console.log(res)
        })
        console.log("final")
    };
    const handleChange = event =>
        setOldUser({ ...oldUser, [event.target.name]: event.target.value });
    console.log(oldUser)
    return(
        <>
            <div>
                <h3>{state.id} </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange} value={oldUser.name}/>
                <br/>
                <label>UserName</label>
                <input type="text" name="username" onChange={handleChange} value={oldUser.username}/>
                <br/>
                <label>Password</label>
                <input type="text" name="password" onChange={handleChange} value={oldUser.password}/>
                <br/>
                <button type={"submit"} >Update</button>
            </form>
        </>
    )
}