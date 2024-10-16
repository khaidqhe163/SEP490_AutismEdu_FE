import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, FormHelperText, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validate = (values) => {
        const errors = {};
        if (!values.oldPassword) {
            errors.oldPassword = "Bắt buộc"
        }
        if (!values.newPassword) {
            errors.newPassword = 'Bắt buộc';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$?_-]).+$/.test(values.newPassword)) {
            errors.newPassword = 'Mật khẩu không hợp lệ'
        }
        if (!values.cfPassword) {
            errors.cfPassword = 'Bắt buộc';
        } else if (values.password !== values.cfPassword) {
            errors.cfPassword = 'Không giống mật khẩu';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            cfPassword: ""
        },
        validate,
        onSubmit: async (values) => {

        }
    });


    return (
        <Box sx={{ bgcolor: "#efefef", width: "100%", py: "20px" }}>
            <Box sx={{
                width: "80%", m: "auto", pt: '50px', bgcolor: "white",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
                <Typography variant='h5' textAlign="center">Đổi mật khẩu</Typography>
                <Grid container px="100px" py="50px" columnSpacing={2} rowSpacing={3}>
                    <Grid item xs={5} textAlign="right">Mật khẩu hiện tại</Grid>
                    <Grid item xs={7}>
                        <TextField size='small' sx={{ width: "50%" }}
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange} name='oldPassword'
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
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
                                ),
                            }}
                        />
                        {
                            formik.errors.oldPassword && (
                                <FormHelperText error>
                                    {formik.errors.oldPassword}
                                </FormHelperText>
                            )
                        }
                    </Grid>
                    <Grid item xs={5} textAlign="right">Mật khẩu mới</Grid>
                    <Grid item xs={7}>
                        <TextField size='small' sx={{ width: "50%" }}
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            name='newPassword'
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
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
                                ),
                            }}
                        />
                        {
                            formik.errors.newPassword && (
                                <FormHelperText error>
                                    {formik.errors.newPassword}
                                </FormHelperText>
                            )
                        }
                    </Grid>
                    <Grid item xs={5} textAlign="right">Nhập lại mật khẩu mới</Grid>
                    <Grid item xs={7}>
                        <TextField size='small' sx={{ width: "50%" }}
                            value={formik.values.cfPassword}
                            onChange={formik.handleChange} name='cfPassword'
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
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
                                ),
                            }}
                        />
                        {
                            formik.errors.cfPassword && (
                                <FormHelperText error>
                                    {formik.errors.cfPassword}
                                </FormHelperText>
                            )
                        }
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ChangePassword
