import { Avatar, Box, Divider, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { formatter } from '~/utils/service';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
function BasicInformation({ information }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [verification, setVerification] = useState(null);
    const [currentImg, setCurrentImg] = useState(0);
    const [openDialog, setOpenDialog] = React.useState(false);
    useEffect(() => {
        if (information) {
            const CCCD = information.certificates.find((c) => {
                return c.certificateName === "Căn cước công dân"
            })
            setVerification(CCCD)
        }
    }, [open])
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const formattedDate = dateObj.getDate().toString().padStart(2, '0') + '/' +
            (dateObj.getMonth() + 1).toString().padStart(2, '0') + '/' +
            dateObj.getFullYear();
        return formattedDate;
    }

    const formatAddress = (address) => {
        const addressParts = address.split('|');
        const formattedAddress = `${addressParts[3]} - ${addressParts[2]} - ${addressParts[1]} - ${addressParts[0]}`;
        return formattedAddress;
    }
    return (
        <Box>
            <IconButton onClick={handleOpen}>
                <RemoveRedEyeIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Stack direction="row" sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "1200px",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    gap: 2,
                    maxHeight: "90vh",
                    overflow: "auto"
                }}>
                    <IconButton sx={{ position: "absolute", top: "5px", right: "5px" }} onClick={handleClose}>
                        <CancelOutlinedIcon />
                    </IconButton>
                    <Box sx={{
                        width: "45%",
                        borderRight: "2px solid gray",
                        pr: 3
                    }}>
                        <Avatar src={information.imageUrl}
                            sx={{
                                width: "100px",
                                height: '100px',
                                margin: "auto"
                            }} />
                        <Grid container pl={2} py="50px" columnSpacing={2} rowSpacing={1.5}>
                            <Grid item xs={3} textAlign="right">Họ và tên:</Grid>
                            <Grid item xs={9}>{information?.fullName}</Grid>
                            <Grid item xs={3} textAlign="right">Email:</Grid>
                            <Grid item xs={9}>{information?.email}</Grid>
                            <Grid item xs={3} textAlign="right">Ngày sinh:</Grid>
                            <Grid item xs={9}>{formatDate(information.dateOfBirth)}</Grid>
                            <Grid item xs={3} textAlign="right">Địa chỉ:</Grid>
                            <Grid item xs={9}>{formatAddress(information.address)}</Grid>
                            <Grid item xs={3} textAlign="right">Số điện thoại:</Grid>
                            <Grid item xs={9}>{information.phoneNumber}</Grid>
                            {
                                verification && (
                                    <>
                                        <Grid item xs={3} textAlign="right">Mã CCCD:</Grid>
                                        <Grid item xs={9}>{verification?.identityCardNumber}</Grid>
                                        <Grid item xs={3} textAlign="right">Nơi cấp:</Grid>
                                        <Grid item xs={9}>{verification.issuingInstitution}</Grid>
                                        <Grid item xs={3} textAlign="right">Ngày cấp:</Grid>
                                        <Grid item xs={9}>{verification.issuingDate ? formatDate(verification.issuingDate) : ""}
                                            <Box>
                                                {
                                                    verification.certificateMedias?.map((v, index) => {
                                                        return (
                                                            <img key={v.id} src={v.urlPath} alt='cccd' width={70} height={70} style={{
                                                                marginRight: "10px",
                                                                marginTop: "10px",
                                                                cursor: "pointer",
                                                            }}
                                                                onClick={() => { setCurrentImg(index); setOpenDialog(true) }}
                                                            />
                                                        )
                                                    })
                                                }
                                            </Box>
                                        </Grid>
                                    </>
                                )
                            }
                        </Grid>
                    </Box>
                    <Box width="50%" pb={3}>
                        <Typography variant='h5' mb={4}>Thông tin gia sư</Typography>
                        <Typography mt={2}>Độ tuổi dạy: {information.startAge} - {information.endAge} tuổi</Typography>
                        <Typography mt={2}>Số tiếng trên buổi: {information.sessionHours} tiếng / buổi</Typography>
                        <Typography mt={2}>Giá: {formatter.format(information.priceFrom)} - {formatter.format(information.priceEnd)}</Typography>
                        <Typography mt={2}>Giới thiệu: </Typography>
                        <Box sx={{ maxHeight: "60%", mt: 2, overflowY: "auto", p: 3, borderRadius: "5px", border: "1px gray solid" }}>
                            <Box sx={{ maxWidth: "100%" }} dangerouslySetInnerHTML={{ __html: information.aboutMe }} />
                        </Box>
                    </Box>
                </Stack>
            </Modal>
            {
                verification !== null && openDialog && (
                    <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100vh"
                            bgcolor="rgba(0, 0, 0, 0.8)"
                            position="relative"
                        >
                            <img
                                src={verification.certificateMedias[currentImg].urlPath}
                                alt="large"
                                style={{ maxWidth: '90%', maxHeight: '90%' }}
                            />

                            <IconButton
                                onClick={() => setOpenDialog(false)}
                                style={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                            <IconButton
                                style={{ position: 'absolute', left: 20, color: 'white' }}
                                onClick={() => setCurrentImg(currentImg === 0 ? 0 : currentImg - 1)}
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                            <IconButton
                                style={{ position: 'absolute', right: 20, color: 'white' }}
                                onClick={() => setCurrentImg(currentImg === verification.certificateMedias.length - 1 ? currentImg : currentImg + 1)}
                            >
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Box>
                    </Modal>
                )
            }
        </Box>
    )
}

export default BasicInformation
