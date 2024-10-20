import { Card, CardContent, Grid, Typography } from '@mui/material';
function ParentProfile({ parent }) {
    const fomatAddress = (address) => {
        const addressArr = address.split("|");
        return `${addressArr[3]} - ${addressArr[2]} - ${addressArr[1]} - ${addressArr[0]}`
    }
    return (
        <>
            <Card sx={{ px: 2 }}>
                <CardContent sx={{ px: 0 }}>
                    <Typography variant='h5'>Thông tin phụ huynh</Typography>
                    {
                        parent && (
                            <>
                                <Grid container rowSpacing={2} mt={1}>
                                    <Grid item xs={4}>
                                        <Typography>Họ tên:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>{parent.fullName}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Số điện thoại:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>{parent.phoneNumber}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Địa chỉ:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>{fomatAddress(parent.address)}</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        )
                    }
                </CardContent>
            </Card>
        </>
    )
}

export default ParentProfile
