import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Box, List, ListItem, ListItemIcon, ListItemText, Modal, Stack, Typography } from '@mui/material';
import AssessmentGuild from '~/components/AssessmentGuild';
function ProgressReportDetail({ open, setOpen, selectedItem }) {
    const handleClose = () => setOpen(false);
    const formatDate = (date) => {
        if (!date) {
            return "";
        }
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    return (
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
                <Typography sx={{ textAlign: "center" }} variant='h5'>Chi tiết sổ liên lạc</Typography>
                {
                    selectedItem && (
                        <Box>
                            <Typography variant='h5'>Đánh giá trước đó</Typography>
                            <Typography mt={2}>Thời gian: {formatDate(selectedItem?.from)} - {formatDate(selectedItem?.to)}</Typography>
                            <Stack direction='row' gap={2} mt={2}>
                                <DoneIcon sx={{ color: "green" }} />
                                <Typography>Đã làm được</Typography>
                            </Stack>
                            <Typography sx={{ whiteSpace: "break-spaces" }}>{selectedItem.achieved}</Typography>
                            <Stack direction='row' gap={2} mt={2}>
                                <CloseIcon sx={{ color: "red" }} />
                                <Typography>Chưa làm được</Typography>
                            </Stack>
                            <Typography sx={{ whiteSpace: "break-spaces" }}>{selectedItem.failed}</Typography>
                            <Stack direction='row' gap={2} mt={2}>
                                <EditNoteIcon sx={{ color: "blue" }} />
                                <Typography>Ghi chú thêm</Typography>
                            </Stack>
                            <Typography sx={{ whiteSpace: "break-spaces" }}>{selectedItem.noteFromTutor === "" ? "Không có ghi chú" : selectedItem.noteFromTutor}</Typography>
                            <Stack direction='row' gap={2} mt={2}>
                                <ListAltIcon sx={{ color: "orange" }} />
                                <Typography>Danh sách đánh giá</Typography>
                            </Stack>
                            <List sx={{ height: '500px', overflow: "auto" }}>
                                {
                                    selectedItem && selectedItem.assessmentResults.map((a) => {
                                        return (
                                            <ListItem key={a.id}>
                                                <ListItemIcon>
                                                    <ChevronRightIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={a.question}
                                                    secondary={`Điểm: ${a.point}`}
                                                />
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Box>
                    )
                }
            </Box>
        </Modal>
    )
}

export default ProgressReportDetail
