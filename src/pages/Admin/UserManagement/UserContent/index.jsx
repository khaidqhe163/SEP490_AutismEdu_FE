import { Box, Button, TextField, Typography } from '@mui/material'
import UserTable from './UserTable'
import { useEffect, useState } from 'react'
import services from '~/plugins/services'
import LoadingComponent from '~/components/LoadingComponent';
import UserCreation from '../UserProfileModal/UserCreation';
function UserContent() {
    const [users, setUsers] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [change, setChange] = useState(false);
    useEffect(() => {
        services.UserManagementAPI.getUsers((res) => {
            const updatedResult = res.result.map((r) => {
                let splitedRole = r.role.split(",");
                r.role = splitedRole;
                return r;
            })
            setUsers(updatedResult);
            res.pagination.currentSize = updatedResult.length
            setPagination(res.pagination);
            setLoading(false);
        }, (err) => {
            setLoading(false);
        }, {
            searchType: "all"
        })
    }, []);

    useEffect(() => {
        setSearchValue("");
    }, [change])
    useEffect(() => {
        if (searchValue.trim() !== "") {
            const handler = setTimeout(() => {
                setLoading(true);
            }, 2000)
            return () => {
                clearTimeout(handler)
            }
        }
    }, [searchValue])
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        services.UserManagementAPI.getUsers((res) => {
            const updatedResult = res.result.map((r) => {
                let splitedRole = r.role.split(",");
                r.role = splitedRole;
                return r;
            })
            setUsers(updatedResult);
            res.pagination.currentSize = updatedResult.length
            setPagination(res.pagination);
            setLoading(false);
        }, (err) => {
            setLoading(false);
        }, {
            searchValue: searchValue,
            searchType: "all"
        })
    }, [loading])
    return (
        <Box sx={{
            p: 2,
            position: "relative"
        }}>
            <Box sx={{
                width: "100%", bgcolor: "white", p: "20px",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            }}>
                <Typography variant='h4'>Quản lý nhân viên</Typography>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    mt: 4
                }}>
                    <TextField id="outlined-basic" label="Tìm tài khoản" variant="outlined"
                        onChange={handleSearch}
                        sx={{
                            padding: "0",
                            width: "300px"
                        }} size='small' />
                    <UserCreation setChange={setChange} />
                </Box>
                <Box>
                    <UserTable users={users} pagination={pagination} setPagination={setPagination} setUsers={setUsers}
                        change={change} />
                </Box>
            </Box>
            <LoadingComponent open={loading} setLoading={setLoading} />
        </Box>
    )
}

export default UserContent
