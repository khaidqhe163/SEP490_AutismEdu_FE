import { Box, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState, useEffect } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DescriptionIcon from '@mui/icons-material/Description';
import EditProfile from './EditProfile';
import CurriculumManage from './CurriculumManagement';
import AvailableTimeManagement from './AvailableTimeManagement';
import CertificateManagement from './CertificateManagement';

function TutorSetting() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialTab = location.state?.selectedTab || '1';
    const [value, setValue] = useState(initialTab);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate('.', { state: { selectedTab: newValue } }); 
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
                <TabPanel value="4"><CertificateManagement /></TabPanel>
            </TabContext>
        </Box>
    );
}

export default TutorSetting;
