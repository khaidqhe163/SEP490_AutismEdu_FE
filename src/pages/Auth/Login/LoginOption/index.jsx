import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import tutorLogin from '~/assets/images/tutorlogin.png'
import parentLogin from '~/assets/images/parentlogin.png'
import { Link, useNavigate } from 'react-router-dom';
import PAGES from '~/utils/pages';
function LoginOption() {
    const [isVisible, setIsVisible] = useState(false);
    const nav = useNavigate();
    useEffect(() => {
        // Delay to ensure animation starts after render
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    return (
        <Box display="flex" gap={5} justifyContent="center" sx={{ height: "60vh", alignItems: "center" }}>
            <Link to={PAGES.ROOT + PAGES.LOGIN}>
                <Box
                    sx={{
                        width: 300,
                        height: 300,
                        bgcolor: 'primary.main',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                        cursor: "pointer",
                        textAlign: "center",
                        borderRadius: "10px",
                        '&:hover': {
                            transform: "scale(1.02) translateY(-10px)",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                        }
                    }}
                >
                    <img src={parentLogin} alt='parentlogin' style={{ maxWidth: "80%", maxHeight: "80%" }} />
                    <Typography color="white">Đăng nhập cho bố mẹ</Typography>
                </Box>
            </Link>
            <Link to={PAGES.TUTOR_LOGIN}>
                <Box
                    sx={{
                        width: 300,
                        height: 300,
                        bgcolor: 'secondary.main',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                        cursor: "pointer",
                        textAlign: "center",
                        borderRadius: "10px",
                        '&:hover': {
                            transform: "scale(1.02) translateY(-10px)",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                        }
                    }}
                >
                    <img src={tutorLogin} alt='totorlogin' style={{ maxWidth: "80%", height: "80%" }} />
                    <Typography color="white">Đăng nhập cho gia sư</Typography>
                </Box>
            </Link>
        </Box>
    )
}

export default LoginOption
