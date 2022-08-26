import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function ClientTable() {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJkb2IiOiIxIiwicm9sZSI6MywiZW1haWwiOiJhc2RAYXNkLmNvbSIsInR5cGUiOjEsInZlaGljbGVfcGxhdGUiOiIxMjNBQjEyMyIsImhhc2hlZFBhc3N3b3JkIjoiYzdhZDQ0Y2JhZDc2MmE1ZGEwYTQ1MmY5ZTg1NGZkYzFlMGU3YTUyYTM4MDE1ZjIzZjNlYWIxZDgwYjkzMWRkNDcyNjM0ZGZhYzcxY2QzNGViYzM1ZDE2YWI3ZmI4YTkwYzgxZjk3NTExM2Q2Yzc1MzhkYzY5ZGQ4ZGU5MDc3ZWMiLCJpYXQiOjE2NjE1Mjc3MDEsImV4cCI6MTY2MTUzNDkwMSwiaXNzIjoiY2hpZW4ifQ.j5fzx3KbYqWmILdYuS9tkWfdlkX2ncj2yUVCMJqTBAikWabjBC2F9mo2aVQc_b4Pgjr6BXNkhwYrU7cQkER2ZWomiCenMCYlMYwi807JKeFNhMwsSE8z0pbAjg9oanXc_iQjYcaz7mIUuoA6UuUOJC0ELZNFqldWNu3zst_lAvIdq6Jb609gW4rWdOcxwJOkxIKado32n7L_Q4E_SfcCcEdAXBi8oaDV_M7C66v9phHqcFStafEVw9nUXtPFbuBciRH6xJVnmJONQ4DdWGFNFZhEnhYSCXRaq6sTAkmAQfk-Tjr6gPKZilT4r_rjb2cJ7A7zs58yILacwrOLv0dEQQ'
    let [clients, setClients] = useState([]);
    async function fetchData() {

        const headers = {
            'Authorization': token,
        }
        const response = await fetch("/api/v1/location/all/client", {headers});
        const json = await response.json();
        setClients(json.clientList)
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">UserID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Date&nbsp;Of&nbsp;Birth</TableCell>
                        <TableCell align="center">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clients.map((row) => {
                        return (
                            <TableRow
                                key={row.user_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.user_id}
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.dob}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
