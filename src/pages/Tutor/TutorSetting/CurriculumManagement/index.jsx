import { TabContext, TabPanel } from '@mui/lab';
import { Box, Button, Typography, IconButton, Tabs, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ElevatorIcon from '@mui/icons-material/Elevator';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CurriculumEditedTable from './EditedTable/CurriculumEditedTable'; // Import the table component
import CreateOrEditModal from './CurriculumModal/CreateOrEditModal';
import DeleteConfirmationModal from './CurriculumModal/DeleteConfirmationModal';

import services from '~/plugins/services';
import { enqueueSnackbar } from 'notistack';

function CurriculumManagement() {
    const [valueCurriculum, setValueCurriculum] = useState('1');
    const [curriculumData, setCurriculumData] = useState([]);

    const [openCreateEdit, setOpenCreateEdit] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEditIndex, setCurrentEditIndex] = useState(null);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        handleGetCurriculums();
    }, []);

    const handleGetCurriculums = async () => {
        try {
            await services.CurriculumManagementAPI.getCurriculums((res) => {
                if (res?.result) {
                    const curriData = res?.result.filter(r => r.isActive == true);
                    setCurriculumData(curriData);
                }
            }, (error) => {
                console.log(error);
            }, {
                status: 'all',
                orderBy: 'createdDate',
                sort: 'asc',
                pageNumber: 1
            })
        } catch (error) {
            console.log(error);
        }
    };


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
        setCurrentEditIndex(index);
        setOpenCreateEdit(true);
    };

    const handleSubmitCreate = async (formData) => {
        try {
            console.log(formData);

            await services.CurriculumManagementAPI.createCurriculum({
                ageFrom: formData.ageFrom,
                ageEnd: formData.ageEnd,
                description: formData.description,
                originalCurriculumId: 0
            }, (res) => {
                console.log(formData);
                enqueueSnackbar("Tạo khung chương trình thành công!", { variant: "success" });
                setCurriculums([...curriculums, formData]);
                setOpenCreateEdit(false);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }

    };


    const handleSubmitEdit = async (formData, originalCurriculumId) => {
        try {
            console.log(formData);
            console.log(originalCurriculumId);

            await services.CurriculumManagementAPI.createCurriculum({
                ageFrom: formData.ageFrom,
                ageEnd: formData.ageEnd,
                description: formData.description,
                originalCurriculumId
            }, (res) => {
                console.log(res.result);
                enqueueSnackbar("Cập nhật khung chương trình thành công!", { variant: "success" });
                // setCurriculums([...curriculums, formData]);
                setOpenCreateEdit(false);
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }

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
            <Typography mb={4} variant='h4'>{showTable ? "Danh sách đã sửa" : "Khung chương trình học"}</Typography>
            {showTable ? (
                <CurriculumEditedTable setShowTable={setShowTable} />
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
                    {curriculumData.length === 0 ? 'Hiện tại không có khung chương trình.' :
                        <TabContext value={valueCurriculum}>
                            <Box sx={{ maxWidth: { xs: 320, sm: 750 } }}>
                                <Tabs
                                    value={valueCurriculum}
                                    onChange={handleChangeCurriculum}
                                    aria-label="icon position tabs example"
                                    scrollButtons
                                    variant="scrollable"
                                >
                                    {curriculumData?.map((curriculum, index) => (
                                        <Tab
                                            key={index}
                                            value={(index + 1).toString()}
                                            icon={<ElevatorIcon />}
                                            iconPosition="start"
                                            label={(
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    Từ {curriculum.ageFrom} - {curriculum.ageEnd} tuổi
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOpenEdit(curriculum);
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
                            {curriculumData.map((curriculum, index) => (
                                <TabPanel key={index} value={(index + 1).toString()}>
                                    <Box ml={2} dangerouslySetInnerHTML={{ __html: curriculum.description }}></Box>
                                </TabPanel>
                            ))}
                        </TabContext>
                    }

                </>
            )}

            <CreateOrEditModal
                open={openCreateEdit}
                handleClose={() => setOpenCreateEdit(false)}
                handleSubmit={isEditing ? handleSubmitEdit : handleSubmitCreate}
                initialData={isEditing ? currentEditIndex : null}
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
