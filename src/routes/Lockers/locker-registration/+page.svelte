<script lang="ts">
	import { onMount } from 'svelte';
	import { BiSolidLeftArrow } from 'svelte-icons-pack/bi';
	import { Icon } from 'svelte-icons-pack';
	import { writable } from 'svelte/store';

	let accountId = '';
	let type = '';
	let size = '';
	let startDate = '';
	let endDate = '';
	let deposit = '';
	let rent = '';
	let transactionPassword = '';
	let termsAccepted = false;
	let showPopup = writable(false);
	function handleApplyNow() {
		showPopup.set(true);
	}

	function closePopup() {
		showPopup.set(false);
	}
	let accountNumbers = [];

	// Lookup table for deposit and rent values based on type and size
	const lockerPricing = {
		Basic: {
			Small: { deposit: 1000, rent: 3000 },
			Medium: { deposit: 1500, rent: 4000 },
			Large: { deposit: 2000, rent: 5000 }
		},
		Premium: {
			Small: { deposit: 2000, rent: 5000 },
			Medium: { deposit: 3000, rent: 6500 },
			Large: { deposit: 4000, rent: 8000 }
		},
		VIP: {
			Small: { deposit: 4000, rent: 8000 },
			Medium: { deposit: 6000, rent: 12000 },
			Large: { deposit: 8000, rent: 16000 }
		}
	};

	// Update deposit and rent whenever type or size changes
	$: if (type && size) {
		const pricing = lockerPricing[type]?.[size];
		if (pricing) {
			deposit = pricing.deposit;
			rent = pricing.rent;
		} else {
			deposit = '';
			rent = '';
		}
	}

	onMount(async () => {
		try {
			accountNumbers = await fetch('/api/get-account')
				.then((res) => res.json())
				.then((data) => data.accounts);
		} catch (error) {
			console.error('Error fetching account numbers:', error);
		}
	});

	async function handleSubmit() {
		if (!termsAccepted) {
			alert('Please accept the terms and conditions.');
			return;
		}

		try {
			const response = await fetch('/api/createlocker', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					accountId,
					type,
					size,
					startDate,
					endDate,
					deposit,
					rent
				})
			});

			const result = await response.json();
			if (result.success) {
				showPopup.set(true);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while submitting your registration.');
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
	<form
		class="w-[60dvh] bg-secondary p-10 rounded-lg shadow-lg space-y-4 mt-8"
		on:submit|preventDefault={handleSubmit}
	>
		<div>
			<label for="accountNumber" class="block text-white text-lg font-medium mb-2"
				>Account Number:</label
			>
			<div>
				<select bind:value={accountId} class="w-full border rounded-md p-2 text-black" required>
					<option value="" disabled selected>Select an account</option>
					{#each accountNumbers as account}
						<option value={account}>{account}</option>
					{/each}
				</select>
			</div>
		</div>
		<div>
			<label for="Type" class="block text-white text-lg font-medium mb-2">Type:</label>
			<select
				id="Type"
				bind:value={type}
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
				bind:value={size}
				required
				class="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#772035] focus:outline-none"
			>
				<option value="" disabled selected>Select size</option>
				<option value="Small">Small</option>
				<option value="Medium">Medium</option>
				<option value="Large">Large</option>
			</select>
		</div>
		<div>
			<label for="deposit" class="block text-lg font-medium text-white">Deposit:</label>
			<input
				id="deposit"
				type="text"
				value={deposit}
				class="w-full p-3 border border-gray-300 rounded-lg bg-primary text-black"
				disabled
			/>
		</div>
		<div>
			<label for="rent" class="block text-lg font-medium text-white">Rent:</label>
			<input
				id="rent"
				type="text"
				value={rent}
				class="w-full p-3 border border-gray-300 rounded-lg bg-primary text-black"
				disabled
			/>
		</div>
		<div class="flex flex-row justify-between">
			<div>
				<label for="StartDate" class="block text-lg font-medium text-white">Start Date</label>
				<input
					id="StartDate"
					type="date"
					bind:value={startDate}
					required
					class="mt-1 block h-[6dvh] w-[20dvh] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
				<label for="EndDate" class="block text-lg font-medium text-white">End Date</label>
				<input
					id="EndDate"
					type="date"
					bind:value={endDate}
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
				class="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#772035] focus:outline-none"
				placeholder="Enter your password"
			/>
		</div>
		<div class="flex items-center">
			<input
				id="terms"
				type="checkbox"
				bind:checked={termsAccepted}
				class="h-5 w-5 text-[#772035] focus:ring-[#772035]"
			/>
			<label for="terms" class="ml-2 text-white">I accept the terms and conditions</label>
		</div>
		<div class="flex flex-col justify-center ml-20 mr-20">
			<button
				type="submit"
				class="bg-primary text-black px-6 py-3 rounded-lg font-medium hover:bg-[#5a1323] transition"
				on:click={handleApplyNow}
			>
				Submit
			</button>
		</div>
		{#if $showPopup}
			<div class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
				<div class="bg-[#772035] text-white p-8 rounded-md shadow-md max-w-md w-full relative">
					<button class="absolute top-2 right-2 text-white font-bold" on:click={closePopup}>
						X
					</button>
					<p class="text-lg">
						Your locker has been successfully created for the respective account.
						<a href="/Lockers" class="text-normal font-bold text-gray-300"><u>Continue</u></a>
					</p>
				</div>
			</div>
		{/if}
	</form>
</div>
