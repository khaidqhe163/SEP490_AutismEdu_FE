import { Box, Card, CardContent, CardMedia, Grid, InputAdornment, Pagination, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExerciseList from './ExerciseList';

// Dữ liệu loại bài tập
const exerciseTypes = [
    { id: 1, exerciseTypeName: 'Tập phát âm thuở ban đầu - nhưng âm thanh của trẻ nhỏ Tập phát âm thuở ban đầu - nhưng âm thanh của trẻ nhỏ' },
    { id: 2, exerciseTypeName: 'Tập phát âm thuở ban đầu - lời nói đầu tiên' },
    { id: 3, exerciseTypeName: 'Nghe: Chú ý - nhận biết các âm' },
    { id: 4, exerciseTypeName: 'Nghe: Chú ý - tìm kiếm và dõi theo các âm thanh' },
    { id: 5, exerciseTypeName: 'Nghe: Chú ý - đáp lại sự chú ý bằng cách mỉm cười và phát ra âm thanh' },
    { id: 6, exerciseTypeName: 'Nghe: Chú ý - làm cho người khác phải chú ý đến mình' }
];

function ExerciseTypeList() {
    const [search, setSearch] = useState('');
    const [showExerciseList, setShowExerciseList] = useState(false);
    const [selected, setSelected] = useState(null);
    const [pagination, setPagination] = React.useState({
        pageNumber: 1,
        pageSize: 10,
        totalPages: 10,
    });
    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
    };

    const filteredExerciseTypes = exerciseTypes.filter(type =>
        type.exerciseTypeName.toLowerCase().includes(search.toLowerCase())
    );

    const handlePageChange = (event, value) => {
        setPagination({ ...pagination, pageNumber: value });
    };

    const handleGetExerciseList = (selectedType) => {
        setSelected(selectedType);
        setShowExerciseList(true);
    }

    const totalPages = Math.ceil(pagination.totalPages / pagination.pageSize);

    if (showExerciseList && selected) {
        return <ExerciseList selectedExerciseType={selected} setShowExerciseList={setShowExerciseList}/>
    }

    return (
        <Stack direction='column' sx={{
            width: "90%",
            margin: "auto",
            gap: 2
        }}>
            <Typography variant='h4' textAlign={'center'} my={2}>Danh sách loại bài tập</Typography>

            <Box width={'60%'} margin={'auto'}>
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

            <Grid container spacing={3} sx={{ flexWrap: 'wrap' }}>
                {filteredExerciseTypes.map(type => (
                    <Grid item key={type.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                maxWidth: 345,
                                textAlign: 'center',
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                            onClick={() => handleGetExerciseList(type)}
                        >
                            <CardMedia
                                component="img"
                                height="240"
                                image="https://png.pngtree.com/png-vector/20190726/ourlarge/pngtree-college-education-graduation-cap-hat-university-icon-vector-desi-png-image_1588318.jpg" // Ảnh biểu tượng giáo dục
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
                                    {type.exerciseTypeName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={pagination.pageNumber}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>
        </Stack>


    );
}

export default ExerciseTypeList;
