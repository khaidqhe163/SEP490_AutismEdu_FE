import { TabContext, TabPanel } from '@mui/lab'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import ElevatorIcon from '@mui/icons-material/Elevator';

function CurriculumManagement() {
    const [valueCurriculum, setValueCurriculum] = useState('1');
    const handleChangeCurriculum = (event, newValue) => {
        setValueCurriculum(newValue);
    };
    return (
        <Box sx={{
            width: "90%",
            margin: "auto",
            mt: "20px",
            gap: 2
        }}>
            <Typography mb={2} variant='h5'>Khung chương trình học</Typography>
            <TabContext value={valueCurriculum}>
                <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                    <Tabs
                        value={valueCurriculum}
                        onChange={handleChangeCurriculum}
                        // variant="scrollable"
                        // scrollButtons
                        aria-label="icon position tabs example"
                    >
                        <Tab value="1" icon={<ElevatorIcon />} iconPosition="start" label="Từ 0 - 3 tuổi" />
                        <Tab value="2" icon={<ElevatorIcon />} iconPosition="start" label="Từ 4 - 6 tuổi" />
                        <Tab value="3" icon={<ElevatorIcon />} iconPosition="start" label="Từ 7 - 9 tuổi" />

                    </Tabs>
                </Box>
                <TabPanel value="1"> </TabPanel>
                <TabPanel value="2"> </TabPanel>
                <TabPanel value="3"> </TabPanel>
            </TabContext>

        </Box>
    )
}

export default CurriculumManagement