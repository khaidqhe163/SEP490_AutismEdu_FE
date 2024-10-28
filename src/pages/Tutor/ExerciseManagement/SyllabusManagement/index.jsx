import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import SyllabusCreation from './SyllabusCreation/SyllabusCreation';
import SyllabusAssign from './SyllabusAssign';

export default function SyllabusManagement() {
    const [openCreation, setOpenCreation] = useState(false);

    const handleOpenCreation = () => {
        setOpenCreation(true);
    };
    if (openCreation) {
        // return (<SyllabusCreation handleBack={() => setOpenCreation(false)} />)
        return (<SyllabusAssign handleBack={() => setOpenCreation(false)} />);
    }

    return (
        <Stack direction='column' sx={{ width: "90%", margin: "auto", gap: 2 }}>
            <Typography variant='h4'>Giáo trình</Typography>
            <Box>
                <Button variant='contained' color='primary' onClick={handleOpenCreation}>Tạo giáo trình</Button>
            </Box>
        </Stack>
    )
}