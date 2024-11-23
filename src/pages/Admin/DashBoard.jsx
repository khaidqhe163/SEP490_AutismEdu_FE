import React, { useEffect, useState } from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Person, People, School, Group } from '@mui/icons-material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { format } from 'date-fns';
import services from '~/plugins/services';
import { adminInfor, setAdminInformation } from '~/redux/features/adminSlice';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function DashBoard() {

    const adminInfo = useSelector(adminInfor);

    console.log(adminInfo);
    

    const [paymentPackages, setPaymentPackages] = useState([]);

    const [monthlyRevenue, setMonthlyRevenue] = useState([
        { month: 'Tháng 1', totalPrice: 0 },
        { month: 'Tháng 2', totalPrice: 0 },
        { month: 'Tháng 3', totalPrice: 0 },
        { month: 'Tháng 4', totalPrice: 0 },
        { month: 'Tháng 5', totalPrice: 0 },
        { month: 'Tháng 6', totalPrice: 0 },
        { month: 'Tháng 7', totalPrice: 0 },
        { month: 'Tháng 8', totalPrice: 0 },
        { month: 'Tháng 9', totalPrice: 0 },
        { month: 'Tháng 10', totalPrice: 0 },
        { month: 'Tháng 11', totalPrice: 0 },
        { month: 'Tháng 12', totalPrice: 0 },
    ]);
    const now = new Date();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const [filterRevenues, setFilterRevenues] = useState({
        startDate: `${now.getFullYear()}-01-01`,
        endDate: `${now.getFullYear()}-12-31`,
    });

    const [filterPackagePayment, setFilterPackagePayment] = useState({
        startDate: format(new Date(now.getFullYear(), now.getMonth(), 1), 'yyyy-MM-dd'),
        endDate: format(new Date(now.getFullYear(), now.getMonth() + 1, 0), 'yyyy-MM-dd'),
    });


    const handleYearChange = (event) => {
        setMonthlyRevenue([
            { month: 'Tháng 1', totalPrice: 0 },
            { month: 'Tháng 2', totalPrice: 0 },
            { month: 'Tháng 3', totalPrice: 0 },
            { month: 'Tháng 4', totalPrice: 0 },
            { month: 'Tháng 5', totalPrice: 0 },
            { month: 'Tháng 6', totalPrice: 0 },
            { month: 'Tháng 7', totalPrice: 0 },
            { month: 'Tháng 8', totalPrice: 0 },
            { month: 'Tháng 9', totalPrice: 0 },
            { month: 'Tháng 10', totalPrice: 0 },
            { month: 'Tháng 11', totalPrice: 0 },
            { month: 'Tháng 12', totalPrice: 0 },
        ]);
        const year = event.target.value;
        setFilterRevenues({
            startDate: `${year}-01-01`,
            endDate: `${year}-12-31`,
        });
    };

    const handleMonthChange = (event) => {
        if (event.target.value) {
            const [year, month] = event.target.value.split('-');
            const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
            const endDate = new Date(year, Number(month), 0);

            setFilterPackagePayment({
                startDate,
                endDate: format(endDate, " yyyy-MM-dd")
            });
        }
    };

    const [stats, setStats] = useState([
        { label: 'Tổng số người dùng', value: '658', color: '#fdf0d2', icon: <AccountBoxIcon fontSize="large" sx={{ color: '#feb118' }} /> },
        { label: 'Tổng số phụ huynh đã dùng', value: '90K', color: '#eaf0ff', icon: <Diversity1Icon fontSize="large" sx={{ color: '#4880fb' }} /> },
        { label: 'Tổng số gia sư', value: '864', color: '#eef7e2', icon: <School fontSize="large" sx={{ color: '#7bc402' }} /> },
        { label: 'Phụ huynh mới', value: '83', color: '#e8e4ff', icon: <SupervisorAccountIcon fontSize="large" sx={{ color: '#9e91ed' }} /> },
    ]);

    const barData = {
        labels: monthlyRevenue.map((data) => data.month),
        datasets: [
            {
                label: 'Doanh thu (VNĐ)',
                data: monthlyRevenue.map((data) => data.totalPrice),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                        return `${context.dataset.label}: ${value}`;
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: (value) => {
                        return value > 1 ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : `${value*10}đ`;
                    },
                },
            },
        },
    };


    const generateRandomColor = () => {
        const randomColor = () => Math.floor(Math.random() * 256);
        return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    };

    const generateColorArray = (length) => {
        const colors = [];
        for (let i = 0; i < length; i++) {
            colors.push(generateRandomColor());
        }
        return colors;
    };

    const backgroundColors = generateColorArray(paymentPackages.length);
    const hoverColors = backgroundColors.map((color) => {
        const colorComponents = color.match(/\d+/g);
        if (colorComponents) {
            return `rgba(${colorComponents[0]}, ${colorComponents[1]}, ${colorComponents[2]}, 0.8)`;
        }
        return color;
    });

    const doughnutData = {
        labels: paymentPackages.map((pkg) => pkg.title),
        datasets: [
            {
                data: paymentPackages.map((pkg) => pkg.totalPurchases),
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverColors,
                borderWidth: 1,
            },
        ],
    };

    const placeholderData = {
        labels: ['Chưa xác định'],
        datasets: [
            {
                data: [100],
                backgroundColor: ['#f54242'],
                hoverBackgroundColor: '#f75c5c'
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
        },
    };

    useEffect(() => {
        handleGetAllUser();
        handleGetParentHaveStudentProfile();
        handleGetAllTutor();
        handleGetNewParent();
    }, []);

    useEffect(() => {
        handleGetPackagePayment();
    }, [filterPackagePayment]);

    useEffect(() => {
        handleGetRevenues();
    }, [filterRevenues]);


    const handleGetRevenues = async () => {
        try {
            await services.DashboardManagementAPI.getRevenues((res) => {
                if (res?.result) {
                    const newData = monthlyRevenue.map((m) => {
                        const aExist = res.result.find((r) => r.month === m.month);
                        return aExist ? { ...m, totalPrice: aExist.totalPrice } : m;
                    });
                    setMonthlyRevenue(newData);
                }
            }, (error) => {
                console.log(error);
            }, {
                ...filterRevenues
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetPackagePayment = async () => {
        try {
            await services.DashboardManagementAPI.getPackagePayment((res) => {
                if (res?.result) {
                    setPaymentPackages(res.result);
                }
            }, (error) => {
                console.log(error);
            }, {
                ...filterPackagePayment
            })
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetParentHaveStudentProfile = async () => {
        try {
            await services.DashboardManagementAPI.getTotalParentHaveStudentProfile((res) => {
                if (res?.result) {
                    const userS = stats[1];
                    userS.value = res.result;
                    const newData = [...stats];
                    newData.splice(1, 1, userS);
                    setStats(newData);
                }
            }, (error) => {
                console.log(error);

            }, {
                startDate: '0001-01-01',
                endDate: '9999-12-31'
            })
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetAllUser = async () => {
        try {
            await services.DashboardManagementAPI.getTotalUser((res) => {
                if (res?.result) {
                    const userS = stats[0];
                    userS.value = res.result;
                    const newData = [...stats];
                    newData.splice(0, 1, userS);
                    setStats(newData);
                }
            }, (error) => {
                console.log(error);

            }, {
                userType: 'all',
                startDate: '0001-01-01',
                endDate: '9999-12-31'
            })
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetAllTutor = async () => {
        try {
            await services.DashboardManagementAPI.getTotalUser((res) => {
                if (res?.result) {
                    const userS = stats[2];
                    userS.value = res.result;
                    const newData = [...stats];
                    newData.splice(2, 1, userS);
                    setStats(newData);
                }
            }, (error) => {
                console.log(error);

            }, {
                userType: 'tutor',
                startDate: '0001-01-01',
                endDate: '9999-12-31'
            })
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetNewParent = async () => {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);
            await services.DashboardManagementAPI.getTotalUser((res) => {
                if (res?.result) {
                    const userS = stats[3];
                    userS.value = res.result;
                    const newData = [...stats];
                    newData.splice(3, 1, userS);
                    setStats(newData);
                }
            }, (error) => {
                console.log(error);

            }, {
                userType: 'parent',
                startDate: format(startDate, "yyyy-MM-dd"),
                endDate: format(endDate, "yyyy-MM-dd")
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'white',
                p: '20px',
                borderRadius: '10px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
        >
            <Typography variant="h5" fontWeight="bold" mb={1}>
                {`Xin chào quản lý ${adminInfo?.fullName}, chúc bạn một ngày tốt lành! 😍`}
            </Typography>
            <Typography sx={{ color: 'gray', mb: 4 }}>
                Dashboard về hệ thống AutismEduCS
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper
                            elevation={3}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 2,
                                bgcolor: stat.color,
                                borderRadius: '10px',
                            }}
                        >
                            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                {stat.icon}
                            </Box>
                            <Box>
                                <Typography variant="subtitle2">
                                    {stat.label}
                                </Typography>
                                <Typography variant="h5" sx={{ my: 1 }}>
                                    {stat.value}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                        Doanh thu hàng tháng
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Năm</InputLabel>
                        <Select value={filterRevenues.startDate ? filterRevenues.startDate.split('-')[0] : ''} onChange={handleYearChange}>
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ height: '400px' }}>
                        <Bar data={barData} options={barOptions} />
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                        Gói thanh toán
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            label="Tháng"
                            type="month"
                            value={
                                filterPackagePayment.startDate
                                    ? `${filterPackagePayment.startDate.split('-')[0]}-${filterPackagePayment.startDate.split('-')[1]}`
                                    : ''
                            }
                            onChange={handleMonthChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </FormControl>
                    <Box sx={{ height: '400px' }}>
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DashBoard;