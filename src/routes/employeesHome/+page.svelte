<script lang="ts">
    import Navbar from '$lib/components/navbar2.svelte';
    import { onMount } from 'svelte';
    import Chart from "chart.js/auto";
    import {  BarController, BarElement, PieController, ArcElement, CategoryScale, LinearScale } from 'chart.js';
    import jwt_decode from 'jwt-decode';
    import { goto } from '$app/navigation';
    let employees = [];
    let employee = {};

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
                employeeId = decoded.id; // Extract the Customer ID
            }
        } else {
            alert('No token found. Please log in.');
            goto('/login'); // Redirect to login
        }
    });

    onMount(async () => {
        try {
            const response = await fetch(`/api/get-employee?id=${employeeId}`);
            if (response.ok) {
                employees = await response.json();
                employee = employees[0];
            } else {
                console.error("Error fetching usernames:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });
    /*
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
                goto('/employeelogin'); // Redirect to login
            } else {
                const decoded = jwt_decode<{ id: string }>(token);
                employeeId = decoded.id; // Extract the employee ID
            }
        } else {
            alert('No token found. Please log in.');
            goto('/employeelogin'); // Redirect to login
        }
    });
    */
    let employeeId = '';

    Chart.register(BarController, BarElement, PieController, ArcElement, CategoryScale, LinearScale);

    let metrics = {
        activeAccounts: 0,
        activeLoans: 0,
        pendingApprovals: 0,
        transactions: 0
    };
    let accountsData = [];
    let genderData = [];
    let error = null;
    let barChart, pieChart;
    let EName = "John";
    


    onMount(async () => {
        try {
            const response = await fetch('/api/metrics');
            if (!response.ok) throw new Error('Failed to fetch metrics');
            
            const { metrics: fetchedMetrics, monthlyAccounts, genderDistribution } = await response.json();
            metrics = fetchedMetrics;
            accountsData = monthlyAccounts;
            genderData = genderDistribution;
            //genderData = genderDistribution;

            setupBarChart();
            setupPieChart();
        } catch (err) {
            error = err.message;
        }
    });

    function setupBarChart() {
        const canvas = document.getElementById('accountsChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const labels = accountsData.map(data => data.month);
        const data = accountsData.map(data => data.count);

        barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Accounts Opened',
                        data,
                        backgroundColor: '#772035',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true, // Enables the title
                        text: 'Number of Accounts Opened Each Month', // Title text
                        font: {
                            size: 18, // Font size for the title
                            weight: 'bold',
                            // Font weight
                        },
                    padding: {
                            top: 10,
                            bottom: 20,
                        },
                    },
                    legend: { display: true },
                },
            },
        });
    }

    function setupPieChart() {
    const canvas = document.getElementById('genderPieChart');
    if (!canvas) {
        console.error('Pie chart canvas not found.');
        return;
    }

    const ctx = canvas.getContext('2d');
    const labels = genderData.map(data => data.Gender);
    const counts = genderData.map(data => data.count);
    const total = counts.reduce((sum, count) => sum + count, 0);

    // Calculate percentages
    const percentages = counts.map(count => ((count / total) * 100).toFixed(1));

    // Destroy the chart if it already exists
    if (pieChart) {
        pieChart.destroy();
    }

    // Create the chart
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels,
            datasets: [
                {
                    data: counts,
                    backgroundColor: ['#772035', '#C73659'], // Add more colors if needed
                    hoverBackgroundColor: ['#E4B9C2', '#E4B9C2'], // Hover colors
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true, // Enables the title
                    text: 'Number of Male and Female Customers', // Title text
                    font: {
                        size: 18, // Font size for the title
                        weight: 'bold',
                          // Font weight
                    },
                    padding: {
                        top: 10,
                        bottom: 20,
                    },
                },
                legend: {
                    display: true,
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const index = tooltipItem.dataIndex;
                            return `${labels[index]}: ${counts[index]} (${percentages[index]}%)`;
                        },
                    },
                },
            },
        },
    });
}
/*
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: ['#772035', '#C73659'], // Add more colors if needed
                    hoverBackgroundColor: ['#992045', '#E74A69'], // Hover colors
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        generateLabels: function (chart) {
                            const dataset = chart.data.datasets[0];
                            if (!dataset || !dataset.data || !Array.isArray(chart.data.labels)) {
                                return [];
                            }
                            return chart.data.labels.map((label, index) => {
                                const backgroundColor = Array.isArray(dataset.backgroundColor)
                                    ? dataset.backgroundColor[index]
                                    : undefined;
                                const count = dataset.data[index] as number;
                                const percentage = ((count / total) * 100).toFixed(1);
                                return {
                                    text: `${label}: ${count} (${percentage}%)`,
                                    fillStyle: backgroundColor || '#cccccc',
                                };
                            });
                        },
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const count = tooltipItem.raw;
                            const percentage = ((count / total) * 100).toFixed(1);
                            return `${tooltipItem.label}: ${count} (${percentage}%)`;
                        },
                    },
                },
            },
        },
    });
}*/
</script>

<Navbar />
<slot />

<main class="p-8 bg-gray-100 min-h-screen">
    <div class="text-3xl font-semibold text-secondary ">Welcome back, {employee.FirstName} {employee.MiddleName} {employee.Lastname}, {employee.Designation} !  </div>
    <h1 class="mt-10 text-2xl text-center font-bold text-secondary mb-4">Dashboard</h1>
    {#if error}
        <p class="text-red-600">{error}</p>
    {:else}
        <div class="flex flex-col mt-10 items-center space-y-8">
            <!-- Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 ">
                <div class="bg-secondary text-white p-4 rounded-lg shadow-lg text-center">
                    <h2 class="text-xl font-semibold">{metrics.activeAccounts}</h2>
                    <p>Active Accounts</p>
                </div>
                <div class="bg-secondary text-white p-4 rounded-lg shadow-lg text-center">
                    <h2 class="text-xl font-semibold">{metrics.activeLoans}</h2>
                    <p>Active Loans</p>
                </div>
                <div class="bg-secondary text-white p-4 rounded-lg shadow-lg text-center">
                    <h2 class="text-xl font-semibold">{metrics.pendingApprovals}</h2>
                    <p>Pending Approvals</p>
                </div>
                <div class="bg-secondary     text-white p-4 rounded-lg shadow-lg text-center">
                    <h2 class="text-xl font-semibold">{metrics.transactions}</h2>
                    <p>Transactions Processed</p>
                </div>
            </div>
            <div class="flex flex-row gap-4">
            <!-- Bar Chart -->
                <div class="w-[80dvh] max-w-4xl bg-white rounded-lg shadow-lg p-4 flex justify-center">
                    <canvas id="accountsChart" class="w-full h-40"></canvas>
                </div>

                <!-- Pie Chart -->
                <div>
                <div class="w-[70dvh] h-[50dvh] flex justify-center bg-white rounded-lg shadow-lg">
                    <canvas id="genderPieChart" class="w-[60dvh] h-[40dvh]"></canvas>
                </div>
                </div>
            </div>
        </div>
    {/if}
</main>
