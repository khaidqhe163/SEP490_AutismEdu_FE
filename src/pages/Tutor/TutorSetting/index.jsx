import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import React, { useState } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DescriptionIcon from '@mui/icons-material/Description';
import EditProfile from './EditProfile';
import CurriculumManage from './CurriculumManagement';
import AvailableTimeManagement from './AvailableTimeManagement';

function TutorSetting() {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab iconPosition='start' icon={<ManageAccountsIcon />} label="Chỉnh sửa hồ sơ" value="1" />
                        <Tab iconPosition='start' icon={<AutoStoriesIcon />} label="Khung chương trình" value="2" />
                        <Tab iconPosition='start' icon={<EditCalendarIcon />} label="Thiết lập thời gian rảnh" value="3" />
                        <Tab iconPosition='start' icon={<DescriptionIcon />} label="Chứng chỉ" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <EditProfile />
                </TabPanel>
                <TabPanel value="2"><CurriculumManage /></TabPanel>
                <TabPanel value="3"><AvailableTimeManagement /></TabPanel>
                <TabPanel value="4">Chứng chỉ</TabPanel>
            </TabContext>
        </Box>
    )
}

export default TutorSetting