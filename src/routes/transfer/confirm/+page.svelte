<script>
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar.svelte';
	let transactionDetails = {};

	// Load details from localStorage or a state management store
	onMount(() => {
		const details = localStorage.getItem('transferDetails');
		if (details) {
			transactionDetails = JSON.parse(details);
		}
	});

	async function confirmPayment() {
		// Logic to handle payment confirmation
		// You might send these details to your backend server
		try {
			const response = await fetch('/api/confirm', {
				method: 'POST',
				body: JSON.stringify(transactionDetails),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			if (response.ok) {
				alert('Payment confirmed successfully!');
			} else {
				alert('Error confirming payment: ' + data.message);
			}
		} catch (error) {
			alert('An error occurred: ' + error.message);
		}
	}
</script>

<Navbar />
<div class="w-full bg-white mx-auto p-4 rounded-md">
	<h1 class="ml-14 mt-4 text-4xl font-bold text-[#772035]">Fund transfer :</h1>
</div>
<div class="border border-gray-300 max-w-4xl mx-auto p-4 rounded-md">
	<h2 class="text-xl font-bond text-black">Preview and Confirm:</h2>
</div>
<div class=" ml-64 mr-64 mt-8 p-8 bg-gray-200">
	<div class="mb-6 border-b border-black pb-4 gap-2">
		<div class="mb-6 border-b border-black pb-4 gap-2">
			<h2 class="text-center font-semibold text-2xl text-[#772035] mb-2">
				General Transaction Details:
			</h2>
		</div>
		<div class="flex flex-col ml-10 space-y-6 text-xl">
			<div class="flex flex-col justify-center space-y-6 text-xl">
				<div class="flex flex-row justify-center bg-yellow-200">
					<div class="flex w-[40dvh] font-bold">Transaction Ref Name :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.transactionRefName}</div>
				</div>
				<div class="flex flex-row justify-center bg-green-200">
					<div class="flex w-[40dvh] font-bold text-xl">Pay From Account :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.payFromAccount}</div>
				</div>
				<div class="flex flex-row justify-center bg-blue-200">
					<div class="flex w-[40dvh] font-bold">Payees Account No :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.payeesAccountNo}</div>
				</div>
				<div class="flex flex-row justify-center bg-red-200">
					<div class="flex w-[40dvh] font-bold">Payees IFSC Code :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.payeesIFSC}</div>
				</div>
				<div class="flex flex-row justify-center bg-yellow-200">
					<div class="flex w-[40dvh] font-bold">Transaction Date :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.transactionDate}</div>
				</div>
				<div class="flex flex-row justify-center bg-yellow-200">
					<div class="flex w-[40dvh] font-bold">Transaction Mode :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.transactionMode}</div>
				</div>
				<div class="flex flex-row justify-center bg-yellow-200">
					<div class="flex w-[40dvh] font-bold">Amount :</div>
					<div class="flex w-[40dvh] font-bold">{transactionDetails.amount}</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Confirmation button -->
	<button on:click={confirmPayment} class="btn-primary mt-4">Confirm Payment</button>
</div>

<style>
	.btn-primary {
		padding: 10px 20px;
		background-color: #772035;
		color: white;
		border: none;
		border-radius: 4px;
	}
</style>
