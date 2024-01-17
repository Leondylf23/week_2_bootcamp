import classes from "./style.module.scss";

export default function Button({placeholder, onClick, disabled}) {
    return(
        <button className={classes.button} onClick={onClick} disabled={disabled} >{placeholder}</button>
    );
}