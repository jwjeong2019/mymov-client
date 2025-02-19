import '../css/MainA.css';
import SideBar from "../component/SideBar";
import Navigation from "../component/Navigation";
import Header from "../component/Header";
import {Chart, registerables} from "chart.js";
import {useEffect} from "react";
import {months} from "../util/ChartUtils";

const MainA = () => {
    useEffect(() => {
        Chart.register(...registerables);
        // chart1
        const ctx1 = document.getElementById('chart1');
        const chart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        // chart2
        const ctx2 = document.getElementById('chart2');
        const labels = months({count: 7});
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
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
            }]
        };
        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        };
        const chart2 = new Chart(ctx2, config);
        return () => {
            chart1.destroy();
            chart2.destroy();
        };
    }, []);
    return (
        <div id={'main-a-container'}>
            <SideBar />
            <div id={'main-a-section'}>
                <Navigation />
                <Header title={'Dashboard'} />
                <div id={'main-a-content'}>
                    <div id={'main-a-content-card'}>
                        <canvas id={'chart1'}></canvas>
                    </div>
                    <div id={'main-a-content-card'}>
                        <canvas id={'chart2'}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainA;