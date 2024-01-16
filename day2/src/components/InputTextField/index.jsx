import classes from "./style.module.scss";

export default function InputTextField({type = "text", placeholder, value, onChange, Icon}) {
    return(
        <div className={classes.searchContainer}>
            {Icon && <div className={classes.iconField}>
                {Icon}
            </div>}
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} className={Icon ? classes.searchTextFieldWithIcon : classes.searchTextFieldNoIcon} />
        </div>
    );
}