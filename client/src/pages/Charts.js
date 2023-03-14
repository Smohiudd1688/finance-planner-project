import React from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from'chart.js/auto';
//import {Chart, ArcElement} from 'chart.js'

function Charts({categories}) {
    const data = {
        labels: categories.map(category => category.title),
        datasets: [{
            label: "Money Budgeted",
            data: categories.map(category => category.budget),
            backgroundColor: [
                "rgba(154, 6, 6, 0.8)",
                "rgba(213, 82, 82, 0.8)",
                "rgba(194, 93, 93, 0.8)",
                "rgba(189, 0, 0, 0.98)"
            ]
        }]
    }
    return (
        <div>
            <h2>Breakdown of Your Budget</h2>
            <div id="pie"><Pie data={data} /></div>
        </div>
    )
}

export default Charts;