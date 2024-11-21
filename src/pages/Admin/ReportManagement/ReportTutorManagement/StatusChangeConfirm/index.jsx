import { Box, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
function StatusChangeConfirm({ id, status, open, setOpen, setReport, report }) {
    const [rejectReason, setRejectReason] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (rejectReason === "") {
                setLoading(false);
                enqueueSnackbar("Bạn chưa nhập lý do", { variant: "error" })
                return;
            }
            await services.ReportManagementAPI.changeReportStatus(id,
                {
                    id: id,
                    statusChange: status,
                    comment: rejectReason
                },
                (res) => {
                    enqueueSnackbar("Cập nhật thành công!", { variant: "success" })
                    setReport({
                        ...report,
                        status: status
                    })
                    setOpen(false);
                }, (err) => {
                    enqueueSnackbar("Lỗi hệ thống!", { variant: "error" })
                }, {
                id: id
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
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
                <Typography fontWeight="bold">
                    Bạn muốn {status === 1 ? "chấp nhận" : "từ chối"} đơn tố cáo này ?
                </Typography>
                <Typography mt={3}>Phản hồi</Typography>
                <TextField
                    multiline
                    rows={8}
                    fullWidth
                    value={rejectReason}
                    onChange={(e) => { setRejectReason(e.target.value) }}
                />
                <Box textAlign="right" mt={2}>
                    <Button onClick={() => setOpen(false)}>Huỷ bỏ</Button>
                    <Button onClick={handleSubmit}>{status === 1 ? "Chấp nhận" : "Từ chối"}</Button>
                </Box>
                <LoadingComponent open={loading} setLoading={setLoading} />
            </Box>
        </Modal>
    )
}

export default StatusChangeConfirm
