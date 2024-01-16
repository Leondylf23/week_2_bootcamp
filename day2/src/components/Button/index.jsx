import classes from "./style.module.scss";

export default function Button({placeholder, icon, onClick}) {
    return(
        <button className={classes.defaultButton} onClick={onClick}>
            {icon && <div className={classes.icon}>{icon}</div>}
            <a>{placeholder}</a>
        </button>
    );
}