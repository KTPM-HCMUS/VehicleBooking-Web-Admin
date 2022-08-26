import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function BasicTable() {
    let token = localStorage.getItem('token').toString();
    let [history, setHistory] = useState([]);
    async function fetchData() {

        const headers = {
            'Authorization': token,
        }
        const response = await fetch("/api/v1/location/history/all", {headers});
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
                        <TableCell align="center">DriverID</TableCell>
                        <TableCell align="center">UserID</TableCell>
                        <TableCell align="center">Customer's&nbsp;Name</TableCell>
                        <TableCell align="center">Depart&nbsp;Address</TableCell>
                        <TableCell align="center">Destination&nbsp;Address</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Price</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((row) => {
                        return (
                            <TableRow
                                key={row.userId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.phoneNumber}
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.addressDepart}</TableCell>
                                <TableCell align="center">{row.addressDestination}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{new Date(row.timeStamp).getDate()}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
