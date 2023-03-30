import {useEffect, useState} from "react";
import Title from "../Title/Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function BookListAdmin() {
    const [books, setBooks] = useState([])
    const [flag, setFlag] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/api/books').then(respon => {
            setBooks(respon.data.data)
            console.log(respon.data.data, 111)
        }).catch(err => {
            console.log(err)
        })
    }, [flag])

    const deleteBooks = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            axios.delete('http://localhost:8081/api/books/' + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then(res => {
                setFlag(!flag)
            })
        }

    }
    const sendIDToUpdateBook = _idValue => {
        navigate("/admin/update-book", { state: { id: _idValue } });
    }

    return (
        <React.Fragment>
            <Title>
                <Link to={"http://localhost:3000/admin/create-newbook"}>
                    <Button variant="outlined">Create</Button>
                </Link>
            </Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { books && books.map((row,index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell><Button onClick={value => sendIDToUpdateBook(row._id)}>{row.name}</Button></TableCell>
                            <TableCell><Button >{row.price}</Button></TableCell>
                            <TableCell><Button >{row.author}</Button></TableCell>
                            <TableCell>
                                <Button  onClick={() => deleteBooks(row._id)} variant="contained" color="error">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default BookListAdmin;
