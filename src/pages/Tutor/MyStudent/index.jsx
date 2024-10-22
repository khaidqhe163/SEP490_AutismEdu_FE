import { Avatar, Box, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import services from '~/plugins/services';
import PAGES from '~/utils/pages';

function MyStudent() {
    const [listStudent, setListStudent] = useState([]);
    useEffect(() => {
        getListStudent();
    }, [])

    const getListStudent = async () => {
        try {
            await services.StudentProfileAPI.getListStudent((res) => {
                console.log(res);
                setListStudent(res.result)
            }, (error) => {
                console.log(error);
            }, {
            })
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (d) => {
        const date = new Date(d);
        return `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`
    }

    const formatAddress = (d) => {
        const splitedAdd = d.split("|");
        return `${splitedAdd[3]} - ${splitedAdd[2]} - ${splitedAdd[1]} - ${splitedAdd[0]} -`
    }
    return (
        <Stack direction="row" sx={{
            px: "50px",
            pt: '30px'
        }}>
            {
                listStudent.length !== 0 && listStudent.map((l) => {
                    return (
                        <Card sx={{ width: 345 }} key={l.id}>
                            <Box sx={{
                                background: "linear-gradient(to right, #4468f1, #c079ea);",
                                position: "relative",
                                p: "20px"
                            }}>
                                <Typography gutterBottom variant="h5" component="div" color={"white"}>
                                    ĐQK
                                </Typography>
                                <Typography gutterBottom component="div" sx={{ width: "70%" }} color={"white"}>
                                    {l.name}
                                </Typography>
                                <Avatar alt='Khai Dao' src='/' sx={{
                                    height: "80px",
                                    width: "80px",
                                    fontSize: "40px",
                                    bgcolor: "#c2185b",
                                    position: "absolute",
                                    bottom: "-40px",
                                    right: "20px"
                                }} />
                            </Box>
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Ngày sinh: {formatDate(l.birthDate)}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', width: "70%" }} mt={2}>
                                    Địa chỉ: {formatAddress(l.address)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={'/autismtutor/student-detail/' + l.id}>
                                    <Button size="small">Xem chi tiết</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    )
                })
            }
        </Stack>
    )
}

export default MyStudent
