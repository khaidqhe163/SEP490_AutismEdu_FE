import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';

function AvailableTimeManagement() {
    const [timeData, setTimeData] = useState({
        weekday: 1,
        timeSlot: {
            from: '',
            to: ''
        }
    });

    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        handleGetAllAvailableTime(1);  // Get default weekday (1 - Monday)
    }, []);

    const handleGetAllAvailableTime = async (weekday) => {
        try {
            await services.AvailableTimeManagementAPI.getAvailableTime((res) => {
                setAvailability(res.result || []);  // Set availability to empty array if no data
            }, (error) => {
                console.log(error);
            }, { weekday });
        } catch (error) {
            console.log(error);
        }
    };
    console.log(availability);
    
    const handleSave = async () => {
        try {
            await services.AvailableTimeManagementAPI.createAvailableTime(timeData, (res) => {
                enqueueSnackbar("Create available time success!", { variant: "success" });
                handleGetAllAvailableTime(timeData.weekday);  // Refresh the available time after saving
            }, (error) => {
                if (error.code === 400) {
                    enqueueSnackbar(error.error[0], { variant: "error" });
                }
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
        setTimeData((prev) => ({
            ...prev,
            timeSlot: { from: '', to: '' }
        }));
    };

    const handleDeleteTime = async (weekday, timeSlotId) => {
        try {
            await services.AvailableTimeManagementAPI.removeAvailableTime({ weekday, timeSlotId }, (res) => {
                setAvailability(availability.filter((avai) => (avai.timeSlotId !== timeSlotId)));
                enqueueSnackbar("Remove available time success!", { variant: "success" });
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Handle weekday change
    const handleDateChange = async (weekday) => {
        setTimeData((prev) => ({
            ...prev,
            weekday
        }));
        await handleGetAllAvailableTime(weekday);  // Update availability when weekday changes
    };

    const renderWeekButtons = () => {
        const weekDays = [
            { date: 1, label: 'Thứ 2' },
            { date: 2, label: 'Thứ 3' },
            { date: 3, label: 'Thứ 4' },
            { date: 4, label: 'Thứ 5' },
            { date: 5, label: 'Thứ 6' },
            { date: 6, label: 'Thứ 7' },
            { date: 7, label: 'Chủ Nhật' }
        ];

        return weekDays.map((day) => (
            <Button
                key={day.date}
                variant={timeData.weekday === day.date ? 'contained' : 'outlined'}
                color={timeData.weekday === day.date ? 'primary' : 'inherit'}
                onClick={() => handleDateChange(day.date)}
                sx={{ mx: 1, my: 1 }}
            >
                {day.label}
            </Button>
        ));
    };

    const renderTimeButtons = () => {
        return availability.map((time, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ mb: 1 }}>
                <Box
                    sx={{
                        border: '1px solid lightgray',
                        borderRadius: '4px',
                        p: 1,
                        textAlign: 'center',
                        backgroundColor: '#f5f5f5',
                    }}
                    display={"flex"}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={1}
                >
                    <Typography variant="body1">{time.timeSlot}</Typography>
                    <IconButton onClick={() => handleDeleteTime(timeData?.weekday, time.timeSlotId)}>
                        <CancelIcon color='error' />
                    </IconButton>
                </Box>
            </Grid>
        ));
    };

    return (
        <Stack direction='column' sx={{
            width: "90%",
            margin: "auto",
            mt: "20px",
            gap: 2
        }}>
            <Typography variant='h4' my={2}>Thiết lập thời gian rảnh</Typography>
            <Box>
                <Stack direction={'column'} gap={1}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {renderWeekButtons()}
                    </Box>
                    <Stack direction={'row'} gap={2} mt={2}>
                        <Box>
                            <Typography variant='body1' mb={2}>Thời gian bắt đầu</Typography>
                            <TextField
                                id="outlined-basic1"
                                variant="outlined"
                                type="time"
                                value={timeData.timeSlot.from}
                                onChange={(e) =>
                                    setTimeData((prev) => ({
                                        ...prev,
                                        timeSlot: { ...prev.timeSlot, from: e.target.value }
                                    }))
                                }
                            />
                        </Box>
                        <Box>
                            <Typography variant='body1' mb={2}>Thời gian kết thúc</Typography>
                            <TextField
                                id="outlined-basic2"
                                variant="outlined"
                                type="time"
                                value={timeData.timeSlot.to}
                                onChange={(e) =>
                                    setTimeData((prev) => ({
                                        ...prev,
                                        timeSlot: { ...prev.timeSlot, to: e.target.value }
                                    }))
                                }
                            />
                        </Box>
                    </Stack>
                    <Box my={1}>
                        <Button color='primary' variant='contained' onClick={handleSave}>
                            Lưu
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                        <Typography variant='h6'>{`Thứ ${timeData.weekday}`}</Typography>
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                            {availability?.length ? renderTimeButtons() : <Typography>Không có thời gian rảnh</Typography>}
                        </Grid>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    );
}

export default AvailableTimeManagement;
