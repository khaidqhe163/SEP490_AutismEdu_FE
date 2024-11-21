import { Avatar, Box, Button, Chip, FormHelperText, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import childrenImg from '~/assets/images/children.png'
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import AddIcon from '@mui/icons-material/Add';
import ChildCreation from './ChildCreation';
import { userInfor } from '~/redux/features/userSlice';
import { useSelector } from 'react-redux';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';
import ModalUploadAvatar from '../Tutor/TutorRegistration/TutorInformation/ModalUploadAvatar';
import axios from '~/plugins/axios';
function MyChildren() {
    const [children, setChildren] = useState([]);
    const userInfo = useSelector(userInfor);
    const [currentChild, setCurrentChild] = useState(0);
    const [change, setChange] = useState(true);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [childAvatar, setChildAvatar] = useState(null);
    useEffect(() => {
        console.log("zoday");
        if (userInfo)
            handleGetChildren();
    }, [userInfo])

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
        return errors;
    };

    const handleClick = (index) => {
        setCurrentChild(index)
    }
    const formik = useFormik({
        initialValues: {
            fullName: '',
            dateOfBirth: '',
            gender: '',

        },
        validate,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const formData = new FormData();

                formData.append("childId", children[currentChild].id);
                formData.append("Name", values.fullName);
                formData.append("isMale", values.gender);
                formData.append("BirthDate", values.dateOfBirth);
                if (avatar)
                    formData.append("Media", avatar);
                axios.setHeaders({ "Content-Type": "multipart/form-data", "Accept": "application/json, text/plain, multipart/form-data, */*" });
                await services.ChildrenManagementAPI.updateChild(formData, (res) => {
                    setChildren((pre) => pre.map((child) => {
                        return child.id === children[currentChild].id ? res.result : child
                    }))
                    enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
                }, (err) => {
                    console.log(err);
                    enqueueSnackbar("Cập nhật thất bại!", { variant: "error" })
                })
                axios.setHeaders({ "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" });
                setLoading(false);
                setChange(true);
                setAvatar(null);
            } catch (error) {
                setLoading(false);
                enqueueSnackbar("Tạo thất bại!", { variant: "error" })
            }
        }
    });
    useEffect(() => {
        if (children.length !== 0) {
            const formattedDate = children[currentChild].birthDate.split('T')[0];
            formik.resetForm({
                values: {
                    fullName: children[currentChild].name || '',
                    gender: children[currentChild].gender === "Male" ? "True" : "False" || '',
                    dateOfBirth: formattedDate || '',
                }
            });
            setChildAvatar(children[currentChild].imageUrlPath)
        }
        setChange(true);
    }, [children, currentChild])

    useEffect(() => {
        if (children.length !== 0) {
            const fullName = formik.values.fullName;
            const gender = formik.values.gender === "True" ? "Male" : "Female";
            const dateOfBirth = formik.values.dateOfBirth;
            const dateString = children[currentChild].birthDate.split('T')[0];
            if (dateOfBirth !== dateString || fullName !== children[currentChild].name
                || gender !== children[currentChild].gender || avatar) {
                setChange(false);
            } else {
                setChange(true)
            }
        }
    }, [formik])
    const handleGetChildren = async () => {
        try {
            setLoading(true);
            await services.ChildrenManagementAPI.listChildren(userInfo?.id, (res) => {
                setChildren(res.result.reverse());
            }, (err) => {
                console.log("data child ==> ", err);
            })
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <Stack direction='row' justifyContent="center" py={5}>
            <Stack sx={{ width: "80%" }} direction="row" justifyContent="center">
                <Box sx={{ width: "60%" }}>
                    <Box sx={{ width: "100%", mb: 5 }}>
                        <ChildCreation setChildren={setChildren} setCurrentChild={setCurrentChild} currentChild={currentChild} />
                    </Box>
                    {
                        children.length !== 0 ? (
                            <>
                                <Box>
                                    {
                                        children.map((c, index) => {
                                            return (
                                                <Chip icon={c.gender === "Male" ? <FaceIcon /> : <Face3Icon />} label={c.name}
                                                    onClick={() => { handleClick(index) }}
                                                    sx={{ mr: 3, mb: 3 }} key={c.id} variant={index === currentChild ? "filled" : "outlined"} />
                                            )
                                        })
                                    }
                                </Box>

                                <form onSubmit={formik.handleSubmit}>

                                    <Grid container columnSpacing={2} rowSpacing={3} mt={4}>
                                        <Grid item xs={2}>Ảnh đại diện: </Grid>
                                        <Grid item xs={10}>
                                            <ModalUploadAvatar setAvatar={setAvatar} />
                                            <Box>
                                                {
                                                    avatar ? (
                                                        <img src={URL.createObjectURL(avatar)} alt='avatar' width={150} />
                                                    ) : (
                                                        <img src={childAvatar} alt='avatar' width={150} />
                                                    )
                                                }
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2}>Họ và tên: </Grid>
                                        <Grid item xs={10}>
                                            <TextField size='small' sx={{ width: "70%" }} fullWidth
                                                onChange={formik.handleChange}
                                                value={formik.values.fullName}
                                                name='fullName' />
                                            {
                                                formik.errors.fullName && (
                                                    <FormHelperText error>
                                                        {formik.errors.fullName}
                                                    </FormHelperText>
                                                )
                                            }
                                        </Grid>
                                        <Grid item xs={2}>Ngày sinh:</Grid>
                                        <Grid item xs={10}>
                                            <TextField size='small' sx={{ width: "70%" }} fullWidth
                                                onChange={formik.handleChange}
                                                value={formik.values.dateOfBirth}
                                                type='date'
                                                name='dateOfBirth' />
                                            {
                                                formik.errors.dateOfBirth && (
                                                    <FormHelperText error>
                                                        {formik.errors.dateOfBirth}
                                                    </FormHelperText>
                                                )
                                            }
                                        </Grid>
                                        <Grid item xs={2}>Giới tính:</Grid>
                                        <Grid item xs={10}>
                                            <Select
                                                name='gender'
                                                value={formik.values.gender}
                                                onChange={formik.handleChange}
                                                sx={{ width: "70%" }}
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
                                            <Box mt={3}>
                                                <Button variant='contained' disabled={change} type='submit'>Lưu</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </>
                        ) : <Typography>Hệ thống chưa có thông tin về trẻ</Typography>
                    }
                </Box>
                <img src={childrenImg} style={{ maxHeight: "60vh" }} />
            </Stack>
            <LoadingComponent open={loading} setOpen={setLoading} />
        </Stack>
    )
}

export default MyChildren
