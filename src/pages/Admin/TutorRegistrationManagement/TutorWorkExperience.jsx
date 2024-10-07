import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Box, Grid } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
function TutorWorkExperience({ workExperiences }) {
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const formattedDate = dateObj.getDate().toString().padStart(2, '0') + '/' +
            (dateObj.getMonth() + 1).toString().padStart(2, '0') + '/' +
            dateObj.getFullYear();
        return formattedDate;
    }
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
                                    {w.companyName}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container columnSpacing={2} rowSpacing={3}>
                                        <Grid item xs={4}>Vị trí:</Grid>
                                        <Grid item xs={8}>{w.position}</Grid>
                                        <Grid item xs={4}>Thời gian làm việc:</Grid>
                                        <Grid item xs={8}>{formatDate(w.startDate)} - {formatDate(w.endDate)}</Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </Box>
        </>
    )
}

export default TutorWorkExperience
