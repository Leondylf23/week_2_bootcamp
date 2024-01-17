import Button from "../Button";
import classes from "./style.module.scss";

export default function SmallCard({data, isShowButton = true, onClickData}) {
    
    return(
        <div className={classes.cardContainer}>
            <img className={classes.imgContent} src={data?.strMealThumb} alt="" onClick={() => onClickData(data?.idMeal)} />
            <div className={classes.bottomContent}>
                <div className={classes.spacer}></div>
                <h4 className={classes.title}>{data?.strMeal}</h4>
                {isShowButton && <div className={classes.buttonBottom}><Button placeholder={"Remove Favorite"} /></div>}
            </div>
        </div>
    );
}