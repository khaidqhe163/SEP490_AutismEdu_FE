import { TabContext, TabPanel } from '@mui/lab';
import { Box, Button, Typography, IconButton, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react';
import ElevatorIcon from '@mui/icons-material/Elevator';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CurriculumEditedTable from './EditedTable/CurriculumEditedTable'; // Import the table component
import CreateOrEditModal from './CurriculumModal/CreateOrEditModal';
import DeleteConfirmationModal from './CurriculumModal/DeleteConfirmationModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';

function CurriculumManagement() {
    const [valueCurriculum, setValueCurriculum] = useState('1');
    const [curriculums, setCurriculums] = useState([
        {
            ageFrom: 0,
            ageTo: 3,
            contentCurriculum: "<p>Nội dung bổ sung:</p><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>"
        },
        {
            ageFrom: 4,
            ageTo: 6,
            contentCurriculum: "<p>Nội dung bổ sung:</p><p>* Phát triển khả năng giao tiếp hiệu quả trong môi trường xã hội.</p><p>* Học cách xử lý thông tin và giải quyết vấn đề qua câu chuyện.</p><p>* Luyện tập trí nhớ thông qua các hoạt động liên quan đến từ vựng.</p><p>* Nâng cao khả năng hiểu biết về ngữ pháp và cấu trúc câu.</p><p>* Cải thiện sự tự tin và khả năng diễn đạt thông qua thảo luận nhóm.</p>"
        },
        {
            ageFrom: 7,
            ageTo: 9,
            contentCurriculum: "<p>Nội dung bổ sung:</p><p>* Phát triển khả năng giao tiếp hiệu quả trong môi trường xã hội.</p><p>* Học cách xử lý thông tin và giải quyết vấn đề qua câu chuyện.</p><p>* Luyện tập trí nhớ thông qua các hoạt động liên quan đến từ vựng.</p><p>* Nâng cao khả năng hiểu biết về ngữ pháp và cấu trúc câu.</p><p>* Cải thiện sự tự tin và khả năng diễn đạt thông qua thảo luận nhóm.</p>"
        }
    ]);
    const [openCreateEdit, setOpenCreateEdit] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [showTable, setShowTable] = useState(false);

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

    const handleSubmitCreate = async (formData) => {
        try {
            await services.CurriculumManagementAPI.createCurriculum(formData, (res) => {
                console.log(formData);
                enqueueSnackbar("Create curriculum success!", { variant: "success" });
                setCurriculums([...curriculums, formData]);
                setOpenCreateEdit(false);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }

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
        setCurrentEditIndex(index);
        setOpenDeleteConfirm(true);
    };

    const handleDelete = () => {
        const updatedCurriculums = curriculums.filter((_, i) => i !== currentEditIndex);
        setCurriculums(updatedCurriculums);
        setOpenDeleteConfirm(false);

        if (valueCurriculum === (currentEditIndex + 1).toString()) {
            setValueCurriculum('1');
        }
    };

    const handleShowTable = () => {
        setShowTable(!showTable);
    };

    return (
        <Box sx={{ width: "90%", margin: "auto", mt: "20px", gap: 2 }}>
            <Typography mb={2} variant='h4'>{showTable ? "Danh sách đã sửa" : "Khung chương trình học"}</Typography>


            {showTable ? (
                <>
                    <Box mb={3}>
                        <Button mb={2} variant='contained' startIcon={<ArrowBackIcon />} onClick={() => setShowTable(false)}>Quay lại</Button>
                    </Box>
                    <CurriculumEditedTable curriculums={curriculums} />
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} gap={2}>
                        <Button color='primary' variant='contained' startIcon={<ListAltIcon />} onClick={handleShowTable}>
                            Danh Sách Đã Sửa
                        </Button>
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
                                <Box ml={2} dangerouslySetInnerHTML={{ __html: curriculum.contentCurriculum }}></Box>
                            </TabPanel>
                        ))}
                    </TabContext>
                </>
            )}

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
