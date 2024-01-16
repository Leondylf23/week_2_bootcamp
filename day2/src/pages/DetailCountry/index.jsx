import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/material';

import classes from "./style.module.scss";
import Button from "../../components/Button";
import { callApi } from "../../domain/api";

export default function DetailCountry() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function getPropValueLang(data) {
        const datas = [];
        for (let propName in data) {
            if (data.hasOwnProperty(propName)) {
                datas.push(data[propName]);
            }
        }

        return datas.join(', ');
    }
    function getPropValueCurrencies(data) {
        const datas = [];
        for (let propName in data) {
            if (data.hasOwnProperty(propName)) {
                datas.push(data[propName]?.name);
            }
        }

        return datas.join(', ');
    }
    function backBtn() {
        navigate("/");
    }

    async function fetchData() {
        const detailData = localStorage.getItem("detailTemp");
        if (!detailData) {
            navigate("/");
        }
        try {
            let detailDataFromLS = JSON.parse(detailData);
            const borderCountriesCodes = detailDataFromLS?.borderCountries;

            if(borderCountriesCodes) {
                setIsLoading(true);

                try {
                    const res = await callApi("/alpha", "GET", {}, {codes: borderCountriesCodes.join(",")});

                    detailDataFromLS.borderCountries = res.map((e) => e?.name?.common);
                } catch (error) {
                    console.log(error.message);
                }
                setIsLoading(false);
            }

            setData(detailDataFromLS);
        } catch (error) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }

    useEffect(() => {
        window.scrollTo(0,0);
        fetchData();
    }, []);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.buttonContainer}>
                <Button placeholder={"Back"} icon={<ArrowBackIcon />} onClick={backBtn} />
            </div>
            {data ?
                <div className={classes.contentContainer}>
                    <img className={classes.image} src={data?.flags.png} alt={data?.flags.alt} />
                    <div className={classes.detailContainer}>
                        <h2 className={classes.countryName}>{data?.name}</h2>
                        <div className={classes.containerDetail}>
                            <div className={classes.subContainerDetail}>
                                <Typography className={classes.countryDetail}>Native Name: <a className={classes.data}>{data?.region}</a></Typography>
                                <Typography className={classes.countryDetail}>Population: <a className={classes.data}>{data?.population}</a></Typography>
                                <Typography className={classes.countryDetail}>Region: <a className={classes.data}>{data?.region}</a></Typography>
                                <Typography className={classes.countryDetail}>Sub Region: <a className={classes.data}>{data?.subRegion}</a></Typography>
                                <Typography className={classes.countryDetail}>Capital: <a className={classes.data}>{data?.capital?.join(", ")}</a></Typography>
                            </div>
                            <div className={classes.subContainerDetail}>
                                <div className={classes.space}></div>
                                <Typography className={classes.countryDetail}>Top Level: <a className={classes.data}>{data?.topLvlDomain.join(", ")}</a></Typography>
                                <Typography className={classes.countryDetail}>Currencies: <a className={classes.data}>{getPropValueCurrencies(data?.currencies)}</a></Typography>
                                <Typography className={classes.countryDetail}>Languages: <a className={classes.data}>{getPropValueLang(data?.languages)}</a></Typography>
                            </div>
                        </div>
                        <div className={classes.countryBorder}>
                            <h3 className={classes.title}>Border Countries:</h3>
                            <div className={classes.borderCountriesContainer}>
                                {data?.borderCountries?.map(e =>
                                    <div className={classes.borderCountry}>
                                        <a>{e}</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div> :
                isLoading ?
                <div className={classes.loadingContainer}>
                    <h1 className={classes.text}>Getting data...</h1>
                </div>
                :
                <div className={classes.nullContainer}>
                    <h1 className={classes.text}>Error getting data!</h1>
                </div>
                }
        </div>
    );
}