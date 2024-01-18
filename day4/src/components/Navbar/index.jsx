import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { Menu, Inbox as InboxIcon } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';

import { pages } from "../../constants/pages";
import { useMainContext } from "../MainContext";

import classes from "./style.module.scss";

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(false);
    const [menus, setMenus] = useState(pages);

    const { page } = useMainContext();
    const navigate = useNavigate();

    function changePage(path) {
        setAnchorEl(false);
        navigate(`${path}`);
    }

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.navBar}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setAnchorEl(prevVal => !prevVal)}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {page}
                </Typography>
            </Toolbar>
            <SwipeableDrawer
                anchor={"left"}
                open={anchorEl}
                onClose={() => setAnchorEl(false)}
                onOpen={() => setAnchorEl(true)}
            >
                <List className={classes.swipeMenu}>
                    {menus.map(m =>
                        <ListItem disablePadding className={classes.swipeMenuChildren + " " + ((page === m.pageName) ? classes.swipeMenuChildrenActive : "")}>
                            <ListItemButton className={classes.swipeMenuButton} onClick={() => changePage(m.path)}>
                                <ListItemIcon>
                                    <div className={classes.icon}>
                                        {m.icon}
                                    </div>
                                </ListItemIcon>
                                <ListItemText primary={m.pageName} className={classes.text} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </SwipeableDrawer>
        </AppBar>
    )
}