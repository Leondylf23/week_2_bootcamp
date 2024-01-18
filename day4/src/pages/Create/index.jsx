
import { useEffect, useState } from "react";
import { useMainContext } from "../../components/MainContext";
import { InputLabel, OutlinedInput, Alert, TextField, MenuItem, InputAdornment, CircularProgress, IconButton, FormControl, Typography, Button } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';

import { categoryList, emptyForm } from "../../constants";
import { callApiLocal } from "../../domain/api";
import LoadingContainer from "../../components/LoadingContainer";

import classes from "./style.module.scss";

const defaultValueFields = { provider: false, email: false, password: false, category: false };

export default function CreatePage({ isFromDetail }) {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [errFields, setErrFields] = useState(defaultValueFields);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [timoutMsg, setTimoutMsg] = useState(null);
    const [showAlert, setShowAlert] = useState(null);

    const { setPage } = useMainContext();
    const { id } = useParams();
    const navigate = useNavigate();

    function showMessage(type, msg) {
        if (timoutMsg) {
            clearTimeout(timoutMsg);
        }
        setShowAlert(<Alert className={classes.alert} severity={type}>{msg}</Alert>);

        setTimoutMsg(setTimeout(() => {
            setShowAlert(null);
            setTimoutMsg(null);
        }, 5000));
    }

    async function saveData() {
        let isNotValid = false;
        setErrFields(defaultValueFields);

        if (formData.provider === "") {
            setErrFields(prevVal => ({ ...prevVal, provider: true }));
            isNotValid = true;
            showMessage("warning", "Please enter a valid provider URL!");
        } else if (formData.email === "") {
            setErrFields(prevVal => ({ ...prevVal, email: true }));
            isNotValid = true;
            showMessage("warning", "Please enter a valid Email!");
        } else if (formData.password.length < 6) {
            setErrFields(prevVal => ({ ...prevVal, password: true }));
            isNotValid = true;
            showMessage("warning", "Password must be 6 characters minimum!");
        } else if (formData.category === "") {
            setErrFields(prevVal => ({ ...prevVal, category: true }));
            isNotValid = true;
            showMessage("warning", "Please enter a valid category!");
        }

        if (isNotValid) {
            return;
        };

        setIsSaving(true);
        try {
            if (id) {
                await callApiLocal(`/password/${id}`, "PATCH", {}, {}, formData);
            } else {
                await callApiLocal("/password", "POST", {}, {}, formData);
            }

            setIsSaving(true);
            navigate("/");
        } catch (error) {
            alert(error.message);
            setIsSaving(false);
        }
    }
    async function getData(id) {
        setIsLoading(true);
        try {
            const data = await callApiLocal(`/password/${id}`, "GET");

            setFormData(data);
            setIsLoading(false);
            setPage("Data Detail");
        } catch (error) {
            setIsLoading(false);
            showMessage("error", error.message);
            setTimeout(() => navigate("/"), 5000);
        }
    }

    useEffect(() => {
        setFormData(emptyForm);
        if (!isFromDetail) {
            setPage("Create New");
        } else {
            if (!id) {
                navigate("/");
            }
            getData(id);
        }
    }, [isFromDetail, id]);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.titleContainer}>
                <Typography className={classes.text}>{isFromDetail ? "Detail Data" : "Create New Detail"}</Typography>
            </div>
            {showAlert}
            {isLoading ?
                <LoadingContainer isFullHeight /> :
                <FormControl className={classes.formContainer} fullWidth>
                    <div className={classes.inputContainer}>
                        <TextField
                            required
                            id="filled-required-url"
                            label="Provider"
                            defaultValue=""
                            type="url"
                            variant="filled"
                            className={classes.inputForm}
                            color="error"
                            error={errFields.provider}
                            onChange={(e) => setFormData(prevVal => ({ ...prevVal, provider: e.target.value }))}
                            value={formData.provider}
                        />
                        <TextField
                            required
                            id="filled-required-email"
                            label="Email"
                            type="email"
                            defaultValue=""
                            variant="filled"
                            className={classes.inputForm}
                            error={errFields.email}
                            onChange={(e) => setFormData(prevVal => ({ ...prevVal, email: e.target.value }))}
                            value={formData.email}
                            color="error"
                        />
                    </div>
                    <div className={classes.inputContainer}>
                        <FormControl sx={{width: "100%"}}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-password"
                                label="Password"
                                defaultValue=""
                                error={errFields.password}
                                type={isShowPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setIsShowPassword(prevVal => !prevVal)}
                                            onMouseDown={() => setIsShowPassword(false)}
                                            edge="end"
                                            sx={{color: "white"}}
                                        >
                                            {isShowPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                variant="filled"
                                className={classes.inputForm}
                                color="error"
                                onChange={(e) => setFormData(prevVal => ({ ...prevVal, password: e.target.value }))}
                                value={formData.password}
                            />
                        </FormControl>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            defaultValue=""
                            helperText=""
                            color="error"
                            error={errFields.category}
                            className={classes.inputForm}
                            InputProps={{ style: { color: 'white' } }}
                            value={formData.category}
                            onChange={(e) => setFormData(prevVal => ({ ...prevVal, category: e.target.value }))}
                        >
                            {categoryList.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className={classes.buttonContainer}>
                        <Button variant="contained" startIcon={<SaveIcon />} className={classes.button} onClick={() => saveData()} disabled={isSaving}>
                            Save
                            {isSaving && <CircularProgress
                                size={24}
                                sx={{
                                    color: "red",
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />}
                        </Button>
                    </div>
                </FormControl>
            }
        </div>
    );
}