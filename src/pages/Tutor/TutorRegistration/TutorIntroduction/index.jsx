import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import SchoolIcon from '@mui/icons-material/School';
import { Box, FormHelperText, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListSubheader, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import ReactQuill from 'react-quill';
function TutorIntroduction() {
    const [editorContent, setEditorContent] = useState("");
    const [displayValue, setDisplayValue] = useState("");
    const [curriculum, setCurriculum] = useState("")
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
    const validate = (values) => {
        const errors = {};
        return errors
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: async (values) => {
            // handleNext();
        }
    });
    const [value, setValue] = useState('');
    const formatNumber = (number) => {
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleInputChange = (e) => {
        let inputValue = e.target.value;
        let rawValue = inputValue.replace(/\./g, '');
        if (!/^\d*$/.test(rawValue)) {
            return;
        }
        if (rawValue) {
            const formattedValue = formatNumber(rawValue);
            formik.setFieldValue("price", rawValue)
            setValue(formattedValue);
        } else {
            setValue('');
        }
    };
    return (
        <>
            <Typography variant='h3' textAlign="center" mt={3}>Thông tin gia sư</Typography>
            <Stack direction='row' gap={3}>
                <Box mt={2} sx={{ height: "400px", width: "60%" }}>
                    <Typography variant='h5' mb={2}>Nhập giới thiệu về bạn</Typography>
                    <ReactQuill
                        value={editorContent}
                        onChange={setEditorContent}
                        theme="snow"
                        modules={{
                            toolbar: toolbarOptions,
                        }}
                        style={{ height: '300px' }}
                    />
                </Box>
                <Box mt={2} sx={{ height: "350px", width: "60%" }}>
                    <Typography mt={4} mb={2}>Độ tuổi dạy</Typography>
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
                        {
                            formik.errors.rangeAge && (
                                <FormHelperText error>
                                    {formik.errors.rangeAge}
                                </FormHelperText>
                            )
                        }
                    </Stack>
                    <Typography mt={4} mb={2}>Học phí</Typography>
                    <TextField size='small' type='text' inputProps={{ min: 1000, step: 1000 }}
                        name='price'
                        value={value}
                        onChange={handleInputChange}
                    />
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
                                    <Typography variant='h5'>Thêm khung chương trình</Typography>
                                    <IconButton><AddCircleOutlineIcon /></IconButton>
                                </Stack>
                            </ListSubheader>
                        }
                    >
                        {
                            curriculum === null || curriculum.length === 0 ? (
                                <ListItem>Chưa có bằng cấp hay chứng chỉ nào</ListItem>
                            ) : (
                                <ListItemButton >
                                    <ListItemIcon>
                                        <SchoolIcon />
                                    </ListItemIcon>
                                    <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", flexGrow: 1 }} gap={2}>
                                        <Typography>0 - 3 tuổi</Typography>
                                    </Stack>
                                </ListItemButton>
                            )
                        }
                    </List>
                </Box>
            </Stack>

        </>
    )
}

export default TutorIntroduction
