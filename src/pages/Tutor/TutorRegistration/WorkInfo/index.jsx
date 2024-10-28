import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListSubheader, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import LoadingComponent from '~/components/LoadingComponent';
import axios from "~/plugins/axios";
import services from '~/plugins/services';
import Career from './Career';
import CareerDetail from './Career/CareerDetail';
import CertificateAddition from './Certificate/CertificateAddition';
import CertificateDetail from './Certificate/CertificateDetail';
function WorkInfo({ activeStep, handleBack, handleNext, steps, certificate, career, setCareer,
    setCertificate, tutorInformation, tutorIntroduction,
    IdVerification }) {
    const image = useRef(null);
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        try {
            setOpenConfirm(false);
            if (certificate?.length !== 0 && career?.length !== 0) {
                setLoading(true);
                const submitForm = new FormData();
                submitForm.append("Email", tutorInformation.email);
                submitForm.append("FullName", tutorInformation.fullName);
                submitForm.append("PhoneNumber", tutorInformation.phoneNumber);
                submitForm.append("Address", `${tutorInformation.province.name}|${tutorInformation.district.name}|${tutorInformation.commune.name}|${tutorInformation.homeNumber}`);
                submitForm.append("Image", tutorInformation.image);
                submitForm.append("DateOfBirth", tutorInformation.dateOfBirth);
                submitForm.append("StartAge", tutorIntroduction.startAge);
                submitForm.append("EndAge", tutorIntroduction.endAge);
                submitForm.append("PriceFrom", tutorIntroduction.priceFrom);
                submitForm.append("PriceEnd", tutorIntroduction.priceEnd);
                submitForm.append("AboutMe", tutorIntroduction.description);
                submitForm.append("SessionHours", tutorIntroduction.sessionHours);
                tutorIntroduction.curriculum.forEach((curriculum, index) => {
                    submitForm.append(`Curriculums[${index}].Name`, curriculum.name);
                    submitForm.append(`Curriculums[${index}].ageFrom`, curriculum.ageFrom);
                    submitForm.append(`Curriculums[${index}].ageEnd`, curriculum.ageEnd);
                    submitForm.append(`Curriculums[${index}].Description`, curriculum.description);
                });
                career.forEach((experience, index) => {
                    submitForm.append(`WorkExperiences[${index}].CompanyName`, experience.companyName);
                    submitForm.append(`WorkExperiences[${index}].Position`, experience.position);
                    submitForm.append(`WorkExperiences[${index}].StartDate`, experience.startDate);
                    submitForm.append(`WorkExperiences[${index}].EndDate`, experience.endDate);
                });
                certificate.forEach((cert, index) => {
                    submitForm.append(`Certificates[${index}].CertificateName`, cert.certificateName);
                    submitForm.append(`Certificates[${index}].IssuingInstitution`, cert.issuingInstitution);
                    submitForm.append(`Certificates[${index}].IssuingDate`, cert.issuingDate);
                    if (cert.expirationDate) {
                        submitForm.append(`Certificates[${index}].ExpirationDate`, cert.expirationDate);
                    } else {
                        submitForm.append(`Certificates[${index}].ExpirationDate`, "");
                    }
                    Array.from(cert.medias).forEach((file, fileIndex) => {
                        submitForm.append(`Certificates[${index}].Medias`, file);
                    });
                });

                submitForm.append(`Certificates[${certificate.length}].CertificateName`, IdVerification.certificateName);
                submitForm.append(`Certificates[${certificate.length}].issuingInstitution`, IdVerification.issuingInstitution);
                submitForm.append(`Certificates[${certificate.length}].issuingDate`, IdVerification.issuingDate);
                submitForm.append(`Certificates[${certificate.length}].identityCardNumber`, IdVerification.identityCardNumber);
                Array.from(IdVerification.medias).forEach((file, fileIndex) => {
                    submitForm.append(`Certificates[${certificate.length}].Medias`, file);
                });
                axios.setHeaders({ "Content-Type": "multipart/form-data", "Accept": "application/json, text/plain, multipart/form-data, */*" });
                await services.TutorManagementAPI.registerAsTutor(submitForm, (res) => {
                    console.log(res);
                    handleNext();
                }, (err) => {
                    enqueueSnackbar(err.error[0], { variant: "error" })
                    console.log(err);
                })
                setLoading(false);
                axios.setHeaders({ "Content-Type": "application/json", "Accept": "application/json, text/plain, */*" });
            } else {
                enqueueSnackbar("Bạn chưa có bằng cấp hoặc kinh nghiệm làm việc", { variant: "error" })
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    return (
        <>
            <Box>
                <Box>
                    <List
                        sx={{ maxWidth: 450, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                <Stack direction="row" sx={{ alignItems: "center" }} gap={3}>
                                    <Typography variant='h6'>Thêm bằng cấp hoặc chứng chỉ</Typography>
                                    <CertificateAddition certificate={certificate} setCertificate={setCertificate} />
                                </Stack>
                            </ListSubheader>
                        }
                    >
                        {
                            certificate === null || certificate.length === 0 ? (
                                <ListItem>Chưa có bằng cấp hay chứng chỉ nào</ListItem>
                            ) : (
                                certificate?.map((c, index) => {
                                    return (
                                        <CertificateDetail key={index} index={index} currentItem={c} certificate={certificate}
                                            setCertificate={setCertificate} />
                                    )
                                })
                            )
                        }
                    </List>
                </Box>
                <Box>
                    <List
                        sx={{ maxWidth: 450, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                <Stack direction="row" sx={{ alignItems: "center" }} gap={3}>
                                    <Typography variant='h6'>Thêm kinh nghiệm làm việc</Typography>
                                    <Career career={career} setCareer={setCareer} />
                                </Stack>
                            </ListSubheader>
                        }
                    >
                        {
                            career === null || career.length === 0 ? (
                                <ListItem>Chưa có kinh nghiệm làm việc nào</ListItem>
                            ) : (

                                career?.map((c, index) => {
                                    return (
                                        <CareerDetail key={index} currentItem={c} career={career} setCareer={setCareer}
                                            index={index} />
                                    )
                                })
                            )
                        }
                    </List>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={() => setOpenConfirm(true)}>
                    {activeStep === steps.length - 1 ? 'Kết thúc' : 'Tiếp theo'}
                </Button>
            </Box>
            {
                image && (
                    <Dialog open={open} onClose={handleClose}>
                        <DialogContent style={{ textAlign: 'center' }}>
                            <img src={image.current?.src} style={{ maxHeight: "500px", minHeight: "400px", maxWidth: "100%" }} />
                        </DialogContent>
                    </Dialog>
                )
            }
            <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant='h6'>Kiểm tra lại toàn bộ thông khi gửi!</Typography>
                    <Typography>Bạn có muốn nộp đơn này không?</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleSubmit}>Nộp</Button>
                    <Button onClick={() => { setOpenConfirm(false) }} autoFocus>
                        Huỷ bỏ
                    </Button>
                </DialogActions>
            </Dialog>
            <LoadingComponent open={loading} setOpen={setLoading} />
        </>
    )
}

export default WorkInfo
