import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material"
import { Button } from "@mui/material";
import classes from './style.module.scss';

export default function NavBar({ darkModeToggle, isDarkmode }) {
    return (
        <div className={classes.navbar}>
            <div className={classes.navContainer}>
                <h1 className={classes.title}>Where in the world?</h1>
                <div className={classes.fillContainer}>
                    <Button variant="text" startIcon={isDarkmode ? <LightModeOutlined /> : <DarkModeOutlined />} className={classes.darkModeBtn} onClick={darkModeToggle}>
                        <a className={classes.btnA}>{isDarkmode ? "Light Mode" : "Dark Mode"}</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}