import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionActions, AccordionSummary, Box, Button, Grid } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import RejectWorkExperiences from './handleDialog/RejectWorkExperiences';
import { useContext } from 'react';
import { useTutorContext } from '~/Context/TutorContext';
function TutorWorkExperience({ workExperiences, id }) {
    const { listTutor } = useTutorContext();
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const formattedDate = dateObj.getDate().toString().padStart(2, '0') + '/' +
            (dateObj.getMonth() + 1).toString().padStart(2, '0') + '/' +
            dateObj.getFullYear();
        return formattedDate;
    }
    console.log(listTutor);
    return (
        <>

            <Box mt={3}>
                {
                    workExperiences && workExperiences.map((w, index) => {
                        return (
                            <Accordion defaultExpanded={index === 0} key={w.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    {w.companyName} {w.certificateName} {
                                        w.requestStatus === 0 && <span style={{ color: "red", marginLeft: "20px" }}>(Đã từ chối)</span>
                                    }
                                    {
                                        w.requestStatus === 1 && <span style={{ color: "green", marginLeft: "20px" }}>(Đã chấp nhận)</span>
                                    }
                                    {
                                        w.requestStatus === 2 && <span style={{ color: "blue", marginLeft: "20px" }}>(Đang chờ)</span>
                                    }
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container columnSpacing={2} rowSpacing={3}>
                                        <Grid item xs={4}>Vị trí:</Grid>
                                        <Grid item xs={8}>{w.position}</Grid>
                                        <Grid item xs={4}>Thời gian làm việc:</Grid>
                                        <Grid item xs={8}>{formatDate(w.startDate)} - {formatDate(w.endDate)}</Grid>
                                    </Grid>
                                </AccordionDetails>
                                {
                                    w.requestStatus === 2 && (<AccordionActions>
                                        <RejectWorkExperiences workExperiencesId={w.id} id={id} />
                                    </AccordionActions>)
                                }
                            </Accordion>
                        )
                    })
                }
            </Box>
        </>
    )
}

export default TutorWorkExperience
