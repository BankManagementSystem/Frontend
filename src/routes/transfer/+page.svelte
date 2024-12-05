<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar.svelte';
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

	let Account = '';
	let accounts = [];
	let selectedAccount = null;
	let customerId = '';
	let balance = 0;

	let validationError = '';

	$: selectedAccount = accounts.find((account) => account.AccountId === Account);
	$: balance = selectedAccount ? selectedAccount.balance : 0;

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

	// Form data
	let transactionRefName = '';
	let transactionDate = '';
	let payFromAccount = '';
	let payeesAccountNo = '';
	let payeesIFSC = '';
	let amount = '';
	let transactionMode = '';
	let type = 'Transfer';

	async function handleSubmit(event) {
		event.preventDefault();
		validationError = '';

		if (
			!transactionRefName ||
			!transactionDate ||
			!payFromAccount ||
			!payeesAccountNo ||
			!payeesIFSC ||
			!amount ||
			!transactionMode
		) {
			validationError = 'Please fill in all fields.';
			return;
		}

		if (parseFloat(amount) > balance) {
			validationError = '*Insufficient Balance*';
			return;
		}

		// Prepare the form details
		const details = {
			transactionRefName,
			transactionDate,
			payFromAccount,
			payeesAccountNo,
			payeesIFSC,
			amount,
			transactionMode,
			type
		};

		// Store the details in localStorage or use the API to persist them
		localStorage.setItem('transferDetails', JSON.stringify(details));

		// Redirect to the confirm page
		goto('/transfer/confirm', { state: details });
	}

	function handleReset() {
		// Reset all form fields
		transactionRefName = '';
		transactionDate = '';
		payFromAccount = '';
		payeesAccountNo = '';
		payeesIFSC = '';
		amount = '';
		transactionMode = '';
		validationError = '';
	}
</script>

<Navbar />
<div class="w-full bg-white mx-auto p-4 rounded-md">
	<h1 class="ml-14 mt-4 text-4xl font-bold text-[#772035]">Fund transfer :</h1>
</div>
<div class="border border-gray-300 max-w-4xl mx-auto p-4 rounded-md">
	<h2 class="text-xl font-bond text-black">Payment details:</h2>
</div>

<div class="min-h-screen p-8">
	<div class="max-w-4xl mx-auto bg-[#772035] p-8 rounded-md shadow-md border border-gray-400">
		<!-- Form starts here -->
		<form on:submit={handleSubmit}>
			<!-- Set Payment Date and Frequency -->
			<div class="mb-6 border-b border-black pb-4 gap-2">
				<h2 class="font-semibold text-xl text-white mb-7">
					Set Payment Date and Reference number:
				</h2>
				<div class="flex flex-col justify-between w-[84dvh] ml-24 gap-2">
					<div class="flex flex-row justify-between">
						<div class="flex justify-end text-white w-[40dvh] font-medium mb-1">
							Transaction Ref Name*
						</div>
						<div>
							<input
								bind:value={transactionRefName}
								type="text"
								class="w-[30dvh] border rounded-md p-2 ml-10 text-black"
								required
							/>
						</div>
					</div>
					<div class="flex flex-row justify-between">
						<div class="flex justify-end text-white w-[40dvh] font-medium mb-1">
							Transaction Date *
						</div>
						<div>
							<input
								bind:value={transactionDate}
								type="date"
								class="w-[30dvh] border rounded-md p-2 ml-4 text-black"
								required
							/>
						</div>
					</div>
				</div>
			</div>
			<!-- Make a Payment from -->
			<div class="mb-6 border-b border-black pb-4">
				<h2 class="font-semibold text-white text-xl mb-2">Make a Payment from:</h2>
				<div class="flex flex-col justify-between w-[84dvh] ml-24 gap-2">
					<div class="flex flex-row justify-between">
						<div class="flex text-white w-[40dvh] justify-end font-medium mb-1">
							Pay From Account*
						</div>
						<div>
							<select
								bind:value={payFromAccount}
								class="w-[30dvh] border rounded-md p-2 text-black"
								required
							>
								<option value="" disabled selected>Select an account</option>
								{#each accounts as account}
									<option value={account.AccountId}>{account.AccountId}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
			</div>
			<!-- Make a Payment to -->
			<div class="flex flex-col mb-6 border-b border-black pb-4">
				<h2 class="font-semibold text-xl text-white mb-2">Make a Payment to:</h2>
				<div class="flex flex-col justify-between w-[84dvh] ml-24 gap-2">
					<div class="flex flex-row justify-between">
						<div class="flex justify-end text-white w-[40dvh] font-medium mb-1">
							Payee's Account No.*
						</div>
						<div>
							<input
								bind:value={payeesAccountNo}
								type="text"
								class="w-[30dvh] border rounded-md p-2 text-black"
								required
							/>
						</div>
					</div>
					<div class="flex flex-row justify-between">
						<div class="flex justify-end text-white w-[40dvh] font-medium mb-1">
							Payee's IFSC Code*
						</div>
						<div>
							<input
								bind:value={payeesIFSC}
								type="text"
								class="w-[30dvh] border rounded-md p-2 text-black"
								required
							/>
						</div>
					</div>
					<div class="col-span-2 flex flex-row justify-between">
						<div class="flex text-white w-[40dvh] justify-end font-medium mb-1">Amount* (INR)</div>
						<div>
							<input
								bind:value={amount}
								type="number"
								class="w-[30dvh] border rounded-md p-2 text-black"
								required
							/>
							{#if validationError}
								<p class="text-red-500 mt-2">{validationError}</p>
							{/if}
						</div>
					</div>
				</div>
			</div>
			<!-- Network and Other Details -->
			<div class="mb-6">
				<h2 class="font-semibold text-xl text-white mb-2">Network and Other Details:</h2>
				<div class="flex flex-col justify-between w-[84dvh] ml-24 gap-2">
					<div class="flex flex-row justify-between">
						<div class="flex text-white w-[40dvh] justify-end font-medium mb-1">
							Transaction Mode*
						</div>
						<div>
							<select
								bind:value={transactionMode}
								id="transactionMode"
								class="w-[30dvh] border rounded-md p-2 text-black"
								required
							>
								<option value="" disabled selected>Select your Mode</option>
								<option value="NEFT">NEFT</option>
								<option value="IMPS">IMPS</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-end space-x-4">
				<button
					type="submit"
					class="bg-[#FFFFFF] text-BLACK shadow-lg px-6 py-2 rounded-md hover:bg-[#C73659] hover:text-primary"
					on:click={handleSubmit}
				>
					Continue
				</button>
				<button
					type="reset"
					class="bg-[#FFFFFF] text-BLACK shadow-lg px-6 py-2 rounded-md hover:bg-[#C73659] hover:text-primary"
					on:click={handleReset}
				>
					Reset
				</button>
			</div>
		</form>
	</div>
</div>
