import AddIcon from '@mui/icons-material/Add';
import { Box, Button, FormHelperText, Grid, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import ModalUploadAvatar from '~/pages/Tutor/TutorRegistration/TutorInformation/ModalUploadAvatar';
import axios from '~/plugins/axios';
import services from '~/plugins/services';
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
function ChildCreation({ setChildren }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (!open) {
            setAvatar(null);
            formik.resetForm();
        }
    }, [open])
    const validate = values => {
        const errors = {};
        if (!values.fullName) {
            errors.fullName = "Bắt buộc"
        } else if (!/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÊÔưăêôƠƯÀẢÃÁẠĂẮẰẲẴẶÂẦẤẨẪẬÈẺẼÉẸÊỀẾỂỄỆÌỈĨÍỊÒỎÕÓỌÔỒỐỔỖỘƠỜỚỞỠỢÙỦŨÚỤƯỪỨỬỮỰỲỶỸÝỴàảãáạăắằẳẵặâầấẩẫậèẻẽéẹêềếểễệìỉĩíịòỏõóọôồốổỗộơờớởỡợùủũúụưừứửữựỳỷỹýỵ\s]+$/.test(values.fullName)) {
            errors.fullName = "Tên không hợp lệ!"
        }
        if (!values.gender) {
            errors.gender = "Bắt buộc"
        }
        if (!values.dateOfBirth) {
            errors.dateOfBirth = "Bắt buộc"
        }
        if (!avatar) {
            errors.avatar = "Bắt buộc"
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            fullName: '',
            dateOfBirth: '',
            gender: 'True',
        },
        validate,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const formData = new FormData();

                formData.append("Name", values.fullName);
                formData.append("isMale", values.gender);
                formData.append("BirthDate", values.dateOfBirth);
                formData.append("Media", avatar);
                axios.setHeaders({ "Content-Type": "multipart/form-data", "Accept": "application/json, text/plain, multipart/form-data, */*" });
                await services.ChildrenManagementAPI.createChild(formData, (res) => {
                    setChildren((pre) => [...pre, res.result])
                    enqueueSnackbar("Tạo thành công!", { variant: "success" });
                    handleClose();
                }, (err) => {
                    enqueueSnackbar(err.error[0], { variant: "error" })
                })
                axios.setHeaders({ "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" });
                setLoading(false)
            } catch (error) {
                setLoading(false);
                enqueueSnackbar("Tạo thất bại!", { variant: "error" })
            }
        }
    });
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
                            <Grid item xs={3} textAlign="right">Ảnh đại diện</Grid>
                            <Grid item xs={9}>
                                <ModalUploadAvatar setAvatar={setAvatar} />
                                {
                                    !avatar && <FormHelperText error>
                                        Bắt buộc
                                    </FormHelperText>
                                }
                                <Box>
                                    {
                                        avatar &&
                                        <img src={URL.createObjectURL(avatar)} alt='avatar' width={150} />
                                    }
                                </Box>
                            </Grid>
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
                                    <MenuItem value={"True"}>Nam</MenuItem>
                                    <MenuItem value={"False"}>Nữ</MenuItem>
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
                    <LoadingComponent open={loading} setOpen={setLoading} />
                </Box>
            </Modal>
        </>
    )
}

export default ChildCreation
