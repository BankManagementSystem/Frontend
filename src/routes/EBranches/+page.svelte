<script lang="ts">
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
</script>

<Navbar />
<slot />
<div class="h-[15dvh] flex justify-end items-center mr-14"> 
    <div>
        <button on:click={handleNext} class="h-10 w-28 rounded-lg bg-secondary font-bold text-primary hover:bg-[#C73659] ">
            New Branch
        </button>
    </div> 
</div>
<div class="sm:grid sm:grid-cols-3 sm:gap-16 lg:grid-cols-3 sm:w-full sm:px-16 flex justify-center items-center">
{#each branches as branch}
<Card.Root class="w-[350px] bg-secondary text-primary shadow-md shadow-secondary">
	<Card.Header>
		<Card.Title class="text-2xl ">Branch Name: {branch.branch}</Card.Title>
        <hr>
	</Card.Header>
	<Card.Content>
            <div class="text-xl">
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">IFSC Code:</div>
                    <div>{branch.IFSC}</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Manager:</div>
                    <div>{branch.Manager}</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Number of Employees:</div>
                    <div>{branch.NOE}</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Contact:</div>
                    <div>{branch.Contact}</div>
                </div>
            </div>
	</Card.Content>
</Card.Root>
{/each}
</div>