<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar2.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
    import {goto} from '$app/navigation';

    const numbs = [1,2,3,4,5,6,7];  

    const branches = [
        {
            branch : "Kadri, Mangalore",
            IFSC: "ABCD0000001",
            Manager : "Manohar Singh",
            NOE : 30,
            Contact : "1800 7800",
        },
        {
            branch : "Udupi Main, Udupi",
            IFSC: "ABCD0000002",
            Manager : "Anshu Patel",
            NOE : 25,
            Contact : "1800 7900",
        },
    ]

    async function handleNext(event){
        goto('/NewBranch');
    }

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
<div class="mt-6 ml-10 h-[10dvh]">
    <h1 class="text-2xl font-bold mb-6 text-secondary">Loans Applications</h1>
</div>
<div class="sm:grid sm:grid-cols-3 sm:gap-16 lg:grid-cols-3 sm:w-full sm:px-16 flex justify-center items-center">
{#each loanApplications as loan}
<Card.Root class="w-[350px] bg-secondary text-primary shadow-md shadow-secondary">
	<Card.Header>
		<Card.Title class="text-2xl ">Loan Application Id: {loan.Id}</Card.Title>
        <hr>
	</Card.Header>
	<Card.Content>
            <div class="text-xl">
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Name:</div>
                    <div>{loan.Firstname} {loan.Middlename} {loan.Lastname}</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Type:</div>
                    <div>{loan.Type}</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Loan Amount:</div>
                    <div>₹{loan.LoanAmount}</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Tenure:</div>
                    <div>{loan.Tenure}</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">ROI:</div>
                    <div>{loan.ROI}%</div>
                </div>
            </div>
            <div class="flex flex-row mt-4 justify-center gap-10">
                <button
                    class="bg-primary w-[20dvh] text-secondary px-4 py-2 rounded-lg hover:bg-[#C73659] hover:text-white"
                >
                    Approve
                </button>
                <button
                    class="bg-primary w-[20dvh] text-secondary px-4 py-2 rounded-lg hover:bg-[#C73659] hover:text-white"
                >
                    Reject
                </button>
            </div>
	</Card.Content>
</Card.Root>
{/each}
</div>