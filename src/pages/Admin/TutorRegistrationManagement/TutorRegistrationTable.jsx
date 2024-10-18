import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { createContext, useContext, useEffect, useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
import BasicInformation from './BasicInformation';
import CareerInformation from './CareerInformation';
import AcceptDialog from './handleDialog/acceptDialog';
import TablePagging from '~/components/TablePagging';
import TutorContext from '~/Context/TutorContext';

function TutorRegistrationTable({ status, searchValue, submit, startDate, endDate }) {
    const [loading, setLoading] = useState(false);
    const [listTutor, setListTutor] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const formattedDate = dateObj.getDate().toString().padStart(2, '0') + '/' +
            (dateObj.getMonth() + 1).toString().padStart(2, '0') + '/' +
            dateObj.getFullYear();
        return formattedDate;
    }
    useEffect(() => {
        handleGetTutor(1, 10);
    }, []);

    useEffect(() => {
        handleGetTutor(currentPage, status, searchValue, startDate, endDate)
    }, [currentPage, submit])

    const handleGetTutor = async (page, status, searchValue, startDate, endDate) => {
        try {
            setLoading(true);
            let submitStatus = ""
            if (status === 10)
                submitStatus = "Pending";
            if (status === 20)
                submitStatus = "Approve"
            if (status === 30)
                submitStatus = "Reject"
            await services.TutorManagementAPI.listTutor((res) => {
                res.pagination.currentSize = res.result.length
                setListTutor(res.result);
                setPagination(res.pagination)
            }, (err) => {
                console.log(err);
            }, {
                pageNumber: page,
                status: submitStatus,
                search: searchValue,
                startDate: startDate,
                endDate: endDate
            })
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(listTutor);
    return (
        <TutorContext.Provider value={{ listTutor, setListTutor }}>
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
                                        <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
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
                                                certificates={tutor.certificates} id={tutor.id} />
                                        </TableCell>
                                        <TableCell align='center'>
                                            {formatDate(tutor.createdDate)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {tutor.approvedBy ? tutor.approvedBy.fullName : "Chưa có"}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {
                                                tutor.requestStatus === 0 && <Typography color="red" sx={{ fontSize: "12px" }}>Từ chối</Typography>
                                            }
                                            {
                                                tutor.requestStatus === 1 && <Typography color="green" sx={{ fontSize: "12px" }}>Đã chấp nhận</Typography>
                                            }
                                            {
                                                tutor.requestStatus === 2 && <Typography color="blue" sx={{ fontSize: "12px" }}>Đang chờ</Typography>
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
                <TablePagging setCurrentPage={setCurrentPage} setPagination={setPagination} pagination={pagination} />
            </TableContainer >
        </TutorContext.Provider>
    )
}

export default TutorRegistrationTable
