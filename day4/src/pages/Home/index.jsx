import { useEffect, useState } from "react";
import { callApiLocal } from "../../domain/api";
import { useNavigate } from "react-router-dom";
import { Alert, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import { useMainContext } from "../../components/MainContext";
import LoadingContainer from "../../components/LoadingContainer";

import classes from "./style.module.scss";
import { getCategoryName } from "../../utils";
import DialogModal from "../../components/Dialog";


export default function Home({category}) {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSendingData, setIsSendingData] = useState(false);
    const [timoutMsg, setTimoutMsg] = useState(null);
    const [showAlert, setShowAlert] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteData, setDeleteData] = useState(null);

    const navigate = useNavigate();
    const { setPage } = useMainContext();

    async function fetchData() {
        setIsLoading(true);
        try {
            const data = await callApiLocal(`/password${category ? `?category=${category}` : ""}`, "GET");
            setRows(data);
            setIsLoading(false);
        } catch (error) {
            alert(error.message);
        }
    }
    function openCreateNewModal() {
        navigate("/create");
    }
    function showMessage(type, msg) {
        if (timoutMsg) {
            clearTimeout(timoutMsg);
        }
        setShowAlert(<Alert severity={type}>{msg}</Alert>);

        setTimoutMsg(setTimeout(() => {
            setShowAlert(null);
            setTimoutMsg(null);
        }, 5000));
    }
    async function deleteDataFetch(id) {
        setIsSendingData(true);
        try {
            await callApiLocal(`/password/${id}`, "DELETE");

            setIsSendingData(false);
            showMessage("success", "Delete success!");
            setRows(prevVal => prevVal.filter(v => v.id != id));
        } catch (error) {
            setIsSendingData(false);
            showMessage("error", "Error deleting data!");
        }
    }
    function btnDelete(data) {
        setShowDialog(true);
        setDeleteData(data);
    }
    function actionDialog(isAccept) {
        if (isAccept) {
            deleteDataFetch(data?.id);
        } else {
            setShowDialog(false);
        }

        setDeleteData(null);
    }

    useEffect(() => {
        setPage("Home");
        fetchData();
    }, [category]);

    return (
        <div className={classes.mainContainer}>
            {showAlert}
            <div className={classes.createBtnContainer}>
                <Button variant="contained" startIcon={<AddIcon />} className={classes.button} onClick={() => openCreateNewModal()}>Create New</Button>
            </div>
            {isLoading ?
                <LoadingContainer isFullHeight={true} />
                :
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontSize: "20px", fontWeight: 700 }}>Website</TableCell>
                                <TableCell align="center" sx={{ fontSize: "20px", fontWeight: 700 }}>Email</TableCell>
                                <TableCell align="center" sx={{ fontSize: "20px", fontWeight: 700 }}>Category</TableCell>
                                <TableCell align="center" sx={{ fontSize: "20px", fontWeight: 700 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left" sx={{ fontSize: "16px", fontWeight: 500 }}>{row.provider}</TableCell>
                                    <TableCell align="left" sx={{ fontSize: "16px", fontWeight: 500 }}>{row.email}</TableCell>
                                    <TableCell align="center" sx={{ fontSize: "16px", fontWeight: 500 }}>{getCategoryName(row.category)}</TableCell>
                                    <TableCell align="center" className={classes.buttonContainer}>
                                        <Button variant="contained" startIcon={<MoreVertIcon />} className={classes.button} onClick={() => navigate(`/${row.id}`)}>Detail</Button>
                                        <Button variant="contained" color="error" startIcon={<DeleteIcon />} disabled={isSendingData} onClick={() => btnDelete(row)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <DialogModal openState={showDialog} onClose={() => setShowDialog(false)} title={"Delete"} dialogMsg={`Are you sure want to delete ${deleteData?.provider}?`} action={actionDialog} />
        </div>
    )
}