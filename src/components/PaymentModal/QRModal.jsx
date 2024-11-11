import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import Thank from './Thank';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import services from '~/plugins/services';
import LoadingComponent from '../LoadingComponent';


const QrModal = (props) => {
    const {
        show,
        setShow,
        total,
        randomCode,
        id,
        ...rest
    } = props;

    const bank = {
        BANK_ID: "MBBank",
        ACCOUNT_NO: "7500120072002",
        TEMPLATE: "compact2",
        AMOUNT: total,
        DESCRIPTION: randomCode,
        ACCOUNT_NAME: 'TRAN%20MANH%20HUNG'
    };

    const api_get = import.meta.env.VITE_API_GET;
    const CASSO_API_KEY = import.meta.env.VITE_CASSO_API_KEY;

    const dispatch = useDispatch();

    const [data, setData] = useState({});
    const [isPaid, setIsPaid] = useState(false);

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const res = await fetch(api_get, {
                headers: {
                    Authorization: `apikey ${CASSO_API_KEY}`,
                    "Content-Type": "application/json",
                }
            });
            const jsonData = await res.json();
            console.log(jsonData.data.records);

            setData(jsonData);

            jsonData.data.records.forEach(trans => {
                if (Math.floor(trans.amount) === Math.floor(total) && trans.description.includes(randomCode.replace(/-/g, ""))) {
                    setShow(false);
                    setIsPaid(true);
                    // savePayment(trans);
                    return;
                }
            });
        } catch (error) {
            console.log('fetchData qr error', error);
        }
    };

    useEffect(() => {
        if (show && !isPaid) {
            fetchData();
            const intervalId = setInterval(() => {
                fetchData();
            }, 3000);

            return () => clearInterval(intervalId);
        }
    }, [show, isPaid]);

    // const savePayment = async (trans) => {
    //     try {
    //         console.log('This pay:');
    //         console.log(trans);
    //         const newData = {
    //             "transactionId": trans.id,
    //             "description": trans.description,
    //             "amount": trans.amount,
    //             "paymentDate": trans.when,
    //             "bankTransactionId": trans.tid,
    //             "bankAccount": trans.corresponsiveAccount,
    //             "packagePaymentId": id
    //         }
    //         await services.PaymentHistoryAPI.createPaymentHistory(newData, (res) => {
    //             console.log(res?.result);
    //             enqueueSnackbar("Tạo lịch sử giao dịch thành công!", { variant: 'success' });
    //         }, (error) => {
    //             enqueueSnackbar(error.error[0], { variant: 'error' });
    //             console.log(error);
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
       
    // };

    const [showT, setShowT] = useState(false);

    useEffect(() => {
        if (isPaid) {
            setShowT(true);
        }
    }, [isPaid]);

    return (
        <Box>
            {isPaid ? (
                <Thank show={showT} handleClose={() => { setShowT(false); setIsPaid(false); }} setIsPaid={setIsPaid} />
            ) : (
                <Dialog open={show} onClose={() => setShow(false)} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ color: 'red', textAlign: 'center' }}>
                        Vui lòng không sửa nội dung chuyển khoản!
                    </DialogTitle>
                    <DialogContent>
                        <img
                            src={`https://img.vietqr.io/image/${bank.BANK_ID}-${bank.ACCOUNT_NO}-${bank.TEMPLATE}.png?amount=${bank.AMOUNT}&addInfo=${bank.DESCRIPTION}&accountName=${bank.ACCOUNT_NAME}`}
                            alt="Error"
                            style={{ width: '100%' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={() => setShow(false)}>
                            Đóng
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <LoadingComponent open={loading} setOpen={setLoading} />
        </Box>
    );
};

export default QrModal;
