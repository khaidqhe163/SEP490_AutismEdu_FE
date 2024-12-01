import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { LoadingButton } from '@mui/lab';
import { Box, SvgIcon } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrelloIcon from '~/assets/trello.svg?react';
import service from '~/plugins/services';
function VerifyEmail({ email, setVerify, submitState }) {
    const [loading, setLoading] = useState(false);
    // const { email } = useParams();
    const [submited, setSubmited] = useState(submitState);
    const nav = useNavigate();
    useEffect(() => {
        if (loading) {
            handleSubmit();
        }
    }, [loading])

    const handleSubmit = async () => {
        await service.AuthenticationAPI.verifyAccount({
            email
        }, (res) => {
            enqueueSnackbar("Check your email!", { variant: "success" });
        }, (err) => {
            console.log(err);
            if (err.code === 500) {
                enqueueSnackbar("Failed to reset password!", { variant: "error" });
            }
            else enqueueSnackbar(err.error[0], { variant: "error" });
        })
        setLoading(false);
        setSubmited(true);
    }
    return (
        <Box sx={{ bgcolor: "#f7f7f9", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Card sx={{
                width: "450px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                borderRadius: "10px",
                p: "28px"
            }}>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                        <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'blue' }} />
                        <Typography sx={{ fontSize: 20, fontWeight: "bold", color: "text.secondary" }}>
                            My App
                        </Typography>
                    </Box>
                    <Typography variant='h5' sx={{ color: "text.secondary", mt: "20px" }}>Xác thực tài khoản! 👋</Typography>
                    <Typography sx={{ mt: "10px" }}>Làm ơn xác thực tài khoản của bạn để có thể đăng nhập vào hệ thống.</Typography>
                    <Box mt="30px">
                        {submited ? (
                            <Typography>Check your email ({email})</Typography>
                        ) : (
                            <Typography>Send verify link to {email} </Typography>
                        )}
                    </Box>
                    <LoadingButton variant='contained' sx={{ width: "100%", marginTop: "20px" }} onClick={() => setLoading(true)}
                        loading={loading} loadingIndicator="Đang gửi..."
                    >
                        {submited ? "Gửi lại" : "Gửi"}
                    </LoadingButton>
                    <Typography textAlign={'center'} mt="20px" onClick={() => { setVerify(false) }} sx={{ cursor: "pointer" }}>
                        <ArrowBackIosNewIcon sx={{ fontSize: "12px" }} /> Trở lại đăng nhập
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default VerifyEmail;
