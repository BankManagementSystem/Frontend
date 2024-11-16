<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';

    // Function to navigate to the Loan Application page
    function navigateToLoanApplication() {
        goto('/Loan-application');
    }

    // Input values
    let loanAmount = 1250000; // Initial loan amount
    let tenure = 40; // Initial tenure in months
    let reducingRate = 17; // Initial interest rate in percentage
    let emi = 0; // Calculated EMI

    // Reactive block to calculate EMI whenever values change
    $: {
        let principal = loanAmount;
        let monthlyRate = reducingRate / 12 / 100; // Convert annual rate to monthly
        let n = tenure;

        // Calculate EMI using the formula
        if (monthlyRate > 0) {
        emi = Math.round(
            (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
            (Math.pow(1 + monthlyRate, n) - 1)
        );
        } else {
        emi = Math.round(principal / n); // Handle zero interest rate
        }
    }
    </script>

<div class="bg-gray-100p-8">
    <h1 class="text-red-800 text-center text-3xl font-bold">EMI Calculator</h1>
</div>

<div class="bg-gray-100 min-h-screen p-8">
    <div class="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
        <!-- Type of Loan -->
        <div class="mb-4">
            <label class="block text-gray-700 font-medium" for="typeofloan">Type of Loan</label>
            <input
                id="typeofloan"
                type="text"
                class="w-full border border-gray-300 rounded-md p-2"
                value="Home loan"
            />
        </div>

        <!-- Loan Amount -->
        <div class="mb-4">
            <label class="block text-gray-700 font-medium" for="loanAmount">Loan Amount</label>
            <input
                id="loanAmount"
                type="number"
                class="w-full border border-gray-300 rounded-md p-2 mb-2"
                bind:value={loanAmount}
            />
            <input 
                type="range"
                class="w-full range accent-[#772035]"
                min="0"
                max="2500000"
                step="5000"
                bind:value={loanAmount}
            />
            <p class="text-sm text-gray-500 text-right">Max ₹25,00,000</p>
        </div>

        <!-- Tenure -->
        <div class="mb-4">
            <label class="block text-gray-700 font-medium" for="tenure">Tenure (in months)</label>
            <input
                id="tenure"
                type="text"
                class="w-full border border-gray-300 rounded-md p-2 mb-2"
                bind:value={tenure}
            />
            <input
                type="range"
                class="w-full range accent-[#772035]"
                min="1"
                max="60"
                step="1"
                bind:value={tenure}
            />
            <p class="text-sm text-gray-500 text-right">Max 60 months</p>
        </div>

        <!-- Monthly Reducing Rate -->
        <div class="mb-4">
            <label class="block text-gray-700 font-medium" for="rate">Monthly Reducing Rate (%)</label>
            <input
                id="rate"
                type="text"
                class="w-full border border-gray-300 rounded-md p-2 mb-2"
                bind:value={reducingRate}
            />
            <input
                type="range"
                class="w-full range accent-[#772035]"
                min="1"
                max="40"
                step="0.1"
                bind:value={reducingRate}
            />
            <p class="text-sm text-gray-500 text-right">Max 40%</p>
        </div>

        <!-- EMI Output -->
        <div class="text-center mt-6">
            <p class="text-gray-700 text-lg">Your loan EMI per month is</p>
            <p class="text-3xl font-bold text-red-800">₹ {emi.toLocaleString()}</p>
        </div>

        <!-- Check Eligibility Button -->
        <div class="flex justify-center items-center mt-4">
            <button
                class="bg-gray-300 text-black px-6 py-1 rounded-lg font-semibold text-sm"
                on:click={navigateToLoanApplication}
            >
                Check Eligibility
            </button>
        </div>
    </div>
</div>
