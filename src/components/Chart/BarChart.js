import React, {useState} from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import NoMatch from "../404/404";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function BarChart(){
    let token = localStorage.getItem('token').toString();
    const dataInHCM = new Map([
        ['Quận 1', 0],
        ['Quận 3', 0],
        ['Quận 4', 0],
        ['Quận 5', 0],
        ['Quận 6', 0],
        ['Quận 7', 0],
        ['Quận 8', 0],
        ['Quận 10', 0],
        ['Quận 11', 0],
        ['Quận 12', 0],
        ['Quận Bình Thạnh', 0],
        ['Quận Bình Tân', 0],
        ['Quận Gò Vấp', 0],
        ['Quận Phú Nhuận', 0],
        ['Quận Tân Bình', 0],
        ['Quận Tân Phú', 0],
        ['Khác', 0]

    ]);
    const [values, setValues] = useState([]);
    const [count, setCount] = useState([]);

    async function fetchData() {

        const headers = {
            'Authorization': 'Bearer' + token,
        }
        const response = await fetch("/v1/statistic", {headers});
        const json = await response.json();
        const x = Object.keys(json.result).map((key) => key)
        const y = Object.values(json.result).map((value) => value)
        x.forEach((key, index) =>{
            dataInHCM.set(key, y[index])
        })
        setValues([...dataInHCM.values()])
        console.log(values)
        setCount(y)
    }

    React.useEffect(() => {
        fetchData();
    }, [count.length]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of vehicle bookings in Ho Chi Minh City',
            },
        },
    };

    const labels = [...dataInHCM.keys()];
    const data = {
        labels,
        datasets: [
            {
                label: 'Quantity',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            },
        ],
    };

    return (
            <Bar options={options} data={data} />
    )
}
