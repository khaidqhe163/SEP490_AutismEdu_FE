import * as signalR from '@microsoft/signalr';
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { tutorInfor } from '~/redux/features/tutorSlice';
import { userInfor } from '~/redux/features/userSlice';
export const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);
    const tutorInfo = useSelector(tutorInfor);
    const parentInfo = useSelector(userInfor);
    useEffect(() => {
        let userId = "";
        if (tutorInfo) {
            userId = tutorInfo.id;
        }
        if (parentInfo) {
            userId = parentInfo.id;
        }
        if (userInfor) {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl(`https://localhost:5000/hub/notifications?userId=${userId}`)
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .build();
            setConnection(newConnection);
            newConnection.start().then(() => {
                console.log("Kết nối SignalR thành công!");
            }).catch(error => {
                console.error("Lỗi khi bắt đầu kết nối SignalR:", error);
            });
        }
    }, [tutorInfo, parentInfo]);
    return (
        <SignalRContext.Provider value={{
            connection
        }}>
            {children}
        </SignalRContext.Provider>
    );
};
