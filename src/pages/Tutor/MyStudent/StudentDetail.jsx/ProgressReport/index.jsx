import { Assessment, Edit } from '@mui/icons-material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardContent, Chip, Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ProgressReportCreation from './ProgressReportCreation';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import services from '~/plugins/services';
import CompareReport from './CompareReport';
const ASC = 1;
const DESC = 2;
const NOT_CHANGE = 3;
function ProgressReport() {
    const { id } = useParams();
    const [progressReports, setProgressReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentReport, setCurrentReport] = useState(null);
    const [preReport, setPreReport] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openCompare, setOpenCompare] = useState(false);
    const [compareItem, setCompareItem] = useState(0)
    useEffect(() => {
        handleGetReports();
    }, [])
    const handleGetReports = async () => {
        try {
            setLoading(true);
            await services.ProgressReportAPI.getListProgressReport((res) => {
                setProgressReports(res.result);
                console.log(res);
                if (res.result.length > 0) {
                    setCurrentReport(res.result[0]);
                    setSelectedItem(res.result[0]);
                }
                if (res.result.length > 1) {
                    setPreReport(res.result[1]);
                }
            }, (err) => {
                console.log(err);
            }, {
                studentProfileId: id
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
    return (
        <Box px={5} pt={2} pb={3}>
            <Stack direction='row' justifyContent="space-between">
                <Typography variant='h4'>Tình trạng mới nhất</Typography>
                <ProgressReportCreation currentReport={currentReport} />
            </Stack>
            {
                progressReports.length === 0 ?
                    <Typography>Học sinh này chưa có đánh giá nào</Typography>
                    : (
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
                                    </Box>
                                    <Stack direction='row' gap={2} flexWrap='wrap'>
                                        {
                                            currentReport && currentReport.assessmentResults.map((a) => {
                                                return (
                                                    <Box key={a.id} sx={{
                                                        display: "flex", gap: 2,
                                                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                                        p: 2,
                                                        cursor: "pointer",
                                                        mt: 2,
                                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                        '&:hover': {
                                                            transform: "scale(1.02) translateY(-5px)",
                                                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                                                        },
                                                    }}>
                                                        <Typography>{a.question}</Typography>
                                                        <Divider orientation='vertical' />
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
                                                )
                                            })
                                        }
                                    </Stack>
                                </CardContent>
                            </Card>
                            <Typography variant='h4' mt={5}>Lịch sử đánh giá</Typography>
                            <Stack direction='row' mt={2}>

                                <TableContainer component={Paper} sx={{ width: "60%" }}>
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
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{formatDate(p.from)}</TableCell>
                                                            <TableCell>{formatDate(p.to)}</TableCell>
                                                            <TableCell>{formatDate(p.createdDate)}</TableCell>
                                                            <TableCell align='center'>
                                                                {
                                                                    selectedItem.id === p.id ? <IconButton><SearchIcon /></IconButton>
                                                                        : <IconButton onClick={(e) => handleOpenCompare(e, index)}><FindReplaceIcon /></IconButton>
                                                                }
                                                                <IconButton><Edit /></IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        </>
                    )
            }
            <CompareReport open={openCompare} setOpen={setOpenCompare} selectedItem={selectedItem} compareItem={progressReports[compareItem]} />
        </Box >
    )
}

export default ProgressReport
