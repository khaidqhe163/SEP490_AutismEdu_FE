import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import { useNavigate } from 'react-router-dom';
import '~/assets/css/texteditor.css'
import UploadImage from '~/components/UploadImage';
import axios from '~/plugins/axios';
import services from '~/plugins/services';
import PAGES from '~/utils/pages';
function BlogCreation() {
    const [status, setStatus] = useState(true);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const fontSize = ['8px', '9px', '10px', '12px', '14px', '16px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px']
    const Size = Quill.import('attributors/style/size');
    const [image, setImage] = useState(null);
    const nav = useNavigate();
    Size.whitelist = fontSize;
    Quill.register(Size, true);
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': fontSize }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];
    const [selectedFontSize, setSelectedFontSize] = useState("14px");
    const handleChangeEdit = (content, delta, source, editor) => {
        const plainText = editor.getText().trim();
        if (plainText === '') {
            setContent("")
        } else {
            setContent(content)
        }
    };

    useEffect(() => {
        const toolbar = document.querySelector('.ql-size');
        const label = toolbar?.querySelector('.ql-picker-label');

        if (label) {
            label.innerText = selectedFontSize;
        }

        const updateFontSize = (event) => {
            const selectedSize = event.target.getAttribute('data-value');
            if (selectedSize && fontSize.includes(selectedSize)) {
                setSelectedFontSize(selectedSize);
                const quill = document.querySelector('.ql-editor');
                if (quill) {
                    quill.style.fontSize = selectedSize;
                }
            }
        };

        toolbar?.addEventListener('click', updateFontSize);

        return () => {
            if (toolbar) {
                toolbar.removeEventListener('click', updateFontSize);
            }
        };
    }, [selectedFontSize]);

    const handleSubmit = async () => {
        if (!title) {
            enqueueSnackbar("Bạn chưa nhập tiêu đề", { variant: "error" })
            return;
        }
        if (!content) {
            enqueueSnackbar("Bạn chưa nhập nội dung", { variant: "error" })
            return;
        }
        if (!image) {
            enqueueSnackbar("Bạn chưa upload hình ảnh bìa", { variant: "error" })
            return;
        }
        try {
            const form = new FormData();
            form.append("Title", title);
            form.append("Content ", content);
            form.append("ImageDisplay", image);
            form.append("IsPublished", status);
            axios.setHeaders({ "Content-Type": "multipart/form-data", "Accept": "application/json, text/plain, multipart/form-data, */*" });
            await services.BlogAPI.createBlog(form, (res) => {
                enqueueSnackbar("Tạo bài viết thành công", { variant: "success" });
                nav(PAGES.BLOG_MANAGEMENT)
            }, (err) => {
                enqueueSnackbar(err.error[0], { variant: "error" })
            })
            axios.setHeaders({ "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" });
        } catch (error) {
            enqueueSnackbar("Tạo bài viết thất bại", { variant: "error" })
        }
    }
    return (
        <Box>
            <Stack direction='row' justifyContent="space-between">
                <Typography variant='h4'>Tạo bài viết mới</Typography>
                <Stack direction='row' gap={3}>
                    <FormControl sx={{ width: "200px", bgcolor: "white" }}>
                        <InputLabel id="status">Trạng thái</InputLabel>
                        <Select
                            labelId="status"
                            value={status}
                            label="Trạng thái"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value={true}>Đăng công khai</MenuItem>
                            <MenuItem value={false}>Ẩn tạm thời</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant='contained' onClick={handleSubmit}>Đăng bài viết</Button>
                </Stack>
            </Stack>
            <Box px="100px">
                <TextField fullWidth sx={{ mt: 3, bgcolor: "white" }} placeholder='Thêm tiêu đề tại đây' 
                value={title} onChange={(e) => setTitle(e.target.value)}/>
                <Stack direction='row' gap={4} alignItems='center' mt={3}>
                    <Typography fontSize="20px" color='black'>Ảnh bìa</Typography>
                    <UploadImage setImage={setImage} aspectRatio={16 / 9} minDimension={250} />
                </Stack>
                <Box width="100%">
                    {
                        image &&
                        <img src={URL.createObjectURL(image)} alt='avatar' width="100%" />
                    }
                </Box>
                <ReactQuill
                    value={content}
                    name="description"
                    onChange={handleChangeEdit}
                    theme="snow"
                    modules={{
                        toolbar: toolbarOptions
                    }}
                    placeholder='Nhập nội dung bài viết tại đây'
                    style={{ marginTop: "20px" }}
                />
            </Box>
        </Box>
    )
}

export default BlogCreation
