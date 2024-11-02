import { Button, Card, CardContent, FormControl, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import services from '~/plugins/services';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AssessmentGuild from './AssessmentGuild';
import AssessmentDetail from './AssessmentDetail';
function InitialCondition({ setInitialCondition, initialCondition, childrenInfor,
    selectedAssessment, setSelectedAssessment, hasAccount }) {
    const [assessment, setAssessment] = useState([]);
    useEffect(() => {
        handleGetAsessment();
    }, [])
    const handleGetAsessment = async () => {
        try {
            await services.AssessmentManagementAPI.listAssessment((res) => {
                setAssessment(res.result);
                const initialAssessment = res.result.map((r, index) => {
                    return {
                        questionId: r.id,
                        optionId: r.assessmentOptions[0].id
                    }
                })
                setSelectedAssessment(initialAssessment)
            }, (err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card sx={{ px: 2 }}>
            <CardContent sx={{ px: 0 }}>
                <Typography variant='h5'>Tình trạng ban đầu</Typography>
                <TextField
                    sx={{ width: "100%" }}
                    minRows={10}
                    multiline
                    value={initialCondition}
                    onChange={(e) => { setInitialCondition(e.target.value) }}
                />
                <Typography variant='h5' mt={5}>Danh sách đánh giá</Typography>
                <AssessmentGuild />
                <Grid container columnSpacing={2} rowSpacing={2}>
                    {
                        assessment.map((a, index) => {
                            return (
                                <Grid item xs={6} key={a.id}>
                                    <Stack direction='row' alignItems='center' sx={{
                                        width: "300px",
                                        justifyContent: "space-between"
                                    }}>
                                        <Typography>{a.question}</Typography>
                                        <AssessmentDetail assessment={a} />
                                    </Stack>
                                    <FormControl size='small' sx={{ width: "300px" }} key={a.id}>
                                        <Select value={selectedAssessment[index].optionId}
                                            onChange={(e) => {
                                                selectedAssessment[index].optionId = Number(e.target.value);
                                                setSelectedAssessment([...selectedAssessment]);
                                            }}
                                        >
                                            {
                                                a.assessmentOptions.map((option) => {
                                                    return (
                                                        <MenuItem value={option.id} key={option.id}>{option.point} điểm</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </CardContent>
        </Card>
    )
}

export default InitialCondition
