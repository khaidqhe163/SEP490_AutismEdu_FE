import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useState } from 'react';
import CreateCertificateDialog from './CertificateModal/CreateCertificateDialog';
import { enqueueSnackbar } from 'notistack';

function CertificateManagement() {
    const [status, setStatus] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [certificateData, setCertificateData] = useState({
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        images: []
    });

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
        // Thêm nhiều chứng chỉ nếu cần
    ];

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
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

            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        label="Trạng thái"
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        <MenuItem value={2}>Chờ duyệt</MenuItem>
                        <MenuItem value={1}>Chấp nhận</MenuItem>
                        <MenuItem value={0}>Từ chối</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleDialogOpen}>
                    Thêm chứng chỉ
                </Button>
            </Box>

            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Số thứ tự</TableCell>
                                <TableCell>Tên chứng chỉ</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Phản hồi</TableCell>
                                <TableCell>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {certificates.map((certificate, index) => (
                                <TableRow key={certificate.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{certificate.name}</TableCell>
                                    <TableCell>{certificate.dateCreated}</TableCell>
                                    <TableCell>
                                        <Button variant='text' color={
                                            certificate.status === 1 ? 'success' :
                                                certificate.status === 0 ? 'error' :
                                                    'warning'
                                        }>
                                            {statusText(certificate.status)}
                                        </Button>
                                    </TableCell>
                                    <TableCell>{certificate.feedback}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" aria-label="xem chi tiết">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton color="error" aria-label="xoá">
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
            />
        </Box>
    );
};
export default CertificateManagement;