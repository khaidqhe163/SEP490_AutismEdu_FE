import { Box, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';

function AcceptDialog({ id, status, setListTutor, listTutor }) {
    const [open, setOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [loading, setLoading] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (status === 0 && rejectReason === "") {
                setLoading(false);
                enqueueSnackbar("Bạn chưa nhập lý do", { variant: "error" })
                return;
            }
            await services.TutorManagementAPI.handleRegistrationForm(id,
                {
                    id: id,
                    statusChange: status,
                    rejectionReason: ""
                },
                (res) => {
                    setListTutor((pre) =>
                        pre.map((tutor) =>
                            tutor.id === res.result.id ? res.result : tutor
                        )
                    );
                    enqueueSnackbar("Cập nhật thành công!", { variant: "success" })
                }, (err) => {
                    enqueueSnackbar("Lỗi hệ thống!", { variant: "error" })
                }, {
                id: id
            });
            setLoading(false);
            handleClose();
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <>
            <Button color={status === 1 ? "success" : "error"} variant='contained'
                onClick={handleClickOpen}
            >{status === 1 ? "Chấp nhận" : "Từ chối"}</Button>
            {
                status === 1 && (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        sx={{ height: "500px" }}
                    >
                        <DialogContent>
                            <DialogContentText>
                                Bạn có muốn {status === 1 ? "chấp nhận" : "từ chối"} đơn đăng ký này?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Huỷ bỏ</Button>
                            <Button onClick={handleSubmit}>Chấp nhận</Button>
                        </DialogActions>
                        <LoadingComponent open={loading} setLoading={setLoading} />
                    </Dialog>
                )
            }
            {
                status === 0 && (
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600,
                            bgcolor: 'background.paper',
                            borderRadius: "10px",
                            boxShadow: 24,
                            p: 4
                        }}>
                            <Typography>
                                Bạn muốn từ chối đơn đăng ký này ?
                            </Typography>
                            <Typography mt={3}>Lý do</Typography>
                            <TextField
                                multiline
                                rows={8}
                                fullWidth
                                value={rejectReason}
                                onChange={(e) => { setRejectReason(e.target.value) }}
                            />
                            <Box textAlign="right" mt={2}>
                                <Button onClick={handleClose}>Huỷ bỏ</Button>
                                <Button onClick={handleSubmit}>Từ chối</Button>
                            </Box>
                            <LoadingComponent open={loading} setLoading={setLoading} />
                        </Box>
                    </Modal>
                )
            }
        </>
    )
}

export default AcceptDialog
