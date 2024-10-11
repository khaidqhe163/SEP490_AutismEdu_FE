import { Box, Button, Chip, FormHelperText, Grid, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import childrenImg from '~/assets/images/children.png'
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import AddIcon from '@mui/icons-material/Add';
import ChildCreation from './ChildCreation';
function MyChildren() {
    const validate = values => {
        const errors = {};
        return errors;
    };

    const handleClick = () => {

    }
    const formik = useFormik({
        initialValues: {
            fullName: '',
            dateOfBirth: '',
            gender: '',

        },
        validate,
        onSubmit: async (values) => {

        }
    });

    return (
        <Stack direction='row' justifyContent="center" pt={5}>
            <Stack sx={{ width: "80%" }} direction="row" justifyContent="center">
                <Box sx={{ width: "60%" }}>
                    <Box sx={{ width: "100%", mb: 5 }}>
                        <ChildCreation />
                    </Box>
                    <Box>
                        <Chip icon={<FaceIcon />} label="Đào Quang Khải"
                            onClick={handleClick}
                            sx={{ mr: 3 }} />
                        <Chip icon={<Face3Icon />} label="Đào Quang Khải" variant="outlined" onClick={handleClick} />
                    </Box>
                    <Grid container columnSpacing={2} rowSpacing={3} mt={4}>
                        <Grid item xs={2}>Họ và tên: </Grid>
                        <Grid item xs={10}>
                            <TextField size='small' sx={{ width: "70%" }} fullWidth
                                name='' />
                            {
                                formik.errors.issuingInstitution && (
                                    <FormHelperText error>
                                        {formik.errors.issuingInstitution}
                                    </FormHelperText>
                                )
                            }
                        </Grid>
                        <Grid item xs={2}>Ngày sinh:</Grid>
                        <Grid item xs={10}>
                            <TextField size='small' sx={{ width: "70%" }} fullWidth
                                name='' />
                            {
                                formik.errors.issuingInstitution && (
                                    <FormHelperText error>
                                        {formik.errors.issuingInstitution}
                                    </FormHelperText>
                                )
                            }
                        </Grid>
                        <Grid item xs={2}>Giới tính:</Grid>
                        <Grid item xs={10}>
                            <TextField size='small' sx={{ width: "70%" }} fullWidth
                                name='' />
                            {
                                formik.errors.issuingInstitution && (
                                    <FormHelperText error>
                                        {formik.errors.issuingInstitution}
                                    </FormHelperText>
                                )
                            }
                        </Grid>
                    </Grid>
                </Box>
                <img src={childrenImg} style={{ maxHeight: "60vh" }} />
            </Stack>
        </Stack>
    )
}

export default MyChildren
