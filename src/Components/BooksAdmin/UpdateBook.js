import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function UpdateBook(){
    const { state } = useLocation();
    const [flag, setFlag] = useState(true);
    const [oldUser, setOldUser] = useState({
        name: null,
        price: null,
        description: null,
        author: null
    });
    useEffect(() => {
        axios.get('http://localhost:8081/api/book/findbook/' + state.id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then(respon => {
            setOldUser(respon.data)
            console.log(respon.data, 1121)
        }).catch(err => {
            console.log(err)
        })
    }, [flag])
    const handleSubmit =  (event) => {
        event.preventDefault();
        console.log("final")
        axios.post('http://localhost:8081/api/books/update', oldUser).then(res => {
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
                <label>name</label>
                <input type="text" name="name" onChange={handleChange} value={oldUser.name}/>
                <br/>
                <label>price</label>
                <input type="text" name="price" onChange={handleChange} value={oldUser.price}/>
                <br/>
                <label>description</label>
                <input type="text" name="description" onChange={handleChange} value={oldUser.description}/>
                <br/>
                <label>author</label>
                <input type="text" name="author" onChange={handleChange} value={oldUser.author}/>
                <br/>
                <button type={"submit"} >Update</button>
            </form>
        </>
    )
}