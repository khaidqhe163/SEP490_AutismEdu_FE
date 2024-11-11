import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { FormControl, FormHelperText, MenuItem, Select, Stack, TextField } from '@mui/material';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import LoadingComponent from '~/components/LoadingComponent';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
};

const NumericFormatCustom = React.forwardRef(
    function NumericFormatCustom(props, ref) {
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
                isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue === undefined || floatValue >= 0;
                }}
                thousandSeparator="."
                decimalSeparator=","
                valueIsNumericString
            />
        );
    },
);

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default function PaymentUpdate({ paymentPackage, setStatus, status, setPaymetPackages, paymentPackages }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState({
        price: ""
    });
    const [loading, setLoading] = React.useState(false);
    const [change, setChange] = React.useState(false);
    const validate = values => {
        const errors = {}
        if (!values.title) {
            errors.title = "Bắt buộc";
        }
        if (!values.duration) {
            errors.duration = "Bắt buộc";
        }
        if (!values.price) {
            errors.price = "Bắt buộc";
        }
        return errors
    }
    const formik = useFormik({
        initialValues: {
            title: '',
            duration: '',
            description: '',
            price: '',
            isActive: true,
            originalId: 0
        }, validate,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await services.PackagePaymentAPI.createPaymentPackage(values, (res) => {
                    console.log(res);
                    if (status === "hide") {
                        const filterArr = paymentPackages.map((r) => {
                            if (res.result.originalId === r.id) return res.result
                            return r.id !== values.originalId;
                        })
                        setPaymetPackages(filterArr);
                    }
                    else setStatus("hide");
                    enqueueSnackbar("Tạo thành công", { variant: "success" });
                    handleClose();
                }, (error) => {
                    console.log(error);
                    enqueueSnackbar(error.error[0], { variant: "error" })
                })
                setLoading(false)
            } catch (error) {
                enqueueSnackbar("Tạo thất bại", { variant: "error" })
                setLoading(false);
            }
        }
    })

    React.useEffect(() => {
        if (paymentPackage) {
            formik.setFieldValue("title", paymentPackage?.title || "");
            formik.setFieldValue("duration", paymentPackage?.duration || "");
            formik.setFieldValue("description", paymentPackage?.description || "");
            formik.setFieldValue("price", paymentPackage?.price || "");
            formik.setFieldValue("originalId", paymentPackage?.id || "");
        }
    }, [paymentPackage]);

    React.useEffect(() => {
        if (paymentPackage) {
            if (formik.values.title.trim() !== paymentPackage.title) {
                setChange(false);
                return;
            }
            if (formik.values.duration !== paymentPackage.duration) {
                setChange(false);
                return;
            }
            if (formik.values.description.trim() !== paymentPackage.description) {
                setChange(false);
                return;
            }
            if (formik.values.price !== paymentPackage.price) {
                setChange(false);
                return;
            }
            setChange(true);
        }
    }, [formik])
    const handleChange = (event) => {
        if (event.target.value[0] === "-") {
            formik.setFieldValue(event.target.name, "0")
        } else {
            formik.setFieldValue(event.target.name, event.target.value)
        }
        setValue({
            ...value,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <Button onClick={handleOpen} variant='outlined' sx={{ ml: 3 }}>Chi tiết</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2" mb={3}>
                        Cập nhật gói thanh toán
                    </Typography>
                    <Typography sx={{ color: "red", fontSize: "12px" }}>Khi cập nhật gói thanh toán sẽ về chế độ ẩn</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Typography>Tiêu đề</Typography>
                        <TextField
                            fullWidth
                            name='title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        {
                            formik.errors.description && (
                                <FormHelperText error>
                                    {formik.errors.description}
                                </FormHelperText>
                            )
                        }
                        <Typography mt={2}>Mô tả</Typography>
                        <TextField
                            multiline
                            rows={5}
                            fullWidth
                            name='description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        {
                            formik.errors.description && (
                                <FormHelperText error>
                                    {formik.errors.description}
                                </FormHelperText>
                            )
                        }
                        <Stack direction='row' mt={2}>
                            <Box sx={{ width: "50%" }}>
                                <Typography>Khoảng thời gian: </Typography>
                                <TextField
                                    name='duration'
                                    onChange={formik.handleChange}
                                    value={formik.values.duration}
                                    type='Number'
                                    inputProps={{
                                        min: 1
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: "50%" }}>
                                <Typography>Giá</Typography>
                                <TextField
                                    variant="outlined"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={handleChange}
                                    InputProps={{
                                        inputComponent: NumericFormatCustom,
                                    }}
                                />
                            </Box>
                        </Stack>
                        <Stack direction='row' justifyContent="space-between">
                            <Box sx={{ width: "50%" }}>
                                {
                                    formik.errors.duration && (
                                        <FormHelperText error>
                                            {formik.errors.duration}
                                        </FormHelperText>
                                    )
                                }
                            </Box>
                            <Box sx={{ width: "50%" }}>
                                {
                                    formik.errors.price && (
                                        <FormHelperText error>
                                            {formik.errors.price}
                                        </FormHelperText>
                                    )
                                }
                            </Box>
                        </Stack>
                        <Box>
                            <Button variant='contained' type='submit' sx={{ mt: 2 }} disabled={change}>Cập nhật</Button>
                        </Box>
                    </form>
                    <LoadingComponent open={loading} />
                </Box>
            </Modal>
        </>
    );
}