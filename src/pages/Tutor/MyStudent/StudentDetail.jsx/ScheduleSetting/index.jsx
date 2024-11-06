import CloseIcon from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ConfirmDialog from '~/components/ConfirmDialog';
import CreateSchedule from './CreateSchedule';
function ScheduleSetting() {
    const [openConfirm, setOpenConfirm] = useState(false);
    return (
        <Box sx={{ px: 5, py: 3 }}>
            <Typography variant='h4'>Cài đặt lịch học</Typography>
            <Stack direction='row' mt={5}>
                <Box sx={{ width: "60%" }}>
                    <CreateSchedule />
                    <Box sx={{
                        display: "flex",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        p: 2,
                        gap: 2, alignItems: "center",
                        justifyContent: "space-between",
                        width: "400px",
                        mt: 3
                    }}>
                        <Typography sx={{ fontSize: "24px" }}>Thứ 2</Typography>
                        <Typography sx={{ fontSize: "24px" }}>12:00 - 14:00</Typography>
                        <IconButton onClick={() => setOpenConfirm(true)}>
                            <CloseIcon sx={{ fontSize: "26px" }} />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ width: "40%" }}>
                    <Stack direction="row">
                        <PriorityHighIcon sx={{ color: "red" }} />
                        <Typography variant='h6'>Lưu ý</Typography>
                    </Stack>
                    <ul>
                        <li>Nếu muốn thay đổi khung giờ, hãy xoá khung giờ muốn thay đổi rồi thêm khung giờ mới</li>
                        <li>Lịch học chỉ được cập nhật ở các tuần tiếp theo</li>
                    </ul>
                </Box>
            </Stack >
            <ConfirmDialog openConfirm={openConfirm} setOpenConfirm={setOpenConfirm}
                title={"Xoá khung giờ"}
                content={"Bạn có muốn xoá khung giờ này?"}
            />
        </Box >
    )
}

export default ScheduleSetting
