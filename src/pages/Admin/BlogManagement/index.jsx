import { Box, Button, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import TablePagging from '~/components/TablePagging';
import services from '~/plugins/services';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ConfirmDialog } from '@toolpad/core';
function BlogManagement() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("all");
    const [searchName, setSearchName] = useState("");
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentBlog, setCurrentBlog] = useState(null)
    const [openConfirm, setOpenConfirm] = useState(false);
    useEffect(() => {
        handleGetBlogs();
    }, [])
    useEffect(() => {
        handleGetBlogs();
    }, [currentPage, status])

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    const handleGetBlogs = async () => {
        try {
            setLoading(true);
            await services.BlogAPI.getBlogs((res) => {
                setBlogs(res.result);
                res.pagination.currentSize = res.result.length
                setPagination(res.pagination);
            }, (err) => {
                console.log(err);
            }, {
                pageNumber: currentPage,
                isPublishe: status
            })
            setLoading(false);
        } catch (error) {
            enqueueSnackbar("Lỗi hệ thống", { variant: "error" });
            setLoading(false);
        }
    }

    // const changeStatus = async () => {
    //     try {
    //         await services.PackagePaymentAPI.updatePaymentPackage(currentPackage.id, {
    //             id: currentPackage.id,
    //             isActive: currentPackage.isHide ? false : true
    //         },
    //             (res) => {
    //                 if (status !== "all") {
    //                     const filterUpdate = paymentPackages.filter((p) => {
    //                         return p.id !== currentPackage.id;
    //                     })
    //                     setPaymetPackages(filterUpdate);
    //                 }
    //                 else {
    //                     const filterUpdate = paymentPackages.map((p) => {
    //                         if (p.id !== currentPackage.id) {
    //                             return p;
    //                         } else return res.result;
    //                     })
    //                     setPaymetPackages(filterUpdate);
    //                 }
    //                 enqueueSnackbar("Cập nhật thành công", { variant: "success" })
    //             }, (error) => {
    //                 enqueueSnackbar(error.error[0], { variant: "error" })
    //             })
    //         setOpenConfirm(false);
    //     } catch (error) {
    //         enqueueSnackbar("Cập nhật thất bại", { variant: "error" })
    //         setOpenConfirm(false);
    //     }
    // }
    return (
        <Paper variant='elevation' sx={{ p: 3 }}>
            <Typography variant='h4'>Quản lý bài viết</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={5}>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <MenuItem value="all">Tất cả</MenuItem>
                    <MenuItem value="true">Đang hiện</MenuItem>
                    <MenuItem value="false">Đang ẩn</MenuItem>
                </Select>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 5 }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell sx={{ maxWidth: "200px" }}>Tiêu đề</TableCell>
                            <TableCell align="center">Số người xem</TableCell>
                            <TableCell align="center">Ngày tạo</TableCell>
                            <TableCell align="center">Người tao</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            blogs.length !== 0 && blogs.map((b, index) => {
                                return (
                                    <TableRow key={b.id}>
                                        <TableCell>
                                            {index + 1 + (currentPage - 1) * 10}
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: "200px" }}>
                                            {b.title}
                                        </TableCell>
                                        <TableCell align="center">
                                            {b.viewCount}
                                        </TableCell>
                                        <TableCell align="center">
                                            {formatDate(b.createdDate)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {b.author.email}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton sx={{ color: "#5fc35f" }}><VisibilityIcon /></IconButton>
                                            {
                                                b.isPublished ? (
                                                    <Button variant='outlined' sx={{ color: "red", borderColor: "red", ml: 1 }}>Ẩn</Button>
                                                ) : (
                                                    <Button variant='outlined' sx={{ color: "blue", borderColor: "blue", ml: 1 }}>Hiện</Button>
                                                )
                                            }

                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <TablePagging pagination={pagination} setPagination={setPagination} setCurrentPage={setCurrentPage} />
            </TableContainer>
            {

                // <ConfirmDialog openConfirm={openConfirm}
                //     setOpenConfirm={setOpenConfirm}
                //     title="Đổi trạng thái"
                //     handleAction={changeStatus}
                //     content={`Bạn có chắc muốn ${currentBlog && currentBlog.isPublished ? "ẩn" : "hiện"} bài viết này không`} />
            }
        </Paper>

    )
}

export default BlogManagement
