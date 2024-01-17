import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import LoadingContainer from "../../components/LoadingContainer";
import SmallCard from "../../components/SmallCard";


import classes from "./style.module.scss";
import Tab from "../../components/Tab";
import { callApiLocal } from "../../domain/api";

export default function FavoritePage() {
    const [tab, setTab] = useState(-1);
    const [categories, setCategories] = useState([]);
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);
    const [data, setData] = useState([]);
    const [viewData, setViewData] = useState([]);

    const navigate = useNavigate();

    function goToDetail(id) {
        navigate(`/${id}`)
    }
    function setFilterData(dataIn) {
        if(dataIn && tab === -1) {
            setViewData(dataIn);
        } else {
            setViewData((categories.length > 0 && tab != -1) ? data.filter(v => v.strCategory === categories[tab]) : data);
        }
    }
    async function fetchFavoriteData() {
        try {
            const resData = await callApiLocal("/favorites", "GET");

            setData(resData);
            setFilterData(resData);
            setIsLoadingFavorites(false);
        } catch (error) {
            console.error(error);
        }
    }
    function removeData(id) {
        setData(prevVal => prevVal.filter(v => v.id !== id));
    }

    useEffect(() => {
        setIsLoadingFavorites(true);
        fetchFavoriteData();
    }, []);
    useEffect(() => {
        if(categories.length > 0) {
            setFilterData();
        }
    }, [tab]);

    return(
        <div className={classes.mainContainer}>
            <Tab tab={tab} setTab={setTab} setIsLoading={setIsLoadingPage} isShowFavorite={false} getTabData={setCategories} />
            {(!isLoadingPage && viewData.length === 0) && <LoadingContainer isFullHeight={true} customMsg="Empty"/>}
            {isLoadingPage ? <LoadingContainer isFullHeight={true} /> :
                <>
                    <div className={classes.container}>
                        <div className={classes.list}>
                            {isLoadingFavorites ? <LoadingContainer /> : 
                            viewData.map(e => <SmallCard key={e.idMeal} data={e} onClickData={goToDetail} onDeleteData={removeData} />)}
                        </div>
                    </div>
                </>
            }
        </div>
    );
}