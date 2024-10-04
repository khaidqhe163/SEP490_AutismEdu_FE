import { TabContext, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Tab, Tabs, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import ElevatorIcon from '@mui/icons-material/Elevator';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateOrEditModal from './CurriculumModal/CreateOrEditModal';
import DeleteConfirmationModal from './CurriculumModal/DeleteConfirmationModal';

function CurriculumManagement() {
    const [valueCurriculum, setValueCurriculum] = useState('1');
    const [curriculums, setCurriculums] = useState([
        { ageFrom: 0, ageTo: 3, contentCurriculum: "<p>Nội dung bổ sung:</p><p>* Phát triển khả năng giao tiếp hiệu quả trong môi trường xã hội.</p><p>* Học cách xử lý thông tin và giải quyết vấn đề qua câu chuyện.</p><p>* Luyện tập trí nhớ thông qua các hoạt động liên quan đến từ vựng.</p><p>* Nâng cao khả năng hiểu biết về ngữ pháp và cấu trúc câu.</p><p>* Cải thiện sự tự tin và khả năng diễn đạt thông qua thảo luận nhóm.</p>" },
        { ageFrom: 4, ageTo: 6, contentCurriculum: "<p>Nội dung bổ sung:</p><p>* Phát triển khả năng giao tiếp hiệu quả trong môi trường xã hội.</p><p>* Học cách xử lý thông tin và giải quyết vấn đề qua câu chuyện.</p><p>* Luyện tập trí nhớ thông qua các hoạt động liên quan đến từ vựng.</p><p>* Nâng cao khả năng hiểu biết về ngữ pháp và cấu trúc câu.</p><p>* Cải thiện sự tự tin và khả năng diễn đạt thông qua thảo luận nhóm.</p>" },
        { ageFrom: 7, ageTo: 9, contentCurriculum: "<p>Nội dung bổ sung:</p><p>* Phát triển khả năng giao tiếp hiệu quả trong môi trường xã hội.</p><p>* Học cách xử lý thông tin và giải quyết vấn đề qua câu chuyện.</p><p>* Luyện tập trí nhớ thông qua các hoạt động liên quan đến từ vựng.</p><p>* Nâng cao khả năng hiểu biết về ngữ pháp và cấu trúc câu.</p><p>* Cải thiện sự tự tin và khả năng diễn đạt thông qua thảo luận nhóm.</p>" }
    ]);

    const [openCreateEdit, setOpenCreateEdit] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);

    const [deleteIndex, setDeleteIndex] = useState(null);

    const handleChangeCurriculum = (event, newValue) => {
        setValueCurriculum(newValue);
    };


    const handleOpenCreate = () => {
        setOpenCreateEdit(true);
        setIsEditing(false);
        setCurrentEditIndex(null); 
    };

 
    const handleOpenEdit = (index) => {
        setIsEditing(true);
        setCurrentEditIndex(index); // Xác định mục nào đang chỉnh sửa
        setOpenCreateEdit(true);
    };

  
    const handleSubmitCreate = (newAgeFrom, newAgeTo, newProgramContent) => {
        const newCurriculum = {
            ageFrom: newAgeFrom,
            ageTo: newAgeTo,
            contentCurriculum: newProgramContent
        };
        setCurriculums([...curriculums, newCurriculum]);
        setOpenCreateEdit(false);
    };


    const handleSubmitEdit = (updatedAgeFrom, updatedAgeTo, updatedProgramContent) => {
        const updatedCurriculums = curriculums.map((curriculum, index) => {
            if (index === currentEditIndex) {
                return {
                    ageFrom: updatedAgeFrom,
                    ageTo: updatedAgeTo,
                    contentCurriculum: updatedProgramContent
                };
            }
            return curriculum;
        });
        setCurriculums(updatedCurriculums);
        setOpenCreateEdit(false);
    };


    const handleOpenDeleteConfirm = (index) => {
        setDeleteIndex(index);
        setOpenDeleteConfirm(true);
    };


    const handleDelete = () => {
        const updatedCurriculums = curriculums.filter((_, i) => i !== deleteIndex);
        setCurriculums(updatedCurriculums);
        setOpenDeleteConfirm(false);

        // Xóa tab tương ứng nếu đang chọn tab đó
        if (valueCurriculum === (deleteIndex + 1).toString()) {
            setValueCurriculum('1'); // Chuyển về tab đầu tiên nếu xóa tab hiện tại
        }
    };

    return (
        <Box sx={{
            width: "90%",
            margin: "auto",
            mt: "20px",
            gap: 2
        }}>
            <Typography mb={2} variant='h5'>Khung chương trình học</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color='primary' variant='contained' startIcon={<AddIcon />} onClick={handleOpenCreate}>
                    Tạo khung chương trình
                </Button>
            </Box>
            <TabContext value={valueCurriculum}>
                <Box sx={{ maxWidth: { xs: 320, sm: 750 } }}>
                    <Tabs
                        value={valueCurriculum}
                        onChange={handleChangeCurriculum}
                        aria-label="icon position tabs example"
                        scrollButtons
                        variant="scrollable"
                    >
                        {curriculums.map((curriculum, index) => (
                            <Tab
                                key={index}
                                value={(index + 1).toString()}
                                icon={<ElevatorIcon />}
                                iconPosition="start"
                                label={(
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        Từ {curriculum.ageFrom} - {curriculum.ageTo} tuổi
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                handleOpenEdit(index);
                                            }}
                                            color="default"
                                            sx={{ ml: 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                handleOpenDeleteConfirm(index);
                                            }}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            />
                        ))}
                    </Tabs>
                </Box>
                {curriculums.map((curriculum, index) => (
                    <TabPanel key={index} value={(index + 1).toString()}>
                        <Box dangerouslySetInnerHTML={{ __html: curriculum.contentCurriculum }}></Box>
                    </TabPanel>
                ))}
            </TabContext>

            <CreateOrEditModal
                open={openCreateEdit}
                handleClose={() => setOpenCreateEdit(false)}
                handleSubmit={isEditing ? handleSubmitEdit : handleSubmitCreate}
                initialData={isEditing ? curriculums[currentEditIndex] : null}
                isEditing={isEditing}
            />

            <DeleteConfirmationModal
                open={openDeleteConfirm}
                handleClose={() => setOpenDeleteConfirm(false)}
                handleDelete={handleDelete}
            />
        </Box>
    );
}

export default CurriculumManagement;
