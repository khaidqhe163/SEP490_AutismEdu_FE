import { Box, Button, FormControl, FormHelperText, List, ListItem, ListItemIcon, ListItemText, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MinimizeIcon from '@mui/icons-material/Minimize';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import services from '~/plugins/services';
import { useFormik } from 'formik';
import LoadingComponent from '~/components/LoadingComponent';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
function ProgressReportCreation({ studentProfile, currentReport, setCurrentReport, setPreReport,
    progressReports, setProgressReports, currentPage, setSelectedItem, selectedItem, setSortType, setStartDate, setEndDate,
    startDate, endDate, setCurrentPage, sortType
}) {
    const [open, setOpen] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [assessment, setAssessment] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        handleGetAsessment();
    }, [])
    useEffect(() => {
        if (open) {
            formik.resetForm();
        }
    }, [open])

    useEffect(() => {
        if (assessment && currentReport) {
            const preData = currentReport.assessmentResults.map((a) => {
                return {
                    questionId: a.questionId,
                    optionId: a.optionId
                }
            })
            setSelectedAssessment(preData)
        }
    }, [assessment, currentReport])
    const handleGetAsessment = async () => {
        try {
            setLoading(true);
            await services.AssessmentManagementAPI.listAssessment((res) => {
                setAssessment(res.result.questions);
                const initialAssessment = res.result.questions.map((r, index) => {
                    return {
                        questionId: r.id,
                        optionId: r.assessmentOptions[0].id
                    }
                })
                setSelectedAssessment(initialAssessment)
            }, (err) => {
                console.log(err);
            })
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.achieved) {
            errors.achieved = "Bắt buộc";
        }
        if (!values.failed) {
            errors.failed = "Bắt buộc";
        }

        if (!values.from) {
            errors.from = "Bắt buộc";
        }
        if (!values.to) {
            errors.to = "Bắt buộc";
        } else if (values.from >= values.to) {
            errors.from = "Ngày không hợp lệ"
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            from: '',
            to: new Date().toISOString().split('T')[0],
            achieved: '',
            failed: '',
            noteFromTutor: ''
        },
        validate,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await services.ProgressReportAPI.createProgressReport({
                    ...values,
                    studentProfileId: id,
                    assessmentResults: selectedAssessment
                }, (res) => {
                    enqueueSnackbar("Tạo sổ liên lạc thành công!", { variant: "success" })
                    setCurrentReport(res.result);
                    setPreReport(currentReport);
                    if (currentPage !== 1 || startDate !== "" || endDate !== "" || sortType !== "desc") {
                        setStartDate("");
                        setEndDate("");
                        setSortType("desc");
                        setCurrentPage(1);
                    } else if (currentPage === 1) {
                        let arr = [];
                        if (progressReports.length === 10) {
                            arr = [...progressReports.slice(0, 9)];
                        } else {
                            arr = [...progressReports]
                        }
                        setProgressReports([res.result, ...arr])
                        if (!selectedItem) {
                            setSelectedItem(res.result)
                        }
                    }

                    formik.resetForm();
                    handleClose();
                }, (err) => {
                    console.log(err);
                    enqueueSnackbar("Tạo sổ liên lạc thất bại!", { variant: "error" })
                })
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
    })
    const formatDate = (date) => {
        if (!date) {
            return "";
        }
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const getDefaultValue = (assessment) => {
        if (!assessment || !currentReport) {
            return 1;
        }
        const displayItem = currentReport.assessmentResults.find((a) => {
            return a.question === assessment.question;
        })
        if (!displayItem) {
            return 1;
        }
        return displayItem
    }

    const getFromDate = () => {
        if (currentReport) {
            if (!currentReport.to) return "";
            const minDate = new Date(currentReport.to);
            minDate.setDate(minDate.getDate() + 1);
            const year = minDate.getFullYear();
            const month = String(minDate.getMonth() + 1).padStart(2, '0');
            const day = String(minDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`
        } else {
            if (!studentProfile.createdDate) return "";
            const minDate = new Date(studentProfile.createdDate);
            const year = minDate.getFullYear();
            const month = String(minDate.getMonth() + 1).padStart(2, '0');
            const day = String(minDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`
        }
    }
    return (
        <Box>
            <Button variant='contained' onClick={handleOpen}>Tạo đánh giá mới</Button>
            {
                open && <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: currentReport ? "90vw" : '60vw',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxHeight: "80vh",
                        overflow: 'auto'
                    }}>
                        <Stack direction='row' gap={2}>
                            <form onSubmit={formik.handleSubmit} style={{ width: currentReport ? "60%" : '100%', }}>
                                <Typography id="modal-modal-title" variant="h5" component="h2">
                                    Tạo đánh giá mới
                                </Typography>
                                <Stack direction='row' alignItems='center' gap={2} mt={3}>
                                    <Box>
                                        <Typography>Từ ngày</Typography>
                                        <TextField type='date' name='from'
                                            onChange={formik.handleChange}
                                            value={formik.values.from}
                                            inputProps={{
                                                min: getFromDate(currentReport?.to),
                                                max: new Date().toISOString().split('T')[0],
                                            }}
                                        />
                                        {
                                            formik.errors.from && (
                                                <FormHelperText error>
                                                    {formik.errors.from}
                                                </FormHelperText>
                                            )
                                        }
                                    </Box>
                                    <MinimizeIcon />
                                    <Box>
                                        <Typography>Đến ngày</Typography>
                                        <TextField type='date' name='to'
                                            onChange={formik.handleChange}
                                            value={formik.values.to}
                                            inputProps={{
                                                max: new Date().toISOString().split('T')[0],
                                            }}
                                        />
                                        {
                                            formik.errors.to && (
                                                <FormHelperText error>
                                                    {formik.errors.to}
                                                </FormHelperText>
                                            )
                                        }
                                    </Box>
                                </Stack>

                                <Stack direction='row' gap={2} mt={2}>
                                    <DoneIcon sx={{ color: "green" }} />
                                    <Typography>Đã làm được</Typography>
                                </Stack>
                                <TextField multiline fullWidth minRows={5} maxRows={10}
                                    name='achieved'
                                    onChange={formik.handleChange}
                                    value={formik.values.achieved}
                                    sx={{ mt: 1 }}
                                />
                                {
                                    formik.errors.achieved && (
                                        <FormHelperText error>
                                            {formik.errors.achieved}
                                        </FormHelperText>
                                    )
                                }
                                <Stack direction='row' gap={2} mt={2}>
                                    <CloseIcon sx={{ color: "red" }} />
                                    <Typography>Chưa làm được</Typography>
                                </Stack>
                                <TextField multiline fullWidth minRows={5} maxRows={10}
                                    name='failed'
                                    onChange={formik.handleChange}
                                    value={formik.values.failed}
                                    sx={{ mt: 1 }} />
                                {
                                    formik.errors.failed && (
                                        <FormHelperText error>
                                            {formik.errors.failed}
                                        </FormHelperText>
                                    )
                                }
                                <Stack direction='row' gap={2} mt={2}>
                                    <EditNoteIcon sx={{ color: "blue" }} />
                                    <Typography>Ghi chú thêm</Typography>
                                </Stack>
                                <TextField multiline fullWidth minRows={5} maxRows={10}
                                    name='noteFromTutor'
                                    onChange={formik.handleChange}
                                    value={formik.values.noteFromTutor}
                                    sx={{ mt: 1 }}
                                />
                                {
                                    formik.errors.noteFromTutor && (
                                        <FormHelperText error>
                                            {formik.errors.noteFromTutor}
                                        </FormHelperText>
                                    )
                                }
                                <Stack direction='row' gap={2} mt={2}>
                                    <ListAltIcon sx={{ color: "orange" }} />
                                    <Typography>Danh sách đánh giá</Typography>
                                </Stack>
                                <Stack direction='row' sx={{ width: "100%" }} flexWrap='wrap' rowGap={2}>
                                    {
                                        assessment && assessment.map((a, index) => {
                                            return (
                                                <Box sx={{ display: "flex", width: "50%" }} key={a.id}>
                                                    <ArrowRightIcon sx={{ fontSize: "40px", color: "red" }} />
                                                    <Box>
                                                        <Typography>{a.question}</Typography>
                                                        <FormControl size='small' sx={{ width: "300px" }} key={a.id}>
                                                            <Select value={selectedAssessment[index].optionId}
                                                                onChange={(e) => {
                                                                    selectedAssessment[index].optionId = Number(e.target.value);
                                                                    setSelectedAssessment([...selectedAssessment]);
                                                                }}
                                                            >
                                                                {
                                                                    a.assessmentOptions.map((option) => {
                                                                        return (
                                                                            <MenuItem value={option.id} key={option.id}>{option.point} điểm</MenuItem>
                                                                        )
                                                                    })
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    }
                                </Stack>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Button variant='contained' sx={{ mt: 5 }} type='submit'>Tạo sổ</Button>
                                    <Button sx={{ mt: 5 }} onClick={handleClose}>Huỷ</Button>
                                </Box>
                            </form>
                            {
                                currentReport && (
                                    <Box sx={{ width: "38%" }}>
                                        <Typography variant='h5'>Đánh giá trước đó</Typography>
                                        <Typography mt={2}>Thời gian: {formatDate(currentReport?.from)} - {formatDate(currentReport?.to)}</Typography>
                                        <Stack direction='row' gap={2} mt={2}>
                                            <DoneIcon sx={{ color: "green" }} />
                                            <Typography>Đã làm được</Typography>
                                        </Stack>
                                        <Typography sx={{ whiteSpace: "break-spaces" }}>{currentReport.achieved}</Typography>
                                        <Stack direction='row' gap={2} mt={2}>
                                            <CloseIcon sx={{ color: "red" }} />
                                            <Typography>Chưa làm được</Typography>
                                        </Stack>
                                        <Typography sx={{ whiteSpace: "break-spaces" }}>{currentReport.failed}</Typography>
                                        <Stack direction='row' gap={2} mt={2}>
                                            <EditNoteIcon sx={{ color: "blue" }} />
                                            <Typography>Ghi chú thêm</Typography>
                                        </Stack>
                                        <Typography sx={{ whiteSpace: "break-spaces" }}>{currentReport.noteFromTutor}</Typography>
                                        <Stack direction='row' gap={2} mt={2}>
                                            <ListAltIcon sx={{ color: "orange" }} />
                                            <Typography>Danh sách đánh giá</Typography>
                                        </Stack>
                                        <List sx={{ height: '500px', overflow: "auto" }}>
                                            {
                                                currentReport && currentReport.assessmentResults.map((a) => {
                                                    return (
                                                        <ListItem key={a.id}>
                                                            <ListItemIcon>
                                                                <ChevronRightIcon />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={a.question}
                                                                secondary={`Điểm: ${a.point}`}
                                                            />
                                                        </ListItem>
                                                    )
                                                })
                                            }
                                        </List>
                                    </Box>
                                )
                            }
                        </Stack>

                        <LoadingComponent open={loading} />
                    </Box>
                </Modal>
            }
        </Box >
    )
}

export default ProgressReportCreation
