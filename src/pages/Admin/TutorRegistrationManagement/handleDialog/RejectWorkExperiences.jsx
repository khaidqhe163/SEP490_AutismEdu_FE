import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';

function RejectWorkExperiences({ workExperiences, setWorkExperiences, workExperiencesId }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [rejectReason, setRejectReason] = useState("");
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (rejectReason === "") {
                setLoading(false);
                enqueueSnackbar("Bạn chưa nhập lý do từ chối kinh nghiệm làm việc", { variant: "error" })
                return;
            } else if (rejectReason.length > 500) {
                setLoading(false);
                enqueueSnackbar("Lý do từ chối quá dài", { variant: "error" })
                return;
            }
            await services.WorkExperiencesAPI.changeWorkExperienceStatus(workExperiencesId,
                {
                    id: workExperiencesId,
                    statusChange: 0,
                    rejectionReason: rejectReason
                },
                (res) => {
                    const updatedWorkExperiences = workExperiences.map((c) => {
                        return c.id === res.result.id ? res.result : c
                    })
                    setWorkExperiences([...updatedWorkExperiences])
                    enqueueSnackbar("Cập nhật thành công!", { variant: "success" })
                }, (err) => {
                    enqueueSnackbar(err.error[0], { variant: "error" })
                });
            setLoading(false);
            handleClose();
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <>
            <Button onClick={handleOpen}>Từ chối</Button>
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
                        Bạn muốn từ chối kinh nghiệm làm việc này ?
                    </Typography>
                    <Typography mt={3}>Lý do</Typography>
                    <TextField
                        multiline
                        rows={8}
                        fullWidth
                        value={rejectReason}
                        onChange={(e) => { setRejectReason(e.target.value) }}
                    />
                    <Typography textAlign="right">{rejectReason.length} / 500</Typography>
                    <Box textAlign="right" mt={2}>
                        <Button onClick={handleClose}>Huỷ bỏ</Button>
                        <Button onClick={handleSubmit}>Từ chối</Button>
                    </Box>
                    <LoadingComponent open={loading} setLoading={setLoading} />
                </Box>
            </Modal>
        </>
    )
}

export default RejectWorkExperiences
