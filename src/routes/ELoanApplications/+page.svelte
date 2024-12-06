<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar2.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import jwt_decode from 'jwt-decode';
	import { goto } from '$app/navigation';

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

	async function handleReject(loan) {
		try {
			const response = await fetch('/api/Rejectloans', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ LoanApplicationId: loan.Id })
			});

			if (!response.ok) {
				throw new Error('Failed to reject loan');
			}

			// Remove the rejected loan from the list
			loanApplications = loanApplications.filter((item) => item.Id !== loan.Id);

			alert('Loan application rejected successfully!');
		} catch (error) {
			console.error('Error rejecting loan application:', error);
			alert('Failed to reject loan application. Please try again.');
		}
	}
	async function handleApprove(loan) {
		try {
			const response = await fetch('/api/Approveloans', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					LoanApplicationId: loan.Id,
					LoanTypeId: loan.LoanTypeId, // Ensure this is fetched with the application
					Tenure: loan.Tenure,
					ROI: loan.ROI,
					IssuedAmount: loan.IssuedAmount,
					RemainingAmount: loan.IssuedAmount // Assuming full amount initially
				})
			});

			if (!response.ok) {
				throw new Error('Failed to approve loan');
			}

			alert('Loan approved successfully!');
			// Optionally refresh the list of loan applications
			loanApplications = loanApplications.filter((item) => item.Id !== loan.Id);
		} catch (error) {
			console.error('Error approving loan:', error);
			alert('Failed to approve loan. Please try again.');
		}
	}
	let employeeId = '';

	let loanApplications: any[] = [];
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
<div class="mt-6 ml-10 h-[10dvh]">
	<h1 class="text-2xl font-bold mb-6 text-secondary">Loans Applications</h1>
</div>
{#if error}
	<p class="text-red-500 text-center">{error}</p>
{:else if loanApplications.length === 0}
	<p class="text-center">No loan applications available.</p>
{:else}
	<div
		class="sm:grid sm:grid-cols-3 sm:gap-16 lg:grid-cols-3 sm:w-full sm:px-16 flex justify-center items-center"
	>
		{#each loanApplications as loan}
			<Card.Root class="w-[350px] bg-secondary text-primary shadow-md shadow-secondary">
				<Card.Header>
					<Card.Title class="text-2xl ">Loan Application Id: {loan.Id}</Card.Title>
					<hr />
				</Card.Header>
				<Card.Content>
					<div class="text-xl">
						<div class="flex flex-row w-full items-center gap-2">
							<div class="font-semibold">Name:</div>
							<div>{loan.FirstName} {loan.MiddleName} {loan.LastName}</div>
						</div>
						<div class="flex flex-row w-full items-center gap-2">
							<div class="font-semibold">Type:</div>
							<div>{loan.Type}</div>
						</div>
						<div class="flex flex-row w-full items-center gap-2">
							<div class="font-semibold">Loan Amount:</div>
							<div>₹{loan.IssuedAmount}</div>
						</div>
						<div class="flex flex-row w-full items-center gap-2">
							<div class="font-semibold">Tenure:</div>
							<div>{loan.Tenure}</div>
						</div>
						<div class="flex flex-row w-full items-center gap-2">
							<div class="font-semibold">ROI:</div>
							<div>{loan.ROI}%</div>
						</div>
					</div>
					<div class="flex flex-row mt-4 justify-center gap-10">
						<button
							class="bg-primary w-[20dvh] text-secondary px-4 py-2 rounded-lg hover:bg-[#C73659] hover:text-white"
							on:click={() => handleApprove(loan)}
						>
							Approve
						</button>
						<button
							class="bg-primary w-[20dvh] text-secondary px-4 py-2 rounded-lg hover:bg-[#C73659] hover:text-white"
							on:click={() => handleReject(loan)}
						>
							Reject
						</button>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
{/if}
