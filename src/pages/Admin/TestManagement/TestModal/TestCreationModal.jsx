import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react'

function TestCreationModal({ dialogOpen, handleCloseDialog, setTestList }) {
    const [testName, setTestName] = useState('');
    const [testContent, setTestContent] = useState('');
    const handleCreateTest = () => {
        const newData = { id: 10, testName, description: testContent }
        setTestList(prev => [...prev, newData]);
        enqueueSnackbar("Tạo bài kiểm tra thành công!", { variant: 'success' })
        handleCloseDialog();
    };
    return (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle variant='h5' textAlign={'center'}>Tạo bài kiểm tra</DialogTitle>
            <DialogContent>
                <Box sx={{ p: 2 }}>
                    <TextField
                        fullWidth
                        label="Tên bài kiểm tra"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Nội dung"
                        value={testContent}
                        onChange={(e) => setTestContent(e.target.value)}
                        multiline
                        rows={4}
                        required
                        sx={{ mb: 2 }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} variant='outlined' color="inherit">
                    Hủy
                </Button>
                <Button onClick={handleCreateTest} variant='contained' color="primary">
                    Tạo
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TestCreationModal