import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Link, Rating, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ButtonComponent from '~/Components/ButtonComponent';
import FormSearch from './FormSearch/FormSearch';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';
import LoadingComponent from '~/components/LoadingComponent';
import { useNavigate } from 'react-router-dom';

function SearchTutor() {
    const [searchCriteria, setSearchCriteria] = useState({
        searchValue: "",
        address: "",
        selectedRating: "",
        ageRange: [0, 15]
    });

    const [loading, setLoading] = useState(false);

    const [tutors, setTutors] = useState([]);

    const [pagination, setPagination] = useState(null);

    const navigate = useNavigate();

    const [selected, setSelected] = useState('grid');
    const [searchValue, setSearchValue] = useState('');
    const arrCenter = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [visibleCards, setVisibleCards] = useState(6);
    const [showFilters, setShowFilters] = useState(false);


    useEffect(() => {
        handleGetTutor();
    }, []);

    const handleGetTutor = async (isMore = false) => {
        const tutorData = {
            search: searchCriteria.searchValue,
            searchAddress: searchCriteria.address,
            reviewScore: searchCriteria.selectedRating,
            ageFrom: searchCriteria.ageRange[0],
            ageTo: searchCriteria.ageRange[1],
            pageNumber: isMore ? pagination.pageNumber : 1
        };
        setLoading(true);
        try {
            await services.TutorManagementAPI.handleGetTutors((res) => {
                setTutors(prev => isMore ? [...prev, ...res.result] : res.result);
                setPagination(res.pagination);
            }, (error) => {
                console.log(error);
            }, tutorData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };


    const handleFilterClick = () => {
        setShowFilters(!showFilters);
    };

    const handleSearch = () => {
        handleGetTutor();
    };

    const handleButtonClick = (button) => {
        setSelected(button);
    };
    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    };
    const handleShowMore = () => {
        setPagination(prev => ({ ...prev, pageNumber: (prev.pageNumber + 1) }));
        handleGetTutor(true);
    };


    const handleClickToProfile = (id) => {
        navigate(`/autismedu/tutor-profile/${id}`);
    };

    const getCity = (address) => {
        const city = address.split('|')[0];
        return city;
    };

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            Trang chủ
        </Link>,
        <Typography key="3" sx={{ color: 'rgb(107, 115, 133)' }}>
            Danh sách trung tâm
        </Typography>,
    ];

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    console.log(tutors);


    return (
        <Box sx={{ height: 'auto' }}>
            <FormSearch selected={selected} setSelected={setSelected}
                showFilters={showFilters} handleSearch={handleSearch} handleFilterClick={handleFilterClick} searchCriteria={searchCriteria} setSearchCriteria={setSearchCriteria} />
            <Grid container sx={{ height: 'auto', position: "relative", top: '-170px' }}>

                <Grid item xs={2} />

                <Grid item xs={8} sx={{ height: 'auto' }} mt={5}>
                    <Grid container sx={{ height: 'auto' }}>
                        <Grid item>
                            <Grid container spacing={5}>
                                {selected !== "list" ?
                                    tutors.map((t, index) =>
                                    (<Grid item xs={4} key={index}>
                                        <Card sx={{
                                            padding: "20px", minHeight: "600px",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                            '&:hover': {
                                                transform: "scale(1.05) translateY(-10px)",
                                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                                            },
                                            borderRadius: "5px",
                                        }}>
                                            <CardMedia
                                                sx={{ height: 240, objectPosition: "top", objectFit: "cover" }}
                                                image={t.imageUrl}
                                                title="apeople"
                                            />
                                            <CardContent>
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <Rating name="read-only" value={t.reviewScore} readOnly />
                                                        <Typography ml={2}>({t.totalReview} reviews)</Typography>
                                                    </Box>
                                                    <IconButton>
                                                        <BookmarkBorderIcon />
                                                    </IconButton>
                                                </Box>
                                                <Typography gutterBottom variant="h4" component="div" sx={{ fontSize: "26px" }}>
                                                    {t.fullName}
                                                </Typography>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: "5px", mt: 2 }}>
                                                    <LocationOnOutlinedIcon />
                                                    <Typography>{t?.address ? getCity(t.address) : 'Hồ Chí Minh'}</Typography>
                                                </Box>
                                                <Box sx={{
                                                    display: "flex", alignItems: "center", gap: "5px", mt: 2,
                                                    '&:hover': {
                                                        color: "blue"
                                                    }
                                                }}>
                                                    <LocalPhoneOutlinedIcon />
                                                    <a href={`tel:${t.phoneNumber}`}><Typography sx={{
                                                        '&:hover': {
                                                            color: "blue"
                                                        }
                                                    }}>{t.phoneNumber}</Typography></a>
                                                </Box>
                                                <Typography mt={3} sx={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    height: '70px',
                                                    width: '100%'
                                                }}>
                                                    {t.aboutMe} he Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free
                                                </Typography>

                                                <Box sx={{ display: "flex", gap: "15px", flexDirection: 'column' }}>

                                                    <Box sx={{
                                                        display: "flex", alignItems: "center", gap: "10px", mt: 2,
                                                        '&:hover': {
                                                            color: "blue"
                                                        }
                                                    }}>
                                                        <EmailOutlinedIcon />
                                                        <a href='mailto:xuanthulab.net@gmail.com'>
                                                            <Typography
                                                                sx={{
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    maxWidth: '280px',
                                                                    '&:hover': {
                                                                        color: "blue"
                                                                    }
                                                                }}
                                                            >
                                                                {t.email}
                                                            </Typography>
                                                        </a>
                                                    </Box>

                                                </Box>
                                                <Typography mt={4} variant='h5' color={'green'}>{formatter.format(t.price)}<Typography component="span" variant='subtitle1' color={'gray'}> / buổi</Typography></Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button sx={{ fontSize: "20px" }} onClick={() => handleClickToProfile(t.userId)}>Tìm hiểu thêm <ArrowForwardIcon /></Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>)
                                    ) : tutors.map((t, index) => (<Grid item xs={12} key={index}>
                                        <Card sx={{
                                            display: 'flex',
                                            padding: "20px",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                            '&:hover': {
                                                transform: "scale(1.05) translateY(-10px)",
                                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                                            },
                                            borderRadius: "5px",
                                            minHeight: "500"
                                        }}>

                                            <CardMedia
                                                sx={{ width: '40%', height: 'auto', borderRadius: '8px' }}
                                                // image="https://sep490g50v1.blob.core.windows.net/logos-public/21ba5f2c-1f01-42c5-927b-2f66b885e34b.jpg"
                                                image={t.imageUrl}
                                                title="Hanoi"
                                            />


                                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', padding: "20px" }}>
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                                            <Rating name="read-only" value={t.reviewScore} readOnly />
                                                            <Typography ml={2}>({t.totalReview} reviews)</Typography>
                                                        </Box>
                                                        <IconButton>
                                                            <BookmarkBorderIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Typography gutterBottom variant="h4" component="div" sx={{ fontSize: "26px" }}>
                                                        {t.fullName}
                                                    </Typography>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: "5px", mt: 2 }}>
                                                        <LocationOnOutlinedIcon />
                                                        <Typography>{t?.address ? getCity(t.address) : 'Hồ Chí Minh'}</Typography>
                                                    </Box>
                                                    <Typography mt={2} sx={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        height: '75px'
                                                    }}>
                                                        {t.aboutMe} he Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and  cruelty-free
                                                    </Typography>

                                                    <Box sx={{ display: "flex", gap: "15px" }}>
                                                        <Box sx={{
                                                            display: "flex", alignItems: "center", gap: "10px", mt: 2,
                                                            '&:hover': {
                                                                color: "blue"
                                                            }
                                                        }}>
                                                            <LocalPhoneOutlinedIcon />
                                                            <a href={`tel:${t.phoneNumber}`}><Typography sx={{
                                                                '&:hover': {
                                                                    color: "blue"
                                                                }
                                                            }}>{t.phoneNumber}</Typography></a>
                                                        </Box>
                                                        <Box sx={{
                                                            display: "flex", alignItems: "center", gap: "10px", mt: 2,
                                                            '&:hover': {
                                                                color: "blue"
                                                            }
                                                        }}>
                                                            <EmailOutlinedIcon />
                                                            <a href='mailto:xuanthulab.net@gmail.com'>
                                                                <Typography
                                                                    sx={{
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        maxWidth: '300px',
                                                                        '&:hover': {
                                                                            color: "blue"
                                                                        }
                                                                    }}
                                                                >
                                                                    {t.email}
                                                                </Typography>
                                                            </a>
                                                        </Box>

                                                    </Box>
                                                    <Typography mt={4} variant='h5' color={'green'}>{formatter.format(t.price)}<Typography component="span" variant='subtitle1' color={'gray'}> / buổi</Typography></Typography>


                                                </CardContent>
                                                <CardActions>
                                                    <Button sx={{ fontSize: "20px" }} onClick={() => handleClickToProfile(t.userId)}>Tìm hiểu thêm <ArrowForwardIcon /></Button>
                                                </CardActions>
                                            </Box>
                                        </Card>
                                    </Grid>))}

                            </Grid>
                        </Grid>

                        <Grid item xs={2}></Grid>
                    </Grid>

                </Grid>
                <Grid item xs={2} />
                <Grid item xs={12} mt={5} sx={{ display: "flex", justifyContent: "center" }}>
                    {(Math.ceil(pagination?.total / pagination?.pageSize) > pagination?.pageNumber) && (
                        <Grid item xs={12} mt={5} sx={{ display: "flex", justifyContent: "center" }}>
                            <ButtonComponent
                                action={handleShowMore}
                                width={"200px"}
                                height={"50px"}
                                text={"Xem thêm"}
                                borderRadius={"20px"}
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <LoadingComponent open={loading} setOpen={setLoading} />
        </Box>
    );
}

export default SearchTutor;
