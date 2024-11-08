import { Box, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
import VisibilityIcon from '@mui/icons-material/Visibility';
function AssessmentManagement() {
    const [loading, setLoading] = useState(false);
    const [assessments, setAssessment] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currentAss, setCurrentAss] = useState(0);

    useEffect(() => {
        handleGetAsessment()
    }, [])
    const handleGetAsessment = async () => {
        try {
            await services.AssessmentManagementAPI.listAssessment((res) => {
                setAssessment(res.result.questions)
            }, (err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    return (
        <Box sx={{
            p: 2,
            position: "relative",
        }}>
            <Typography variant='h4'>Bảng danh sách đánh giá</Typography>
            {
                assessments.length === 0 ? (
                    <Typography mt={5}>Chưa có đánh giá nào</Typography>
                ) : (
                    <>
                        <TableContainer component={Paper} sx={{ mt: "20px" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell>Tên đánh giá</TableCell>
                                        <TableCell align='center'>Ngày tạo</TableCell>
                                        <TableCell align='center'>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        assessments.length !== 0 && assessments?.map((assess, index) => {
                                            return (
                                                <TableRow key={assess.id}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>
                                                        {assess.question}
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        {formatDate(assess.createdDate)}
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                        <IconButton onClick={() => { handleOpen(); setCurrentAss(index) }}>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                            <LoadingComponent open={loading} setOpen={setLoading} />
                        </TableContainer >
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 700,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                maxHeight: "80vh",
                                overflowY: "auto",
                                p: 4
                            }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
                                    {assessments[currentAss].question}
                                </Typography>
                                <Grid container rowSpacing={3}>
                                    {
                                        assessments[currentAss].assessmentOptions?.map((a, index) => {
                                            return (
                                                <>
                                                    <Grid item xs={2}>
                                                        {a.point} điểm
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        {a.optionText}
                                                    </Grid>
                                                </>
                                            )
                                        })
                                    }
                                </Grid>
                            </Box>
                        </Modal>
                    </>
                )
            }

        </Box >
    )
}

export default AssessmentManagement
