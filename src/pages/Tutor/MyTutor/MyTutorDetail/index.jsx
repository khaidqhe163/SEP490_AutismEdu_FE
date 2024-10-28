import styled from '@emotion/styled';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import PhoneIcon from '@mui/icons-material/Phone';
import { Avatar, Box, Breadcrumbs, Button, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatter } from '~/utils/service';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ChildInformation from './ChildrenInformation';
import services from '~/plugins/services';
const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: 'white',
    },
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(18),
        marginRight: theme.spacing(1),
        color: 'rgba(255, 255, 255, 0.7)',
        '&.Mui-selected': {
            color: '#fff',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);
function MyTutorDetail() {

    const { id } = useParams();
    const [studentProfile, setStudentProfile] = useState();
    const [tab, setTab] = useState('1');
    const handleChange = (event, newValue) => {
        setTab(newValue);
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

    const formatAddress = (address) => {
        if (!address) return "";
        const addressArr = address.split("|");
        return `${addressArr[3]} - ${addressArr[2]} - ${addressArr[1]} - ${addressArr[0]}`
    }
    return (
        <Box>
            <Box sx={{
                background: `linear-gradient(to bottom, #f4f4f6, transparent),linear-gradient(to right, #4468f1, #c079ea)`,
                transition: 'height 0.5s ease',
                paddingX: "70px",
                pt: "20px",
                pb: "10px"
            }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Trang chủ
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Gia sư của tôi
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Chi tiết</Typography>
                </Breadcrumbs>
                <Stack direction="row" alignItems="center" justifyContent="space-between"
                    px="100px">
                    <Stack direction="row" sx={{
                        gap: 2,
                        alignItems: "center",
                        mt: 5
                    }}>
                        <Avatar alt={studentProfile?.tutor.fullName || "R"}
                            src={studentProfile?.tutor.imageUrl || "/"}
                            sx={{ width: "150px", height: "150px" }}
                        />
                        <Box>
                            <Typography variant='h4'>{studentProfile?.tutor.fullName}</Typography>
                            <Stack direction="row" alignItems="center" gap={2} mt={2}>
                                <LocalPhoneIcon /><Typography> {studentProfile?.tutor.phoneNumber}</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={2} mt={2}>
                                <LocationOnOutlinedIcon /><Typography> {formatAddress(studentProfile?.tutor.address)}</Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    <Button variant='contained' sx={{ height: "50px" }}
                        startIcon={<PriorityHighIcon />} color="warning"
                    >Tố cáo</Button>
                </Stack>
                <Box mt={5} px="100px">
                    <StyledTabs
                        value={tab}
                        onChange={handleChange}
                        aria-label="tab-center"
                    >
                        <StyledTab value="1" label="Lịch học" />
                        <StyledTab value="2" label="Biểu đồ đánh gía" />
                        <StyledTab value="3" label="Sổ liên lạc" />
                        <StyledTab value="4" label="Thông tin học sinh" />
                    </StyledTabs>
                </Box>
            </Box>
            {4 === Number(tab) && <ChildInformation studentProfile={studentProfile} />}
            <Divider sx={{ width: "80%", margin: "auto", mt: "100px" }} />
        </Box >
    )
}

export default MyTutorDetail
