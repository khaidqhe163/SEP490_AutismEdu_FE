import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Box } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
function TutorCurriculum({ curriculums }) {
    return (
        <>
            <Box mt={3}>
                {
                    curriculums && curriculums.map((c, index) => {
                        return (
                            <Accordion defaultExpanded={index === 0} key={c.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    {c.ageFrom} - {c.ageEnd} tuổi
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ maxWidth: "100%" }} dangerouslySetInnerHTML={{ __html: c.description }} />
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </Box>
        </>
    )
}

export default TutorCurriculum
