<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import jwt_decode from 'jwt-decode';
	function goToRegistrationPage() {
		goto('/Lockers/locker-registration');
	}
	async function fetchAccounts() {
		try {
			const response = await fetch(`/api/get-account?customerId=${customerId}`);
			const data = await response.json();

			if (data.accounts) {
				accounts = data.accounts; // Assign the fetched account numbers
			} else {
				console.error('Error fetching accounts:', data.error);
			}
		} catch (error) {
			console.error('Error fetching accounts:', error);
		}
	}

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

	let customerId = ''; // Define customerId

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
				fetchAccounts(); // Fetch accounts after setting customerId
			}
		} else {
			alert('No token found. Please log in.');
			goto('/login'); // Redirect to login
		}
	});

	let lockers = [];
	let accounts = [];
	let selectedAccount = '';

	// Fetch lockers and accounts from the backend
	async function fetchLockers() {
		if (!selectedAccount) {
			console.warn('Please select an account');
			return;
		}
		try {
			const response = await fetch(`/api/get-lockers?accountId=${selectedAccount}`);
			const data = await response.json();
			if (data.error) {
				console.error(data.error);
			} else {
				lockers = data; // Locker details
			}
		} catch (error) {
			console.error('Error fetching lockers:', error);
		}
	}
	$: if (selectedAccount) {
		fetchLockers();
	}
</script>

<Navbar />
<div>
	<div class="flex flex-col items-center mt-14">
		<div>
			<label for="account" class="block text-2xl mb-2 font-bold">Available lockers</label>
		</div>
		<div>
			<select
				id="account"
				class="w-[30dvh] px-4 py-2 rounded-md bg-secondary text-primary hover:bg-secondary focus:ring-2 focus:ring-[#A12A48]"
				bind:value={selectedAccount}
			>
				<option value="" disabled selected class="text-white bg-secondary">Select an account</option
				>
				{#each accounts as account}
					<option value={account}>{account}</option>
				{/each}
			</select>
		</div>
	</div>
	<div>
		<h3 class="text-2xl font-bold mb-4 ml-20">Lockers List</h3>
		<div class=" flex flex-col ml-40 ">
			<table class="w-10/12 border-collapse border">
				<thead>
					<tr class="bg-secondary text-white">
						<th class="border px-4 py-2">Locker number</th>
						<th class="border px-4 py-2">Type</th>
						<th class="border px-4 py-2">Size</th>
						<th class="border px-4 py-2">Deposit</th>
						<th class="border px-4 py-2">Rent</th>
						<th class="border px-4 py-2">Start Date</th>
						<th class="border px-4 py-2">End Date</th>
					</tr>
				</thead>
				<tbody>
					{#each lockers as locker}
						<tr>
							<td class="border px-4 py-2">{locker.LockerNumber}</td>
							<td class="border px-4 py-2">{locker.type}</td>
							<td class="border px-4 py-2">{locker.size}</td>
							<td class="border px-4 py-2">{locker.deposit}</td>
							<td class="border px-4 py-2">{locker.rent}</td>
							<td class="border px-4 py-2">{locker.startDate}</td>
							<td class="border px-4 py-2">{locker.endDate}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
<div class="h-[50dvh] ml-40 mr-40 bg-white flex flex-row space-x-20 py-20">
	<div class="w-[50dvh] h-[40dvh] justify-end bg-[#EEC1CC] p-6 rounded-lg shadow-lg mb-6">
		<h2 class="text-2xl font-semibold text-black mb-4">Features</h2>
		<ul class="list-disc ml-5 flex flex-col justify-center space-y-2 text-black">
			<li>Secure storage for your valuables</li>
			<li>Multiple locker sizes available</li>
			<li>24/7 surveillance and monitoring</li>
			<li>Convenient access during business hours</li>
		</ul>
	</div>

	<section class="w-[50dvh] h-[40dvh] bg-[#EEC1CC] p-6 rounded-lg shadow-lg mb-6">
		<h2 class="text-2xl font-semibold text-black mb-4">Benefits</h2>
		<ul class="list-disc ml-5 space-y-2">
			<li>Peace of mind for your belongings</li>
			<li>Protection from theft and fire</li>
			<li>Easy access and reliable security</li>
			<li>Affordable annual rental charges</li>
		</ul>
	</section>

	<section class="w-[50dvh] h-[40dvh] bg-[#EEC1CC] p-6 rounded-lg shadow-lg mb-6">
		<h2 class="text-2xl font-semibold text-black mb-4">Eligibility Criteria</h2>
		<ul class="list-disc ml-5 space-y-2">
			<li>Must have a savings or current account with the bank</li>
			<li>Provide valid identity and address proof</li>
			<li>Sign the locker rental agreement</li>
		</ul>
	</section>
</div>

<div class="bg-white flex flex-col items-center mt-20 py-8">
	<h1 class="text-3xl font-bold text-[#772035] mb-5">FEES STRUCTURE</h1>
</div>
<div class=" flex justify-center items-center min-w-full">
	<table class="shadow-md w-[150dvh] border border-gray-300 bg-white">
		<thead class="bg-[#772035]">
			<tr class="text-[#FDFDFD]">
				<th class="p-4 text-left border border-gray-300">TYPE</th>
				<th class="p-4 text-left border border-gray-300">SIZE</th>
				<th class="p-4 text-left border border-gray-300">DEPOSIT</th>
				<th class="p-4 text-left border border-gray-300">RENT</th>
			</tr>
		</thead>
		<tbody>
			<tr class="border-t">
				<td class="p-4 border border-gray-300">BASIC</td>
				<td class="p-4 border border-gray-300">SMALL</td>
				<td class="p-4 border border-gray-300">1000</td>
				<td class="p-4 border border-gray-300">3000</td>
			</tr>
			<tr class="border-t">
				<td class="p-4 border border-gray-300">BASIC</td>
				<td class="p-4 border border-gray-300">MEDIUM</td>
				<td class="p-4 border border-gray-300">1500</td>
				<td class="p-4 border border-gray-300">4000</td>
			</tr>
			<tr class="border-t">
				<td class="p-4 border border-gray-300">BASIC</td>
				<td class="p-4 border border-gray-300">LARGE</td>
				<td class="p-4 border border-gray-300">2000</td>
				<td class="p-4 border border-gray-300">5000</td>
			</tr>
			<tr class="border-t">
				<td class="p-4 border border-gray-300">PREMIUM</td>
				<td class="p-4 border border-gray-300">SMALL</td>
				<td class="p-4 border border-gray-300">2000</td>
				<td class="p-4 border border-gray-300">5000</td>
			</tr>
			<tr class="border-t">
				<td class="p-4 border border-gray-300">PREMIUM</td>
				<td class="p-4 border border-gray-300">MEDIUM</td>
				<td class="p-4 border border-gray-300">3000</td>
				<td class="p-4 border border-gray-300">6500</td>
			</tr>
			<tr class="border-t">
				<td class="p-4 border border-gray-300">PREMIUM</td>
				<td class="p-4 border border-gray-300">LARGE</td>
				<td class="p-4 border border-gray-300">4000</td>
				<td class="p-4 border border-gray-300">8000</td>
			</tr>
			<tr class="border-t">
				<td class="p-4 border border-gray-300">VIP</td>
				<td class="p-4 border border-gray-300">SMALL</td>
				<td class="p-4 border border-gray-300">4000</td>
				<td class="p-4 border border-gray-300">8000</td>
			</tr>
			<tr class="border-t">
				<td class="p-4 border border-gray-300">VIP</td>
				<td class="p-4 border border-gray-300">MEDIUM</td>
				<td class="p-4 border border-gray-300">6000</td>
				<td class="p-4 border border-gray-300">12000</td>
			</tr>
			<tr class="border-t">
				<td class="p-4 border border-gray-300">VIP</td>
				<td class="p-4 border border-gray-300">LARGE</td>
				<td class="p-4 border border-gray-300">8000</td>
				<td class="p-4 border border-gray-300">16000</td>
			</tr>
		</tbody>
	</table>
</div>
<div>
	<div class="flex justify-center mt-10 mb-6">
		<button
			class="bg-[#772035] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5a1323] transition"
			on:click={goToRegistrationPage}
		>
			Register now
		</button>
	</div>
</div>
