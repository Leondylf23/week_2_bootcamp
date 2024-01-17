
import { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

import InputTextField from "../../components/InputTextField";
import InputSelect from "../../components/InputSelect";

import classes from "./style.module.scss";
import { callApi } from "../../domain/api";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [regionList, setRegionList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [countryListDisplay, setCountryListDisplay] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    async function fetchData() {
        try {
            const resData = await callApi("/all", "GET", { fields: "name, nativeName, population, region, subregion, capital, flags, tld, currencies, languanges, borders" });
            const remappedData = resData?.map(e => ({
                name: e?.name?.common,
                nativeName: e?.nativeName,
                population: e?.population,
                region: e?.region,
                subRegion: e?.subregion,
                capital: e?.capital,
                flags: e?.flags,
                topLvlDomain: e?.tld,
                currencies: e?.currencies,
                languages: e?.languages,
                borderCountries: e?.borders,
            }));
            remappedData.splice(70);
            setCountryList(remappedData);
            setCountryListDisplay(remappedData);
            setIsLoading(false);
        } catch (error) {
            alert(error.message);
        }
    }
    function selectFilter(filterData) {
        if (filterData != "") {
            setCountryListDisplay(countryList.filter(v => v.region === filterData));
        } else {
            setCountryListDisplay(countryList);
        }
    }
    function setDetailPage(index) {
        const detail = countryListDisplay[index];
        localStorage.setItem("detailTemp", JSON.stringify(detail));
        navigate("/detail");
    }

    useEffect(() => {
        let timer = null;
        if (searchInput != "") {
            timer = setTimeout(() => {
                setCountryListDisplay(countryList.filter(v => v.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1));
            }, 300);
        } else {
            setCountryListDisplay(countryList);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [searchInput]);

    useEffect(() => {
        const detailData = localStorage.getItem("detailTemp");
        if (detailData) {
            localStorage.removeItem("detailTemp");
        }

        setRegionList([
            {
                value: 'Africa',
                name: 'Africa',
            },
            {
                value: 'Americas',
                name: 'Americas',
            },
            {
                value: 'Asia',
                name: 'Asia',
            },
            {
                value: 'Europe',
                name: 'Europe',
            },
            {
                value: 'Oceania',
                name: 'Oceania',
            },
        ]);

        setIsLoading(true);
        fetchData();
    }, []);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.searchContainer}>
                <div className={classes.searchField}>
                    <InputTextField placeholder={"Search for a country"} Icon={<SearchIcon className={classes.icon} />} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <div className={classes.space}></div>
                <div className={classes.filter}>
                    <InputSelect placeholder={"Filter"} optionDatas={regionList} onChange={(e) => selectFilter(e.target.value)} />
                </div>
            </div>
            {countryListDisplay.length > 0 ?
                <div className={classes.containerDatas}>
                    {countryListDisplay.map((e, i) => <Card className={classes.card} key={e?.name} onClick={() => setDetailPage(i)}>
                        <CardMedia sx={{ height: "200px" }} image={e?.flags?.png} />
                        <CardContent>
                            <Typography className={classes.cardTitle}>{e?.name}</Typography>
                            <Typography className={classes.cardContent}>Population: <a className={classes.cardContent}>{e?.population}</a></Typography>
                            <Typography className={classes.cardContent}>Region: <a className={classes.cardContent}>{e?.region}</a></Typography>
                            <Typography className={classes.cardContent}>Capital: <a className={classes.cardContent}>{e?.capital.join(", ")}</a></Typography>
                        </CardContent>
                    </Card>)}
                </div> :
                !isLoading ?
                    <div className={classes.emptyContainer}>
                        <h2 className={classes.text}>Empty</h2>
                    </div> :
                    <div className={classes.loadingContainer}>
                        <h2 className={classes.text}>Loading</h2>
                    </div>
            }
        </div>
    );
}