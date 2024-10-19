import AddIcon from '@mui/icons-material/Add';
import axios from "~/plugins/axios";
import * as React from 'react';
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import CreateCertificateDialog from './CertificateModal/CreateCertificateDialog';
import { enqueueSnackbar } from 'notistack';
import services from '~/plugins/services';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';

function CertificateManagement() {
    const [status, setStatus] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const nav = useNavigate();
    const [filters, setFilters] = React.useState({
        search: '',
        status: 'all',
        orderBy: 'createdDate',
        sort: 'asc',
    });
    const [certificateData, setCertificateData] = useState({
        CertificateName: '',
        IssuingInstitution: '',
        IdentityCardNumber: '',
        IssuingDate: '',
        ExpirationDate: '',
        Medias: []
    });

    const [pagination, setPagination] = useState(null);

    const certificates = [
        {
            id: 1,
            name: 'Chứng chỉ A',
            dateCreated: '2023-09-12',
            status: 1,
            feedback: 'Đạt yêu cầu',
        },
        {
            id: 2,
            name: 'Chứng chỉ B',
            dateCreated: '2023-10-01',
            status: 0,
            feedback: 'Thiếu thông tin',
        },
    ];

    const handleViewDetail = (certificateId) => {
        nav(`/autismtutor/certificate-detail/${1013}`);
    };

    const handleFilterChange = (key) => (event) => {
        setFilters({
            ...filters,
            [key]: event.target.value,
        });
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCertificateData({ ...certificateData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + certificateData.images.length > 5) {
            enqueueSnackbar("Chỉ được tải lên tối đa 5 ảnh.", { variant: "error" });
            return;
        }
        const imageUrls = files.map(file => ({
            url: URL.createObjectURL(file),
            file
        }));
        setCertificateData({ ...certificateData, images: [...certificateData.images, ...imageUrls] });
    };

    const handleImageRemove = (index) => {
        const newImages = [...certificateData.images];
        newImages.splice(index, 1);
        setCertificateData({ ...certificateData, images: newImages });
    };

    const handleSubmitCertificate = async () => {
        try {
            const formData = new FormData();

            formData.append('CertificateName', certificateData.CertificateName);
            formData.append('IssuingInstitution', certificateData.IssuingInstitution);
            formData.append('IdentityCardNumber', certificateData.IdentityCardNumber);
            formData.append('IssuingDate', certificateData.IssuingDate);
            formData.append('ExpirationDate', certificateData.ExpirationDate);

            certificateData.Medias.forEach((file, index) => {
                formData.append(`Medias`, file);
            });

            axios.setHeaders({ "Content-Type": "multipart/form-data", "Accept": "application/json, text/plain, multipart/form-data, */*" });
            await services.CertificateAPI.createCertificate(formData, (res) => {
                enqueueSnackbar('Chứng chỉ của bạn đã được tạo thành công!', { variant: 'success' })
            }, (error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
        axios.setHeaders({ "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" });
    };

    const statusText = (status) => {
        switch (status) {
            case 0:
                return 'Từ chối';
            case 1:
                return 'Chấp nhận';
            case 2:
                return 'Chờ duyệt';
            default:
                return 'Không rõ';
        }
    };

    return (
        <Box sx={{ width: "90%", margin: "auto", mt: "20px", gap: 2 }}>
            <Typography variant='h4' sx={{ mb: 3 }}>Danh sách chứng chỉ</Typography>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems="center" sx={{ width: "100%", mb: 2 }} spacing={3}>
                <Box sx={{ flex: 2, mr: 3 }}>
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
                    <Box sx={{ flexBasis: '45%' }}>
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

                    <Box sx={{ flexBasis: '45%' }}>
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

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleDialogOpen}
                    sx={{ height: '40px', whiteSpace: 'nowrap' }} 
                >
                    Thêm chứng chỉ
                </Button>
            </Stack>

      

            <Box>
                <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Số thứ tự</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Tên chứng chỉ</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Ngày tạo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Phản hồi</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {certificates.map((certificate, index) => (
                                <TableRow key={certificate.id} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{certificate.name}</TableCell>
                                    <TableCell>{new Date(certificate.dateCreated).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color={
                                                certificate.status === 1 ? 'success' :
                                                    certificate.status === 0 ? 'error' :
                                                        'warning'
                                            }
                                            size="small"
                                            sx={{ borderRadius: 2, textTransform: 'none' }}
                                        >
                                            {statusText(certificate.status)}
                                        </Button>
                                    </TableCell>
                                    <TableCell>{certificate.feedback || 'Chưa có phản hồi'}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" aria-label="xem chi tiết" onClick={() => handleViewDetail(certificate.id)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton color="error" aria-label="xoá" onClick={() => handleDeleteCertificate(certificate.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <CreateCertificateDialog
                open={openDialog}
                onClose={handleDialogClose}
                certificateData={certificateData}
                setCertificateData={setCertificateData}
                handleInputChange={handleInputChange}
                handleImageUpload={handleImageUpload}
                handleImageRemove={handleImageRemove}
                handleSubmitCertificate={handleSubmitCertificate}
            />
        </Box>
    );
};
export default CertificateManagement;