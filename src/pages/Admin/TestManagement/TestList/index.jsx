import { Box, Button, Card, CardContent, CardMedia, Grid, InputAdornment, Pagination, Stack, TextField, Typography, Modal } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import LoadingComponent from '~/components/LoadingComponent';
import TestCreationModal from '../TestModal/TestCreationModal';

function TestList() {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [testList, setTestList] = useState([
        { id: 1, testName: 'Tập phát âm thuở ban đầu - nhưng âm thanh của trẻ nhỏ', description: 'Mô tả về bài kiểm tra tập phát âm cho trẻ nhỏ.' },
        { id: 2, testName: 'Tập phát âm thuở ban đầu - lời nói đầu tiên', description: 'Mô tả bài kiểm tra về phát âm những từ đầu tiên của trẻ.' },
        { id: 3, testName: 'Nghe: Chú ý - nhận biết các âm', description: 'Bài kiểm tra về khả năng nhận biết âm thanh của trẻ.' },
        { id: 4, testName: 'Nghe: Chú ý - tìm kiếm và dõi theo các âm thanh', description: 'Bài kiểm tra chú ý và tìm kiếm âm thanh.' },
        { id: 5, testName: 'Nghe: Chú ý - đáp lại sự chú ý bằng cách mỉm cười và phát ra âm thanh', description: 'Kiểm tra khả năng đáp lại sự chú ý qua âm thanh và cử chỉ.' },
        { id: 6, testName: 'Nghe: Chú ý - làm cho người khác phải chú ý đến mình', description: 'Kiểm tra khả năng thu hút sự chú ý của người khác qua âm thanh và hành động.người khác qua âm thanh và hành động.' }
    ]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10,
        total: 10,
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDescription, setModalDescription] = useState('');

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
    };

    const handlePageChange = (event, value) => {
        setPagination({ ...pagination, pageNumber: value });
    };

    const handleOpenModal = (description) => {
        setModalDescription(description);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const totalPages = Math.ceil(pagination.total / pagination.pageSize);

    return (
        <Stack direction='column' sx={{
            width: "90%",
            margin: "auto",
            gap: 2
        }}>
            <Typography variant='h4' textAlign={'center'} my={2}>Danh sách bài kiểm tra</Typography>

            <Stack direction={'row'} alignItems={'center'} gap={2} mb={2}>
                <Box width={"20%"} />
                <Box width={'60%'}>
                    <TextField
                        fullWidth
                        size='small'
                        label="Tìm kiếm"
                        value={search}
                        onChange={handleSearch}
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
                <Box sx={{ width: "20%", display: 'flex' }}>
                    <Button size='medium' variant='contained' color='primary' onClick={() => handleOpenDialog()}>Tạo bài kiểm tra</Button>
                </Box>
            </Stack>

            <Grid container spacing={3} sx={{ flexWrap: 'wrap' }}>
                {testList.map(test => (
                    <Grid item key={test.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                maxWidth: 345,
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="240"
                                image="https://vntesters.com/wp-content/uploads/2019/06/test.jpg"
                                alt="Exercise Icon"
                            />
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        height: '52px',
                                    }}
                                >
                                    {test.testName}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        height: '40px',
                                    }}
                                >
                                    {test.description}
                                </Typography>
                                {test?.description?.length > 100 ? (
                                    <Button variant="text" size="small" color="primary" onClick={() => handleOpenModal(test.description)}>
                                        Xem thêm nội dung
                                    </Button>
                                ):<Button></Button>}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {testList.length !== 0 && <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={pagination.pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>}
            <TestCreationModal dialogOpen={dialogOpen} handleCloseDialog={handleCloseDialog} setTestList={setTestList} />
            <LoadingComponent open={loading} setOpen={setLoading} />

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box sx={{ backgroundColor: 'white', padding: 4, maxWidth: 600, width: '100%' }}>
                    <Typography variant="h6" mb={2}>Nội dung</Typography>
                    <Typography variant="body2" color="text.secondary">{modalDescription}</Typography>
                    <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
                        <Button variant="contained" onClick={handleCloseModal}>Đóng</Button>
                    </Box>
                </Box>
            </Modal>
        </Stack>
    );
}

export default TestList;
