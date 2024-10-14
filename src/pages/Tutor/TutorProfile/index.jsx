import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ElevatorIcon from '@mui/icons-material/Elevator';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import StarIcon from '@mui/icons-material/Star';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Divider, Grid, Stack, Typography, TextField } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';
import TutorRating from './TutorRating';
import TutorRequestModal from './TutorProfileModal/TutorRequestModal';
import services from '~/plugins/services';
import { useParams } from 'react-router-dom';
import LoadingComponent from '~/components/LoadingComponent';
import CelebrationIcon from '@mui/icons-material/Celebration';

function TutorProfile() {
    const today = new Date();
    const { id } = useParams();

    const [learnGoal, setLearnGoal] = useState("Con bạn sẽ:\n* Học nhiều chiến lược đọc và cách áp dụng chúng.\n* Hiểu câu chuyện qua các câu hỏi hiểu bài.\n* Luyện tập từ vựng nhìn thấy\n* Luyện tập độ trôi chảy, từ vựng và nhận thức âm thanh.\n* Luyện tập lượt chơi, kỹ năng lắng nghe, kiên nhẫn và nhận thức xã hội.\n* Luyện tập cấu trúc câu qua viết mô phỏng.");
    const [additionalContent, setAdditionalContent] = useState(
        "Nội dung bổ sung:\n* Phát triển khả năng giao tiếp hiệu quả trong môi trường xã hội.\n* Học cách xử lý thông tin và giải quyết vấn đề qua câu chuyện.\n* Luyện tập trí nhớ thông qua các hoạt động liên quan đến từ vựng.\n* Nâng cao khả năng hiểu biết về ngữ pháp và cấu trúc câu.\n* Cải thiện sự tự tin và khả năng diễn đạt thông qua thảo luận nhóm."
    );
    const [value, setValue] = useState('1');
    const [valueCurriculum, setValueCurriculum] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeCurriculum = (event, newValue) => {
        setValueCurriculum(newValue);
    };


    const [schedule, setSchedule] = useState(1);

    const [availability, setAvailability] = useState([
        { date: 1, times: ['08:30 - 09:00', '13:00 - 13:30', '15:00 - 15:30', '16:00 - 16:30'] },
        { date: 2, times: ['08:00 - 08:30', '12:00 - 12:30'] },
        { date: 3, times: ['9:00 - 9:30', '14:00 - 14:30'] },
        { date: 4, times: [] },
        { date: 5, times: ['10:00 - 10:30'] },
        { date: 6, times: [] },
        { date: 7, times: [] },
    ]);


    const [tutor, setTutor] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleGetProfile(id);
    }, [id]);

    const handleGetProfile = async (id) => {
        setLoading(true);
        try {
            await services.TutorManagementAPI.handleGetTutor(id, (res) => {
                setTutor(res.result);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    console.log(tutor);


    const handleDateChange = (date) => {
        setSchedule(date);
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

    const getCity = (address) => {
        const city = address.split('|')[0];
        return city;
    };

    const calculateAge = (birthDate) => {

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
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
                variant={schedule === day.date ? 'contained' : 'outlined'}
                color={schedule === day.date ? 'primary' : 'inherit'}
                onClick={() => handleDateChange(day.date)}
                sx={{ mx: 1, my: 1 }}
            >
                {day.label}
            </Button>
        ));
    };

    const renderTimeButtons = () => {
        const selectedDay = availability.find(day => day.date === schedule) || { times: [] };

        const getStartTime = (time) => {
            const [startTime] = time.split(' - ');
            return startTime;
        };

        const sortedTimes = [...selectedDay.times].sort((a, b) => {
            const startA = getStartTime(a);
            const startB = getStartTime(b);

            const dateA = new Date(`1970-01-01T${startA}:00`);
            const dateB = new Date(`1970-01-01T${startB}:00`);

            return dateA - dateB;
        });

        return sortedTimes.map((time, index) => (
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
                    <Typography variant="body1">{time}</Typography>

                </Box>
            </Grid>
        ));
    };
    return (
        <Grid container sx={{ height: 'auto', width: "100%" }} py={5}>
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Grid container sx={{ height: "auto", width: "100%" }}>
                    <Grid item xs={12} px={2}>

                        <Box sx={{ display: "flex", alignItems: 'center', mb: 5 }}>
                            <Box sx={{ borderRadius: "50%", overflow: 'hidden', maxWidth: "18%", height: "auto" }} border={1}>
                                <img
                                    src={tutor?.imageUrl}
                                    alt='avatartutor'
                                    style={{ width: '100%', height: '100%', objectFit: "cover", objectPosition: "center" }}
                                />
                            </Box>
                            <Box ml={3}>
                                <Typography ml={0.5} variant='h4'>{tutor?.fullName}</Typography>
                                <Stack direction={"row"} alignItems={"center"}><StarIcon sx={{ color: 'gold', mr: 0.5 }} /> <Typography variant='subtitle1' fontWeight={"bold"}>{tutor?.reviewScore}</Typography><Typography variant='body1' ml={1}>({tutor?.totalReview} lượt đánh giá)</Typography></Stack>
                                <Typography variant='body1' ml={0.5}>Đã tham gia: {tutor?.createdDate && formatDate(tutor?.createdDate)}</Typography>
                                <Stack direction={"row"} alignItems={"center"} gap={2}>
                                    <Box sx={{ display: 'flex' }}>
                                        <LocationOnOutlinedIcon color='error' sx={{ mr: 0.5 }} />
                                        <Typography variant='subtitle1'>{tutor?.address ? getCity(tutor?.address) : 'Hồ Chí Minh'}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <CelebrationIcon color='info' sx={{ mr: 0.5 }}/>
                                        <Typography variant='subtitle1'>{tutor?.dateOfBirth && calculateAge(new Date(tutor?.dateOfBirth))} tuổi</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                            <Box ml={50}>
                                <TutorRequestModal />
                            </Box>
                        </Box>

                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Giới thiệu" value="1" />
                                        {/* <Tab label="Item Two" value="2" />
                                        <Tab label="Item Three" value="3" /> */}
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <>
                                        <Box boxShadow={2} my={5} sx={{ borderRadius: "10px", maxHeight: "500px" }} pb={5}>
                                            <Box bgcolor={'rgb(168 85 247)'} p={2} sx={{ borderBottom: "1px solid", borderColor: "lightgray", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                                                <Typography variant='h6' color={'white'} ml={2}>Tổng quan</Typography>
                                            </Box>

                                            <Box pl={2}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }} mt={2}>
                                                    <PaidOutlinedIcon />
                                                    <Typography variant='subtitle1' sx={{ minWidth: '50px' }}>Học phí: </Typography>
                                                    <Typography variant='h6'>3.000.000/ buổi</Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                                                    <CakeOutlinedIcon />
                                                    <Typography variant='subtitle1' sx={{ minWidth: '150px' }}>Độ tuổi học sinh, học viên: </Typography>
                                                    <Typography variant='h6'>12 tháng - 1 tuổi</Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                                                    <LocalPhoneOutlinedIcon />
                                                    <Typography variant='subtitle1' sx={{ minWidth: '30px' }}>Số điện thoại: </Typography>
                                                    <a href='tel:40404040404'>
                                                        <Typography variant='h6' sx={{
                                                            '&:hover': { color: "blue" }
                                                        }}>035484151</Typography>
                                                    </a>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                                                    <EmailOutlinedIcon />
                                                    <Typography variant='subtitle1' sx={{ minWidth: '50px' }}>Email: </Typography>
                                                    <Typography variant='h6'>nguyenvanphu@gmail.com</Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 1 }}>
                                                    <LocationOnOutlinedIcon />
                                                    <Typography variant='subtitle1' sx={{ minWidth: '60px' }}>Địa chỉ: </Typography>
                                                    <Typography variant='h6'>204 Nguyễn Lương Bằng, Phường Quang Trung, Quận Đống Đa, TP. Hà Nội</Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box display="flex" flexDirection="column" gap={3}>
                                            <Box>
                                                <Typography my={2} variant='h5'>Giới thiệu về tôi</Typography>
                                                <Typography variant='body1'>
                                                    Tên tôi là John Rotgers và tôi tốt nghiệp Thạc sĩ Quản trị Kinh doanh chuyên ngành Tiếp thị (Trực tuyến) tại Đại học Erasmus Rotterdam. Tôi là một chuyên gia chuyên về thương mại điện tử từ năm 2001. Tôi đã làm việc cho một số công ty quốc tế, như TNT Post và Centric. Ngoài ra, tôi còn làm tư vấn với tư cách là một nhà quản lý kinh doanh điện tử tự do. Tôi cũng đã thiết lập nhiều trang web và cửa hàng trực tuyến thành công trong lĩnh vực bán lẻ và du lịch. Tôi có thể giúp bạn với nhiều chủ đề liên quan đến kinh doanh điện tử và tiếp thị trực tuyến như viết văn bản, SEO, Google Ads và phân tích từ khóa và trang web.
                                                </Typography>
                                            </Box>

                                            <Box sx={{ borderTop: "1px solid", borderColor: "lightgray" }}>
                                                <Typography my={2} variant='h5'>Học Vấn</Typography>
                                                <Stack direction={'column'} gap={1}>
                                                    <Box sx={{ width: "100%", display: 'flex', direction: 'row', gap: 2 }}>
                                                        <Box sx={{ maxWidth: "10%", height: "auto", borderRadius: "10px" }}>
                                                            {/* <img style={{ width: '100%', height: 'auto', objectFit: "cover", objectPosition: "center", borderRadius: "10px" }}
                                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/seller_page_perseus/Education.9b53994.svg" /> */}
                                                            <SchoolOutlinedIcon fontSize='large' />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant='h6' fontSize={'medium'}>Đại học kinh tế quốc dân (NEU)</Typography>
                                                            <Typography variant='body1'>Chuyên ngành: Tâm lý giáo dục</Typography>
                                                            <Typography variant='body2'>Từ 06-2016 đến 08-2020</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ width: "100%", display: 'flex', direction: 'row', gap: 2 }}>
                                                        <Box sx={{ maxWidth: "10%", height: "auto", borderRadius: "10px" }}>
                                                            <SchoolOutlinedIcon fontSize='large' />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant='h6' fontSize={'medium'}>Đại học sư phạm Hà Nội (HNUE)</Typography>
                                                            <Typography variant='body1'>Chuyên ngành: Tâm lý giáo dục</Typography>
                                                            <Typography variant='body2'>Từ 06-2016 đến 08-2020</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ width: "100%", display: 'flex', direction: 'row', gap: 2 }}>
                                                        <Box sx={{ maxWidth: "10%", height: "auto", borderRadius: "10px" }}>
                                                            <SchoolOutlinedIcon fontSize='large' />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant='h6' fontSize={'medium'}>Đại học Bách Khoa (HUST)</Typography>
                                                            <Typography variant='body1'>Chuyên ngành: Tâm lý giáo dục</Typography>
                                                            <Typography variant='body2'>Từ 06-2016 đến 08-2020</Typography>
                                                        </Box>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                            <Box py={3} sx={{ borderTop: "1px solid", borderBottom: "1px solid", borderColor: "lightgray" }}>
                                                <Typography mb={2} variant='h5'>Kinh nghiệm làm việc</Typography>
                                                <Stack direction={'column'} gap={1}>
                                                    <Box sx={{ width: "100%", display: 'flex', direction: 'row', gap: 2 }}>
                                                        <Box sx={{ maxWidth: "10%", height: "auto", borderRadius: "10px" }}>

                                                            <BusinessCenterOutlinedIcon fontSize='large' />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant='h6' fontSize={'medium'}>Trung tâm giáo dục IPro</Typography>
                                                            <Typography variant='body1'>Vị trí: Giáo viên chủ nhiệm</Typography>
                                                            <Typography variant='body2'>Từ 06-2016 đến 08-2020</Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{ width: "100%", display: 'flex', direction: 'row', gap: 2 }}>
                                                        <Box sx={{ maxWidth: "10%", height: "auto", borderRadius: "10px" }}>
                                                            <BusinessCenterOutlinedIcon fontSize='large' />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant='h6' fontSize={'medium'}>Trung tâm Vina Health</Typography>
                                                            <Typography variant='body1'>Vị trí: Chuyên gia tâm lý</Typography>
                                                            <Typography variant='body2'>Từ 06-2016 đến 08-2020</Typography>
                                                        </Box>
                                                    </Box>

                                                </Stack>
                                            </Box>

                                            <Box pb={2}>
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
                                                            {/* <Tab value="4" icon={<ElevatorIcon />} iconPosition="start" label="Từ 7 - 9 tuổi" />
                                                            <Tab value="5" icon={<ElevatorIcon />} iconPosition="start" label="Từ 7 - 9 tuổi" />
                                                            <Tab value="6" icon={<ElevatorIcon />} iconPosition="start" label="Từ 7 - 9 tuổi" /> */}
                                                        </Tabs>
                                                    </Box>
                                                    <TabPanel value="1" sx={{ padding: '0' }}>
                                                        <Stack direction={'row'} gap={2} bgcolor={'#fff8e3'} mt={2} p={3} borderRadius={'20px'}>
                                                            <Box sx={{ width: "5%" }}>
                                                                <CheckCircleIcon color='success' fontSize='large' />
                                                            </Box>
                                                            <Box sx={{ width: "85%" }}>
                                                                {learnGoal.split('\n').map((line, index) => (
                                                                    <Typography variant='subtitle1' key={index}>
                                                                        {line}
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                            <Box sx={{ width: "10%", display: "flex", alignItems: "end" }}>
                                                                <img src='https://cdn-icons-png.freepik.com/256/4295/4295914.png?semt=ais_hybrid'
                                                                    style={{ width: "100%", objectFit: "cover", objectPosition: "center" }}
                                                                />
                                                            </Box>
                                                        </Stack>
                                                    </TabPanel>
                                                    <TabPanel value="2" sx={{ padding: '0' }}>
                                                        <Stack direction={'row'} gap={2} bgcolor={'#fff8e3'} mt={2} p={3} borderRadius={'20px'}>
                                                            <Box sx={{ width: "5%" }}>
                                                                <CheckCircleIcon color='success' fontSize='large' />
                                                            </Box>
                                                            <Box sx={{ width: "85%" }}>
                                                                {additionalContent.split('\n').map((line, index) => (
                                                                    <Typography variant='subtitle1' key={index}>
                                                                        {line}
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                            <Box sx={{ width: "10%", display: "flex", alignItems: "end" }}>
                                                                <img src='https://cdn-icons-png.freepik.com/256/4295/4295914.png?semt=ais_hybrid'
                                                                    style={{ width: "100%", objectFit: "cover", objectPosition: "center" }}
                                                                />
                                                            </Box>
                                                        </Stack></TabPanel>
                                                    <TabPanel value="3" sx={{ padding: '0' }}>
                                                        <Stack direction={'row'} gap={2} bgcolor={'#fff8e3'} mt={2} p={3} borderRadius={'20px'}>
                                                            <Box sx={{ width: "5%" }}>
                                                                <CheckCircleIcon color='success' fontSize='large' />
                                                            </Box>
                                                            <Box sx={{ width: "85%" }}>
                                                                {learnGoal.split('\n').map((line, index) => (
                                                                    <Typography variant='subtitle1' key={index}>
                                                                        {line}
                                                                    </Typography>
                                                                ))}
                                                            </Box>
                                                            <Box sx={{ width: "10%", display: "flex", alignItems: "end" }}>
                                                                <img src='https://cdn-icons-png.freepik.com/256/4295/4295914.png?semt=ais_hybrid'
                                                                    style={{ width: "100%", objectFit: "cover", objectPosition: "center" }}
                                                                />
                                                            </Box>
                                                        </Stack>
                                                    </TabPanel>
                                                </TabContext>

                                            </Box>
                                            <Divider />


                                            <Stack direction='column' sx={{
                                                width: "100%",
                                                margin: "auto",
                                                mt: "20px",
                                                gap: 2
                                            }}>
                                                <Typography variant='h2' my={2}>Thiết lập thời gian rảnh</Typography>
                                                <Box>
                                                    <Stack direction={'column'} gap={1}>
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                                            {renderWeekButtons()}
                                                        </Box>

                                                        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                                                            <Typography variant='h6'>{`Thứ ${schedule}`}</Typography>
                                                            <Grid container spacing={1} sx={{ mt: 1 }}>
                                                                {renderTimeButtons()}
                                                            </Grid>
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                            <TutorRating />
                                        </Box>
                                    </>
                                </TabPanel>
                                {/* <TabPanel value="2">Bài tập</TabPanel>
                                <TabPanel value="3">Chứng chỉ</TabPanel> */}
                            </TabContext>
                        </Box>

                    </Grid>

                </Grid>
                <LoadingComponent open={loading} setOpen={setLoading} />
            </Grid>
            <Grid item xs={2} />
        </Grid>
    )
}

export default TutorProfile;
