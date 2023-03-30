import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableContainer} from "@mui/material";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useSelector} from "react-redux";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
function Cart(props) {

    const cart = useSelector(state => state.cart)

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Cart items"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TableContainer>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">#</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {cart.items.map((item,index) => (
                                        <>
                                            <TableRow>
                                            <TableCell align="right">{index + 1}</TableCell>
                                            <TableCell align="right">{item.name}</TableCell>
                                            <TableCell align="right">{item.name}</TableCell>
                                            <TableCell align="right">{item.price}</TableCell>
                                            <TableCell align="right">
                                                <TextField type="number" defaultValue="1" limitions/>
                                            </TableCell>
                                                <TableCell align="right">
                                                    <DeleteIcon />
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    ))}
                            </TableBody>
                        </TableContainer>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Disagree</Button>
                    <Button onClick={props.handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Cart;
