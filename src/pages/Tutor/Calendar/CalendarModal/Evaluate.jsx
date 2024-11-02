import React, { useState } from 'react';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Modal,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material';

function Evaluate({ isOpen, setModalOpen, schedule }) {
    const [attendance, setAttendance] = useState(0);
    const [evaluation, setEvaluation] = useState(0);
    const [note, setNote] = useState('');

    const onClose = () => {
        setAttendance(0);
        setEvaluation(0);
        setNote('');
        setModalOpen(false);
    };

    const handleSubmit = () => {
        console.log({
            "id": schedule?.id,
            "attendance": attendance === 1 ? "Có mặt" : "Vắng",
            "evaluation": evaluation === 1 ? "Đạt" : "Chưa đạt",
            note,
        });
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 600, bgcolor: 'background.paper', p: 4, boxShadow: 24, borderRadius: 2,
                outline: 'none'
            }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: '600' }}>Đánh giá buổi học</Typography>
                <Divider sx={{ mb: 3 }} />

                {/* Student Information Section */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={5}>
                        <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Mã học sinh:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='subtitle1'>{schedule.studentProfile.studentCode}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Tên học sinh:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='subtitle1'><em>{schedule.studentProfile.name}</em></Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Ngày học:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='subtitle1'>{new Date(schedule.scheduleDate).toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Khung thời gian:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='subtitle1'>{schedule.start} - {schedule.end}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Loại bài tập:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='subtitle1'>Hôm nay trẻ học gì</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Bài tập:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='subtitle1'>Bài tập cho trẻ tư duy đổi mới</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Stack direction="row" spacing={5} sx={{ mb: 3 }}>
                    <Box>
                        <FormControl component="fieldset">
                        <FormLabel id="demo-radio-buttons-group-label">Điểm danh</FormLabel>
                            <RadioGroup
                                row
                                value={attendance}
                                onChange={(e) => setAttendance(Number(e.target.value))}
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Có mặt" />
                                <FormControlLabel value={0} control={<Radio />} label="Vắng" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl component="fieldset">
                        <FormLabel id="demo-radio-buttons-group-label2">Đánh giá</FormLabel>
                            {/* <Typography variant='subtitle1' sx={{ fontWeight: '500', mb: 1 }}>Đánh giá:</Typography> */}
                            <RadioGroup
                                row
                                value={evaluation}
                                onChange={(e) => setEvaluation(Number(e.target.value))}
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Đạt" />
                                <FormControlLabel value={0} control={<Radio />} label="Chưa đạt" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Stack>

                <TextField
                    label="Ghi chú"
                    multiline
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 3 }}
                />

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={onClose} sx={{ px: 3 }}>Huỷ</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ px: 3 }}>Lưu</Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default Evaluate;
