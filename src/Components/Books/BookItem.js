import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {NumericFormat} from "react-number-format";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../../redux/features/cart/cartSlice";
import {useEffect} from "react";

function BookItem(props) {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const addToCard = (product) => {
        dispatch(addProduct(product))
    }

    return (
        <>
            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.item.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <NumericFormat value={props.item.price} displayType="text" allowLeadingZeros thousandSeparator="," />VND
                        <Button size="small" variant="contained" onClick={() => addToCard(props.item)} >Add to cart</Button>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}

export default BookItem;
