import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, FormHelperText, List, ListItem, ListSubheader, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import Curriculum from './CurriculumAddition';
import CurriculumDetail from './CurriculumDetail';
function TutorIntroduction({ activeStep, handleBack, handleNext, steps, tutorIntroduction, setTutorIntroduction }) {
    const [editorContent, setEditorContent] = useState("");
    const [curriculum, setCurriculum] = useState([])

    const validate = (values) => {
        const errors = {};
        if (!values.startAge || !values.endAge) {
            errors.rangeAge = 'Vui lòng nhập độ tuổi';
        } else if (Number(values.startAge) > Number(values.endAge)) {
            errors.rangeAge = 'Độ tuổi không hợp lệ';
        }
        if (values.price.length > 0 && values.price.length < 5) {
            errors.price = "Số tiền quá nhỏ"
        }
        return errors
    }
    const formik = useFormik({
        initialValues: {
            startAge: '',
            price: '',
            endAge: ''
        },
        validate,
        onSubmit: async (values) => {
            let validCurriculum = true;
            curriculum.forEach((c) => {
                if (Number(c.ageFrom) < Number(values.startAge) || Number(c.ageEnd) > Number(values.endAge)) {
                    validCurriculum = false;
                }
            })
            if (validCurriculum) {
                setTutorIntroduction({
                    description: editorContent,
                    price: values.price,
                    startAge: values.startAge,
                    endAge: values.endAge,
                    curriculum: curriculum
                })
                handleNext();
            }
        }
    });
    useEffect(() => {
        if (tutorIntroduction) {
            formik.setFieldValue("startAge", tutorIntroduction.startAge);
            formik.setFieldValue("endAge", tutorIntroduction.endAge);
            formik.setFieldValue("price", tutorIntroduction.price);
            formik.setFieldError("rangeAge", "")
            setCurriculum(tutorIntroduction.curriculum);
            setEditorContent(tutorIntroduction.description);
            if (tutorIntroduction.price) {
                setValue(formatNumber(tutorIntroduction.price));
            }
        }
    }, [tutorIntroduction])
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];

    const formatNumber = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    const [value, setValue] = useState();
    const handleInputChange = (e) => {
        let inputValue = e.target.value;
        if (inputValue.length === 1 && inputValue[0] === "0") {
            inputValue = ""
        }
        if (inputValue.length > 1 && (inputValue[0] === "0" || inputValue[0] === ".")) {
            let sliceString = inputValue;
            for (let i = 0; i < inputValue.length; i++) {
                if (inputValue[i] === "0" || inputValue[i] === ".") {
                    sliceString = inputValue.slice(i + 1);
                } else {
                    break;
                }
            }
            inputValue = sliceString;
        }
        let rawValue = inputValue.replace(/\./g, '');
        if (!/^\d*$/.test(rawValue)) {
            return;
        }
        if (rawValue) {
            const formattedValue = formatNumber(rawValue);
            formik.setFieldValue("price", rawValue);
            setValue(formattedValue)
        } else {
            formik.setFieldValue('');
            setValue("")
        }
    };
    return (
        <>
            <Typography variant='h3' textAlign="center" mt={3}>Thông tin gia sư</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Stack direction='row' gap={3}>
                    <Box mt={2} sx={{ height: "400px", width: "60%" }}>
                        <Typography variant='h6' mb={2}>Nhập giới thiệu về bạn</Typography>
                        <ReactQuill
                            value={editorContent}
                            onChange={setEditorContent}
                            theme="snow"
                            modules={{
                                toolbar: toolbarOptions,
                            }}
                            style={{ height: '250px' }}
                        />
                    </Box>
                    <Box mt={2} sx={{ width: "60%" }}>
                        <Typography mt={4} mb={2}>Độ tuổi dạy <span style={{ color: "red" }}>(bắt buộc)</span></Typography>
                        <Stack direction='row' alignItems='center' gap={3}>
                            <TextField size='small' label="Từ" type='number' inputProps={{ min: 0, max: 15 }}
                                name='startAge'
                                value={formik.values.startAge}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number.isInteger(Number(value)) || value === '') {
                                        formik.setFieldValue('startAge', value);
                                    }
                                }}
                            />
                            <RemoveIcon />
                            <TextField size='small' label="Đến" type='number' inputProps={{ min: 0, max: 15 }}
                                name='endAge'
                                value={formik.values.endAge}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number.isInteger(Number(value)) || value === '') {
                                        formik.setFieldValue('endAge', value);
                                    }
                                }} />
                        </Stack>
                        {
                            (!formik.values.startAge || !formik.values.endAge) && (
                                <FormHelperText error>
                                    {formik.errors.rangeAge}
                                </FormHelperText>
                            )
                        }
                        <Typography mt={4} mb={2}>Học phí</Typography>
                        <TextField size='small' type='text' inputProps={{ min: 1000, step: 1000 }}
                            name='price'
                            value={value}
                            onChange={handleInputChange}
                        />
                        {
                            formik.errors.price && (
                                <FormHelperText error>
                                    {formik.errors.price}
                                </FormHelperText>
                            )
                        }
                        <List
                            sx={{
                                maxWidth: 450, bgcolor: 'background.paper', mt: 3,
                                ".MuiListSubheader-root": {
                                    padding: "0"
                                }
                            }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            disablePadding
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    <Stack direction="row" sx={{ alignItems: "center" }} gap={3}>
                                        <Typography variant='h6'>Thêm khung chương trình</Typography>
                                        <Curriculum curriculum={curriculum} setCurriculum={setCurriculum}
                                            endAge={formik.values.endAge}
                                            startAge={formik.values.startAge}
                                        />
                                    </Stack>
                                </ListSubheader>
                            }
                        >
                            {
                                curriculum === null || curriculum.length === 0 ? (
                                    <ListItem>Bạn chưa thêm khung chương trình nào</ListItem>
                                ) : (
                                    curriculum?.map((c, index) => {
                                        return (
                                            <>
                                                <CurriculumDetail key={index} index={index} currentCurriculum={c}
                                                    curriculum={curriculum} setCurriculum={setCurriculum}
                                                    startAge={formik.values.startAge}
                                                    endAge={formik.values.endAge}
                                                />
                                                {
                                                    (Number(c.ageFrom) < Number(formik.values.startAge) || Number(c.ageEnd) > Number(formik.values.endAge)) && (
                                                        <FormHelperText error sx={{ mb: 2 }}>
                                                            Khung chương trình nằm ngoài độ tuổi dạy
                                                        </FormHelperText>
                                                    )
                                                }
                                            </>
                                        )
                                    })
                                )
                            }
                        </List>
                    </Box>
                </Stack>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 3 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button type='submit'>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default TutorIntroduction
