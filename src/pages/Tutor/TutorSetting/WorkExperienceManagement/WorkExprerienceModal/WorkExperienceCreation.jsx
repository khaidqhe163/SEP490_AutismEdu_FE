import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';

const WorkExperienceCreation = ({ open, onClose, workExperienceList, setWorkExperienceList}) => {
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            companyName: "",
            position: "",
            startDate: "",
            endDate: "",
            originalId: 0
        },
        validationSchema: Yup.object({
            companyName: Yup.string()
                .required("Tên công ty không được để trống").max(150, 'Tên công ty không được vượt quá 150 ký tự'),
            position: Yup.string()
                .required("Chức vụ không được để trống").max(100, 'Tên chức vụ không được vượt quá 100 ký tự'),
            startDate: Yup.date()
                .required("Ngày bắt đầu không được để trống")
                .typeError("Ngày bắt đầu không hợp lệ"),
            endDate: Yup.date()
                // .required("Ngày kết thúc không được để trống")
                .min(Yup.ref('startDate'), "Ngày kết thúc phải sau ngày bắt đầu")
                .typeError("Ngày kết thúc không hợp lệ"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const existCompanyName = workExperienceList.find((e) => e?.companyName === values?.companyName);
                if (existCompanyName) {
                    enqueueSnackbar("Kinh nghiệm làm việc đã tồn tại!", { variant: 'error' });
                    return;
                }
                await services.WorkExperiencesAPI.createWorkExperience(values, (res) => {
                    if (res?.result) {
                        setWorkExperienceList([res.result, ...workExperienceList]);
                        enqueueSnackbar('Kinh nghiệm làm việc của bạn đã được thêm thành công!', { variant: 'success' });
                    }
                    onClose();
                    resetForm();
                }, (error => {
                    console.log(error);
                }))
            } catch (error) {
                console.log(error);

            } finally{
                setLoading(false);
            }
        },
    });
    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle textAlign={'center'} variant='h5'>Thêm kinh nghiệm làm việc</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        label="Tên công ty"
                        name="companyName"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                        helperText={formik.touched.companyName && formik.errors.companyName}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Chức vụ"
                        name="position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.position && Boolean(formik.errors.position)}
                        helperText={formik.touched.position && formik.errors.position}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Ngày bắt đầu"
                        name="startDate"
                        type="date"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                        helperText={formik.touched.startDate && formik.errors.startDate}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            max: new Date().toISOString().split('T')[0],
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Ngày kết thúc"
                        name="endDate"
                        type="date"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                        helperText={formik.touched.endDate && formik.errors.endDate}
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit" variant='outlined'>
                    Hủy
                </Button>
                <Button onClick={formik.handleSubmit} color="primary" variant="contained">
                    Lưu
                </Button>
            </DialogActions>
            <LoadingComponent open={loading} setOpen={setLoading} />
        </Dialog>
    );
};

export default WorkExperienceCreation;
