import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DoneIcon from '@mui/icons-material/Done';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Box, Button, FormControl, FormHelperText, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
function CompleteTutoring({ studentProfile }) {
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


    return (
        <>
            <Button variant='contained' color='success' onClick={handleOpen}>Kết thúc dạy</Button>
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
                        width: '60vw',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxHeight: "80vh",
                        overflow: 'auto'
                    }}>
                        <Stack direction='row' gap={2}>
                            <form onSubmit={formik.handleSubmit}>
                                <Typography id="modal-modal-title" variant="h5" component="h2">
                                    Kết thúc dạy học sinh {studentProfile.name}
                                </Typography>

                                <Stack direction='row' gap={2} mt={2}>
                                    <DoneIcon sx={{ color: "green" }} />
                                    <Typography>Đánh giá cuối cùng</Typography>
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
                                    <Button variant='contained' sx={{ mt: 5 }} type='submit'>Kết thúc</Button>
                                    <Button sx={{ mt: 5 }} onClick={handleClose}>Huỷ</Button>
                                </Box>
                            </form>
                        </Stack>

                        <LoadingComponent open={loading} />
                    </Box>
                </Modal>
            }
        </ >
    )
}

export default CompleteTutoring
