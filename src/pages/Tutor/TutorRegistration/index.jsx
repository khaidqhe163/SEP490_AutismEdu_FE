import { Box, Breadcrumbs, Divider, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PAGES from '~/utils/pages'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import WorkInfo from './WorkInfo';
import Identification from './Identification';
import axios from 'axios';
import TutorInformation from './TutorInformation';
import AccountInformation from './AccountInformation';
import TutorIntroduction from './TutorIntroduction';

const steps = ['Thông tin cá nhân', 'Thông tin gia sư', 'Bằng cấp / chứng chỉ'];
function TutorRegistration() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [tutorInformation, setTutorInformation] = useState(null);
    const [certificate, setCertificate] = useState([]);
    const [curriculum, setCurriculum] = useState([]);
    const [IdVerification, setIdVerification] = useState(null);
    const [career, setCareer] = useState([]);
    const [tutorIntroduction, setTutorIntroduction] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        // const draftData = localStorage.getItem(`draftData-094949494`);
        // if (draftData) {
        //     const convertData = JSON.parse(draftData);
        //     setTutorInformation(convertData.tutorInformation);
        //     setCertificate(convertData.certificate);
        //     setCareer(convertData.career);
        //     setIdentification(convertData.identifcation);
        // }
    }, [])
    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         if (!isSubmit) {
    //             const draftData = {
    //                 id: "094949494",
    //                 tutorInformation: tutorInformation,
    //                 certificate: certificate,
    //                 career: career,
    //                 identifcation: identifcation
    //             }
    //             localStorage.setItem(`draftData-094949494`, JSON.stringify(draftData))
    //         }
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [tutorInformation, certificate, career, identifcation])
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Box sx={{
                width: {
                    lg: "75%"
                },
                mt: "50px"
            }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to={PAGES.ROOT + PAGES.HOME}>
                        Trang chủ
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Đăng ký thành gia sư</Typography>
                </Breadcrumbs>
                <Paper sx={{ width: "100%", py: "50px", px: "40px", mt: "20px" }} elevation={2}>
                    <Box width="100%" px="100px">
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </Box>
                    <Divider sx={{ mt: "30px" }} />
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {
                                activeStep + 1 === 1 && <TutorInformation
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    handleNext={handleNext}
                                    steps={steps}
                                    tutorInformation={tutorInformation}
                                    setTutorInformation={setTutorInformation}
                                    IdVerification={IdVerification}
                                    setIdVerification={setIdVerification}
                                />
                            }
                            {
                                activeStep + 1 === 2 && <TutorIntroduction
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    handleNext={handleNext}
                                    steps={steps}
                                    tutorIntroduction={tutorIntroduction}
                                    setTutorIntroduction={setTutorIntroduction}
                                />
                            }
                            {
                                activeStep + 1 === 3 && <WorkInfo
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    handleNext={handleNext}
                                    steps={steps}
                                    certificate={certificate}
                                    career={career}
                                    setCareer={setCareer}
                                    setCertificate={setCertificate}
                                    tutorInformation={tutorInformation}
                                    tutorIntroduction={tutorIntroduction}
                                    IdVerification={IdVerification}
                                />
                            }

                        </React.Fragment>
                    )}
                </Paper>
            </Box>
        </Stack>
    )
}

export default TutorRegistration
