<script lang="ts">
    import { onMount } from 'svelte';
    import { Icon } from "svelte-icons-pack";
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import Chart from 'chart.js/auto';
    import jwt_decode from 'jwt-decode';
    import { goto } from '$app/navigation';

    function isTokenExpired(token: string): boolean {
        try {
            const decoded = jwt_decode<{ exp: number }>(token);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return decoded.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true; // Treat invalid tokens as expired
        }
    }

    onMount(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            if (isTokenExpired(token)) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('authToken');
                goto('/login'); // Redirect to login
            } else {
                const decoded = jwt_decode<{ id: string }>(token);
                customerId = decoded.id; // Extract the Customer ID
            }
        } else {
            alert('No token found. Please log in.');
            goto('/login'); // Redirect to login
        }
    });

    let customerId = '';

    // Data placeholders
    let spendingData = [];
    let balanceTrends = [];
    let deposits = 0;
    let withdrawals = 0;
    let creditspendingData = [];
    let spendingChart;

    // Chart instances
    let barChart, lineChart;

    // Fetch data from the backend on mount
    onMount(async () => {
        const response = await fetch('/api/dashboard-data');
        const data = await response.json();

        spendingData = data.spendingData;
        balanceTrends = data.balanceTrends; 
        deposits = data.deposits;
        withdrawals = data.withdrawals;

        setupBarChart();
        setupLineChart();
        fetchSpending();
    });

    async function fetchSpending() {
        try {
            const response = await fetch(`/api/credit-spending?customerId=${customerId}`);
            if (!response.ok) throw new Error('Failed to fetch spending data');
            const { spending } = await response.json();
            spendingData = spending;
            renderSpendingChart();
        } catch (error) {
            console.error('Error fetching spending data:', error);
        }
    }

    function renderSpendingChart() {
        const canvas = document.getElementById('creditspendingChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const labels = spendingData.map(item => item.month);
        const data = spendingData.map(item => item.total_spending);

        if (spendingChart) spendingChart.destroy();

        spendingChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Credit Card Spending',
                        data,
                        backgroundColor: '#C73659',
                        hoverBackgroundColor: '#772035',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales:{
                    y: {
                        beginAtZero: true,
                    min: 0,
                    max: 2000, // Adjust based on your data
                    ticks: {
                        stepSize: 100,
                        callback: (value) => `₹${value}`, // Example: Display as currency
                        },
                    },  
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Monthly Credit Card Spending (Past 12 Months)',
                    },
                },
            },
        });
    }

    // Bar Chart for Spending Distribution
    function setupBarChart() {
        const canvas = document.getElementById('spendingChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const labels = spendingData.map(item => item.month);
        const data = spendingData.map(item => item.amount);

        if (barChart) barChart.destroy(); // Prevent duplicate rendering
        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Amount Spent',
                        data,
                        backgroundColor: '#772035',
                        hoverBackgroundColor: '#C73659',
                    },
                ],
            },
            options: {
                responsive: true,
                scales:{
                    y: {
                        beginAtZero: true,
                    min: 0,
                    max: 20000, // Adjust based on your data
                    ticks: {
                        stepSize: 500,
                        callback: (value) => `₹${value}`, // Example: Display as currency
                        },
                    },  
                },
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: 'Monthly Spending (Past 12 Months)' },
                },
            },
        });
    }

    function setupLineChart() {
        const canvas = document.getElementById('balanceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const labels = balanceTrends.map(item => item.date);
        const data = balanceTrends.map(item => item.balance);

        if (lineChart) lineChart.destroy(); // Prevent duplicate rendering
        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Account Balance',
                        data,
                        borderColor: '#772035',
                        backgroundColor: 'rgba(255, 87, 51, 0.2)',
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                scales:{
                    y: {
                        beginAtZero: true,
                    min: 0,
                    max: 80000, // Adjust based on your data
                    ticks: {
                        stepSize: 500,
                        callback: (value) => `₹${value}`, // Example: Display as currency
                        },
                    },  
                },
                plugins: {
                    legend: { display: true },
                    title: { display: true, text: 'Account Balance Trends (Past 12 months)' },
                },
            },
        });
    }
</script>

<div class="w-full bg-[#772035] flex justify-between items-center text-white h-[10dvh]">
    <div><button class="ml-2 text-2xl"><a href="/Settin"><Icon src={ BiSolidLeftArrow} className="h-6 w-6"/></a></button></div>
    <div class=" text-2xl font-semibold"><h1 class="text-3xl font-bold">Customer Dashboard</h1></div>
    <div class="mr-6 "></div>
</div>

<main class="bg-gray-100 min-h-screen p-8 flex flex-col">
    

    <!-- Deposits and Withdrawals -->
    <div class="flex flex-row gap-10 justify-center items-center">
        <div class="bg-white w-[80dvh] p-6 rounded-lg shadow">
            <h2 class="text-xl font-bold text-secondary">Total Deposits this Month</h2>
            <p class="text-2xl font-bold">{deposits}</p>
        </div>
        <div class="bg-white w-[80dvh] p-6 rounded-lg shadow">
            <h2 class="text-xl font-bold text-[#C73659]">Total Withdrawals this Month</h2>
            <p class="text-2xl font-bold">{withdrawals}</p>
        </div>
    </div>

    <!-- Bar Chart for Spending -->
    <div class="flex flex-row gap-10 mt-10 justify-center items-center">
        <div class="flex justify-center w-[80dvh] h-[50dvh] bg-white p-6 rounded-lg shadow">
            <canvas id="spendingChart" class="w-[60dvh] h-[50dvh]"></canvas>
        </div>  
        <div class="flex justify-center w-[80dvh] h-[50dvh] bg-white p-6 rounded-lg shadow">
            <canvas id="creditspendingChart" class="w-[60dvh] h-[50dvh]"></canvas>
        </div>
    </div>
    <div class="flex flex-row gap-10 mt-8 justify-center items-center">
        <div class="flex justify-center w-[120dvh] h-[70dvh] bg-white p-6 rounded-lg shadow">
            <canvas id="balanceChart" class="w-[120dvh] h-[70dvh]"></canvas>
        </div>    
    </div>
</main>
