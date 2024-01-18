import { CircularProgress } from "@mui/material";

import classes from "./style.module.scss";

export default function LoadingContainer({isFullHeight = false, customMsg}) {
    return(
        <div className={isFullHeight ? classes.loadingContainerFull : classes.loadingContainer}>
            {customMsg ? customMsg : <CircularProgress className={classes.circularColor} />}
        </div>
    );
}