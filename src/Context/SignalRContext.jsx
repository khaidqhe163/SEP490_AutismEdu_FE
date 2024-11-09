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
        if (tutorInfo) {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl(`https://localhost:5000/hub/notifications?userId=${tutorInfo.id}`)
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .build();
            setConnection(newConnection);
        }
        if (parentInfo) {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl(`https://localhost:5000/hub/notifications?userId=${parentInfo.id}`)
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .build();
            setConnection(newConnection);
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
