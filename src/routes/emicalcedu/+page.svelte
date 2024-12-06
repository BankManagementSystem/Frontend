<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';
	import { Icon } from 'svelte-icons-pack';
	import { BiSolidLeftArrow } from 'svelte-icons-pack/bi';
	import jwt_decode from 'jwt-decode';

	// Input values
	let LoanTypeId = 0;
	let LoanType = 'Educational';
	let loanAmount = 100000;
	let tenure = 12;
	let ROI = 8;
	let emi = 0;

	function checkEligibility() {
		const details = {
			LoanTypeId, LoanType, loanAmount, tenure, ROI
		};

		// Store the details in localStorage or use the API to persist them
		localStorage.setItem('emidetails', JSON.stringify(details));

		// Redirect to the confirm page
		goto('/Loan-application', { state: details });
	}

	// Reactive block to calculate EMI whenever values change
	$: {
		let principal = loanAmount;
		let monthlyRate = ROI / 12 / 100; // Convert annual rate to monthly
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
	async function handleBack(event) {
		event.preventDefault(); // Prevent default behavior for the back action

		const token = localStorage.getItem('authToken'); // Retrieve the token

		if (token) {
			try {
				const decoded = jwt_decode<{ exp: number }>(token);
				const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

				if (decoded.exp < currentTime) {
					// Token has expired
					alert('Session expired. Please log in again.');
					localStorage.removeItem('authToken'); // Clear the expired token
					goto('/Home'); // Redirect to login or home page
				} else {
					// Token is valid
					goto('/Home'); // Redirect to accounts page
				}
			} catch (error) {
				console.error('Error decoding token:', error);
				alert('Invalid session. Please log in again.');
				localStorage.removeItem('authToken'); // Clear invalid token
				goto('/'); // Redirect to login or home page
			}
		} else {
			// No token found
			goto('/'); // Redirect to login or home page
		}
	}
</script>

<div
	class="flex items-center justify-between bg-gray-200 text-[#772035] h-[10dvh] font-bold text-3xl w-full"
>
	<div class="ml-4 cursor-pointer">
		<button><a href="/Loans"> <Icon src={BiSolidLeftArrow} /></a> </button>
	</div>
	<div>EMI Calculator</div>
	<div class="mr-4"></div>
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
                value="Education loan"
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
                min="100000"
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
                min="12"
                max="144"
                step="1"
                bind:value={tenure}
            />
            <p class="text-sm text-gray-500 text-right">Max 144 months</p>
        </div>

        <!-- Monthly Reducing Rate -->
        <div class="mb-4">
            <label class="block text-gray-700 font-medium" for="rate">Monthly Reducing Rate (%)</label>
            <input
                id="rate"
                type="text"
                class="w-full border border-gray-300 rounded-md p-2 mb-2"
                bind:value={ROI}
            />
            <input
                type="range"
                class="w-full range accent-[#772035]"
                min="8"
                max="15"
                step="0.1"
                bind:value={ROI}
            />
            <p class="text-sm text-gray-500 text-right">Max 15%</p>
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
                on:click={checkEligibility}
            >
                Check Eligibility
            </button>
        </div>
    </div>
</div>
