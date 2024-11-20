import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflow: "auto"
};
function BlogDetail({ openDetail, setOpenDetail, blog }) {
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }
    return (
        <div>
            <Modal
                open={openDetail}
                onClose={() => { setOpenDetail(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: "center" }} variant='h4'>{blog?.title}</Typography>
                    <Stack direction='row' gap={5} justifyContent="center">
                        <Stack direction='row' mt={2} gap={1}>
                            <AccessTimeIcon /> <Typography>{formatDate(blog?.publishDate)}</Typography>
                        </Stack>
                        <Stack direction='row' mt={2} gap={1}>
                            <RemoveRedEyeIcon /> <Typography>{blog?.viewCount}</Typography>
                        </Stack>
                    </Stack>
                    <Typography sx={{ whiteSpace: "break-spaces" }} mt={2}><i>{blog?.description}</i></Typography>
                    <img src={blog?.urlImageDisplay}
                        style={{ width: "100%", marginTop: "30px" }} />
                    <Box sx={{ mt: 5 }} dangerouslySetInnerHTML={{ __html: blog?.content }} />
                </Box>
            </Modal>
        </div>
    )
}

export default BlogDetail
