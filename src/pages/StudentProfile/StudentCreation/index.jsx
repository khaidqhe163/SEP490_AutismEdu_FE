import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, FormHelperText, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import services from '~/plugins/services';
import ChildrenProfile from './ChildrenProfile';
import InitialCondition from './InitialCondition';
import ParentProfile from './ParentProfile';
import StudentShedule from './StudentShedule';
import LoadingComponent from '~/components/LoadingComponent';
import { enqueueSnackbar } from 'notistack';


function StudentCreation() {
    const email = useRef(null);
    const [emailError, setEmailError] = useState("");
    const [parent, setParent] = useState(null);
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentChild, setCurrentChild] = useState(0);
    const [selectedAssessment, setSelectedAssessment] = useState([]);
    const [initialCondition, setInitialCondition] = useState("");
    const [listSchedule, setListShedule] = useState([])
    const handleGetParent = async () => {
        if (email.current.value === "") {
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

    const handleSubmit = async () => {
        if (initialCondition.trim() === "") {
            enqueueSnackbar("Chưa nhập điều kiện ban đầu!", { variant: "error" });
            return;
        }
        if (listSchedule.length === 0) {
            enqueueSnackbar("Chưa nhập lịch học!", { variant: "error" });
            return;
        }
        try {
            await services.StudentProfileAPI.createStudentProfile({
                childId: children[currentChild].id,
                initialCondition: initialCondition,
                tutorRequestId: -1,
                initialAssessmentResults: selectedAssessment,
                scheduleTimeSlots: listSchedule
            },
                (res) => {
                    setChildren([]);
                    setParent(null);
                    enqueueSnackbar("Tạo hồ sơ học sinh thành công!", { variant: "success" });
                }, (err) => {
                    enqueueSnackbar("Tạo hồ sơ học sinh thất bại!", { variant: "error" });
                })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box p="20px" sx={{ height: "calc(100vh - 65px)", bgcolor: "#f8fafb", width: "100%" }} overflow="auto">
            <Typography variant='h4'>Tạo hồ sơ học sinh</Typography>
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                bgcolor: "white",
                py: 2,
                px: 1,
                borderRadius: "5px"
            }}>
                <Box sx={{ width: "50%", display: "flex" }}>
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
                        <>
                            <Box>
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
                            <Button variant='contained' onClick={handleSubmit}>Tạo hồ sơ</Button>
                        </>
                    )
                }

            </Box>
            <Stack direction='row' gap={2} mt={3}>
                <Box sx={{ width: "35%" }}>
                    <ParentProfile parent={parent} />
                    <ChildrenProfile childrenInfo={children} currentChild={currentChild} />
                </Box>
                <Box sx={{ width: "60%" }}>
                    <InitialCondition childrenInfor={children}
                        setSelectedAssessment={setSelectedAssessment}
                        selectedAssessment={selectedAssessment}
                        initialCondition={initialCondition} setInitialCondition={setInitialCondition} />
                    <StudentShedule childrenInfor={children} listSchedule={listSchedule} setListSchedule={setListShedule} />
                </Box>
            </Stack >
            <LoadingComponent open={loading} />
        </Box >
    )
}

export default StudentCreation
