<script lang="ts">
	import Navbar from '$lib/components/navbar2.svelte';
	import { onMount } from 'svelte';
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

    let employeeId = '';

    let branches = [];
	let error = null;

	onMount(async () => {
		try {
			const res = await fetch('/api/EBranch');
			if (!res.ok) throw new Error('Failed to fetch loan applications');
			branches = await res.json();
		} catch (err) {
			error = err.message;
			console.error('Error:', error);
		}
	});

    async function handleNext(event){
        goto('/NewBranch');
    }
</script>

<Navbar />
<slot />
{#if error}
			<p class="text-red-500 text-center">{error}</p>
	{:else if branches.length === 0}
			<p class="text-center">No loan applications available.</p>
	{:else}
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
		<Card.Title class="text-2xl ">Branch Name: {branch.Name}</Card.Title>
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
                    <div>{branch.Phone}</div>
                </div>
            </div>
	</Card.Content>
</Card.Root>
{/each}
</div>
{/if}