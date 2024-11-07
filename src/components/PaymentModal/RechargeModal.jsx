import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardActions, Typography, Button, Grid, Divider } from '@mui/material';
import QrModal from './QRModal';

const RechargeModal = ({ show, handleClose }) => {
    const servicePackages = [
        { id: 1, packageName: "Cơ bản", duration: "1 tháng", price: 10000 },
        { id: 2, packageName: "Tiêu chuẩn", duration: "3 tháng", price: 270000 },
        { id: 3, packageName: "Cao cấp", duration: "6 tháng", price: 500000 },
        { id: 4, packageName: "Tối thượng", duration: "1 năm", price: 900000 },
        { id: 5, packageName: "Ultimate", duration: "2 năm", price: 1000000 },
        { id: 6, packageName: "Ultimate", duration: "3 năm", price: 10000000 },
    ];

    const [showQR, setShowQR] = useState(false);
    const [amount, setAmount] = useState(0);

    const handleShowQR = () => setShowQR(true);

    const handleClickUpgrade = (price) => {
        setAmount(price);
        handleShowQR();
        handleClose();
    };

    const generateRandomCode = () => {
        const length = 10;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let newCode = "";
        for (let i = 0; i < length; i++) {
            newCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return newCode;
    };

    return (
        <>
            <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle variant='h5' textAlign={'center'}>Nâng cấp tài khoản</DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="subtitle1" sx={{ color: "#333", mb: 2, fontWeight: 'bold' }}>
                        Chọn gói dịch vụ:
                    </Typography>
                    <Grid container spacing={2}>
                        {servicePackages.map((pkg) => (
                            <Grid item xs={12} sm={6} md={3} key={pkg.id}>
                                <Card sx={{ textAlign: 'center', p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" color="black">
                                            {pkg.packageName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                            Thời gian: {pkg.duration}
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                                {pkg.price.toLocaleString('vi-VN')}
                                            </span>
                                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                                                VNĐ
                                            </Typography>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                bgcolor: "#16ab65",
                                                '&:hover': {
                                                    bgcolor: '#128a51',
                                                },
                                            }}
                                            onClick={() => handleClickUpgrade(pkg.price)}
                                        >
                                            Nâng cấp
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
            <QrModal show={showQR} setShow={setShowQR} total={amount} randomCode={generateRandomCode()} />
        </>
    );
};

export default RechargeModal;
