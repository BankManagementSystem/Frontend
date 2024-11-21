<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from "$lib/components/navbar.svelte";

	// Form data
	let transactionRefName = '';
	let transactionDate = '';
	let payFromAccount = '';
	let payeesAccountNo = '';
	let payeesIFSC = '';
	let amount = '';
	let transactionMode = '';

	// Array to store account numbers
	let accountNumbers = [];

	// Fetch account numbers (replace this with your actual database/API call)
	onMount(async () => {
		try {
			// Simulating an API call to fetch account numbers
			accountNumbers = await fetch('/api/get-account')
			.then(res => res.json())
			.then(data => data.accounts);
		} catch (error) {
			console.error('Error fetching account numbers:', error);
		}
	});

	async function handleSubmit(event) {
		// Prevent the default form submission behavior
		event.preventDefault();
		if (
		transactionRefName &&
		transactionDate &&
		payFromAccount &&
		payeesAccountNo &&
		payeesIFSC &&
		amount &&
		transactionMode
    ) {
		// Prepare the form details
		const details = {
		transactionRefName,
		transactionDate,
		payFromAccount,
		payeesAccountNo,
		payeesIFSC,
		amount,
		transactionMode,
		};

		// Store the details in localStorage or use the API to persist them
		localStorage.setItem('transferDetails', JSON.stringify(details));

		// Redirect to the confirm page
		goto('/transfer/confirm', { state: details });
		} else {
		alert('Please fill in all fields.');
		}
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
				<h2 class="font-semibold text-xl text-white mb-2">
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
								{#each accountNumbers as account}
								<option value={account}>{account}</option>
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
