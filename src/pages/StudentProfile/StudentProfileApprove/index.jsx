import { Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import services from '~/plugins/services';

function StudentProfileApprove() {
    const { id } = useParams();
    const [studentProfile, setStudentProfile] = useState(null);
    useEffect(() => {
        handleGetStudentProfile();
    }, []);
    const fomatAddress = (address) => {
        const addressArr = address.split("|");
        return `${addressArr[3]} - ${addressArr[2]} - ${addressArr[1]} - ${addressArr[0]}`
    }
    const handleGetStudentProfile = async () => {
        try {
            await services.StudentProfileAPI.getStudentProfileById(id, (res) => {
                console.log(res);
                setStudentProfile(res.result)
            }, (error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Stack direction="row" p="20px" sx={{
            bgcolor: "#f8fafb", width: '100%',
            pb: 3,
            justifyContent: "center"
        }} overflow="auto">
            <Box sx={{ width: "80%" }}>
                <Typography variant='h4'>Thông tin học sinh</Typography>
                <Stack direction='row' gap={2} mt={3}>
                    <Box sx={{ width: "35%" }}>
                        <Card sx={{ px: 2 }}>
                            <CardContent sx={{ px: 0 }}>
                                <Typography variant='h5'>Thông tin gia sư</Typography>
                            </CardContent>
                            <Avatar src='/' alt='Nguyen' sx={{
                                margin: "auto",
                                width: "150px",
                                height: "150px"
                            }} />
                            <CardContent sx={{ px: 0 }}>
                                <Grid container rowSpacing={2} mt={1}>
                                    <Grid item xs={4}>
                                        <Typography>Họ tên:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>Nguyen Van A</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Số điện thoại:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>09494848484</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Địa chỉ:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography></Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{ mt: 3, px: 2 }}>
                            <CardContent sx={{ px: 0 }}>
                                <Typography variant='h5'>Thông tin trẻ</Typography>
                            </CardContent>
                            <Avatar src='/' alt='Nguyen' sx={{
                                margin: "auto",
                                width: "150px",
                                height: "150px"
                            }} />
                            <CardContent sx={{ p: 0 }}>
                                <Grid container rowSpacing={2} mt={1}>
                                    <Grid item xs={4}>
                                        <Typography>Họ tên trẻ:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>Nguyen Van B</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Ngày sinh:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography></Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Giới tính:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography></Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ width: "60%" }}>
                        <Card sx={{ px: 2 }}>
                            <CardContent sx={{ px: 0 }}>
                                <Typography variant='h5'>Tình trạng ban đầu</Typography>
                                <Grid container columnSpacing={2} rowSpacing={2} mt={1}>
                                    <Grid item xs={6}>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{ px: 2, mt: 3 }}>
                            <CardContent sx={{ px: 0 }}>
                                <Typography variant='h5'>Lịch học</Typography>
                                <Box sx={{ display: "flex", mt: 3, flexWrap: "wrap", gap: 3 }}>
                                    <Box sx={{
                                        display: "flex",
                                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                        p: 2,
                                        gap: 2, alignItems: "center"
                                    }}>
                                        <Typography sx={{ fontSize: "12px" }}></Typography>
                                        <Divider orientation='vertical' sx={{ bgcolor: "black" }} />
                                        <Typography sx={{ fontSize: "12px" }}></Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}

export default StudentProfileApprove
