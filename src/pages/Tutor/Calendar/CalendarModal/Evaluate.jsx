import React, { useEffect, useState } from 'react';
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
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';

function Evaluate({ isOpen, setModalOpen, schedule, selectedKey, filterSchedule, setFilterSchedule }) {

    console.log(schedule);

    const [loading, setLoading] = useState(false);
    const [attendance, setAttendance] = useState(0);
    const [evaluation, setEvaluation] = useState(0);
    const [note, setNote] = useState('');
    const [notificationModalOpen, setNotificationModalOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isValidate, setValidate] = useState(true);

    useEffect(() => {
        if (schedule) {
            setAttendance(schedule.attendanceStatus === 2 ? 0 : schedule.attendanceStatus);
            setEvaluation(schedule.passingStatus === 2 ? 0 : schedule.passingStatus);
            setNote(schedule.note || '');
        }
    }, [schedule]);

    const onClose = () => {
        setAttendance(0);
        setEvaluation(0);
        setNote('');
        setModalOpen(false);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = {
                "id": schedule?.id,
                "attendanceStatus": attendance,
                "passingStatus": evaluation,
                note
            };
            console.log(data);
            await services.ScheduleAPI.updateScheduleChangeStatus(schedule?.id, data, (res) => {

                if (res?.result) {
                    const updateData = filterSchedule[selectedKey].map((s) => {
                        if (s.id === res.result?.id) {
                            s = res.result;
                            return s;
                        } else {
                            return s;
                        }
                    });

                    setFilterSchedule((prev) => ({ ...prev, [selectedKey]: updateData }));
                    enqueueSnackbar("Đánh giá thành công!", { variant: 'success' });
                }
                if (res?.errorMessages?.length !== 0) {
                    setNotificationMessage(res?.errorMessages[0] || '');
                    setNotificationModalOpen(true);
                }
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setValidate(
            schedule?.attendanceStatus === attendance &&
            schedule?.passingStatus === evaluation &&
            (schedule?.note || '') === note
        );
    }, [attendance, evaluation, note, schedule]);

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}`;
    }


    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 600, bgcolor: 'background.paper', p: 4, boxShadow: 24, borderRadius: 2,
                    outline: 'none'
                }}>
                    {loading && (
                        <LoadingComponent open={loading} />
                    )}
                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: '600' }}>Đánh giá buổi học</Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Mã học sinh:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'>{schedule.studentProfile?.studentCode}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Tên học sinh:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'><em>{schedule.studentProfile?.name}</em></Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Ngày học:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'>{new Date(schedule?.scheduleDate)?.toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Khung thời gian:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'>{formatTime(schedule.start)} - {formatTime(schedule.end)}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Loại bài tập:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'>{schedule?.exerciseType?.exerciseTypeName}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>Bài tập:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1'>{schedule?.exercise?.exerciseName}</Typography>
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
                        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ px: 3 }} disabled={isValidate}>Lưu</Button>
                    </Stack>
                </Box>
            </Modal>
            <Modal open={notificationModalOpen} onClose={() => setNotificationModalOpen(false)}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: 'background.paper', p: 4, boxShadow: 24, borderRadius: 2,
                    outline: 'none', textAlign: 'center'
                }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: '600' }}>Thông báo</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="body1" sx={{ mb: 3 }}>{notificationMessage}</Typography>
                    <Button variant="contained" onClick={() => setNotificationModalOpen(false)} >Xác nhận</Button>
                </Box>
            </Modal>
        </>
    );
}

export default Evaluate;