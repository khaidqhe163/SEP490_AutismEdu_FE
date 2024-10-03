import { Avatar, Box, Grid, Stack, Typography } from '@mui/material'

function StudentInformation() {
    return (
        <Stack direction='row' sx={{
            width: "90%",
            margin: "auto",
            mt: "20px",
            gap: 2
        }}>
            <Box sx={{
                width: "60%",
                height: "100px"
            }}>
                <Typography variant='h2'>
                    Tình trạng ban đầu
                </Typography>
                <Typography mt={2}>
                    Tự kỷ là một trong những rối loạn phát triển hay gặp ở trẻ em. Trẻ mắc tự kỷ không những phát triển chậm về quan hệ xã hội, ngôn ngữ, giao tiếp, học hành mà còn có những rối loạn hành vi ảnh hưởng lớn đến gia đình và xã hội.

                    Kể từ khi bắt đầu công bố, C.A.R.S (CARS) đã trở thành một trong những công cụ đánh giá tự kỷ được sử dụng rộng rãi nhất và được thực nghiệm xác nhận. Thang đánh giá này ngắn gọn, thuận tiện và phù hợp với mọi trẻ từ 02 tuổi trở lên.

                    Chẩn đoán sớm tự kỷ trước 3 tuổi giúp trẻ có nhiều cơ hội được hội nhập xã hội. Vì vậy, ba mẹ nên quan tâm đến hành vi của trẻ và thực hiện bài test sau. Thang đánh giá tự kỷ thời thơ ấu - CARS giúp xác định các trẻ em mắc chứng tự kỷ và mức độ triệu chứng thông qua các đánh giá định lượng dựa trên quan sát trực tiếp.
                </Typography>
                <Typography variant='h2' mt={2}>
                    Bảng đánh giá
                </Typography>
                <Grid container mt={2} rowSpacing={2}>
                    <Grid item xs={9}>
                        Vấn đề quan hệ với con người
                    </Grid>
                    <Grid item xs={3} color="red">
                        1 điểm
                    </Grid>
                    <Grid item xs={9}>
                    Vấn đề quan hệ với con người
                    </Grid>
                    <Grid item xs={3}>
                        <Typography color='#ffcc00'>2 điểm</Typography>
                    </Grid>
                    <Grid item xs={9}>
                    Vấn đề quan hệ với con người
                    </Grid>
                    <Grid item xs={3} color="green">
                        4 điểm
                    </Grid>
                    <Grid item xs={9}>
                        <b>TỔNG</b>
                    </Grid>
                    <Grid item xs={3} color="green">
                        4 điểm
                    </Grid>

                </Grid>
            </Box>
            <Box sx={{
                background: `#6f62f8`,
                width: "40%",
                margin: "auto",
                transition: 'height 0.5s ease',
                borderRadius: "10px",
                py: "30px"
            }}>
                <Avatar alt='Khai Dao' src='/' sx={{
                    height: "80px",
                    width: "80px",
                    fontSize: "40px",
                    bgcolor: "#c2185b",
                    margin: "auto"
                }} />
                <Grid container sx={{ margin: "auto", color: "white", px: "40px", fontSize: "17px", mt: 2 }}
                    rowSpacing={1}>
                    <Grid item xs={4}>Họ và tên:</Grid>
                    <Grid item xs={8}>Nguyễn Văn A</Grid>
                    <Grid item xs={4}>Giới tính:</Grid>
                    <Grid item xs={8}>Nam</Grid>
                    <Grid item xs={4}>Ngày sinh:</Grid>
                    <Grid item xs={8}>20-02-2002</Grid>
                    <Grid item xs={4}>Số điện thoại:</Grid>
                    <Grid item xs={8}>09498484848</Grid>
                    <Grid item xs={4}>Địa chỉ:</Grid>
                    <Grid item xs={8}>Thôn 3 - Thạch Hoà - Thạch Thất - Hà Nội</Grid>
                </Grid>
            </Box>
        </Stack>
    )
}

export default StudentInformation
