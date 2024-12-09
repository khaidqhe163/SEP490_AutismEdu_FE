import GoogleIcon from '@mui/icons-material/Google';
import { Box, IconButton } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import services from '~/plugins/services';
import { setUserInformation } from '~/redux/features/userSlice';
import PAGES from '~/utils/pages';
function GoogleLogin() {
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const nav = useNavigate();
    useEffect(() => {
        if (userId) {
            getUserById();
        }
    }, [userId])

    const getUserById = () => {
        services.UserManagementAPI.getUserById(userId, (res) => {
            dispatch(setUserInformation(res.result))
            enqueueSnackbar("Đăng nhập thành công!", { variant: "success" });
            nav(`${PAGES.ROOT}`)
        }, (error) => {
            enqueueSnackbar(error.error[0], { variant: "error" });
        })
    }
    const login = useGoogleLogin({
        onSuccess: credentialResponse => {
            services.AuthenticationAPI.loginGoogle({
                token: credentialResponse.code
            }, (res) => {
                Cookies.set('access_token', res.result.accessToken, { expires: 30 })
                Cookies.set('refresh_token', res.result.refreshToken, { expires: 365 })
                const decodedToken = jwtDecode(res.result.accessToken);
                setUserId(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
            }, (err) => {
                enqueueSnackbar(err.error, { variant: "error" });
            }
            )
        },
        onError: () => console.log('Login Failed'),
        flow: 'auth-code'
    });

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton onClick={login}>
                <GoogleIcon sx={{ color: "#dd4b39 " }} />
            </IconButton>
        </Box>
    )
}

export default GoogleLogin
