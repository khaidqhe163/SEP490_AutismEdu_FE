import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import Thank from './Thank';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import services from '~/plugins/services';
import { setPackagePayment } from '~/redux/features/packagePaymentSlice';
import LoadingComponent from '~/components/LoadingComponent';
import PAGES from '~/utils/pages';
import { useNavigate } from 'react-router-dom';

const QrModal = (props) => {
    const { show, setShow, total, randomCode, id, ...rest } = props;
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [data, setData] = useState({});
    const [isPaid, setIsPaid] = useState(false);
    console.log(isPaid);

    const [loading, setLoading] = useState(false);
    const api_get = import.meta.env.VITE_API_GET;
    const CASSO_API_KEY = import.meta.env.VITE_CASSO_API_KEY;
    const bank = {
        BANK_ID: "MBBank",
        ACCOUNT_NO: "0335582164",
        TEMPLATE: "compact2",
        AMOUNT: total,
        DESCRIPTION: randomCode,
        ACCOUNT_NAME: 'PHAM%20THU%20THUY'
    };
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

            jsonData.data.records.forEach(trans => {
                if (Math.floor(trans.amount) === Math.floor(total) && trans.description.includes(randomCode.replace(/-/g, ""))) {
                    savePayment(trans);
                    setShow(false);
                    setIsPaid(true);
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
            }, 3000)

            return () => clearInterval(intervalId);
        }
    }, [show, isPaid])

    const handleGetCurrentUserPaymentHistory = async () => {
        try {
            await services.PaymentHistoryAPI.getListPaymentHistoryCurrent((res) => {
                dispatch(setPackagePayment(res.result));
            }, (error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };

    const savePayment = async (trans) => {
        try {
            const newData = {
                transactionId: trans.id,
                description: trans.description,
                amount: trans.amount,
                paymentDate: trans.when,
                bankTransactionId: trans.tid,
                bankAccount: trans.corresponsiveAccount,
                packagePaymentId: id
            }
            await services.PaymentHistoryAPI.createPaymentHistory(newData, async (res) => {
                enqueueSnackbar("Giao dịch thành công!", { variant: 'success' });
                nav(PAGES.MY_STUDENT);
            }, (error) => {
                enqueueSnackbar(error.error[0], { variant: 'error' });
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const [showT, setShowT] = useState(false);

    useEffect(() => {
        if (isPaid) {
            handleGetCurrentUserPaymentHistory();
            setShowT(true);
        }
    }, [isPaid]);
    
    return (
        <Box>
            {isPaid ? <Thank show={showT} handleClose={() => { setShowT(false); setIsPaid(false); nav(PAGES.MY_STUDENT) }} /> : (
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
