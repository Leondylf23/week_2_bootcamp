import classes from "./style.module.scss";

export default function NavBar() {

    return(
        <div className={classes.navBar}>
            <div className={classes.innerNav}>
                <h1 className={classes.title} onClick={() => window.location.href = "/"}>Delicacy</h1>
            </div>
        </div>
    )
}