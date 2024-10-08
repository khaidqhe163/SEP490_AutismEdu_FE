import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
import BasicInformation from './BasicInformation';
import CareerInformation from './CareerInformation';
import AcceptDialog from './handleDialog/acceptDialog';
function TutorRegistrationTable() {
    const [loading, setLoading] = useState(false);
    const [listTutor, setListTutor] = useState([]);
    const [pagination, setPagination] = useState(null);
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const formattedDate = dateObj.getDate().toString().padStart(2, '0') + '/' +
            (dateObj.getMonth() + 1).toString().padStart(2, '0') + '/' +
            dateObj.getFullYear();
        return formattedDate;
    }
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
                        <TableCell align='center'>
                            Thông tin nghề nghiệp
                        </TableCell>
                        <TableCell align='center'>Ngày tạo</TableCell>
                        <TableCell align='center'>Người xử lý</TableCell>
                        <TableCell align='center'>Trạng thái đơn</TableCell>
                        <TableCell>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        listTutor.length !== 0 && listTutor?.map((tutor, index) => {
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
                                        <CareerInformation curriculums={tutor.curriculums}
                                            workExperiences={tutor.workExperiences}
                                            certificates={tutor.certificates} />
                                    </TableCell>
                                    <TableCell align='center'>
                                        {formatDate(tutor.createdDate)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {tutor.approvedBy ? tutor.approvedBy.fullName : "Chưa có"}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {
                                            tutor.requestStatus === 0 && <Typography color="red">Từ chối</Typography>
                                        }
                                        {
                                            tutor.requestStatus === 1 && <Typography color="green">Đã chấp nhận</Typography>
                                        }
                                        {
                                            tutor.requestStatus === 2 && <Typography color="blue">Đang chờ</Typography>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            tutor.requestStatus === 2 && (
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <AcceptDialog id={tutor.id} status={1} setListTutor={setListTutor}
                                                        listTutor={listTutor} />
                                                    <AcceptDialog id={tutor.id} status={0} setListTutor={setListTutor}
                                                        listTutor={listTutor} />
                                                </Box>
                                            )
                                        }
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
