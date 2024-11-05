import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

function ConfirmDialog({openConfirm, setOpenConfirm, handleAction, title, content }) {
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
                <Button onClick={handleAction}>Đồng ý</Button>
                <Button onClick={() => setOpenConfirm(false)} autoFocus>
                    Huỷ bỏ
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
