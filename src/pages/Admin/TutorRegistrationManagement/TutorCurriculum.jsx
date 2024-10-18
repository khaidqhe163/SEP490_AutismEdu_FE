import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionActions, AccordionSummary, Box, Button, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import RejectCurriculum from './handleDialog/RejectCurriculum';
function TutorCurriculum({ curriculums, id }) {
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
                                    {
                                        c.requestStatus === 0 && (
                                            <>
                                                <Typography sx={{ mt: 1, fontSize: "12px", color: "red" }}>Lý do từ chối: {c.rejectionReason}</Typography>
                                            </>
                                        )
                                    }
                                </AccordionDetails>
                                {
                                    c.requestStatus === 2 && (<AccordionActions>
                                        <RejectCurriculum curriculumId={c.id} id={id} />
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
