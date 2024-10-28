import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { TabPanel } from '@mui/lab';
import StudentInformation from './StudentInformation';
import services from '~/plugins/services';
import { useParams } from 'react-router-dom';
function StudentDetail() {
    const [tab, setTabs] = useState(0);
    const { id } = useParams();
    const [studentProfile, setStudentProfile] = useState();
    const handleChange = (event, newValue) => {
        setTabs(newValue);
    };

    useEffect(() => {
        handleGetStudentProfile();
    }, [])
    const handleGetStudentProfile = async () => {
        try {
            await services.StudentProfileAPI.getStudentProfileById(id, (res) => {
                console.log(res);
                setStudentProfile(res.result)
            }, (error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box sx={{
            flexGrow: 2, height: "calc(100vh - 65px)",
            overflow: "auto",
        }}>
            <Box px={3} sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label="icon position tabs example"
                >
                    <Tab icon={<CalendarMonthOutlinedIcon />} iconPosition="end" label="Lịch học" />
                    <Tab icon={<NoteAltOutlinedIcon />} iconPosition="end" label="Sổ liên lạc" />
                    <Tab icon={<AccountBoxOutlinedIcon />} iconPosition="end" label="Thông tin học sinh" />
                </Tabs>
                <Box>
                    <Typography sx={{ fontWeight: "bold", color: "#b660ec", fontSize: "20px" }}>{studentProfile?.name} - {studentProfile?.studentCode}</Typography>
                </Box>
            </Box>
            <Divider sx={{ width: "100%" }} />
            {
                tab === 2 && <StudentInformation studentProfile={studentProfile} />
            }
        </Box>
    )
}

export default StudentDetail
