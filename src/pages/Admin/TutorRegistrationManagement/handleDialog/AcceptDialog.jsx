import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import { Box, Modal, Stack, Typography } from '@mui/material';

function AcceptDialog({ id, status, setListTutor, listTutor }) {
    const [open, setOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        try {
            services.TutorManagementAPI.handleRegistrationForm(id,
                {
                    id: id,
                    statusChange: status,
                    rejectionReason: ""
                },
                (res) => {
                    const tutor = listTutor.find((l) => {
                        return l.id === id;
                    })
                    tutor.status === status;
                    setListTutor(pre => setListTutor(pre));
                    enqueueSnackbar("Cập nhật thành công!", { variant: "success" })
                    tutor.requestStatus = status;
                }, (err) => {
                    enqueueSnackbar("Lỗi hệ thống!", { variant: "error" })
                }, {
                id: id
            })
        } catch (error) {
            console.log(error);
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
                                maxRows={10}
                                fullWidth
                            />
                            <Box textAlign="right" mt={2}>
                                <Button>Huỷ bỏ</Button>
                                <Button>Từ chối</Button>
                            </Box>
                        </Box>
                    </Modal>
                )
            }
        </>
    )
}

export default AcceptDialog
