<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { BiSolidLeftArrow } from 'svelte-icons-pack/bi';
	import { Icon } from 'svelte-icons-pack';
	import { writable } from 'svelte/store';
	import jwt_decode from 'jwt-decode';

	function isTokenExpired(token: string): boolean {
		try {
			const decoded = jwt_decode<{ exp: number }>(token);
			const curRentTime = Math.floor(Date.now() / 1000); // CurRent time in seconds
			return decoded.exp < curRentTime;
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
	let accounts = [];
	let Account = '';
	let selectedAccount = null;
	let errorMessage = '';
	let showSuccessPopup = false;
	let transactionPassword = '';

	onMount(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			const decoded = jwt_decode(token);
			customerId = decoded.id; // Extract the Customer ID
		}
	});

	onMount(async () => {
		try {
			const response = await fetch(`/api/get-accounts?id=${customerId}`);
			if (response.ok) {
				accounts = await response.json();
				if (accounts.length > 0) {
					Account = accounts[0].AccountId;
					selectedAccount = accounts[0];
				}
			} else {
				console.error('Error fetching accounts:', await response.json());
			}
		} catch (error) {
			console.error('Fetch error:', error);
		}
	});

	let AccountId = '';
	let Type = '';
	let Size = '';
	let StartDate = '';
	let EndDate = '';
	let Deposit = '';
	let Rent = '';
	let termsAccepted = false;
	let balance = 0;
	let amount = 0;
	let validationError = '';

	$: selectedAccount = accounts.find((account) => account.AccountId === Account);
	$: balance = selectedAccount ? selectedAccount.balance : 0;
	function handleApplyNow() {
		showSuccessPopup = true;
	}

	function closePopup() {
		showSuccessPopup = false;
	}

	// Lookup table for Deposit and Rent values based on Typeand Size
	const lockerPricing = {
		Basic: {
			Small: { Deposit: 1000, Rent: 3000 },
			Medium: { Deposit: 1500, Rent: 4000 },
			Large: { Deposit: 2000, Rent: 5000 }
		},
		Premium: {
			Small: { Deposit: 2000, Rent: 5000 },
			Medium: { Deposit: 3000, Rent: 6500 },
			Large: { Deposit: 4000, Rent: 8000 }
		},
		VIP: {
			Small: { Deposit: 4000, Rent: 8000 },
			Medium: { Deposit: 6000, Rent: 12000 },
			Large: { Deposit: 8000, Rent: 16000 }
		}
	};

	// Update Deposit and Rent whenever Typeor Size changes
	$: if (Type && Size) {
		const pricing = lockerPricing[Type]?.[Size];
		if (pricing) {
			Deposit = pricing.Deposit;
			Rent = pricing.Rent;
		} else {
			Deposit = '';
			Rent = '';
		}
	}

	async function handleSubmit() {
		validationError = '';
		if (!termsAccepted) {
			alert('Please accept the terms and conditions.');
			return;
		}

		const lockerDetails = {
			AccountId,
			Type,
			Size,
			Rent,
			Deposit,
			StartDate,
			EndDate,
			transactionPassword
		};

		if (parseFloat(Rent + Deposit) > balance) {
			validationError = '*Insufficient Balance in the account*';
			return;
		}

		try {
			const response = await fetch('/api/createlocker', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(lockerDetails)
			});

			const result = await response.json();
			if (response.ok) {
				errorMessage = '';
				showSuccessPopup = true;
			} else {
				errorMessage = result.message || '*Invalid Transaction Password*';
			}
		} catch (error) {
			console.error('Error:', error);
			errorMessage = 'An error occurred while submitting your registration.';
		}
	}
</script>

<div class="w-full bg-[#772035] flex justify-between items-center text-white h-[10dvh]">
	<div>
		<button class="ml-2 text-2xl"
			><a href="/Lockers"><Icon src={BiSolidLeftArrow} className="h-6 w-6" /></a></button
		>
	</div>
	<div class=" text-2xl font-semibold">Locker Registration Form</div>
	<div class="mr-6"></div>
</div>
<div class="min-h-screen bg-gray-200 flex flex-col items-center py-1">
	<form class="w-[60dvh] bg-secondary p-10 rounded-lg shadow-lg space-y-4 mt-8">
		<div>
			<label for="accountNumber" class="block text-white text-lg font-medium mb-2"
				>Account Number:</label
			>
			<div>
				<select bind:value={AccountId} class="w-full border rounded-md p-2 text-black" required>
					<option value="" disabled selected>Select an account</option>
					{#each accounts as account}
						<option value={account.AccountId}>{account.AccountId}</option>
					{/each}
				</select>
			</div>
		</div>
		<div>
			<label for="Type" class="block text-white text-lg font-medium mb-2">Type:</label>
			<select
				id="Type"
				bind:value={Type}
				required
				class="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#772035] focus:outline-none"
			>
				<option value="" disabled selected>Select Type</option>
				<option value="Basic">Basic</option>
				<option value="Premium">Premium</option>
				<option value="VIP">VIP</option>
			</select>
		</div>
		<div>
			<label for="lockerSize" class="block text-white text-lg font-medium mb-2">Locker Size:</label>
			<select
				id="lockerSize"
				bind:value={Size}
				required
				class="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#772035] focus:outline-none"
			>
				<option value="" disabled selected>Select Size</option>
				<option value="Small">Small</option>
				<option value="Medium">Medium</option>
				<option value="Large">Large</option>
			</select>
		</div>
		<div>
			<label for="Deposit" class="block text-lg font-medium text-white">Deposit:</label>
			<input
				id="Deposit"
				type="text"
				value={Deposit}
				class="w-full p-3 border border-gray-300 rounded-lg bg-primary text-black"
				disabled
			/>
		</div>
		<div>
			<label for="Rent" class="block text-lg font-medium text-white">Rent:</label>
			<input
				id="Rent"
				type="text"
				value={Rent}
				class="w-full p-3 border border-gray-300 rounded-lg bg-primary text-black"
				disabled
			/>
			{#if validationError}
								<p class="text-red-500 mt-2">{validationError}</p>
			{/if}
		</div>
		<div class="flex flex-row justify-between">
			<div>
				<label for="StartDate" class="block text-lg font-medium text-white">Start Date</label>
				<input
					id="StartDate"
					type="date"
					bind:value={StartDate}
					required
					class="mt-1 block h-[6dvh] w-[20dvh] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
				<label for="EndDate" class="block text-lg font-medium text-white">End Date</label>
				<input
					id="EndDate"
					type="date"
					bind:value={EndDate}
					required
					class="mt-1 block h-[6dvh] w-[20dvh] rounded-sm border-gray-300"
				/>
			</div>
		</div>
		<div>
			<label for="transactionPassword" class="block text-lg font-medium text-white"
				>Transaction Password :</label
			>
		</div>
		<div>
			<input
				type="password"
				id="transactionPassword"
				bind:value={transactionPassword}
				required
				class="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#772035] focus:outline-none"
				placeholder="Enter your password"
			/>
			{#if errorMessage}
				<div class="mt-2 text-red-600 text-sm font-medium">{errorMessage}</div>
			{/if}
		</div>
		<div class="flex items-center">
			<input
				id="terms"
				type="checkbox"
				required
				bind:checked={termsAccepted}
				class="h-5 w-5 text-[#772035] focus:ring-[#772035]"
			/>
			<label for="terms" class="ml-2 text-white">I accept the terms and conditions</label>
		</div>
		<div class="flex flex-col justify-center ml-20 mr-20">
			<button
				type="submit"
				class="bg-primary text-black px-6 py-3 rounded-lg font-medium hover:bg-[#5a1323] transition"
				on:click={handleSubmit}
			>
				Submit
			</button>
		</div>
	</form>
</div>
{#if showSuccessPopup}
	<div class="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center">
		<div class="bg-[#772035] text-white p-12 rounded-md shadow-md max-w-md w-full relative">
			<button class="absolute top-2 right-2 text-white font-bold" on:click={closePopup}> X </button>
			<h2 class="text-lg font-bold mb-2">Locker Registration Successful!</h2>
			<p class="text-lg">Your locker has been successfully created for the respective account</p>
		</div>
	</div>
{/if}
