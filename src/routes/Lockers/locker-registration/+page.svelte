<script lang="ts">
    import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar.svelte';
	let accountNumber = '';
	let address = '';
    let Type='';
	let lockerSize = '';
    let StartDate='';
    let EndDate='';
	let termsAccepted = false;

    let accountNumbers = [];

    onMount(async () => {
		try {
			accountNumbers = await fetch('/api/get-account')
			.then(res => res.json())
			.then(data => data.accounts);
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
			const response = await fetch('/api/locker-registration', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					accountNumber,
					address,
					lockerSize,
                    StartDate,
                    EndDate
				})
			});

			if (response.ok) {
				alert('Registration successful!');
			} else {
				alert('Registration failed. Please try again.');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while submitting your registration.');
		}
	}
</script>

<Navbar />
<div class=" bg-gray-200 flex flex-col items-center py-6">
	<h1 class="text-4xl font-bold text-[#772035] mb-8">Locker Registration Form</h1>
</div>
<div class="min-h-screen bg-gray-200 flex flex-col items-center py-1">
	<form
		class="w-[60dvh] bg-secondary p-12 rounded-lg shadow-lg space-y-4"
		on:submit|preventDefault={handleSubmit}>
		<div>
			<label for="accountNumber" class="block text-white text-lg font-medium mb-2">Account Number:</label
			>
			<div>
                <select
                    bind:value={accountNumber}
                    class="w-full border rounded-md p-2 text-black"
                    required
                >
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
				bind:value={Type}
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
				bind:value={lockerSize}
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
            <label for="StartDate" class="block text-lg font-medium text-white">Start Date</label>
            <input
                id="StartDate"
                type="date"
                bind:value={StartDate}
                required
                class="mt-1 block h-[6dvh] w-[22dvh] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
        </div>
        <div>
            <label for="EndDate" class="block text-lg font-medium text-white">End Date</label>
            <input
                id="EndDate"
                type="date"
                bind:value={EndDate}
                required
                class="mt-1 block h-[6dvh] w-[22dvh] rounded-sm border-gray-300 "
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
		>
			Submit
		</button>
        </div>
	</form>
</div>
