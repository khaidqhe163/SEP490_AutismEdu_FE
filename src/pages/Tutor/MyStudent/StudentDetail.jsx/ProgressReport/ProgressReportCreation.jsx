import { Box, Button, FormControl, FormHelperText, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MinimizeIcon from '@mui/icons-material/Minimize';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import services from '~/plugins/services';
import { useFormik } from 'formik';
import LoadingComponent from '~/components/LoadingComponent';
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
function ProgressReportCreation() {
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
                setAssessment(res.result);
                const initialAssessment = res.result.map((r, index) => {
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
        console.log(values.achieved);
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
                        width: "900px",
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxHeight: "80vh",
                        overflow: 'auto'
                    }}>
                        <form onSubmit={formik.handleSubmit}>
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

                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Đã làm được
                            </Typography>
                            <TextField multiline fullWidth minRows={5} maxRows={10}
                                name='achieved'
                                onChange={formik.handleChange}
                                value={formik.values.achieved}
                            />
                            {
                                formik.errors.achieved && (
                                    <FormHelperText error>
                                        {formik.errors.achieved}
                                    </FormHelperText>
                                )
                            }
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Chưa làm được
                            </Typography>
                            <TextField multiline fullWidth minRows={5} maxRows={10}
                                name='failed'
                                onChange={formik.handleChange}
                                value={formik.values.failed} />
                            {
                                formik.errors.failed && (
                                    <FormHelperText error>
                                        {formik.errors.failed}
                                    </FormHelperText>
                                )
                            }
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Ghi chú thêm
                            </Typography>
                            <TextField multiline fullWidth minRows={5} maxRows={10}
                                name='noteFromTutor'
                                onChange={formik.handleChange}
                                value={formik.values.noteFromTutor}
                            />
                            {
                                formik.errors.noteFromTutor && (
                                    <FormHelperText error>
                                        {formik.errors.noteFromTutor}
                                    </FormHelperText>
                                )
                            }
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Đánh giá
                            </Typography>
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
                            <Box sx={{ display: "flex", justifyContent: 'end', gap: 1 }}>
                                <Button variant='contained' sx={{ mt: 5 }} type='submit'>Tạo sổ</Button>
                                <Button sx={{ mt: 5 }} onClick={handleClose}>Huỷ</Button>
                            </Box>
                        </form>
                        <LoadingComponent open={loading} />
                    </Box>
                </Modal>
            }
        </Box >
    )
}

export default ProgressReportCreation
