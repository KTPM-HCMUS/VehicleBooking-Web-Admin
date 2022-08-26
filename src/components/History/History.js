import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function BasicTable() {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJkb2IiOiIxIiwicm9sZSI6MSwiZW1haWwiOiJhc2RAYXNkLmNvbSIsInR5cGUiOjEsInZlaGljbGVfcGxhdGUiOiIxMjNBQjEyMyIsImhhc2hlZFBhc3N3b3JkIjoiYzdhZDQ0Y2JhZDc2MmE1ZGEwYTQ1MmY5ZTg1NGZkYzFlMGU3YTUyYTM4MDE1ZjIzZjNlYWIxZDgwYjkzMWRkNDcyNjM0ZGZhYzcxY2QzNGViYzM1ZDE2YWI3ZmI4YTkwYzgxZjk3NTExM2Q2Yzc1MzhkYzY5ZGQ4ZGU5MDc3ZWMiLCJpYXQiOjE2NjE0MzU2NDUsImV4cCI6MTY2MTQ0Mjg0NSwiaXNzIjoiY2hpZW4ifQ.HjGc99g3DI3ucgF4QyXNbWoXJikMLvfxPXjwk8Z3EsduyrWyOYtgD7Cd6mvNjIfMlJ3jOdZhiQvZUFDJvtrPTqj7z7ausjcJm4P4-wqIgl81llSwxs0qergulTjq1fM0L3hHUMQjdIDAK_a4RLjg9aEOTIzxs1SosgjCXazDt19TI6p5KTUFyvupDRvr4xcE3D9eVitXxupHojdTst32P7uxsO_uJO-UYCR8KwG7tIgY6nVH1CX3pF6Mxcto8jgEVcHvinVTBiCJkaA5hcYf-IeImxA8VJEW7gcHoYJZSN5ycL8R2PmVyXPkLnfa6FHuaiBdO0jZPSK3gXg5htJjcg'
    let [history, setHistory] = useState([]);
    async function fetchData() {

        const headers = {
            'Authorization': token,
        }
        const response = await fetch("/api/v1/location/admin/statistic/driver", {headers});
        const json = await response.json();
        console.log(json)
        setHistory(json.bookingItems)
    }

    useEffect(() => {
        fetchData();
    }, []);
    console.log(history)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>DriverID</TableCell>
                        <TableCell align="right">UserID</TableCell>
                        <TableCell align="right">Customer's&nbsp;Name</TableCell>
                        <TableCell align="right">Depart&nbsp;Address</TableCell>
                        <TableCell align="right">Destination&nbsp;Address</TableCell>
                        <TableCell align="right">Time</TableCell>
                        <TableCell align="right">Price</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((row) => {
                        return (
                            <TableRow
                                key={row.userId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.phoneNumber}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.addressDepart}</TableCell>
                                <TableCell align="right">{row.addressDestination}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{new Date(row.timeStamp).getDate()}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
