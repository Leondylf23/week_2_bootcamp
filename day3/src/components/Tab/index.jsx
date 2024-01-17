import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApi } from "../../domain/api";

import classes from "./style.module.scss";

export default function Tab({tab, setTab, setIsLoading, isShowFavorite = true, getTabData}) {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    async function fetchCategoryData() {
        try {
            const resCategory = await callApi("/categories.php", "GET");
            resCategory?.categories?.splice(6);
            const data = resCategory?.categories?.map(e => e.strCategory);

            setData(data);
            if(getTabData && typeof getTabData === "function") {
                getTabData(data);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    function checkIndexTab(i) {
        if(i === data.length) {
            navigate("/favorite");
        } else {
            setTab(i);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchCategoryData();
    }, []);
    return (
        <div className={classes.tabsContainer}>
            {(!isShowFavorite) && <h2 className={tab === (-1) ? classes.tabNameActive : classes.tabName} onClick={() => checkIndexTab(-1)}>All</h2>}
            {data.map((e, i) =>
                <h2 key={e} className={tab === i ? classes.tabNameActive : classes.tabName} onClick={() => checkIndexTab(i)}>{e}</h2>
            )}
            {(data.length > 0 && isShowFavorite) && <h2 className={tab === (data.length) ? classes.tabNameActive : classes.tabName} onClick={() => checkIndexTab(data.length)}>Favorite</h2>}
        </div>
    );
}