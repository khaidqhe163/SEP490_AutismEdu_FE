import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Divider } from '@mui/material';
import LoadingComponent from '~/components/LoadingComponent';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';

const ExerciseTypeEdit = ({ open, onClose, exerciseTypeList, setExerciseTypeList, eType }) => {

    const [exerciseTypeName, setExerciseTypeName] = useState(eType.exerciseTypeName);
    const [loading, setLoading] = useState(false);
    const handleInputChange = (event) => {
        setExerciseTypeName(event.target.value);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const newData = {
                "id": eType?.id,
                "exerciseTypeName": exerciseTypeName
            };
            await services.ExerciseManagementAPI.updateExerciseType(eType?.id, newData, (res) => {
                if (res?.result) {
                    const newExerciseType = exerciseTypeList?.find((e) => e?.id === eType?.id);
                    newExerciseType.exerciseTypeName = res.result.exerciseTypeName;
                    setExerciseTypeList(exerciseTypeList);
                    enqueueSnackbar("Cập nhật loại bài tập thành công!", { variant: 'success' });
                }
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle variant='h5' textAlign={'center'}>Chỉnh sửa loại bài tập</DialogTitle>
            <Divider />
            <DialogContent>
                <TextField
                    margin='dense'
                    label="Tên loại bài tập"
                    variant="outlined"
                    fullWidth
                    size='medium'
                    value={exerciseTypeName}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit" variant='outlined'>
                    Hủy
                </Button>
                <Button onClick={handleSave} color="primary" variant='contained' disabled={eType?.exerciseTypeName === exerciseTypeName}>
                    Lưu
                </Button>
            </DialogActions>
            <LoadingComponent open={loading} setOpen={setLoading} />
        </Dialog>
    );
};

export default ExerciseTypeEdit;