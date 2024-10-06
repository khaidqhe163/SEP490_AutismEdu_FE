import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const RejectRequestModal = ({ open, onClose, onConfirm }) => {
    // Định nghĩa schema xác thực
    const validationSchema = Yup.object().shape({
        reason: Yup.string()
            .required('Lý do không được để trống')
            .min(5, 'Lý do phải có ít nhất 5 ký tự'),
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ backgroundColor: '#556cd6', color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
                Xác nhận từ chối
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{ reason: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        onConfirm(values.reason);
                        onClose();
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, touched }) => (
                        <Form>
                            <Grid container mt={5}>
                                <Grid item xs={4}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                                        Lý do:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        name="reason"
                                        value={values.reason}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Nhập lý do từ chối"
                                        error={touched.reason && Boolean(errors.reason)}
                                        helperText={touched.reason && errors.reason}
                                    />
                                </Grid>
                            </Grid>
                            <DialogActions>
                                <Button onClick={onClose} color="inherit" variant="outlined">
                                    Huỷ
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    disabled={!values.reason || !!errors.reason} // Disable nếu lý do không hợp lệ
                                >
                                    Xác nhận
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default RejectRequestModal;
