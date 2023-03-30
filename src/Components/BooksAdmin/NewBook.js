import {useState} from "react";
import axios from "axios";

export default function CreateBook(){
    const [flag, setFlag] = useState(false);
    const [newBook, setNewBook] = useState({
        name: null,
        price: null,
        description: null,
        author: null
    });
    const handleSubmit =  (event) => {
        event.preventDefault();
        console.log("final")
        axios.post('http://localhost:8081/api/books/create', newBook).then(res => {
            console.log(res)
        })
        console.log("final")
    };
    const handleChange = event =>
        setNewBook({ ...newBook, [event.target.name]: event.target.value });
    console.log(newBook)
    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" onChange={handleChange}/>
                <br/>
                <label>price</label>
                <input type="number" name="price" onChange={handleChange}/>
                <br/>
                <label>description</label>
                <input type="text" name="description" onChange={handleChange}/>
                <br/>
                <label>author</label>
                <input type="text" name="author" onChange={handleChange}/>
                <br/>
                <button type={"submit"} >Create</button>
            </form>
        </>
    )
}