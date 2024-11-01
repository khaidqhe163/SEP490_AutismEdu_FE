import { Box, Checkbox, colors, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useParams } from "react-router-dom";
import services from "~/plugins/services";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generatedColors = new Set([
    "rgb(255, 87, 51)",
    "rgb(51, 162, 255)",
    "rgb(141, 255, 51)",
    "rgb(255, 51, 184)",
    "rgb(245, 176, 65)",
    "rgb(93, 109, 126)",
    "rgb(155, 89, 182)",
    "rgb(51, 255, 87)",
    "rgb(255, 189, 51)",
    "rgb(51, 255, 243)",
    "rgb(199, 0, 57)",
    "rgb(255, 87, 51)",
    "rgb(52, 152, 219)",
    "rgb(255, 51, 209)",
    "rgb(175, 122, 197)"
]);

function getUniqueRandomColor() {
    let color;
    do {
        const r = Math.floor(Math.random() * 200);
        const g = Math.floor(Math.random() * 200);
        const b = Math.floor(Math.random() * 200);
        color = `rgb(${r}, ${g}, ${b})`;
    } while (generatedColors.has(color));
    generatedColors.add(color);
    return color;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

function AssessmentChart({ studentProfile }) {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [progressReports, setProgressReports] = useState([]);
    const [assessments, setAssessment] = useState([]);
    const [initialCondition, setInitialCondition] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [displayAssessment, setDisplayAssessment] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState([]);
    useEffect(() => {
        handleGetReports();
        handleGetAsessment();
    }, []);

    useEffect(() => {
        const reportData = [];
        if (assessments.length !== 0 && progressReports.length !== 0 && studentProfile) {
            assessments.forEach((a) => {
                const data = {
                    label: a.question,
                    data: []
                }
                progressReports.forEach((p) => {
                    const question = p.assessmentResults.find((assessment) => {
                        return assessment.question === a.question;
                    })
                    if (question) {
                        data.data.push(question.point)
                    }
                })
                reportData.push(data);
            })
            const reverseArr = reportData.reverse();
            const colorArray = Array.from(generatedColors);
            const datasets = reverseArr.map((dataset, index) => ({
                ...dataset,
                borderColor: index < 15 ? colorArray[index] : getUniqueRandomColor(),
                fill: false,
            }));
            const label = progressReports.map((p) => {
                return formatDate(p.to);
            }).reverse();
            const labelLength = 10 - label.length;
            for (let i = 0; i <= labelLength; i++) {
                label.push("");
            }

            if ((pagination.total <= 10) || (pagination.total / pagination.pageSize === pagination.pageNumber)) {
                label.unshift(formatDate(studentProfile.createdDate));
                datasets.forEach((d) => {
                    const initAssessment = initialCondition.find((i) => {
                        return i.question === d.question;
                    })
                    if (initAssessment) {
                        d.data.unshift(initAssessment.point);
                    } else {
                        d.data.unshift(1);
                    }
                })
            }
            setChartData({
                labels: label,
                datasets: datasets
            });
            setSelectedAssessment({
                labels: label,
                datasets: datasets
            })
        }
    }, [assessments, progressReports, studentProfile, pagination, initialCondition])

    useEffect(() => {
        const updatedAssessment = displayAssessment.datasets.filter((s) => {
            return selectedAssessment.includes(s.label)
        })
        setDisplayAssessment(updatedAssessment);
    }, [selectedAssessment])

    const handleGetReports = async () => {
        try {
            setLoading(true);
            await services.ProgressReportAPI.getListProgressReport((res) => {
                console.log(res);
                setProgressReports(res.result.progressReports);
                setInitialCondition(res.result.initialAssessmentResultDTO);
                setPagination(res.pagination);
            }, (err) => {
                console.log(err);
            }, {
                studentProfileId: id,
                getInitialResult: true
            })
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const formatDate = (date) => {
        if (!date) return ""
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    const handleGetAsessment = async () => {
        try {
            await services.AssessmentManagementAPI.listAssessment((res) => {
                setAssessment(res.result)
                const assessmentNames = res.result.map((r) => {
                    return r.question
                })
                setSelectedAssessment(assessmentNames)
            }, (err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDisplayAssessment(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <Box px={5} pt={2} pb={3}>
            {
                selectedAssessment && selectedAssessment.length !== 0 && chartData && chartData.length !== 0 && (
                    <div>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="label-select">Đánh giá</InputLabel>
                            <Select
                                labelId="label-select"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedAssessment}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {assessments.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={selectedAssessment.includes(name)} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )
            }
            {
                displayAssessment && displayAssessment.length !== 0 && (
                    <Line
                        data={displayAssessment}
                        options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Biểu đồ tổng quan đánh giá của học sinh",
                                },
                                legend: {
                                    display: true,
                                    position: "bottom",
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        maxTicksLimit: 11,
                                    }
                                },
                                y: {
                                    suggestedMin: 1,
                                    suggestedMax: 4,
                                    beginAtZero: false,
                                    ticks: {
                                        stepSize: 0.5,
                                        callback: function (value) {
                                            return value.toFixed(1);
                                        },
                                    },
                                },
                            }
                        }}
                    />
                )
            }
        </Box>
    );
}

export default AssessmentChart
