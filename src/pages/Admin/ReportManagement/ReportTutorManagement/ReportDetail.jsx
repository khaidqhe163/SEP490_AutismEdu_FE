import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Avatar, Box, Button, Grid, IconButton, Modal, Paper, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import services from '~/plugins/services';
import PAGES from '~/utils/pages';
import StatusChangeConfirm from './StatusChangeConfirm';

function ReportDetail() {
    const [report, setReport] = useState(null);
    const { id } = useParams();
    const [openImage, setOpenImage] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [relatedReport, setRelatedReport] = useState([]);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(1);

    useEffect(() => {
        const handleGetReport = async () => {
            try {
                await services.ReportManagementAPI.getReportDetail(id, (res) => {
                    setReport(res.result.result);
                    setRelatedReport(res.result.reportsRelated);
                }, (err) => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }

        handleGetReport();
    }, [])
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const getStatus = (status) => {
        let statusString = "";
        switch (status) {
            case 0:
                statusString = "Đã từ chối";
                break;
            case 1:
                statusString = "Đã tiếp nhận";
                break;
            case 2:
                statusString = "Đang chờ";
                break;
        }
        return statusString;
    }
    const formatAddress = (address) => {
        if (!address) return "";
        const addressParts = address?.split('|');
        const formattedAddress = `${addressParts[3]} - ${addressParts[2]} - ${addressParts[1]} - ${addressParts[0]}`;
        return formattedAddress;
    }
    return (
        <Stack sx={{ gap: 2, alignItems: "flex-start" }} direction='row'>
            <Box sx={{
                width: "60%"
            }}>
                <Paper variant='elevation' sx={{
                    p: 2
                }}>
                    <Typography variant='h5'>Thông tin đơn tố cáo</Typography>
                    <Stack direction='row' justifyContent="space-between" sx={{ mt: 2 }}>
                        <Box>
                            <Typography><span style={{ fontWeight: "bold" }}>Ngày tạo:</span> {formatDate(report?.createdDate)}</Typography>
                            <Typography><span style={{ fontWeight: "bold", marginRight: "10px" }}>Người tố cáo:</span>
                                <a href={'/admin/parent-profile/' + report?.reporter?.id} style={{ color: "blue", textDecoration: "underline" }}
                                    rel="noopener noreferrer" target="_blank"
                                >
                                    {report?.reporter?.email}
                                </a></Typography>
                        </Box>
                        <Typography>
                            <span style={{ fontWeight: "bold", marginRight: "10px" }}>Trạng thái đơn:</span>
                            <span style={{ color: report?.status === 1 ? "green" : report?.status === 2 ? "blue" : "red" }}>{getStatus(report?.status)}</span>
                        </Typography>
                    </Stack>
                    <Typography variant='h6' sx={{ textAlign: "center", mt: 5 }}>{report?.title}</Typography>
                    <Typography sx={{ whiteSpace: "break-spaces", px: 2 }}>{report?.description}</Typography>
                    <Typography mt={2} fontWeight="bold">Hình ảnh bằng chứng</Typography>
                    <Stack direction='row' gap={3} mt={2}>
                        {
                            report?.reportMedias && report?.reportMedias.length !== 0 && report?.reportMedias.map((image, index) => {
                                return (
                                    <Box key={index} sx={{
                                        backgroundImage: `url(${image.urlMedia})`, backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: "100px",
                                        height: "100px",
                                        cursor: "pointer",
                                        "&:hover .hoverContent": {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "#4589c4bf"
                                        }
                                    }}>
                                        <Box className="hoverContent" sx={{
                                            width: "100%",
                                            height: "100%",
                                            display: "none"
                                        }}>
                                            <IconButton onClick={() => { setOpenImage(true); setCurrentImage(index) }} >
                                                <RemoveRedEyeIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                        {
                            report?.reportMedias[currentImage] && report?.reportMedias.length !== 0 !== null && openImage && (
                                <Modal open={openImage} onClose={() => setOpenImage(false)}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="100vh"
                                        bgcolor="rgba(0, 0, 0, 0.8)"
                                        position="relative"
                                    >
                                        <img
                                            src={report?.reportMedias[currentImage]?.urlMedia}
                                            alt="large"
                                            style={{ maxWidth: '90%', maxHeight: '90%' }}
                                        />

                                        <IconButton
                                            onClick={() => setOpenImage(false)}
                                            style={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
                                        >
                                            <HighlightOffIcon />
                                        </IconButton>
                                        <IconButton
                                            style={{ position: 'absolute', left: 20, color: 'white' }}
                                            onClick={() => setCurrentImage(currentImage === 0 ? 0 : currentImage - 1)}
                                        >
                                            <ArrowBackIosIcon />
                                        </IconButton>
                                        <IconButton
                                            style={{ position: 'absolute', right: 20, color: 'white' }}
                                            onClick={() => setCurrentImage(currentImage === report?.reportMedias[currentImage].length - 1 ? currentImage : currentImage + 1)}
                                        >
                                            <ArrowForwardIosIcon />
                                        </IconButton>
                                    </Box>
                                </Modal>
                            )
                        }
                    </Stack>
                    {
                        report?.status === 2 && (
                            <Box mt={2}>
                                <Button variant='contained' color='success' sx={{ mr: 2 }}
                                    onClick={() => { setOpen(true); setStatus(1) }}
                                >Tiếp nhận</Button>
                                <Button variant='contained' color='warning'
                                    onClick={() => { setOpen(true); setStatus(0) }}
                                >Từ chối</Button>
                            </Box>
                        )
                    }
                </Paper>
                {
                    relatedReport.length !== 0 && (
                        <Paper variant='elevation' sx={{ p: 2, mt: 2 }}>
                            <Typography variant='h5'>Đơn tố cáo liên quan</Typography>
                            {
                                relatedReport.length === 0 && (
                                    <Typography>Không có đơn tố cáo liên quan nào!</Typography>
                                )
                            }
                            {
                                relatedReport.length !== 0 && (
                                    <ul>
                                        {
                                            relatedReport.map((r) => {
                                                return (
                                                    <li key={r.id}>
                                                        <Link to={PAGES.REPORT_TUTOR_MANAGEMENT + "/detail/" + r.id} style={{ textDecoration: 'underline', color: "blue" }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                window.open(PAGES.REPORT_TUTOR_MANAGEMENT + "/detail/" + r.id, '_blank');
                                                            }}>
                                                            {r.title}
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                )
                            }
                        </Paper>
                    )
                }
            </Box>
            <Box sx={{ width: "40%" }}>
                {
                    report && (
                        <Paper variant='elevation' sx={{ p: 2 }}>
                            <Typography variant='h5'>Gia sư bị tố cáo</Typography>
                            <Avatar alt="Remy Sharp" src={report.tutor?.imageUrl} sx={{
                                width: "150px",
                                height: "150px",
                                margin: "auto",
                                mt: 2
                            }} />
                            <Grid container pl={2} py="50px" columnSpacing={2} rowSpacing={1.5}>
                                <Grid item xs={3} textAlign="right">Họ và tên:</Grid>
                                <Grid item xs={9}>{report.tutor?.fullName}</Grid>
                                <Grid item xs={3} textAlign="right">Email:</Grid>
                                <Grid item xs={9}>{report.tutor?.email}</Grid>
                                <Grid item xs={3} textAlign="right">Ngày sinh:</Grid>
                                <Grid item xs={9}>{formatDate(report.tutor?.dateOfBirth)}</Grid>
                                <Grid item xs={3} textAlign="right">Địa chỉ:</Grid>
                                <Grid item xs={9}>{formatAddress(report.tutor?.address)}</Grid>
                                <Grid item xs={3} textAlign="right">Số điện thoại:</Grid>
                                <Grid item xs={9}>{report.tutor?.phoneNumber}</Grid>
                            </Grid>
                            <a href={'/admin/tutor-profile/' + report?.tutor?.userId} rel="noopener noreferrer" target="_blank">
                                <Button>Xem chi tiết</Button>
                            </a>
                        </Paper>
                    )
                }
            </Box>
            <StatusChangeConfirm status={status} id={report?.id || 0} open={open} setOpen={setOpen} setReport={setReport}
                report={report} />
        </Stack>
    )
}

export default ReportDetail
