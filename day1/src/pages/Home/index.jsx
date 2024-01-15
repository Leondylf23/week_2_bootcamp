import { useEffect, useState } from 'react'

import { bg, facebook, instagram, pinterest } from '../../assets/imgs';
import { TimerCard } from './components/TimerCard';

import classes from "./style.module.scss";

export default function Home({ isCustom = false }) {
    const [countdownDisplay, setCountdownDisplay] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

    const counting = (time, decreaseTime) => {
        const current = time - 1;

        setCountdownDisplay({
            days: String(Math.floor(current / (24 * 60 * 60))).padStart(2, "0"),
            hours: String(Math.floor((current / 3600) % 24)).padStart(2, "0"),
            minutes: String(Math.floor((current % 3600) / 60)).padStart(2, "0"),
            seconds: String(Math.floor(current % 60)).padStart(2, "0"),
        });

        decreaseTime(current);
    }
    useEffect(() => {
        const dateSecondsNow = Math.floor(new Date().getTime() / 1000);
        const defaultSecondsDate = Math.floor(new Date("2024-01-24 17:00:00") / 1000);
        let time = defaultSecondsDate - dateSecondsNow;

        if (isCustom) {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const value = queryParams.get('date');

                if (value === undefined || value === null || value === "") throw new Error("Invalid data!");
                const getSecondsValue = Math.floor(new Date(value).getTime() / 1000);

                const getSeconds = getSecondsValue - dateSecondsNow;
                if (getSeconds < 0) throw new Error("'date' parameter must be greater than date now!");
                time = getSeconds;
            } catch (error) {
                alert(error.message);
            }
        }
        const interval = setInterval(() => counting(time, (t) => time = t), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classes.app}>
            <img src={bg} alt="" className={classes.background} />
            <div className={classes.content}>
                <h1 className={classes.title}>WE'RE LAUNCHING SOON</h1>
                <div className={classes.timerContainer}>
                    <div className={classes.timerCards}>
                        <TimerCard value={countdownDisplay?.days} title={"DAYS"} />
                        <TimerCard value={countdownDisplay?.hours} title={"HOURS"} />
                        <TimerCard value={countdownDisplay?.minutes} title={"MINUTES"} />
                        <TimerCard value={countdownDisplay?.seconds} title={"SECONDS"} />
                    </div>
                </div>
            </div>
            <div className={classes.bottom}>
                <a href="#facebook">
                    <img src={facebook} alt="" />
                </a>
                <a href="#pinterest">
                    <img src={pinterest} alt="" />
                </a>
                <a href="#instagram">
                    <img src={instagram} alt="" />
                </a>
                <div className={classes.bottomSosmed}>
                </div>
            </div>
        </div>
    )
}
