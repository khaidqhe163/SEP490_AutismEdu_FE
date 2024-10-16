import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
function AssessmentManagement() {
    const [loading, setLoading] = useState(false);
    const [assessments, setAssessment] = useState([]);
    useEffect(() => {
        handleGetAsessment()
    }, [])
    const handleGetAsessment = async () => {
        try {
            await services.AssessmentManagementAPI.listAssessment((res) => {
                setAssessment(res.result)
            }, (err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    console.log(assessments);
    return (
        <Box sx={{
            height: (theme) => `calc(100vh - ${theme.myapp.adminHeaderHeight})`,
            width: "100%",
            position: "relative",
            marginTop: (theme) => theme.myapp.adminHeaderHeight
        }}>
            <Typography variant='h5'>Bảng danh sách đánh giá</Typography>
            {
                assessments.length === 0 ? (
                    <Typography mt={5}>Chưa có đánh giá nào</Typography>
                ) : (
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
                                    // listTutor.length !== 0 && listTutor?.map((tutor, index) => {
                                    //     return (
                                    //         <TableRow key={tutor.id}>
                                    //             <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
                                    //             <TableCell>
                                    //                 <Box sx={{ display: "flex", gap: 1 }}>
                                    //                     <Box>
                                    //                         <Typography sx={{ fontWeight: "bold" }}>{tutor.fullName}</Typography>
                                    //                         <Typography sx={{ fontSize: "12px" }}>{tutor.email}</Typography>
                                    //                     </Box>
                                    //                 </Box>
                                    //             </TableCell>
                                    //             <TableCell align='center'>
                                    //                 <BasicInformation information={tutor} />
                                    //             </TableCell>
                                    //             <TableCell align='center'>
                                    //                 <CareerInformation curriculums={tutor.curriculums}
                                    //                     workExperiences={tutor.workExperiences}
                                    //                     certificates={tutor.certificates} />
                                    //             </TableCell>
                                    //             <TableCell align='center'>

                                    //             </TableCell>
                                    //             <TableCell align='center'>
                                    //                 {tutor.approvedBy ? tutor.approvedBy.fullName : "Chưa có"}
                                    //             </TableCell>
                                    //             <TableCell align='center'>
                                    //                 {
                                    //                     tutor.requestStatus === 0 && <Typography color="red" sx={{ fontSize: "12px" }}>Từ chối</Typography>
                                    //                 }
                                    //                 {
                                    //                     tutor.requestStatus === 1 && <Typography color="green" sx={{ fontSize: "12px" }}>Đã chấp nhận</Typography>
                                    //                 }
                                    //                 {
                                    //                     tutor.requestStatus === 2 && <Typography color="blue" sx={{ fontSize: "12px" }}>Đang chờ</Typography>
                                    //                 }
                                    //             </TableCell>
                                    //         </TableRow>
                                    //     )
                                    // })
                                }
                            </TableBody>
                        </Table>
                        <LoadingComponent open={loading} setOpen={setLoading} />
                    </TableContainer >
                )
            }
        </Box>
    )
}

export default AssessmentManagement
