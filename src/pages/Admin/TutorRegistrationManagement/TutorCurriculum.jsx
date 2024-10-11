import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionActions, AccordionSummary, Box, Button, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
function TutorCurriculum({ curriculums }) {
    return (
        <>
            <Box mt={3}>
                {
                    !curriculums || curriculums.length === 0 && (
                        <Typography>Không có khung chương trình</Typography>
                    )
                }
                {
                    curriculums && curriculums.map((c, index) => {
                        return (
                            <Accordion defaultExpanded={index === 0} key={c.id}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography>{c.ageFrom} - {c.ageEnd} tuổi {
                                        c.requestStatus === 0 && <span style={{ color: "red", marginLeft: "20px" }}>(Đã từ chối)</span>
                                    }
                                        {
                                            c.requestStatus === 1 && <span style={{ color: "green", marginLeft: "20px" }}>(Đã chấp nhận)</span>
                                        }
                                        {
                                            c.requestStatus === 2 && <span style={{ color: "blue", marginLeft: "20px" }}>(Đang chờ)</span>
                                        }
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ maxWidth: "100%" }} dangerouslySetInnerHTML={{ __html: c.description }} />
                                </AccordionDetails>
                                {
                                    c.requestStatus === 2 && (<AccordionActions>
                                        <Button>Từ chối</Button>
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

export default TutorCurriculum
