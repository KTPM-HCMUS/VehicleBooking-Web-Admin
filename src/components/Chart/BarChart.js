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
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function BarChart(){
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

    let token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJkb2IiOiIxIiwicm9sZSI6MywiZW1haWwiOiJhc2RAYXNkLmNvbSIsInR5cGUiOjEsInZlaGljbGVfcGxhdGUiOiIxMjNBQjEyMyIsImhhc2hlZFBhc3N3b3JkIjoiYzdhZDQ0Y2JhZDc2MmE1ZGEwYTQ1MmY5ZTg1NGZkYzFlMGU3YTUyYTM4MDE1ZjIzZjNlYWIxZDgwYjkzMWRkNDcyNjM0ZGZhYzcxY2QzNGViYzM1ZDE2YWI3ZmI4YTkwYzgxZjk3NTExM2Q2Yzc1MzhkYzY5ZGQ4ZGU5MDc3ZWMiLCJpYXQiOjE2NjE1Mjc3MDEsImV4cCI6MTY2MTUzNDkwMSwiaXNzIjoiY2hpZW4ifQ.j5fzx3KbYqWmILdYuS9tkWfdlkX2ncj2yUVCMJqTBAikWabjBC2F9mo2aVQc_b4Pgjr6BXNkhwYrU7cQkER2ZWomiCenMCYlMYwi807JKeFNhMwsSE8z0pbAjg9oanXc_iQjYcaz7mIUuoA6UuUOJC0ELZNFqldWNu3zst_lAvIdq6Jb609gW4rWdOcxwJOkxIKado32n7L_Q4E_SfcCcEdAXBi8oaDV_M7C66v9phHqcFStafEVw9nUXtPFbuBciRH6xJVnmJONQ4DdWGFNFZhEnhYSCXRaq6sTAkmAQfk-Tjr6gPKZilT4r_rjb2cJ7A7zs58yILacwrOLv0dEQQ'
    async function fetchData() {

        const headers = {
            'Authorization': token,
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
