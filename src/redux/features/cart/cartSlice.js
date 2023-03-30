import {createSlice} from "@reduxjs/toolkit";
const cart = {
    items: [],
    totalItems: 0,
    totalMoney: 0
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState: cart,
    reducers: {
        addProduct: (state, action) => {
            state.items = [...state.items, action.payload]
            state.totalItems += 1;
            state.totalMoney += action.payload.price
        },
        remoteItem: (state, action) => {
            // logic xoa phan tu khoi mang state.items
        }
    }
})

export const {addProduct} = cartSlice.actions;
export default cartSlice.reducer;
