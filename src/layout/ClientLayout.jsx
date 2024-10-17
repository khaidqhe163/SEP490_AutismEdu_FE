import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import services from '~/plugins/services';
import { userInfor } from '~/redux/features/userSlice';
function ClientLayout() {
    const userInfo = useSelector(userInfor);
    useEffect(() => {
        if (userInfo) {
            handleGetChildren();
        }
    }, [userInfo])

    const handleGetChildren = async () => {
        try {
            await services.ChildrenManagementAPI.listChildren(userInfo.id, (res) => {
                console.log("data child ==> ", res);
            }, (err) => {
                console.log("data child ==> ", err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box>
            <Header />
            <Box marginTop={"80px"}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}

export default ClientLayout
