import classes from "./style.module.scss";

export default function LoadingContainer({isFullHeight = false, customMsg = "Loading..."}) {
    return(
        <div className={isFullHeight ? classes.loadingContainerFull : classes.loadingContainer}>
            <h1 className={classes.text}>{customMsg}</h1>
        </div>
    );
}