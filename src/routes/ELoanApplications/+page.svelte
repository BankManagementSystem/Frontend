<script>
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar2.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let loanApplications = [];
	let error = null;

	onMount(async () => {
		try {
			const res = await fetch('/api/Eloans');
			if (!res.ok) throw new Error('Failed to fetch loan applications');
			loanApplications = await res.json();
		} catch (err) {
			error = err.message;
			console.error('Error:', error);
		}
	});
</script>

<Navbar />
<slot />

<div class="min-h-screen bg-gray-100">
	<div class="container mx-auto py-8 ">
		<h1 class="text-2xl font-bold mb-6 text-secondary">Loans Applications</h1>

		{#if error}
			<p class="text-red-500 text-center">{error}</p>
		{:else if loanApplications.length === 0}
			<p class="text-center">No loan applications available.</p>
		{:else}
			<div class="space-y-6">
				{#each loanApplications as loan}
				<div class="flex flex-col shadow-md text-xl gap-6 bg-white justify-center rounded-lg p-6 border border-gray-300">
					<!-- Outer wrapper for centering -->
					<div class="flex flex-col items-center">
						<!-- First Yellow Div -->
						<div class="flex flex-row w-[110dvh] gap-8 justify-between items-center px-4 py-2 rounded-md">
							<div>
								<p class="font-bold text-secondary">
									Loan Application Id: <span class="font-normal">{loan.Id}</span>
								</p>
							</div>
							<div>
								<p class="font-bold text-secondary">
									Name: <span class="font-normal">{loan.Firstname} {loan.Middlename} {loan.Lastname}</span>
								</p>
							</div>
							<div>
								<p class="font-bold text-secondary">
									Type: <span class="font-normal">Personal</span>
								</p>
							</div>
						</div>
				
						<!-- Second Yellow Div -->
						<div class="flex flex-row w-[110dvh] gap-8 justify-between items-center px-4 py-2 rounded-md mt-4">
							<div>
								<p class="font-bold text-secondary">
									Loan Amount: <span class="font-normal">₹25,00,000</span>
								</p>
							</div>
							<div>
								<p class="font-bold text-secondary">
									Tenure: <span class="font-normal">40</span>
								</p>
							</div>
							<div>
								<p class="font-bold text-secondary">
									Rate of Interest: <span class="font-normal">17%</span>
								</p>
							</div>
						</div>
					</div>
							<div class="flex flex-row justify-center space-x-4">
								<button class="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-maroon-900">
									Approve
								</button>
								<button class="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-maroon-900">
									Reject
								</button>
							</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.text-maroon-800) {
		color: #772035;
	}
	:global(.bg-maroon-800) {
		background-color: #772035;
	}
	:global(.hover\:bg-maroon-900:hover) {
		background-color: #5a1729;
	}
</style>
