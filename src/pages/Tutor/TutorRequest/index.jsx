import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Accordion, AccordionSummary, AccordionDetails, Button, Divider, Grid, AccordionActions, TextField, Pagination } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CreateStudentProfileModal from './TutorRequestModal/CreateStudentProfileModal';
import RejectRequestModal from './TutorRequestModal/RejectRequestModal';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import services from '~/plugins/services';
import LoadingComponent from '~/components/LoadingComponent';
import { format } from 'date-fns';
import { enqueueSnackbar } from 'notistack';

function TutorRequest() {

    const [listRequest, setListRequest] = React.useState([]);

    const [pagination, setPagination] = React.useState({
        pageNumber: 1,
        pageSize: 10,
        totalPages: 10,
    });
    const [loading, setLoading] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [currentNote, setCurrentNote] = React.useState('');
    const [selectedRequest, setSelectedRequest] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [openRejectModal, setOpenRejectModal] = React.useState(false);
    const [filters, setFilters] = React.useState({
        search: '',
        status: 'all',
        sort: 'desc',
    });

    const handleFilterChange = (key) => (event) => {
        setFilters({
            ...filters,
            [key]: event.target.value,
        });
    };

    const handleOpenModal = (request) => {
        setSelectedRequest(request);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenDialog = (note) => {
        setCurrentNote(note);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const totalPages = Math.ceil(pagination.total / pagination.pageSize);


    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleOpenRejectModal = (request) => {
        setSelectedRequest(request);
        setOpenRejectModal(true);
    };

    const handleCloseRejectModal = () => {
        setOpenRejectModal(false);
    };

    const handleConfirmReject = async (reasonOriginal) => {
        setLoading(true);
        const { reason, rejectType } = reasonOriginal;
        const body = {
            id: selectedRequest?.id,
            statusChange: 0,
            rejectType,
            rejectionReason: reason
        }
        try {
            await services.TutorRequestAPI.changeStatusTutorRequest(selectedRequest?.id, body, (res) => {
                const newListRequest = listRequest.map((r, index) => {
                    if (r.id == selectedRequest?.id) {
                        return { ...r, requestStatus: 0 };
                    } else {
                        return r;
                    }
                });
                setListRequest(newListRequest);
                enqueueSnackbar('Từ chối yêu cầu thành công!', { variant: 'success' });
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setOpenRejectModal(false);
        }
    };

    const handleGetListRequestTutor = async () => {
        try {

            setLoading(true);
            await services.TutorRequestAPI.getListTutorRequest((res) => {
                if (res?.result) {
                    // console.log('heL: ', pagination?.pageNumber);
                    setListRequest(res.result);
                    setPagination(res.pagination);
                }
            }, (error) => {
                console.log(error);
            }, {
                search: filters.search,
                status: filters.status,
                orderBy: 'createdDate',
                sort: filters.sort,
                pageNumber: pagination.pageNumber,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        handleGetListRequestTutor();
    }, [filters, pagination.pageNumber]);



    // console.log(listRequest);

    const requests = [
        {
            parentName: 'Nguyễn Văn An',
            parentAvatar: 'https://static.vecteezy.com/system/resources/previews/027/448/973/original/avatar-account-icon-default-social-media-profile-photo-vector.jpg', // Replace with actual avatar URL
            status: 1,
            childInfo: {
                phone: '0338581585',
                parentName: 'Nguyễn Văn An',
                childName: 'Nguyễn Văn B',
                gender: 'Nam',
                birthDate: new Date('2010-05-20'),
                age: 14,
                note: 'Tự kỷ là một trong những rối loạn phát triển hay gặp ở trẻ em. Tự kỷ là một trong những rối loạn phát triển hay gặp ở trẻ em.Tự kỷ là một trong những rối loạn phát triển hay gặp ở trẻ em.Tự kỷ là một trong những rối loạn phát triển hay gặp ở trẻ em.Trẻ mắc tự kỷ không những phát triển chậm về quan hệ xã hội, ngôn ngữ, giao tiếp, học hành mà còn có những rối loạn hành vi ảnh hưởng lớn đến gia đình và xã hội.'
            },
        },
        {
            parentName: 'Trần Thị Mai',
            parentAvatar: 'https://static.vecteezy.com/system/resources/previews/027/448/973/original/avatar-account-icon-default-social-media-profile-photo-vector.jpg', // Replace with actual avatar URL
            status: 2,
            childInfo: {
                phone: '0123456789',
                parentName: 'Trần Thị Mai',
                childName: 'Trần Minh',
                gender: 'Nữ',
                birthDate: new Date('2012-11-10'),
                age: 12,
                note: 'Cần hỗ trợ học toán.',
            },
        },
        {
            parentName: 'Trần Thị Giang',
            parentAvatar: 'https://static.vecteezy.com/system/resources/previews/027/448/973/original/avatar-account-icon-default-social-media-profile-photo-vector.jpg', // Replace with actual avatar URL
            status: 0,
            childInfo: {
                phone: '0123456789',
                parentName: 'Trần Thị Giang',
                childName: 'Trần Mun',
                gender: 'Nữ',
                birthDate: new Date('2012-11-10'),
                age: 12,
                note: 'Cần hỗ trợ học toán.Tự kỷ là một trong những rối loạn phát triển hay gặp ở trẻ em. Tự kỷ là một trong những rối loạn phát triển hay gặp ở trẻ em.Tự kỷ là một trong những rối loạn phát triển hay gặp ở trẻ em.Tự kỷ là một trong những rối loạn phát triển hay gặp ở trẻ em.Trẻ mắc tự kỷ không những phát triển chậm về quan hệ xã hội, ngôn ngữ, giao tiếp, học hành mà còn có những rối loạn hành vi ảnh hưởng lớn đến gia đình và xã hội.',
            },
        }
    ];

    const statusTransform = (status) => {
        let statusText = '';
        switch (status) {
            case 0: statusText = 'Từ chối'; break;
            case 1: statusText = 'Đã chấp nhận'; break;
            case 2: statusText = 'Đang chờ'; break;
        }
        return statusText;
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
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

    const handlePageChange = (event, value) => {
        setPagination({ ...pagination, pageNumber: value });
    };

    // console.log("Pagina");
    // console.log(pagination);

    return (
        <Stack direction='column' sx={{
            width: "80%",
            margin: "auto",
            mt: "20px",
            gap: 2,
            backgroundColor: '#f9fafc',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}>
            <Typography variant='h4' sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
                Danh sách các yêu cầu
            </Typography>

            <Stack direction={'row'} justifyContent={'space-between'} alignItems="center" sx={{ width: "100%", mb: 2 }} spacing={3}>
                <Box sx={{ flex: 1, mr: 3 }}>
                    <TextField
                        fullWidth
                        size='small'
                        label="Tìm kiếm"
                        value={filters.search}
                        onChange={handleFilterChange('search')}
                        sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Stack direction={'row'} justifyContent={'flex-end'} spacing={2} sx={{ flex: 1 }}>
                    <Box sx={{ width: "45%" }}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="status-select-label">Trạng thái</InputLabel>
                            <Select
                                labelId="status-select-label"
                                value={filters.status}
                                label="Trạng thái"
                                onChange={handleFilterChange('status')}
                                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                            >
                                <MenuItem value={'all'}>Tất cả</MenuItem>
                                <MenuItem value={'approve'}>Đã chấp nhận</MenuItem>
                                <MenuItem value={'pending'}>Đang chờ</MenuItem>
                                <MenuItem value={'reject'}>Từ chối</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: "45%" }}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="sort-select-label">Thứ tự</InputLabel>
                            <Select
                                labelId="sort-select-label"
                                value={filters.sort}
                                label="Thứ tự"
                                onChange={handleFilterChange('sort')}
                                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                            >
                                <MenuItem value="asc">Tăng dần theo ngày</MenuItem>
                                <MenuItem value="desc">Giảm dần theo ngày</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
            </Stack>


            <Box sx={{ width: "100%" }}>
                {listRequest.map((request, index) => (
                    <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleAccordionChange(`panel${index}`)} sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        marginBottom: '15px',
                        backgroundColor: '#fff'
                    }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{
                            backgroundColor: '#fff',
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Typography variant='body1' ml={2}>{(index + 1) + (pagination?.pageNumber - 1) * 5}</Typography>
                                <Avatar src={request?.parent?.imageUrl} sx={{ borderRadius: '50%', width: 56, height: 56, mx: 2 }} />
                                <Stack>
                                    <Typography variant='subtitle1' fontWeight={500}>Yêu cầu từ phụ huynh:</Typography>
                                    <Typography variant='h6' fontWeight={600}>{request?.parent?.fullName}</Typography>
                                </Stack>
                            </Stack>
                            <Stack direction='row' gap={2} justifyContent='flex-end' alignItems='center' sx={{ flexGrow: 1 }}>
                                <Button variant="contained" color="primary" startIcon={<QuestionAnswerIcon />}>
                                    Nhắn tin
                                </Button>

                                <Box width={130}>
                                    <Button
                                        variant='outlined'
                                        color={request.requestStatus === 1 ? 'success' : request.requestStatus === 0 ? 'error' : 'warning'}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        {statusTransform(request?.requestStatus)}
                                    </Button>
                                </Box>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: 'background.paper' }}>
                            <Typography variant='h6' sx={{ mt: 1 }}>Thông tin về trẻ</Typography>
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} container spacing={2} alignItems="center">
                                    <Grid item xs={4}>
                                        <Typography variant='body1' fontWeight={600}>Số điện thoại:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant='body1'>{request?.childInformation?.parentPhoneNumber}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container spacing={2} alignItems="center">
                                    <Grid item xs={4}>
                                        <Typography variant='body1' fontWeight={600}>Tên phụ huynh:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant='body1'>{request?.parent?.fullName}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container spacing={2} alignItems="center">
                                    <Grid item xs={4}>
                                        <Typography variant='body1' fontWeight={600}>Tên trẻ:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant='body1'>{request?.childInformation?.name}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container spacing={2} alignItems="center">
                                    <Grid item xs={4}>
                                        <Typography variant='body1' fontWeight={600}>Giới tính:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant='body1'>{request?.childInformation?.gender}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container spacing={2} alignItems="center">
                                    <Grid item xs={4}>
                                        <Typography variant='body1' fontWeight={600}>Ngày sinh:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant='body1'>{request?.childInformation?.birthDate && formatDate(request?.childInformation?.birthDate)}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container spacing={2} alignItems="center">
                                    <Grid item xs={4}>
                                        <Typography variant='body1' fontWeight={600}>Tuổi:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant='body1'>{request?.childInformation?.birthDate && calculateAge(new Date(request?.childInformation?.birthDate))}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container spacing={2} alignItems="flex-start">
                                    <Grid item xs={4}>
                                        <Typography variant='body1' fontWeight={600}>Ghi chú:</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Box sx={{ maxWidth: '600px', overflow: 'hidden', wordBreak: 'break-word' }}>
                                            <Typography
                                                variant='body1'
                                                sx={{
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 4,
                                                    overflow: 'hidden',
                                                    whiteSpace: 'normal',
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {request?.description}
                                            </Typography>

                                            {request?.description.length > 200 && (
                                                <Typography
                                                    variant='body2'
                                                    component='span'
                                                    onClick={() => handleOpenDialog(request?.description)}
                                                    sx={{
                                                        color: 'gray',
                                                        cursor: 'pointer',
                                                        marginLeft: '5px',
                                                        textDecoration: 'underline',
                                                    }}
                                                >
                                                    Xem thêm
                                                </Typography>
                                            )}
                                        </Box>

                                        <Dialog open={openDialog} onClose={handleCloseDialog}>
                                            <DialogTitle>Ghi chú</DialogTitle>
                                            <DialogContent>
                                                <Typography
                                                    variant='body1'
                                                    sx={{
                                                        overflowWrap: 'break-word',
                                                        wordBreak: 'break-word',
                                                        maxWidth: '500px',
                                                        lineHeight: 1.5,
                                                    }}
                                                >
                                                    {currentNote}
                                                </Typography>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleCloseDialog} color="primary">
                                                    Đóng
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </AccordionDetails>
                        {request?.requestStatus === 2 && (
                            <AccordionActions sx={{ justifyContent: 'flex-end', backgroundColor: '#f1f1f1', padding: '10px' }}>
                                <Button variant="contained" color="success" onClick={() => handleOpenModal(request)}>
                                    Chấp nhận
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleOpenRejectModal(request)}>
                                    Từ chối
                                </Button>
                            </AccordionActions>
                        )}
                    </Accordion>
                ))}
            </Box>

            {selectedRequest && openModal && (
                <CreateStudentProfileModal open={openModal} onClose={handleCloseModal} request={selectedRequest} />
            )}

            {selectedRequest && openRejectModal && (
                <RejectRequestModal open={openRejectModal} onClose={handleCloseRejectModal} onConfirm={handleConfirmReject} />
            )}

            <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={pagination.pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>

            <LoadingComponent open={loading} setOpen={setLoading} />
        </Stack>
    );
}

export default TutorRequest;
