import { Avatar, Box, FormHelperText, Grid, MenuItem, Select, Stack, TextField } from '@mui/material'
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { userInfor } from '~/redux/features/userSlice';
import ModalUploadAvatar from '../Tutor/TutorRegistration/TutorInformation/ModalUploadAvatar';

function ParentProfile() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [avatar, setAvatar] = useState();
    const userInformation = useSelector(userInfor);
    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!values.email) {
            errors.email = "Bắt buộc"
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Email của bạn không hợp lệ"
        }
        if (!values.fullName) {
            errors.fullName = 'Bắt buộc';
        } else if (values.fullName.length > 20) {
            errors.fullName = 'Tên dưới 20 ký tự';
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = 'Bắt buộc';
        } else if (!/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/.test(values.phoneNumber)) {
            errors.phoneNumber = 'Số điện thoại không hợp lệ';
        }
        if (!values.province) {
            errors.province = 'Bắt buộc';
        }
        if (!values.district) {
            errors.district = 'Bắt buộc';
        }
        if (!values.commune) {
            errors.commune = 'Bắt buộc';
        }
        if (!values.homeNumber) {
            errors.homeNumber = 'Bắt buộc';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            province: '',
            district: '',
            commune: '',
            homeNumber: '',
            phoneNumber: '',
        },
        validate,
        onSubmit: async (values) => {

        }
    });

    useEffect(() => {
        getDataProvince();
        if (userInformation) {
            formik.setFieldValue("fullName", userInformation?.fullName || "");
            formik.setFieldValue("phoneNumber", userInformation?.phoneNumber || "");
            formik.setFieldValue("dateOfBirth", userInformation?.dateOfBirth || "");
            formik.setFieldValue("homeNumber", userInformation?.homeNumber || "");
            formik.setFieldValue("email", userInformation?.email || "");
            if (userInformation.image)
                setAvatar(userInformation.image)
        }
    }, [userInformation]);
    const getDataProvince = async () => {
        try {
            const data = await axios.get("https://vietnam-administrative-division-json-server-swart.vercel.app/province")
            const dataP = data.data;
            setProvinces(dataP);
            if (userInformation !== null) {
                const address = userInformation.address.split('|');
                const province = dataP.find((p) => { return p.name === address[0] });
                if (province) {
                    formik.setFieldValue("province", province.idProvince);
                    handleGetDistrict(districts);
                    const dataD = await handleGetDistrict(province.idProvince);
                    const district = dataD.find((d) => { return d.idDistrict === userInformation.district.idDistrict });
                    if (district) {
                        formik.setFieldValue("district", district.idDistrict);
                        const dataC = await handleGetCommunes(district.idDistrict);
                        const commune = dataC.find((c) => { return c.idCommune === userInformation.commune.idCommune });
                        if (commune) {
                            formik.setFieldValue("commune", commune.idCommune);
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleGetDistrict = async (id) => {
        try {
            if (id?.length !== 0) {
                const data = await axios.get("https://vietnam-administrative-division-json-server-swart.vercel.app/district?idProvince=" + id);
                setDistricts(data.data);
                return data.data
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleGetCommunes = async (id) => {
        try {
            const data = await axios.get("https://vietnam-administrative-division-json-server-swart.vercel.app/commune?idDistrict=" + id);
            setCommunes(data.data);
            return data.data
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box sx={{ bgcolor: "#efefef", width: "100%", py: "20px" }}>
            <Box sx={{
                width: "80%", m: "auto", pt: '50px', bgcolor: "white",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
                <Box sx={{ m: "auto", textAlign: "center" }}>
                    {
                        avatar ? (<Avatar src={URL.createObjectURL(avatar)} alt="Remy Sharp" sx={{ m: "auto", width: "100px", height: "100px", mb: "20px" }} />)
                            : (<Avatar src='/' alt="Remy Sharp" sx={{ m: "auto", width: "100px", height: "100px", mb: "20px" }} />)
                    }
                    <ModalUploadAvatar setAvatar={setAvatar} />
                </Box>
                <Grid container px="100px" py="50px" columnSpacing={2} rowSpacing={3}>
                    <Grid item xs={4} textAlign="right">Họ và tên</Grid>
                    <Grid item xs={8}>
                        <TextField size='small' sx={{ width: "50%" }}
                            value={formik.values.fullName}
                            onChange={formik.handleChange} name='fullName' />
                        {
                            formik.errors.fullName && (
                                <FormHelperText error>
                                    {formik.errors.fullName}
                                </FormHelperText>
                            )
                        }
                    </Grid>
                    <Grid item xs={4} textAlign="right">Email</Grid>
                    <Grid item xs={8}>
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
                    <Grid item xs={4} textAlign="right">Số điện thoại</Grid>
                    <Grid item xs={8}>
                        <TextField size='small' sx={{ width: "50%" }} onChange={formik.handleChange} name='phoneNumber'
                            value={formik.values.phoneNumber}
                        />
                        {
                            formik.errors.phoneNumber && (
                                <FormHelperText error>
                                    {formik.errors.phoneNumber}
                                </FormHelperText>
                            )
                        }
                    </Grid>
                    <Grid item xs={4} textAlign="right">Địa chỉ</Grid>
                    <Grid item xs={8}>
                        <Select
                            value={formik.values.province}
                            name='province'
                            onChange={(event) => {
                                const selectedProvince = event.target.value;
                                if (selectedProvince && formik.values.province !== selectedProvince) {
                                    formik.handleChange(event);
                                    handleGetDistrict(event.target.value);
                                    setCommunes([]);
                                    formik.setFieldValue('district', '')
                                    formik.setFieldValue('commune', '')
                                }
                            }}
                            renderValue={(selected) => {
                                if (!selected || selected === "") {
                                    return <em>Tỉnh / TP</em>;
                                }
                                const selectedProvince = provinces.find(p => p.idProvince === selected);
                                return selectedProvince ? selectedProvince.name : "";
                            }}
                            displayEmpty={true}
                            size='small'
                        >
                            <MenuItem disabled value="">
                                <em>Tỉnh / TP</em>
                            </MenuItem>
                            {
                                provinces.length !== 0 && provinces?.map((province) => {
                                    return (
                                        <MenuItem value={province?.idProvince} key={province?.idProvince}>{province.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <Select
                            value={formik.values.district}
                            name='district'
                            onChange={(event) => {
                                formik.handleChange(event); handleGetCommunes(event.target.value);
                                formik.setFieldValue('commune', '')
                            }}
                            renderValue={(selected) => {
                                if (!selected || selected === "") {
                                    return <em>Quận / Huyện</em>;
                                }
                                const selectedDistrict = districts.find(p => p.idDistrict === selected);
                                return selectedDistrict ? selectedDistrict.name : <em>Quận / Huyện</em>;
                            }}
                            displayEmpty={true}
                            disabled={districts.length === 0}
                            size='small'
                            sx={{ ml: "20px" }}
                        >
                            <MenuItem disabled value="">
                                <em>Quận / Huyện</em>
                            </MenuItem>
                            {
                                districts.length !== 0 && districts?.map((district) => {
                                    return (
                                        <MenuItem value={district?.idDistrict} key={district?.idDistrict}>{district.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.commune}
                            name='commune'
                            onChange={formik.handleChange}
                            renderValue={(selected) => {
                                if (!selected || selected === "") {
                                    return <em>Xã / Phường</em>;
                                }
                                const selectedCommune = communes.find(p => p.idCommune === selected);
                                return selectedCommune ? selectedCommune.name : <em>Xã / Phường</em>;
                            }}
                            displayEmpty={true}
                            disabled={communes.length === 0}
                            size='small'
                            sx={{ ml: "20px" }}
                        >
                            <MenuItem disabled value="">
                                <em>Xã / Phường</em>
                            </MenuItem>
                            {
                                communes.length !== 0 && communes?.map((commune) => {
                                    return (
                                        <MenuItem value={commune?.idCommune} key={commune?.idCommune}>{commune.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <Box mt="20px">
                            <TextField label="Số nhà, Thôn" size='small' name='homeNumber' onChange={formik.handleChange}
                                value={formik.values.homeNumber}
                                sx={{ width: "60%" }} />
                            {
                                formik.errors.address && (
                                    <FormHelperText error>
                                        {formik.errors.address}
                                    </FormHelperText>
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ParentProfile
