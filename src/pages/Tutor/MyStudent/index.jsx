import { Avatar, Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'

function MyStudent() {
    return (
        <Stack direction="row" sx={{
            px: "50px",
            pt: '30px'
        }}>
            <Card sx={{ width: 345 }}>
                <Box sx={{
                    background: "linear-gradient(to right, #4468f1, #c079ea);",
                    position: "relative",
                    p: "20px"
                }}>
                    <Typography gutterBottom variant="h5" component="div" color={"white"}>
                        ĐQK
                    </Typography>
                    <Typography gutterBottom component="div" sx={{ width: "70%" }} color={"white"}>
                        Nguyễn Trần Trung Quốc
                    </Typography>
                    <Avatar alt='Khai Dao' src='/' sx={{
                        height: "80px",
                        width: "80px",
                        fontSize: "40px",
                        bgcolor: "#c2185b",
                        position: "absolute",
                        bottom: "-40px",
                        right: "20px"
                    }} />
                </Box>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Ngày sinh: 10-02-2022
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', width: "70%" }} mt={2}>
                        Địa chỉ: Thôn 3 - Thạch Hoà - Thạch Thất - Hà Nội
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Xem chi tiết</Button>
                </CardActions>
            </Card>
        </Stack>
    )
}

export default MyStudent
