import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, IconButton, Modal, Tab } from '@mui/material'
import React, { useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TutorCertificate from '../TutorCertificate';
import TutorCurriculum from '../TutorCurriculum';
import TutorWorkExperience from '../TutorWorkExperience';
function CareerInformation({ curriculums, certificates, workExperiences }) {
    const [value, setValue] = useState('1');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <IconButton onClick={handleOpen}>
                <RemoveRedEyeIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    maxHeight: "90vh",
                    overflowY: "auto",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    <IconButton sx={{ position: "absolute", top: "5px", right: "5px" }} onClick={handleClose}>
                        <CancelOutlinedIcon />
                    </IconButton>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Bằng cấp / Chứng Chỉ" value="1" />
                                <Tab label="Kinh Nghiệm Làm Việc" value="2" />
                                <Tab label="Khung Chương Trình" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <TutorCertificate certificates={certificates} />
                        </TabPanel>
                        <TabPanel value="2">
                            <TutorWorkExperience workExperiences={workExperiences} />
                        </TabPanel>
                        <TabPanel value="3">
                            <TutorCurriculum curriculums={curriculums} />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal>
        </>
    )
}

export default CareerInformation
