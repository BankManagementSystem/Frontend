<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	// State to manage the account status and pop-up visibility
	let hasAccount = writable(false); // Adjust this value based on actual account status
	let showPopup = writable(false);

	function handleApplyNow() {
		showPopup.set(true);
	}

	function closePopup() {
		showPopup.set(false);
	}
	interface UserDetails {
		Firstname: string;
		Middlename: string;
		Lastname: string;
		email: string;
		phonenumber: string;
		Aadhaarnumber: string;
		Pancard: string;
		Id: string;
	}

	// Declare variables
	let loans: any[] = [];
	let data: UserDetails = {
		Firstname: '',
		Middlename: '',
		Lastname: '',
		email: '',
		phonenumber: '',
		Aadhaarnumber: '',
		Pancard: '',
		Id: ''
	};
	let user = '';
	let Firstname = '';
	let Middlename = '';
	let Lastname = '';
	let email = '';
	let phonenumber = '';
	let aadhaar = '';
	let Pancardno = '';

	onMount(async () => {
		try {
			const response = await fetch('/api/loan-application');
			if (response.ok) {
				loans = await response.json();
				data = loans[0];
				Firstname = data.Firstname || '';
				Middlename = data.Middlename || '';
				Lastname = data.Lastname || '';
				email = data.email || '';
				phonenumber = data.phonenumber || '';
				aadhaar = data.Aadhaarnumber || '';
				Pancardno = data.Pancard || '';
				user = data.Id || '';
			} else {
				console.error('Error fetching usernames:', await response.json());
			}
		} catch (error) {
			console.error('Fetch error:', error);
		}
	});

	async function handleSave() {
		try {
			const response = await fetch('/api/loan-application', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					user,
					Firstname,
					Middlename,
					Lastname,
					email,
					phonenumber,
					aadhaar,
					Pancardno
				})
			});
			const result = await response.json();
		} catch (error) {
			console.error('Error saving loan application:', error);
		}
	}
</script>

<form on:submit|preventDefault={handleSave}>
	<div class="bg-gray-100p-8">
		<h1 class="text-red-800 text-center text-3xl font-bold">Loan Application</h1>
	</div>
	<!-- Container for the form -->
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<div class="bg-[#772035] text-white w-96 p-8 rounded-lg shadow-lg">
			<!-- First Name -->
			<div>
				<label class="block text-sm mb-1"
					>First name:
					<input
						bind:value={Firstname}
						type="text"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
					/>
				</label>
			</div>

			<!-- Middle Name -->
			<div>
				<label class="block text-sm mb-1"
					>Middle name:
					<input
						bind:value={Middlename}
						type="text"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
					/>
				</label>
			</div>

			<!-- Last Name -->
			<div>
				<label class="block text-sm mb-1"
					>Last name:
					<input
						bind:value={Lastname}
						type="text"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
					/>
				</label>
			</div>

			<!-- Email -->
			<div>
				<label class="block text-sm mb-1"
					>Email:
					<input
						bind:value={email}
						type="email"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
					/>
				</label>
			</div>

			<!-- Phone Number -->
			<div>
				<label class="block text-sm mb-1"
					>Phone number:
					<input
						bind:value={phonenumber}
						type="tel"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
					/>
				</label>
			</div>

			<!-- Aadhaar Number -->
			<div>
				<label class="block text-sm mb-1"
					>Aadhaar number:
					<input
						bind:value={aadhaar}
						type="text"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
					/>
				</label>
			</div>

			<!-- Pan Number -->
			<div>
				<label class="block text-sm mb-1"
					>Pan number:
					<input
						bind:value={Pancardno}
						type="text"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
					/>
				</label>
			</div>

			<!-- Apply Now Button -->
			<div class="flex justify-center items-center mt-4">
				<button
					class="bg-gray-300 text-black px-6 py-1 rounded-lg font-semibold text-sm"
					on:click={handleApplyNow}
				>
					Apply now
				</button>
			</div>
		</div>
	</div>
	<!-- Pop-Up Component -->
	{#if $showPopup}
		<div class="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center">
			<div class="bg-[#772035] text-white p-12 rounded-md shadow-md max-w-md w-full relative">
				<button class="absolute top-2 right-2 text-white font-bold" on:click={closePopup}>
					X
				</button>
				{#if $hasAccount}
					<!-- Pop-up content for users with an account -->
					<h2 class="text-lg font-bold mb-2">Your Application Id is:</h2>
					<p class="text-sm">
						Thank you for banking with us. In order to track the application status, please login to
						netbanking.
					</p>
				{:else}
					<!-- Pop-up content for users without an account -->
					<h2 class="text-lg font-bold mb-2">Your Application Id is :</h2>
					<p class="text-lg">
						Thank you for applying,we'll get back to you soon!
						<a href="/" class="text-xl font-bold text-gray-300"><u>Continue</u></a><br />
						Hey! It appears that you don't have an account with us. Would you like to open one?
						<a href="/newAccount" class="text-xl font-bold text-gray-300"><u>Click here</u></a>
					</p>
				{/if}
			</div>
		</div>
	{/if}
</form>
