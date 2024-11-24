<script lang="ts">
	import Navbar from '$lib/components/navbar2.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
    import {goto} from '$app/navigation';

    const numbs = [1,2,3,4,5,6,7];  

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
{#each numbs as num}
<Card.Root class="w-[350px] bg-secondary text-primary shadow-md shadow-secondary">
	<Card.Header>
		<Card.Title class="text-2xl">Branch: Mangalore, Kadri</Card.Title>
        <hr>
	</Card.Header>
	<Card.Content>
            <div class="text-xl">
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">IFSC Code:</div>
                    <div>ABCD0000001</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Manager:</div>
                    <div>Manohar Singh</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Number of Employees:</div>
                    <div>20</div>
                </div>
                <div class="flex flex-row w-full items-center gap-2 ">
                    <div class="font-semibold">Contact:</div>
                    <div>1800 7800</div>
                </div>
            </div>
	</Card.Content>
</Card.Root>
{/each}
</div>