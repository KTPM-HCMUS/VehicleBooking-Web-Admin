import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function DriverTable() {
    let token = localStorage.getItem('token').toString();
    let [drivers, setDrivers] = useState([]);
    async function fetchData() {

        const headers = {
            'Authorization': token,
        }
        const response = await fetch("/api/v1/location/all/driver", {headers});
        const json = await response.json();
        setDrivers(json.driverList)
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>DriverID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Date&nbsp;Of&nbsp;Birth</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Type&nbsp;Of&nbsp;Vehicle</TableCell>
                        <TableCell align="center">Vehicle's&nbsp;Plate</TableCell>
                        <TableCell align="center">Income</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {drivers.map((row) => {
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
                                <TableCell align="center">{row.type==1?"MORTOBIKE":"CAR"}</TableCell>
                                <TableCell align="center">{row.vehicle_plate}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
