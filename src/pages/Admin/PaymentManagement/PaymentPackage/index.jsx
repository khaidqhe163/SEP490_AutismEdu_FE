import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'

function PaymentPackage() {
    return (
        <Paper variant='elevation' sx={{ p: 3 }}>
            <Typography variant='h4'>Quản lý gói thanh toán</Typography>
            <Box textAlign='end'>
                <Button variant='contained'>Tạo gói mới</Button>
            </Box>
        </Paper>
    )
}

export default PaymentPackage