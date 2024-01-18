import { DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText, Button } from "@mui/material"

export default function DialogModal({openState, onClose, title, dialogMsg, action }) {
    return (
        <Dialog
            open={openState}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogMsg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => action(false)}>Disagree</Button>
                <Button onClick={() => action(true)} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}