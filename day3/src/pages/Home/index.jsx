import { useEffect, useState } from "react";
import { callApi } from "../../domain/api";
import { useNavigate } from "react-router-dom";

import SmallCard from "../../components/SmallCard";
import LoadingContainer from "../../components/LoadingContainer";
import BigCard from "../../components/BigCard";

import classes from "./style.module.scss";

export default function Home() {
    const [data, setData] = useState([]);
    const [moreRecepieces, setMoreRecepieces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tab, setTab] = useState(0);
    const [isLoadingPage, setisLoadingPage] = useState(false);
    const [isLoadingMealsData, setIsLoadingMealsData] = useState(false);
    const [isLoadingMoreMeals, setIsLoadingMoreMeals] = useState(false);

    const navigate = useNavigate();

    function gotToDetail(id) {
        navigate(`/${id}`);
    }

    async function fetchCategoryData() {
        try {
            const resCategory = await callApi("/categories.php", "GET");
            resCategory?.categories?.splice(6);
            setCategories(resCategory?.categories?.map(e => e.strCategory));
            setisLoadingPage(false);
        } catch (error) {
            console.error(error);
        }
    }
    async function fetchDataMealsData() {
        setIsLoadingMealsData(true);
        try {
            const resCategoryData = await callApi("/filter.php", "GET", {}, { c: categories[tab] && tab != categories.length ? categories[tab] : "beef" });
            resCategoryData?.meals?.splice(10);

            const detailsFetches = [];
            for (const index in resCategoryData?.meals) {
                const el = resCategoryData?.meals[index];
                if (el?.idMeal) {
                    detailsFetches.push(callApi("/lookup.php", "GET", {}, { i: el?.idMeal }));
                }
            }

            const resAll = await Promise.all(detailsFetches);
            setData(resAll?.map(e => e.meals[0]));

            setIsLoadingMealsData(false);
        } catch (error) {
            console.error(error);
        }
    }
    async function fetchMoreMeals() {
        try {
            setIsLoadingMoreMeals(true);
            const resData = [];
            for (let index = 0; index < 10; index++) {
                resData.push(callApi("/random.php", "GET"));
            }
            const resAll = await Promise.all(resData);
            setMoreRecepieces(resAll?.map(e => e.meals[0]));
            setIsLoadingMoreMeals(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setisLoadingPage(true);
        fetchCategoryData();
        fetchMoreMeals();
    }, []);

    useEffect(() => {
        fetchDataMealsData();
    }, [tab]);

    return (
        <div className={classes.mainContainer}>
            {isLoadingPage ? <LoadingContainer isFullHeight={true} /> :
                <>
                    <div className={classes.tabsContainer}>
                        {categories.map((e, i) =>
                            <h2 key={e} className={tab === i ? classes.tabNameActive : classes.tabName} onClick={() => setTab(i)}>{e}</h2>
                        )}
                        <h2 className={tab === (categories.length) ? classes.tabNameActive : classes.tabName} onClick={() => setTab(categories.length)}>Favorite</h2>
                    </div>
                    <div className={classes.contentContaier}>
                        {isLoadingMealsData ? <LoadingContainer /> :
                            <div className={classes.list}>
                                {data?.map(e =>
                                    <BigCard key={e.idMeal} data={e} goToDetail={gotToDetail} />
                                )}
                            </div>
                        }
                    </div>
                    <div className={classes.footerContainer}>
                        <h2 className={classes.title}>More recipies</h2>
                        <div className={classes.footerContent}>
                            {isLoadingMoreMeals ? <LoadingContainer /> : 
                            moreRecepieces.map(e => <SmallCard key={e.idMeal} data={e} isShowButton={false} onClickData={gotToDetail} />)}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}