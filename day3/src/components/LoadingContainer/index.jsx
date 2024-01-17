import classes from "./style.module.scss";

export default function LoadingContainer({isFullHeight = false}) {
    return(
        <div className={isFullHeight ? classes.loadingContainerFull : classes.loadingContainer}>
            <h1 className={classes.text}>Loading...</h1>
        </div>
    );
}