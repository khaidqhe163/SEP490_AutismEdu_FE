import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
import ChildrenProfile from './ChildrenProfile';
import InitialCondition from './InitialCondition';
import ParentProfile from './ParentProfile';
import StudentShedule from './StudentShedule';
import { useFormik } from 'formik';
import axios from '~/plugins/axios';
import { useNavigate } from 'react-router-dom';
import PAGES from '~/utils/pages';

function StudentCreation() {
    const email = useRef(null);
    const [emailError, setEmailError] = useState("");
    const [parent, setParent] = useState(null);
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentChild, setCurrentChild] = useState(0);
    const [selectedAssessment, setSelectedAssessment] = useState([]);
    const [initialCondition, setInitialCondition] = useState("");
    const [listSchedule, setListShedule] = useState([]);
    const [hasAccount, setHasAccount] = useState("true");
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [sendRequest, setSendRequest] = useState("true")
    const [selectedRequest, setSelectedRequest] = useState("");
    const [listTutorRequest, setListTutorRequest] = useState([]);
    const nav = useNavigate();
    useEffect(() => {
        handleGetTutorRequest();
    }, [])

    useEffect(() => {
        if (selectedRequest !== "" && typeof selectedRequest === 'number' && listTutorRequest.length !== 0) {
            if (listTutorRequest[selectedRequest]) {
                console.log(listTutorRequest[selectedRequest]);
                setParent(listTutorRequest[selectedRequest].parent)
                setChildren([listTutorRequest[selectedRequest].childInformation])
            }
        }
    }, [selectedRequest])
    const handleGetParent = async () => {
        if (email.current.value === "") {
            console.log("zoday");
            setEmailError("Vui lòng nhập tài khoản của phụ huynh!");
            return;
        }
        try {
            setLoading(true);
            await services.UserManagementAPI.getUserByEmail(email.current.value,
                (res) => {
                    if (res.result === null) {
                        setEmailError("Không tìm thấy tài khoản này!");
                        setParent(null);
                        setChildren([]);
                    } else {
                        setParent(res.result);
                        setEmailError("");
                        handleGetChildren(res.result.id);
                    }
                }, (error) => {
                    setEmailError("Không tìm thấy tài khoản này!");
                    setChildren([]);
                    setParent(null);
                })
            setLoading(false);
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    const handleChangeAccount = (event) => {
        setHasAccount(event.target.value);
    };
    const handleChangeSendRequest = (event) => {
        setSendRequest(event.target.value);
        setParent(null);
        setChildren([]);
        setSelectedRequest("");
        setListShedule([]);
        setInitialCondition('');
        setAvatar(null)
    };
    const handleGetChildren = async (id) => {
        try {
            await services.ChildrenManagementAPI.listChildren(id, (res) => {
                setChildren(res.result);
            }, (err) => {
                console.log("data child ==> ", err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validate = values => {
        const errors = {};
        if (hasAccount === "false") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!values.email) {
                errors.email = "Bắt buộc"
            } else if (!emailRegex.test(values.email)) {
                errors.email = "Email của bạn không hợp lệ"
            }
            if (!values.parentName) {
                errors.parentName = 'Bắt buộc';
            } else if (values.parentName.length > 20) {
                errors.parentName = 'Tên dưới 20 ký tự';
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
            if (!values.childName) {
                errors.childName = "Bắt buộc"
            } else if (!/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÊÔưăêôƠƯÀẢÃÁẠĂẮẰẲẴẶÂẦẤẨẪẬÈẺẼÉẸÊỀẾỂỄỆÌỈĨÍỊÒỎÕÓỌÔỒỐỔỖỘƠỜỚỞỠỢÙỦŨÚỤƯỪỨỬỮỰỲỶỸÝỴàảãáạăắằẳẵặâầấẩẫậèẻẽéẹêềếểễệìỉĩíịòỏõóọôồốổỗộơờớởỡợùủũúụưừứửữựỳỷỹýỵ\s]+$/.test(values.fullName)) {
                errors.childName = "Tên không hợp lệ!"
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
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            email: '',
            parentName: '',
            province: '',
            district: '',
            commune: '',
            homeNumber: '',
            phoneNumber: '',
            childName: '',
            dateOfBirth: '',
            gender: 'True'
        },
        validate,
        onSubmit: async (values) => {
            const selectedCommune = communes.find(p => p.idCommune === values.commune);
            const selectedProvince = provinces.find(p => p.idProvince === values.province);
            const selectedDistrict = districts.find(p => p.idDistrict === values.district);
            if (initialCondition.trim() === "") {
                enqueueSnackbar("Chưa nhập điều kiện ban đầu!", { variant: "error" });
                return;
            }
            if (listSchedule.length === 0) {
                enqueueSnackbar("Chưa nhập lịch học!", { variant: "error" });
                return;
            }
            if (hasAccount === "true" && sendRequest === "true" && selectedRequest === "") {
                enqueueSnackbar("Chưa chọn yêu cầu!", { variant: "error" });
                return;
            }
            const formData = new FormData();
            if (hasAccount === "false") {
                formData.append("Email", values.email);
                formData.append("ParentFullName", values.parentName);
                formData.append("Address", `${selectedProvince.name}|${selectedDistrict.name}|${selectedCommune.name}|${values.homeNumber}`);
                formData.append("PhoneNumber", values.phoneNumber);
                formData.append("ChildName", values.childName);
                formData.append("isMale", values.gender);
                formData.append("BirthDate", values.dateOfBirth);
                formData.append("Media", avatar);
                formData.append("ChildId", 0);
            }
            else {
                if (sendRequest === "true") {
                    formData.append("TutorRequestId", listTutorRequest[selectedRequest].id)
                } else {
                    formData.append("TutorRequestId", 0)
                }
                formData.append("ChildId", children[currentChild].id);
            }
            formData.append("InitialCondition", initialCondition);
            selectedAssessment.forEach((s, index) => {
                formData.append(`InitialAssessmentResults[${index}].QuestionId`, s.questionId);
                formData.append(`InitialAssessmentResults[${index}].OptionId`, s.optionId);
            })
            listSchedule.forEach((l, index) => {
                formData.append(`ScheduleTimeSlots[${index}].Weekday`, l.weekday)
                formData.append(`ScheduleTimeSlots[${index}].From`, l.from)
                formData.append(`ScheduleTimeSlots[${index}].To`, l.to)
            })
            try {
                setLoading(true);
                axios.setHeaders({ "Content-Type": "multipart/form-data", "Accept": "application/json, text/plain, multipart/form-data, */*" });
                await services.StudentProfileAPI.createStudentProfile(formData,
                    (res) => {
                        enqueueSnackbar("Tạo hồ sơ học sinh thành công!", { variant: "success" });
                        nav(PAGES.MY_STUDENT)
                    }, (err) => {
                        enqueueSnackbar("Tạo hồ sơ học sinh thất bại!", { variant: "error" });
                    })
                axios.setHeaders({ "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" });
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
    });

    const handleGetTutorRequest = async () => {
        try {
            await services.TutorRequestAPI.getTutorRequestNoProfile((res) => {
                console.log("request ==> ", res.result);
                setListTutorRequest(res.result)
            }, (err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    console.log(formik.errors);
    return (
        <Box p="20px" sx={{ height: "calc(100vh - 65px)", bgcolor: "#f8fafb", width: '100%' }} overflow="auto">
            <Typography variant='h4'>Tạo hồ sơ học sinh</Typography>
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                bgcolor: "white",
                p: 2,
                borderRadius: "5px",
                flexWrap: "wrap"
            }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <FormControl>
                            <FormLabel id="hasAccount">Phụ huynh đã có tài khoản chưa?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="hasAccount"
                                value={hasAccount}
                                name="hasAccount"
                                onChange={handleChangeAccount}
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Có" />
                                <FormControlLabel value="false" control={<Radio />} label="Chưa" />
                            </RadioGroup>
                        </FormControl>
                        <br />
                        {
                            hasAccount === "true" && (
                                <FormControl sx={{ mt: 2 }}>
                                    <FormLabel id="requested">Phụ huynh đã gửi yêu cầu?</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="requested"
                                        value={sendRequest}
                                        name="sendRequested"
                                        onChange={handleChangeSendRequest}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Có" />
                                        <FormControlLabel value="false" control={<Radio />} label="Chưa" />
                                    </RadioGroup>
                                </FormControl>
                            )
                        }
                    </Box>
                    <Button variant='contained' onClick={formik.handleSubmit} sx={{ height: "40px" }}>Tạo hồ sơ</Button>
                </Box>
                {
                    hasAccount === "true" && sendRequest === 'true' && (
                        <>
                            <Divider sx={{ width: "100%" }} />
                            <Box mt={3}>
                                <InputLabel>Chọn yêu cầu</InputLabel>
                                <FormControl sx={{ m: 1, width: 400 }}>
                                    <Select
                                        value={selectedRequest}
                                        name='selectedRequest'
                                        onChange={(event) => {
                                            setSelectedRequest(event.target.value)
                                        }}
                                        renderValue={(selected) => {
                                            if (!selected || selected === "") {
                                                return <em>Yêu cầu</em>;
                                            }
                                            return selectedRequest ? selectedRequest : "";
                                        }}
                                        displayEmpty={true}
                                        size='small'
                                    >
                                        <MenuItem disabled value="">
                                            <em>Yêu cầu</em>
                                        </MenuItem>
                                        {
                                            listTutorRequest.length !== 0 && listTutorRequest?.map((request, index) => {
                                                return (
                                                    <MenuItem value={index} key={request?.id}>
                                                        {request.parent.fullName} - {request.parent.email}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </>
                    )
                }
                {
                    hasAccount === "true" && sendRequest === 'false' && (
                        <>
                            <Divider sx={{ width: "100%" }} />
                            <Box sx={{ width: "50%", display: "flex", mt: 2 }}>
                                <Box sx={{ width: "80%" }}>
                                    <TextField
                                        name='email'
                                        size='small'
                                        sx={{ width: "100%" }}
                                        placeholder='Nhập tài khoản phụ huynh'
                                        inputRef={email}
                                    />
                                    {
                                        emailError !== "" && (
                                            <FormHelperText error>
                                                {emailError}
                                            </FormHelperText>
                                        )
                                    }
                                </Box>
                                <Button variant='contained' sx={{ ml: 3, height: "40px" }}
                                    onClick={handleGetParent}
                                ><SearchIcon /></Button>
                            </Box>
                            {
                                children.length !== 0 && (
                                    <Box sx={{ mt: 2 }}>
                                        <FormControl size='small' sx={{ width: "300px" }}>
                                            <Select value={currentChild}
                                                onChange={(e) => setCurrentChild(e.target.value)}
                                            >
                                                {
                                                    children.map((c, index) => {
                                                        return (
                                                            <MenuItem key={c.id} value={index}>{c.name}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                )
                            }
                        </>
                    )
                }
            </Box>
            <Stack direction='row' gap={2} mt={3}>
                <Box sx={{ width: "35%" }}>
                    <ParentProfile parent={parent} hasAccount={hasAccount}
                        provinces={provinces}
                        districts={districts}
                        communes={communes}
                        setProvinces={setProvinces}
                        setDistricts={setDistricts}
                        setCommunes={setCommunes}
                        formik={formik} />
                    <ChildrenProfile childrenInfo={children} currentChild={currentChild} hasAccount={hasAccount}
                        formik={formik}
                        avatar={avatar}
                        setAvatar={setAvatar} />
                </Box>
                <Box sx={{ width: "60%" }}>
                    <InitialCondition childrenInfor={children}
                        setSelectedAssessment={setSelectedAssessment}
                        selectedAssessment={selectedAssessment}
                        initialCondition={initialCondition} setInitialCondition={setInitialCondition}
                        hasAccount={hasAccount}
                    />
                    <StudentShedule childrenInfor={children} listSchedule={listSchedule} setListSchedule={setListShedule}
                        hasAccount={hasAccount} />
                </Box>
            </Stack>
            <LoadingComponent open={loading} />
        </Box>
    )
}

export default StudentCreation
