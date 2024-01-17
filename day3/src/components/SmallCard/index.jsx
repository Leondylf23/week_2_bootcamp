import { useState } from "react";
import Button from "../Button";
import classes from "./style.module.scss";
import { callApiLocal } from "../../domain/api";

export default function SmallCard({data, isShowButton = true, onClickData, onDeleteData}) {
    const [isSendingData, setIsSendingData] = useState(false);

    async function deleteFav() {
        setIsSendingData(true);
        try {
            await callApiLocal(`/favorites/${data?.idMeal}`, "DELETE");

            onDeleteData(data?.idMeal);
        } catch (error) {
            setIsSendingData(false);
        }
    }
    
    return(
        <div className={classes.cardContainer}>
            <img className={classes.imgContent} src={data?.strMealThumb} alt="" onClick={() => onClickData(data?.idMeal)} />
            <div className={classes.bottomContent}>
                <div className={classes.spacer}></div>
                <h4 className={classes.title}>{data?.strMeal}</h4>
                {isShowButton && <div className={classes.buttonBottom}><Button placeholder={"Remove Favorite"} onClick={() => deleteFav()} /></div>}
            </div>
        </div>
    );
}