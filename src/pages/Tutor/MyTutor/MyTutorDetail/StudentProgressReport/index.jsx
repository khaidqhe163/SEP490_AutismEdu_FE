import { Assessment } from '@mui/icons-material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Card, CardContent, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AssessmentGuild from '~/components/AssessmentGuild';
import TablePagging from '~/components/TablePagging';
import services from '~/plugins/services';
import StudentCompareReport from './StudentCompareReport';
import ProgressReportDetail from '~/pages/Tutor/MyStudent/StudentDetail.jsx/ProgressReport/ProgressReportDetail';
const ASC = 1;
const DESC = 2;
const NOT_CHANGE = 3;
function StudentProgressReport({ studentProfile }) {
    const { id } = useParams();
    const [progressReports, setProgressReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentReport, setCurrentReport] = useState(null);
    const [preReport, setPreReport] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openCompare, setOpenCompare] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [compareItem, setCompareItem] = useState(0);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState('desc');
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    useEffect(() => {
        services.ProgressReportAPI.getListProgressReport((res) => {
            setProgressReports(res.result);
            res.pagination.currentSize = res.result.length
            setPagination(res.pagination)
            if (res.result.length > 0 && currentPage === 1) {
                setCurrentReport(res.result[0]);
                setSelectedItem(res.result[0]);
            }
            if (res.result.length > 1 && currentPage === 1) {
                setPreReport(res.result[1]);
            }
        }, (err) => {
            console.log(err);
        }, {
            studentProfileId: id,
            pageNumber: 1,
            orderBy: "dateFrom"
        })
    }, [])
    useEffect(() => {
        handleGetReports();
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1);
        if (currentPage === 1) {
            handleGetReports();
        }
    }, [sortType, startDate, endDate])

    const handleGetReports = async () => {
        try {
            setLoading(true);
            await services.ProgressReportAPI.getListProgressReport((res) => {
                setProgressReports(res.result);
                res.pagination.currentSize = res.result.length
                setPagination(res.pagination)
            }, (err) => {
                console.log(err);
            }, {
                studentProfileId: id,
                pageNumber: currentPage,
                orderBy: "dateFrom",
                sort: sortType,
                startDate: startDate,
                endDate: endDate
            })
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const getAssessmentChange = (question) => {
        if (!preReport || !question) {
            return NOT_CHANGE;
        }
        const preAss = preReport.assessmentResults.find((p) => {
            return p.question === question;
        })
        const curAss = currentReport.assessmentResults.find((p) => {
            return p.question === question;
        })
        if (preAss) {
            if (preAss.point > curAss.point) {
                return DESC;
            } else if (preAss.point < curAss.point) {
                return ASC;
            } else {
                return NOT_CHANGE;
            }
        } else {
            return NOT_CHANGE
        }
    }

    const formatDate = (date) => {
        if (!date) {
            return "";
        }
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const handleOpenCompare = (e, index) => {
        e.stopPropagation();
        setOpenCompare(true);
        setCompareItem(index);
    }
    const handleOpenDetail = (e, index) => {
        e.stopPropagation();
        setOpenDetail(true);
    }

    return (
        <Box px={5} pt={2} pb={3} sx={{ width: "80%", margin: "auto" }}>
            <Stack direction='row' justifyContent="space-between">
                <Typography variant='h4'>Tình trạng mới nhất</Typography>
            </Stack>
            {
                !currentReport && (
                    <Typography>Học sinh này chưa có đánh giá nào</Typography>
                )
            }
            {
                currentReport && (
                    <>
                        <Typography mt={2}>Thời gian: {formatDate(currentReport?.from)} - {formatDate(currentReport?.to)}</Typography>
                        <Stack direction="row" gap={2}>
                            <Card sx={{ minWidth: "33%" }}>
                                <CardContent>
                                    <Chip icon={<DoneIcon />} label="Đã làm được" color="success" />
                                    <Typography gutterBottom sx={{
                                        color: 'text.secondary', fontSize: 14, mt: 2,
                                        whiteSpace: "break-spaces"
                                    }}>
                                        {
                                            currentReport?.achieved
                                        }
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ minWidth: "33%" }}>
                                <CardContent>
                                    <Chip icon={<CloseIcon />} label="Chưa làm được" color="error" />
                                    <Typography gutterBottom sx={{
                                        color: 'text.secondary', fontSize: 14, mt: 2,
                                        whiteSpace: "break-spaces"
                                    }}>
                                        {
                                            currentReport?.failed
                                        }
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ minWidth: "33%" }}>
                                <CardContent>
                                    <Chip icon={<EditIcon />} label="Ghi chú thêm" color="info" />
                                    <Typography gutterBottom sx={{
                                        color: 'text.secondary', fontSize: 14, mt: 2,
                                        whiteSpace: "break-spaces"
                                    }}>
                                        {
                                            currentReport?.noteFromTutor
                                        }
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Stack>
                        <Card sx={{ mt: 3 }}>
                            <CardContent>
                                <Box>
                                    <Chip icon={<Assessment />} label="Đánh giá" color="secondary" />
                                    <AssessmentGuild />
                                </Box>
                                <Stack direction='row' gap={2} flexWrap='wrap'>
                                    {
                                        currentReport && currentReport.assessmentResults.map((a) => {
                                            return (
                                                <Tooltip title={a.selectedOptionText} key={a.id}>
                                                    <Box sx={{
                                                        display: "flex", gap: 2,
                                                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                                        p: 2,
                                                        cursor: "pointer",
                                                        mt: 2,
                                                        width: "32%",
                                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                        '&:hover': {
                                                            transform: "scale(1.02) translateY(-5px)",
                                                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                                                        }
                                                    }}>
                                                        <Typography width="65%">{a.question}</Typography>
                                                        <Divider orientation='vertical' sx={{ height: "100%" }} />
                                                        <Typography>{a.point} điểm</Typography>
                                                        {
                                                            getAssessmentChange(a.question) === DESC &&
                                                            <ArrowDownwardIcon sx={{ color: "red" }} />
                                                        }
                                                        {
                                                            getAssessmentChange(a.question) === ASC &&
                                                            <ArrowUpwardIcon sx={{ color: "green" }} />
                                                        }
                                                    </Box>
                                                </Tooltip>
                                            )
                                        })
                                    }
                                </Stack>
                            </CardContent>
                        </Card>
                        <Typography variant='h4' mt={5}>Lịch sử đánh giá</Typography>
                    </>
                )
            }
            <Box mt={2}>
                {
                    currentReport && (
                        <Stack direction='row' gap="100px">
                            <FormControl sx={{ width: "120px" }}>
                                <InputLabel id="label-sort">Sắp xếp theo</InputLabel>
                                <Select
                                    labelId="label-sort"
                                    id="sort-type"
                                    value={sortType}
                                    label="Sắp xếp theo"
                                    onChange={(e) => { setSortType(e.target.value) }}
                                >
                                    <MenuItem value="desc">Giảm dần</MenuItem>
                                    <MenuItem value="asc">Tăng dần</MenuItem>
                                </Select>
                            </FormControl>
                            <Stack direction='row' alignItems='center' gap={2}>
                                <Typography>Từ</Typography>
                                <TextField type='date' value={startDate}
                                    onChange={(e) => { setStartDate(e.target.value) }} />
                                <Typography>Đến</Typography>
                                <TextField type='date' value={endDate}
                                    onChange={(e) => { setEndDate(e.target.value) }} />
                            </Stack>
                        </Stack>
                    )
                }
                {
                    progressReports.length === 0 && currentReport && (
                        <Typography mt={2}>Không có dữ liệu phù hợp</Typography>
                    )
                }
                {
                    progressReports.length !== 0 && (
                        <TableContainer component={Paper} sx={{ width: "60%", mt: 2 }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell variant="head">STT</TableCell>
                                        <TableCell>Từ ngày</TableCell>
                                        <TableCell>Đến ngày</TableCell>
                                        <TableCell>Ngày tạo</TableCell>
                                        <TableCell align='center'>Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        progressReports.length !== 0 && selectedItem !== null && progressReports.map((p, index) => {
                                            return (
                                                <TableRow
                                                    onClick={() => setSelectedItem(p)}
                                                    selected={selectedItem.id === p.id} hover
                                                    sx={{ cursor: "pointer" }}
                                                    key={p.id}
                                                >
                                                    <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell>
                                                    <TableCell>{formatDate(p.from)}</TableCell>
                                                    <TableCell>{formatDate(p.to)}</TableCell>
                                                    <TableCell>{formatDate(p.createdDate)}</TableCell>
                                                    <TableCell align='center'>
                                                        {
                                                            selectedItem.id === p.id ? <IconButton onClick={(e) => handleOpenDetail(e, index)}><SearchIcon /></IconButton>
                                                                : <IconButton onClick={(e) => handleOpenCompare(e, index)}><FindReplaceIcon /></IconButton>
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
                    )
                }
            </Box>
            <StudentCompareReport open={openCompare} setOpen={setOpenCompare} selectedItem={selectedItem} compareItem={progressReports[compareItem]} />
            <ProgressReportDetail open={openDetail} setOpen={setOpenDetail} selectedItem={selectedItem} />
        </Box >
    )
}

export default StudentProgressReport