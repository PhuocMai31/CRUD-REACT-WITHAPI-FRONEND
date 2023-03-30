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

function CustomerList() {
    const [customers, setCustoms] = useState()
    const [flag, setFlag] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/api/users', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then(respon => {
            setCustoms(respon.data)
        }).catch(err => {
            console.log(err)
        })
    }, [flag])

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            axios.delete('http://localhost:8081/api/users/' + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then(res => {
                setFlag(!flag)
            })
        }

    }
    const sendIDToUpdatePage = _idValue => {
        navigate("/admin/update-customers", { state: { id: _idValue } });
    }

    return (
        <React.Fragment>
            <Title>
                <Link to={"http://localhost:3000/admin/create-customers"}>
                <Button variant="outlined">Create</Button>
                </Link>
            </Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { customers && customers.map((row,index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell><Button onClick={value => sendIDToUpdatePage(row._id)} >{row.username}</Button></TableCell>
                            <TableCell>
                                <Button onClick={() => deleteUser(row._id)} variant="contained" color="error">
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

 export default CustomerList;
