import { Box, Button, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import HtmlTooltip from '~/components/HtmlTooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
function AccountInformation({ handleNext, steps, handleBack, activeStep }) {
    const validate = (values) => {
        const errors = {};
        const rgPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!&%]).+$/
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!values.email) {
            errors.email = "Bắt buộc nhập"
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Email của bạn không hợp lệ"
        }

        if (!values.password) {
            errors.password = "Bắt buộc nhập"
        } else if (!rgPassword.test(values.password)) {
            errors.password = "Mật khẩu không hợp lệ"
        } else if (values.password.length < 8) {
            errors.password = "Mật khẩu của bạn quá ngắn."
        } else if (values.password.length > 15) {
            errors.password = "Mật khẩu của bạn quá dài"
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Bắt buộc nhập"
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Mật khẩu không khớp"
        }
        return errors
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: async (values) => {
            handleNext();
        }
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h2' textAlign="center" mt={3}>Thông tin tài khoản</Typography>
                <Grid container columnSpacing={2} rowSpacing={3} mt={2}>
                    <Grid item xs={5} textAlign="right">Email</Grid>
                    <Grid item xs={7}>
                        <TextField size='small' sx={{ width: "50%" }} onChange={formik.handleChange} name='email'
                            value={formik.values.email}
                        />
                        {
                            formik.errors.email && (
                                <FormHelperText error>
                                    {formik.errors.email}
                                </FormHelperText>
                            )
                        }
                    </Grid>
                    <Grid item xs={5} textAlign="right">Mật khẩu</Grid>
                    <Grid item xs={7}>
                        <TextField size='small' sx={{ width: "50%" }} onChange={formik.handleChange} name='password'
                            value={formik.values.password}
                        />
                        {
                            formik.errors.password && (
                                <FormHelperText error id="password-error">
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 3
                                    }}>
                                        <p>{formik.errors.password}</p>
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
                    </Grid>
                    <Grid item xs={5} textAlign="right">Nhập lại mật khẩu</Grid>
                    <Grid item xs={7}>
                        <TextField size='small' sx={{ width: "50%" }} onChange={formik.handleChange} name='confirmPassword'
                            value={formik.values.confirmPassword}
                        />
                        {
                            formik.errors.confirmPassword && (
                                <FormHelperText error>
                                    {formik.errors.confirmPassword}
                                </FormHelperText>
                            )
                        }
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button type="submit">
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default AccountInformation
