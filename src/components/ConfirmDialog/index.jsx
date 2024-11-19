import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'
import LoadingComponent from '../LoadingComponent';

function ConfirmDialog({ openConfirm, setOpenConfirm, handleAction, title, content }) {
    const [loading, setLoading] = useState(true);
    const handleSubmit = async () => {
        setLoading(true);
        handleAction();
        setLoading(false);
    }
    return (
        <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Đồng ý</Button>
                <Button onClick={() => setOpenConfirm(false)} autoFocus>
                    Huỷ bỏ
                </Button>
            </DialogActions>
            <LoadingComponent open={loading} />
        </Dialog>
    )
}

export default ConfirmDialog
