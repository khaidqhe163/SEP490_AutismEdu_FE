import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
function ChildrenProfile({ childrenInfo, currentChild, childrenInfoRequest }) {
    return (
        <Card sx={{ mt: 3, px: 2 }}>
            <CardContent sx={{ px: 0 }}>
                <Typography variant='h5'>Thông tin trẻ</Typography>
            </CardContent>
            {
                childrenInfoRequest ? <>
                    <CardMedia
                        sx={{ height: "250px" }}
                        image={childrenInfoRequest?.childInformationMedias[0]?.urlPath}
                        title="green iguana"
                    />
                    <CardContent sx={{ p: 0 }}>
                        <Grid container rowSpacing={2} mt={1}>
                            <Grid item xs={4}>
                                <Typography>Họ tên trẻ:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{childrenInfoRequest?.name}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Ngày sinh:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{childrenInfoRequest?.birthDate.split('T')[0]}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Giới tính:</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>{childrenInfoRequest?.gender === "Male" ? "Nam" : "Nữ"}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </> :
                    (childrenInfo.length !== 0) && (
                        <>
                            <CardMedia
                                sx={{ height: "250px" }}
                                image={childrenInfo[currentChild].childInformationMedias[0].urlPath}
                                title="green iguana"
                            />
                            <CardContent sx={{ p: 0 }}>
                                <Grid container rowSpacing={2} mt={1}>
                                    <Grid item xs={4}>
                                        <Typography>Họ tên trẻ:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>{childrenInfo[currentChild].name}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Ngày sinh:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>{childrenInfo[currentChild].birthDate.split('T')[0]}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Giới tính:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>{childrenInfo[currentChild].gender === "Male" ? "Nam" : "Nữ"}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </>
                    )
            }
        </Card>
    )
}

export default ChildrenProfile
