import { Box, Divider, Tab, Tabs } from '@mui/material'
import React from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { TabPanel } from '@mui/lab';
import StudentInformation from './StudentInformation';
function StudentDetail() {
    const [tab, setTabs] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabs(newValue);
    };
    return (
        <Box sx={{ flexGrow: 2 }}>
            <Box px={3}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label="icon position tabs example"
                >
                    <Tab icon={<CalendarMonthOutlinedIcon />} iconPosition="end" label="Lịch học" />
                    <Tab icon={<NoteAltOutlinedIcon />} iconPosition="end" label="Sổ liên lạc" />
                    <Tab icon={<AccountBoxOutlinedIcon />} iconPosition="end" label="Thông tin học sinh" />
                </Tabs>
            </Box>
            <Divider sx={{ width: "100%" }} />
            {
                tab === 0 && <StudentInformation />
            }
        </Box>
    )
}

export default StudentDetail
