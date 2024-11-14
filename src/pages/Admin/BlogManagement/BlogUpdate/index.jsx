import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import ImageResize from 'quill-image-resize-module-react';
import { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import '~/assets/css/texteditor.css';
import UploadImage from '~/components/UploadImage';
import axios from '~/plugins/axios';
import services from '~/plugins/services';
import PAGES from '~/utils/pages';
import CircleIcon from '@mui/icons-material/Circle';
Quill.register('modules/imageResize', ImageResize);
function BlogUpdate() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const nav = useNavigate();
    const quillRef = useRef(null);
    const [blogImage, setBlogImage] = useState("");
    const handleMouseDown = () => {
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        if (range) {
            setTimeout(() => editor.setSelection(range), 0);
        }
    };
    useEffect(() => {
        if (id) {
            handleGetBlog();
        }
    }, [])

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setBlogImage(blog.urlImageDisplay);
        }
    }, [blog])
    const handleGetBlog = async () => {
        try {
            await services.BlogAPI.getBlogDetail(id, (res) => {
                setBlog(res.result);
            }, (err) => {
                enqueueSnackbar("Lỗi hệ thống!", { variant: "error" })
            })
        } catch (error) {
            console.log(error);
        }
    }

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
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
    const handleChangeEdit = (content, delta, source, editor) => {
        const plainText = editor.getText().trim();
        if (plainText === '') {
            setContent("")
        } else {
            setContent(content)
        }
    };

    const handleSubmit = async () => {
        if (!title) {
            enqueueSnackbar("Bạn chưa nhập tiêu đề", { variant: "error" })
            return;
        }
        if (title.length < 10) {
            enqueueSnackbar("Tiêu đề quá ngắn", { variant: "error" })
            return;
        }
        if (!content) {
            enqueueSnackbar("Bạn chưa nhập nội dung", { variant: "error" })
            return;
        }
        try {
            const form = new FormData();
            form.append("Title", title.trim());
            form.append("Content", content);
            form.append("Id", blog.id)
            if (image) {
                form.append("ImageDisplay", image);
            }
            axios.setHeaders({ "Content-Type": "multipart/form-data", "Accept": "application/json, text/plain, multipart/form-data, */*" });
            await services.BlogAPI.updateBlog(id, form, (res) => {
                enqueueSnackbar("Cập nhật bài viết thành công", { variant: "success" });
                nav(PAGES.BLOG_MANAGEMENT)
            }, (err) => {
                enqueueSnackbar(err.error[0], { variant: "error" })
            })
            axios.setHeaders({ "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" });
        } catch (error) {
            enqueueSnackbar("Cập nhật bài viết thất bại", { variant: "error" })
        }
    }
    return (
        <Box>
            <Stack direction='row' justifyContent="space-between">
                <Typography variant='h4'>Sửa bài viết</Typography>
                <Button variant='contained' onClick={handleSubmit}>Sửa bài viết</Button>
            </Stack>
            <Stack direction='row' alignItems="center" px="100px" gap={4} mt={2}>
                <Typography variant='h6'>ID: {blog?.id}</Typography>
                <Stack direction='row'>
                    <CircleIcon sx={{ color: blog?.isPublished ? "red" : "green" }} />
                    <Typography sx={{ color: blog?.isPublished ? "red" : "green" }}>
                        {blog?.isPublished ? "Đang ẩn" : "Đang công khai"}
                    </Typography>
                </Stack>
            </Stack>
            <Box px="100px">
                <TextField fullWidth sx={{ mt: 3, bgcolor: "white" }} placeholder='Thêm tiêu đề tại đây'
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                <Stack direction='row' gap={4} alignItems='center' mt={3}>
                    <Typography fontSize="20px" color='black'>Ảnh bìa</Typography>
                    <UploadImage setImage={setImage} aspectRatio={16 / 9} minDimension={250} />
                </Stack>
                <Box width="100%">
                    {
                        !image && blogImage && <img src={blogImage} alt='avatar' width="100%" />
                    }
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
                        toolbar: toolbarOptions,
                        clipboard: {
                            matchVisual: false
                        },
                        imageResize: {
                            parchment: Quill.import('parchment'),
                            modules: ['Resize', 'DisplaySize']
                        }
                    }}
                    placeholder='Nhập nội dung bài viết tại đây'
                    style={{ marginTop: "20px" }}
                    onMouseDown={handleMouseDown}
                    ref={quillRef}
                />
            </Box>
        </Box>
    )
}

export default BlogUpdate