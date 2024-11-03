import { Box, Grid, Modal, Stack, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ASC = 1;
const DESC = 2;
const NOT_CHANGE = 3;
function StudentCompareReport({ open, setOpen, selectedItem, compareItem }) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getAssessmentPoint = (question) => {
        if (!compareItem || !question) {
            return 0;
        }
        const comAss = compareItem.assessmentResults.find((p) => {
            return p.question === question;
        })
        if (comAss) {
            return comAss.point
        } else {
            return 0
        }
    }

    const getAssessmentChange = (question) => {
        if (!compareItem || !selectedItem || !question) {
            return NOT_CHANGE;
        }
        const compareAss = compareItem.assessmentResults.find((p) => {
            return p.question === question;
        })
        const selectedAss = selectedItem.assessmentResults.find((p) => {
            return p.question === question;
        })
        if (selectedItem) {
            if (selectedAss.point > compareAss.point) {
                return DESC;
            } else if (selectedAss.point < compareAss.point) {
                return ASC;
            } else {
                return NOT_CHANGE;
            }
        } else {
            return NOT_CHANGE
        }
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
                <Typography sx={{ textAlign: "center" }} variant='h5'>So sánh 2 sổ liên lạc</Typography>
                <Stack direction='row' mt={5}>
                    <Typography sx={{ width: "50%", textAlign: "center" }}>20/20/2024 - 20/20/2024</Typography>
                    <Typography sx={{ width: "50%", textAlign: "center" }}>20/20/2024 - 20/20/2024</Typography>
                </Stack>
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Đánh giá" value="1" />
                            <Tab label="Đã làm được" value="2" />
                            <Tab label="Chưa làm được" value="3" />
                            <Tab label="Ghi chú thêm" value="4" />
                        </Tabs>
                    </Box>
                </Box>
                <Box px="100px">
                    {
                        selectedItem && selectedItem.assessmentResults.map((s) => {
                            return (
                                <Grid container mt={2} sx={{ borderBottom: "1px solid gray" }} key={s.id}>
                                    <Grid item xs={3}>
                                        <Stack direction='row' justifyContent='end'>
                                            <Typography textAlign='right'>{s.point}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography sx={{ textAlign: "center", px: 2 }}>{s.question}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Stack direction='row' justifyContent='start' gap={5}>
                                            <Typography textAlign='left'>{getAssessmentPoint(s.question)}</Typography>
                                            {
                                                getAssessmentChange(s.question) === DESC &&
                                                <ArrowDownwardIcon sx={{ color: "red" }} />
                                            }
                                            {
                                                getAssessmentChange(s.question) === ASC &&
                                                <ArrowUpwardIcon sx={{ color: "green" }} />
                                            }
                                        </Stack>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Box>
            </Box>
        </Modal>
    )
}

export default StudentCompareReport
