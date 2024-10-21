import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogContent, Typography, Paper } from '@mui/material';

function CurriculumEditedTable({ curriculums }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [currentContent, setCurrentContent] = useState('');

    const handleOpenDialog = (content) => {
        setCurrentContent(content);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px', overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>STT</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Độ tuổi</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Nội dung</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Ngày cập nhật</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {curriculums.map((curriculum, index) => (
                        <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{curriculum.ageFrom} - {curriculum.ageEnd} tuổi</TableCell>
                            <TableCell sx={{ maxWidth: 300, whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                {curriculum.description.length > 150 ? (
                                    <>
                                        <div dangerouslySetInnerHTML={{ __html: curriculum.description.slice(0, 150) + '...' }} />
                                        <Button onClick={() => handleOpenDialog(curriculum.description)} sx={{ textTransform: 'none', fontSize: '14px', color: '#1976d2', padding: 0 }}>
                                            Xem thêm
                                        </Button>
                                    </>
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: curriculum.description }} />
                                )}
                            </TableCell>
                            <TableCell>{new Date().toLocaleDateString()}</TableCell>
                            <TableCell>Đang chờ</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent sx={{ padding: 2 }}>
                    <Typography dangerouslySetInnerHTML={{ __html: currentContent }} />
                </DialogContent>
            </Dialog>
        </TableContainer>
    );
}

export default CurriculumEditedTable;
