
import { useState } from "react";
import classes from "./style.module.scss";

export default function Home() {
    const [dm, setDm] = useState(document.documentElement.getAttribute("data-theme"));

    const change = () => {
        setDm(prevVal => {
            if(prevVal === "light") {
                const name = "dark";
                document.documentElement.setAttribute("data-theme", name);
                return name;
            } else {
                const name = "light";
                document.documentElement.setAttribute("data-theme", name);
                return name;
            }
        });
    }
    return(<div className={classes.container}>
        <button onClick={change}>Toggle darkmode</button>
    </div>);
}