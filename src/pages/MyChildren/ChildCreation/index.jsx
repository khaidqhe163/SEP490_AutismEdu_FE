import { Box, Button, FormHelperText, Grid, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: "90vh",
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflowY: "auto",
    p: 4,
};
function ChildCreation() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            gender: 'Nam',

        },
        validate,
        onSubmit: async (values) => {

        }
    });
    console.log(formik.values);
    return (
        <>
            <Button variant='contained' startIcon={<AddIcon />} onClick={handleOpen}>Thêm thông tin trẻ</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thêm thông tin của trẻ
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container px="50px" py="50px" columnSpacing={2} rowSpacing={3}>
                            <Grid item xs={3} textAlign="right">Họ và tên</Grid>
                            <Grid item xs={9}>
                                <TextField size='small' fullWidth value={formik.values.fullName}
                                    name='fullName'
                                    onChange={formik.handleChange} />
                                {
                                    formik.errors.fullName && (
                                        <FormHelperText error>
                                            {formik.errors.fullName}
                                        </FormHelperText>
                                    )
                                }
                            </Grid>
                            <Grid item xs={3} textAlign="right">Giới tính</Grid>
                            <Grid item xs={9}>
                                <Select
                                    name='gender'
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    fullWidth
                                >
                                    <MenuItem value={"Nam"}>Nam</MenuItem>
                                    <MenuItem value={"Nữ"}>Nữ</MenuItem>
                                </Select>
                                {
                                    formik.errors.gender && (
                                        <FormHelperText error>
                                            {formik.errors.gender}
                                        </FormHelperText>
                                    )
                                }
                            </Grid>
                            <Grid item xs={3} textAlign="right">Ngày sinh</Grid>
                            <Grid item xs={9}>
                                <TextField size='small' type='date' value={formik.values.dateOfBirth}
                                    name='dateOfBirth'
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        max: new Date().toISOString().split('T')[0]
                                    }} />
                                {
                                    formik.errors.dateOfBirth && (
                                        <FormHelperText error>
                                            {formik.errors.dateOfBirth}
                                        </FormHelperText>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
                            <Button variant='contained' type='submit'>Thêm</Button>
                            <Button onClick={handleClose}>Huỷ</Button>
                        </Box>
                    </form>

                </Box>
            </Modal>
        </>
    )
}

export default ChildCreation
