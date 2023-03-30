import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/features/auth/authSlice";
import {useNavigate} from "react-router-dom";

function SecondaryListItems() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitLogOut = () => {
        localStorage.removeItem('token');
        dispatch(logout())
    }

    return (
        <>
            <React.Fragment>
                <ListSubheader component="div" inset>
                    Saved reports
                </ListSubheader>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText onClick={submitLogOut} primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}
export default SecondaryListItems;
