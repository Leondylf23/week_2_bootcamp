import { useEffect, useState } from "react";
import { ingredients } from "../../assets/imgs";
import Button from "../../components/Button";
import classes from "./style.module.scss";
import { callApiLocal } from "../../domain/api";

export default function BigCard({ data, goToDetail, showDetailBtn = true }) {
    const [ingredientsData, setIngredientsData] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    async function saveToFav() {
        try {
            setIsSaving(true);
            const id = data?.idMeal;

            try {
                await callApiLocal(`/favorites/${id}`, "GET");
            } catch (error) {
                if(error?.response?.status === 404) {
                    await callApiLocal("/favorites", "POST", {}, {}, {id: data?.idMeal, idMeal: data?.idMeal, strMealThumb: data?.strMealThumb, strMeal: data?.strMeal, strCategory: data?.strCategory});
                    setIsSaved(true);
                    setIsSaving(false);
                    return;
                } else {
                    throw new Error("Error fetching data");
                }
            } 

            await callApiLocal(`/favorites/${id}`, "DELETE");
            setIsSaved(false);

            setIsSaving(false);
        } catch (error) {
            setIsSaving(false);
            console.error(error);
        }
    }

    useEffect(() => {
        const tempIng = [];
        if(!data) return;
        for (let index = 1; index <= 4; index++) {
            const ingName = data[`strIngredient${index}`];
            const measure = data[`strMeasure${index}`];

            if(ingName === "") continue;
            tempIng.push({
                ingName: ingName,
                measure: measure
            });
        }
        
        setIsSaved(data?.isSaved);
        setIngredientsData(tempIng);
    }, []);

    return (
        <div className={classes.contentCard}>
            <div className={classes.leftSide}>
                <h3 className={classes.title + " " + (showDetailBtn ? classes.titleTrunc : "")}>{data?.strMeal}</h3>
                <p className={classes.contentDescription}>{data?.strInstructions}</p>
                <h2 className={classes.ingredientTitle}>Ingredients</h2>
                <div className={classes.ingridientsContainer}>
                    <div className={classes.ingredientsContents}>
                        {ingredientsData?.map((e) => (
                            <div className={classes.ingredientContent} key={e?.ingName}>
                                <img className={classes.imgIngr} src={ingredients} alt="No Img" />
                                <div className={classes.ingrContentLeft}>
                                    <h4 className={classes.title}>{e?.ingName}</h4>
                                    <h5 className={classes.detail}>{e?.measure}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={showDetailBtn ? classes.contentButtons : classes.contentButtonSingle}>
                        {showDetailBtn && <div className={classes.button}>
                            <Button placeholder={"Detail"} onClick={() => goToDetail(data?.idMeal)} disabled={isSaving} />
                        </div>}
                        <div className={classes.button}>
                            <Button placeholder={isSaved ? "Remove from favorite" : "Add to favorites"} onClick={() => saveToFav()} disabled={isSaving} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.rightSide}>
                <img className={classes.rightImg} src={data?.strMealThumb} alt="" />
            </div>
        </div>
    );
}