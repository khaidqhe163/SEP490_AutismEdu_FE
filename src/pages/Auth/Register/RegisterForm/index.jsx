import GoogleIcon from '@mui/icons-material/Google';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';
import { Box, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SvgIcon } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TrelloIcon from '~/assets/trello.svg?react';
import HtmlTooltip from '~/components/HtmlTooltip';
import service from '~/plugins/services';
import checkValid from '~/utils/auth_form_verify';
import PAGES from '~/utils/pages';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import { useFormik } from 'formik';
function RegisterForm({ setVerify, setEmailVerify }) {
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordConfirmError, setPasswordConfirmError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState()
    const [password, setPassword] = useState("");
    const [cfPassword, setCfPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const INPUT_CSS = {
        width: "100%",
        borderRadius: "15px",
        ".MuiFormHelperText-root": {
            color: "red"
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        if (loading) {
            handleSubmit();
        }
    }, [loading])

    const validate = values => {
        const errors = {};
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            province: '',
            district: '',
            commune: '',
            homeNumber: '',
            phoneNumber: '',
            password: ''
        },
        validate,
        onSubmit: async (values) => {
            handleSubmit
        }
    });
    const handleSubmit = async () => {
        if (emailError !== null || passwordError !== null || passwordConfirmError !== null) {
            setLoading(false);
            return;
        } else {
            const checkPw = checkValid(password, 2, setPasswordError);
            const checkCfPw = checkValid(cfPassword, 3, setPasswordConfirmError, password);
            const checkEmail = checkValid(email, 1, setEmailError);
            if (!checkPw || !checkCfPw || !checkEmail || fullName === "") {
                setLoading(false);
                return;
            } else {
                await service.AuthenticationAPI.register({
                    fullName,
                    email,
                    password,
                    role: "user"
                }, (res) => {
                    enqueueSnackbar("Đăng ký thành công!", { variant: "success" });
                    setVerify(true);
                    setEmailVerify(email);
                }, (err) => {
                    if (err.code === 500) {
                        enqueueSnackbar("Đăng ký thật bại!", { variant: "error" });
                    }
                    else enqueueSnackbar(err.error[0], { variant: "error" });
                })
                setLoading(false)
            }
        }
    }
    return (
        <Box sx={{ bgcolor: "#f7f7f9", display: "flex", alignItems: "center", justifyContent: "center", py: "50px" }}>
            <Card sx={{
                width: "450px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                borderRadius: "10px",
                p: "28px"
            }}>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                        <EscalatorWarningIcon sx={{ color: "#394ef4", fontSize: "40px" }} />
                        <Typography sx={{ fontSize: 20, fontWeight: "bold", color: "text.secondary" }}>
                            AutismEdu
                        </Typography>
                    </Box>
                    <Typography variant='h5' sx={{ color: "text.secondary", mt: "20px" }}>Hãy Tạo Một Tài Khoản 🚀</Typography>
                    <Typography sx={{ mt: "10px" }}>Chúng tôi sẽ cung chấp cho bạn những dịch vụ mà chúng tôi có!</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Box mt="30px">
                            <FormControl sx={{ ...INPUT_CSS, mt: "20px" }} variant="outlined">
                                <InputLabel htmlFor="fullname">Họ và tên</InputLabel>
                                <OutlinedInput id="fullname" label="Họ và tên" variant="outlined"
                                    name='fullName'
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.fullName}
                                />
                                {
                                    formik.errors.fullName && (
                                        <FormHelperText error>
                                            {formik.errors.fullName}
                                        </FormHelperText>
                                    )
                                }
                            </FormControl>
                            <FormControl sx={{ ...INPUT_CSS, mt: "20px" }} variant="outlined">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <OutlinedInput id="email" label="Email" variant="outlined" type='email'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.email} />
                                {
                                    formik.errors.email && (
                                        <FormHelperText error>
                                            {formik.errors.email}
                                        </FormHelperText>
                                    )
                                }
                            </FormControl>
                            <FormControl sx={{ ...INPUT_CSS, mt: "20px" }} variant="outlined">
                                <InputLabel htmlFor="phoneNumber">Số điện thoại</InputLabel>
                                <OutlinedInput id="phoneNumber" label="Số điện thoại" variant="outlined" type='text'
                                    name='phoneNumber'
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.phoneNumber} />
                                {
                                    formik.errors.phoneNumber && (
                                        <FormHelperText error>
                                            {formik.errors.phoneNumber}
                                        </FormHelperText>
                                    )
                                }
                            </FormControl>
                            <FormControl sx={{ ...INPUT_CSS, mt: "20px" }}>
                                <InputLabel id="province">Tỉnh / Thành phố</InputLabel>
                                <Select
                                    labelId="province"
                                    value={formik.values.province}
                                    label="Tỉnh / Thành phố"
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ ...INPUT_CSS, mt: "20px" }}>
                                <InputLabel id="district">Huyện / Quận</InputLabel>
                                <Select
                                    labelId="district"
                                    value={formik.values.district}
                                    label="Huyện / Quận"
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ ...INPUT_CSS, mt: "20px" }}>
                                <InputLabel id="commune">Xã / Phường</InputLabel>
                                <Select
                                    labelId="commune"
                                    value={formik.values.commune}
                                    label="Xã / Phường"
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.homeNumber}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ ...INPUT_CSS, mt: "20px" }}>
                                <InputLabel htmlFor="homeNumber">Số nhà</InputLabel>
                                <OutlinedInput id="homeNumber" label="Số nhà" variant="outlined" type='text'
                                    name='homeNumber'
                                    value={formik.values.homeNumber}
                                    onChange={formik.handleChange}
                                    error={!!formik.errors.homeNumber} />
                                {
                                    formik.errors.homeNumber && (
                                        <FormHelperText error>
                                            {formik.errors.homeNumber}
                                        </FormHelperText>
                                    )
                                }
                            </FormControl>
                            <FormControl sx={{ ...INPUT_CSS, mt: "20px" }} variant="outlined">
                                <InputLabel htmlFor="password">Mật khẩu</InputLabel>
                                <OutlinedInput
                                    error={!!passwordError}
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => { checkValid(e.target.value, 2, setPasswordError); setPassword(e.target.value) }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Mật khẩu"
                                />
                                {
                                    passwordError && (
                                        <FormHelperText error id="password-error">
                                            <Box sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                                <p>{passwordError}</p>
                                                <HtmlTooltip
                                                    title={
                                                        <React.Fragment>
                                                            <ul style={{ padding: "0", listStyle: "none" }}>
                                                                <li>Password length from 8 to 15 characters</li>
                                                                <li>Contains at least 1 number</li>
                                                                <li>Contains lowercase and uppercase letters</li>
                                                                <li>Contains at least one of the following special characters (. ! & %)</li>
                                                            </ul>
                                                        </React.Fragment>
                                                    }
                                                >
                                                    <HelpOutlineIcon sx={{ fontSize: "16px" }} />
                                                </HtmlTooltip>
                                            </Box>
                                        </FormHelperText>
                                    )
                                }
                            </FormControl>
                            <FormControl sx={{ ...INPUT_CSS, mt: "20px" }} variant="outlined">
                                <InputLabel htmlFor="confirm-password">Nhập lại mật khẩu</InputLabel>
                                <OutlinedInput
                                    error={!!passwordConfirmError}
                                    value={cfPassword}
                                    id="confirm-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => {
                                        if (!e.target.value.includes(" ")) {
                                            setCfPassword(e.target.value);
                                            checkValid(e.target.value, 3, setPasswordConfirmError, password);
                                        }
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Nhập lại mật khẩu"
                                />
                                {
                                    passwordConfirmError && (
                                        <FormHelperText error id="cf-password-id">
                                            {passwordConfirmError}
                                        </FormHelperText>
                                    )
                                }
                            </FormControl>
                        </Box>
                        <LoadingButton variant='contained' sx={{ width: "100%", marginTop: "20px" }}
                            loading={loading} loadingIndicator="Sending..."
                            onClick={() => {
                                setLoading(true);
                            }}>
                            Đăng ký
                        </LoadingButton>
                    </form>
                    <Typography sx={{ textAlign: "center", mt: "20px" }}>Bạn đã có tài khoản? <Link to={PAGES.ROOT + PAGES.LOGIN} style={{ color: "#666cff" }}>Đăng nhập</Link></Typography>
                    <Divider sx={{ mt: "15px" }}>hoặc</Divider>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton>
                            <GoogleIcon sx={{ color: "#dd4b39 " }} />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default RegisterForm;
