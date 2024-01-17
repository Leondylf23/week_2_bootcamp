import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { callApi } from "../../domain/api";

import BigCard from "../../components/BigCard";
import LoadingContainer from "../../components/LoadingContainer";
import SmallCard from "../../components/SmallCard";

import classes from "./style.module.scss";

export default function DetailPage() {
    const { id } = useParams();

    const [moreRecepieces, setMoreRecepieces] = useState([]);
    const [detailData, setDetailData] = useState(null);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [isLoadingMoreMeals, setIsLoadingMoreMeals] = useState(false);

    const navigate = useNavigate();

    function gotToDetail(id) {
        navigate(`/${id}`);
    }

    async function fetchDetailData() {
        try {
            if(id) {
                const resData = await callApi("/lookup.php", "GET", {}, { i: id });

                setDetailData(resData?.meals[0]);
                setIsLoadingPage(false);
            } else {
                navigate("/");
            }
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
        setIsLoadingPage(true);
        fetchDetailData();
        fetchMoreMeals();
    }, [id]);

    return(
        <div className={classes.mainContainer}>
            {isLoadingPage ? <LoadingContainer isFullHeight={true} /> :
                <>
                    <div className={classes.contentContaier}>
                        <BigCard key={detailData?.idMeal} data={detailData} showDetailBtn={false} />
                    </div>
                    <div className={classes.footerContainer}>
                        <h2 className={classes.title}>More recipies</h2>
                        <div className={classes.footerContent}>
                            {isLoadingMoreMeals ? <LoadingContainer /> : 
                            moreRecepieces?.map(e => <SmallCard key={e.idMeal} data={e} isShowButton={false} onClickData={gotToDetail} />)}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}