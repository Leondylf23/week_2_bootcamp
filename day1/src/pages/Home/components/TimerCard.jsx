import classes from "./style.module.scss";

export function TimerCard({ value, title }) {
    return (
        <div className={classes.timerCard}>
            <h3 className={classes.timer}>{value}</h3>
            <h3 className={classes.timerTitle}>{title}</h3>
            <div className={classes.timerDentLeft}>
                <div className={classes.halfCircleLeft}></div>
            </div>
            <div className={classes.timerDentRight}>
                <div className={classes.halfCircleRight}></div>
            </div>
        </div>
    );
}