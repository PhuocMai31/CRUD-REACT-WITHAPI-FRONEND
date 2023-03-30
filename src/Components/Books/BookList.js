import {useEffect, useState} from "react";
import axios from "../../service/axios"
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import BookItem from "./BookItem";
function BookList() {
    const [books,  setBooks] = useState([]);

    useEffect(() => {
        axios.get('/books').then(res => {
            console.log(res.data)
            setBooks(res.data.data);
            console.log(books)
        })
    },[])

    return (
        <>
            <Grid container spacing={1}>
                {books.map((item, index) => <BookItem key={index} item={item}/>)}
            </Grid>
        </>
    )
}

export default BookList;
