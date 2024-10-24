import { Grid, Stack, Typography, TextField, Button, Box, MenuItem, Select, CircularProgress, FormControl, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ModalConfirm from './ModalConfirm';
import { useSelector } from 'react-redux';
import { tutorInfor } from '~/redux/features/tutorSlice';
import services from '~/plugins/services';
import axios from 'axios';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import CALL_API_ADDRESS from '~/utils/call_api_address';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator="."
            decimalSeparator=","
            valueIsNumericString
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function EditProfile() {
    const tutorInfo = useSelector(tutorInfor);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCommune, setSelectedCommune] = useState('');
    const [specificAddress, setSpecificAddress] = useState('');
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingCommunes, setLoadingCommunes] = useState(false);
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(false);
    const menuProps = {
        PaperProps: {
            style: {
                maxHeight: 200,
                overflowY: 'auto',
            },
        },
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTutor({
            ...tutor,
            [name]: value
        });
    };

    const handleQuillChange = (value) => {
        setTutor({
            ...tutor,
            aboutMe: value
        });
    };

    const getTutorInformation = async () => {
        try {
            await services.TutorManagementAPI.handleGetTutorProfile((res) => {
                setTutor(res.result);
                if (res?.result?.address) {
                    const [provinceName, districtName, communeName, address] = res.result.address.split('|');
                    setSpecificAddress(address);
                    setSelectedProvince(provinceName);
                    fetchCommunes(districtName, communeName);
                }
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getDataProvince = async () => {
        setProvinces(await CALL_API_ADDRESS('province'));
    };

    useEffect(() => {
        getDataProvince();
        getTutorInformation();
    }, []);

    useEffect(() => {
        if (provinces.length > 0 && selectedProvince) {
            fetchDistricts(selectedProvince, tutor?.address?.split('|')[1]);
        }
    }, [provinces, selectedProvince]);
    useEffect(() => {
        if (districts.length > 0 && selectedDistrict) {
            fetchCommunes(selectedDistrict, tutor?.address?.split('|')[2]);
        }
    }, [districts, selectedDistrict]);

    const fetchDistricts = (provinceName, districtName = '') => {
        if (!provinces || provinces.length === 0) return; // Đảm bảo provinces đã được tải

        const selectedProvinceData = provinces.find(prov => prov.name === provinceName);
        if (selectedProvinceData) {
            setLoadingDistricts(true);
            axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/district?idProvince=${selectedProvinceData.idProvince}`)
                .then(response => {
                    setDistricts(response.data);
                    setLoadingDistricts(false);
                    if (districtName) {
                        const selectedDistrictData = response.data.find(d => d.name === districtName);
                        if (selectedDistrictData) {
                            setSelectedDistrict(selectedDistrictData.name);
                        }
                    }
                })
                .catch(error => {
                    setLoadingDistricts(false);
                    console.error('Error fetching districts:', error);
                });
        }
    };

    const fetchCommunes = (districtName, communeName = '') => {
        if (!districts || districts.length === 0) return;
        const selectedDistrictData = districts.find(district => district.name === districtName);
        console.log(selectedDistrictData);

        if (selectedDistrictData) {
            setLoadingCommunes(true);
            axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/commune?idDistrict=${selectedDistrictData?.idDistrict}`)
                .then(response => {
                    setCommunes(response.data);
                    setLoadingCommunes(false);
                    if (communeName) {
                        const selectedCommuneData = response?.data?.find(c => c.name === communeName);

                        if (selectedCommuneData) {

                            setSelectedCommune(selectedCommuneData.name);
                        }
                    }
                })
                .catch(error => {
                    setLoadingCommunes(false);
                    console.error('Error fetching communes:', error);
                });
        }
    };

    const handleProvinceChange = (event) => {
        const provinceName = event.target.value;
        setSelectedProvince(provinceName);
        setSelectedDistrict('');
        setSelectedCommune('');
        fetchDistricts(provinceName);
    };

    const handleDistrictChange = (event) => {
        const districtName = event.target.value;
        setSelectedDistrict(districtName);
        setSelectedCommune('');
        fetchCommunes(districtName);
    };

    const handleCommuneChange = (event) => {
        setSelectedCommune(event.target.value);
    };

    const handleSaveClick = async () => {
        const updatedAddress = `${selectedProvince}|${selectedDistrict}|${selectedCommune}|${specificAddress}`;
        // console.log({ ...tutor, address: updatedAddress, price: parseFloat(tutor?.price) });
        const updateTutor = {
            price: parseFloat(tutor.price),
            address: updatedAddress,
            aboutMe: tutor.aboutMe,
            phoneNumber: tutor.phoneNumber,
            startAge: tutor.startAge,
            endAge: tutor.endAge
        };
        try {
            setLoading(true);
            await services.TutorManagementAPI.handleUpdateTutorProfile(tutorInfo?.id, updateTutor, (res) => {
                console.log(res);
                if (res?.result) {
                    setTutor(res.result);
                }
                enqueueSnackbar('Cập nhật đã được gửi thành công đến hệ thống!\n', { variant: 'success' });
                setIsDisable(true);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Stack direction='column' sx={{ width: "90%", margin: "auto", mt: "20px", gap: 2 }}>
            <Stack direction={'row'} spacing={2} mb={5}>
                <Typography variant='h4' my={2}>Chỉnh sửa hồ sơ </Typography> {(tutor?.requestStatus === 2) ? <Button size='small' variant='outlined' color='warning'>Đang chờ duyệt</Button> :
                    <Button size='small' variant='outlined' color='success'>Đã chấp nhận</Button>}
            </Stack>
            <Grid container spacing={3} component="form" onSubmit={(e) => e.preventDefault()}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        label="Học phí"
                        variant="outlined"
                        name="price"
                        value={tutor?.price || ''}
                        onChange={handleInputChange}
                        InputProps={{
                            inputComponent: NumericFormatCustom,
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        required
                        label="Số điện thoại"
                        variant="outlined"
                        name="phoneNumber"
                        value={tutor?.phoneNumber || ''}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        aria-readonly
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={tutorInfo?.email || ''}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField
                        required
                        type='number'
                        fullWidth
                        label="Tuổi từ"
                        variant="outlined"
                        name="startAge"
                        value={tutor?.startAge || ''}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <TextField
                        required
                        type='number'
                        fullWidth
                        label="Đến"
                        variant="outlined"
                        name="endAge"
                        value={tutor?.endAge || ''}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Tỉnh/Thành phố</InputLabel>
                        <Select
                            required
                            value={selectedProvince || ''}
                            onChange={handleProvinceChange}
                            label="Tỉnh/Thành phố"
                            MenuProps={menuProps}
                        >
                            {provinces.map(province => (
                                <MenuItem key={province.idProvince} value={province.name}>
                                    {province.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" disabled={!selectedProvince}>
                        <InputLabel>Quận/Huyện</InputLabel>
                        <Select
                            required
                            value={selectedDistrict || ''}
                            onChange={handleDistrictChange}
                            label="Quận/Huyện"
                            MenuProps={menuProps}
                        >
                            {loadingDistricts ? (
                                <MenuItem disabled>
                                    <CircularProgress size={24} />
                                </MenuItem>
                            ) : (
                                districts.map(district => (
                                    <MenuItem key={district.idDistrict} value={district.name}>
                                        {district.name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" disabled={!selectedDistrict}>
                        <InputLabel>Xã/Phường</InputLabel>
                        <Select
                            required
                            value={selectedCommune || ''}
                            onChange={handleCommuneChange}
                            label="Xã/Phường"
                            MenuProps={menuProps}
                        >
                            {loadingCommunes ? (
                                <MenuItem disabled>
                                    <CircularProgress size={24} />
                                </MenuItem>
                            ) : (
                                communes.map(commune => (
                                    <MenuItem key={commune.idCommune} value={commune.name}>
                                        {commune.name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        fullWidth
                        label="Địa chỉ cụ thể"
                        variant="outlined"
                        name="specificAddress"
                        value={specificAddress}
                        onChange={(e) => setSpecificAddress(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} mb={5}>
                    <Typography variant='h6' mb={2}>Giới thiệu về tôi</Typography>
                    <ReactQuill
                        value={tutor?.aboutMe || ''}
                        onChange={handleQuillChange}
                        style={{ height: '200px' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box textAlign='right'>
                        <Button disabled={tutor?.requestStatus === 2} variant="contained" color="primary" onClick={handleSaveClick}>Lưu</Button>
                    </Box>
                </Grid>
            </Grid>

            <LoadingComponent open={loading} setOpen={setLoading} />

        </Stack>
    );
}

export default EditProfile;
