<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';
	import jwt_decode from 'jwt-decode';

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
	let errorMessage = '';
	let showSuccessPopup = false;
	let customerId = '';
	let transactionDetails = {};
	let transactionPassword = '';
	// Load details from localStorage or a state management store
	onMount(() => {
		const details = localStorage.getItem('transferDetails');
		if (details) {
			transactionDetails = JSON.parse(details);
		}
	});

	function handleback() {
		history.length > 1 ? history.back() : goto('/transfer');
	}
	

	async function confirmPayment() {
    // Attach the transaction password to transaction details
    transactionDetails.transactionPassword = transactionPassword;
    try {
        const response = await fetch('/api/confirm', {
            method: 'POST',
            body: JSON.stringify(transactionDetails),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            errorMessage = ''; // Clear error message
            showSuccessPopup = true; // Update popup state
        } else {
            errorMessage = data.message || '*Invalid Transaction Password*';
        }
    } catch (error) {
        errorMessage = 'An error occurred: ' + error.message;
    }
}

// Close the success popup
function closePopup() {
    showSuccessPopup = false;
}

</script>

<Navbar />
<div class="w-full bg-white mx-auto p-4 rounded-md">
	<h1 class="ml-14 mt-4 text-4xl font-bold text-[#772035]">Fund transfer :</h1>
</div>
<div class="border border-gray-300 max-w-4xl mx-auto p-4 rounded-md">
	<h2 class="text-xl font-bond text-black">Preview and Confirm:</h2>
</div>
<div class=" ml-64 mr-64 mb-8 mt-8 bg-gray-200">
	<div class="mb-6 pb-2 gap-2">
		<div class="mb-6 border-b bg-secondary items-center w-full flex flex-row border-black h-[10dvh]">
			<h2 class="font-semibold text-2xl  ml-10 text-white">General Transaction Details:</h2>
		</div>
		<div class="flex flex-col ml-10 space-y-6 text-xl">
			<div class="flex flex-col justify-center space-y-6 text-xl">
				<div class="flex flex-row gap-6 justify-center">
					<div class="flex w-[40dvh] justify-end font-bold">Transaction Ref Name :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.transactionRefName}</div>
				</div>
				<div class="flex flex-row gap-6 justify-center">
					<div class="flex w-[40dvh] justify-end font-bold">Transaction Type :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.type}</div>
				</div>
				<div class="flex flex-row gap-6 justify-center">
					<div class="flex w-[40dvh] justify-end font-bold text-xl">Pay From Account :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.payFromAccount}</div>
				</div>
				<div class="flex flex-row gap-6 justify-center">
					<div class="flex w-[40dvh] justify-end font-bold">Payees Account No :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.payeesAccountNo}</div>
				</div>
				<div class="flex flex-row gap-6 justify-center">
					<div class="flex w-[40dvh] justify-end font-bold">Payees IFSC Code :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.payeesIFSC}</div>
				</div>
				<div class="flex flex-row gap-6 justify-center">
					<div class="flex w-[40dvh] justify-end font-bold">Transaction Date :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.transactionDate}</div>
				</div>
				<div class="flex flex-row gap-6 justify-center">
					<div class="flex w-[40dvh] justify-end font-bold">Transaction Mode :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.transactionMode}</div>
				</div>
				<div class="flex flex-row gap-6 justify-center">
					<div class="flex w-[40dvh] justify-end font-bold">Amount :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.amount}</div>
				</div>
			</div>
			<div class="flex justify-end">
				<button
					class=" text-white px-6 py-2 mr-10 rounded-sm bg-secondary font-semibold text-sm hover-bg-[#C73659]"
					on:click={handleback}
				>
					BACK TO EDIT
				</button>
			</div>
		</div>
	</div>
	<div class="mb-6 border-b bg-secondary items-center w-full flex flex-row h-[10dvh] border-black pb-2">
		<h2 class="font-semibold text-2xl ml-10 text-white">Confirmation detail:</h2>
	</div>
	<div class="flex flex-row gap-6 items-center justify-center">
		<div>
			<label for="transactionPassword" class="block text-xl font-medium text-black"
				>Transaction Password :</label
			>
		</div>
		<div>
			<input
				type="password"
				id="transactionPassword"
				bind:value={transactionPassword}
				class="w-[24dvh] px-3 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300"
				placeholder="Enter your password"
			/>
			{#if errorMessage}
				<div class="mt-2 text-red-600 text-sm font-medium">{errorMessage}</div>
			{/if}
		</div>
	</div>
	<div class="flex mr-9 justify-end mb-2">
		<button on:click={confirmPayment} class="btn-primary mt-4">Confirm Payment</button>
	</div>
	<div class="h-[2dvh]"></div>
</div>

<style>
	.btn-primary {
		padding: 10px;
		background-color: #772035;
		color: white;
		border: none;
		border-radius: 4px;
	}

	input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

/* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
</style>
{#if showSuccessPopup}
<div class="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center">
	<div class="bg-[#772035] text-white p-12 rounded-md shadow-md max-w-md w-full relative">
		<button class="absolute top-2 right-2 text-white font-bold" on:click={closePopup}>
			X
		</button>
        <h2 class="text-lg font-bold mb-2">Payment Successful!</h2>
        <p class="text-lg">Your transaction has been completed.</p>
    </div>
</div>
{/if}
