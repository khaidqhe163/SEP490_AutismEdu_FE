import { Avatar, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DoneIcon from '@mui/icons-material/Done';
import BasicInformation from './BasicInformation';
import TutorCertificate from './TutorCertificate';
import TutorWorkExperience from './TutorWorkExperience';
import { useEffect, useState } from 'react';
import services from '~/plugins/services';
import LoadingComponent from '~/components/LoadingComponent';
function TutorRegistrationTable() {
    const [loading, setLoading] = useState(false);
    const [listTutor, setListTutor] = useState([]);
    const [pagination, setPagination] = useState(null);
    useEffect(() => {
        handleGetTutor();
    }, []);
    const handleGetTutor = async () => {
        try {
            setLoading(true);
            await services.TutorManagementAPI.listTutor((res) => {
                setListTutor(res.result);
                setPagination(res.pagination)
            }, (err) => {
                console.log(err);
            })
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    console.log(listTutor);
    return (
        <TableContainer component={Paper} sx={{ mt: "20px" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Người đăng ký</TableCell>
                        <TableCell align='center'>Chi tiết</TableCell>
                        <TableCell align='center'>Bằng cấp</TableCell>
                        <TableCell align='center'>Kinh nghiệm</TableCell>
                        <TableCell align='center'>Khung chương trình</TableCell>
                        <TableCell align='center'>Ngày tạo</TableCell>
                        <TableCell align='center'>Người xử lý</TableCell>
                        <TableCell>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        listTutor.length !== 0 && listTutor.map((tutor, index) => {
                            return (
                                <TableRow key={tutor.id}>
                                    <TableCell>{index}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: "bold" }}>{tutor.fullName}</Typography>
                                                <Typography sx={{ fontSize: "12px" }}>{tutor.email}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <BasicInformation information={tutor} />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <TutorCertificate />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <TutorWorkExperience />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <TutorWorkExperience />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <TutorWorkExperience />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <TutorWorkExperience />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <Button color='success' variant='contained'>Chấp nhận</Button>
                                            <Button color='error' variant='contained'>Từ chối</Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <LoadingComponent open={loading} setOpen={setLoading} />
        </TableContainer >
    )
}

export default TutorRegistrationTable
