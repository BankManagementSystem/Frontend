<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	// State to manage the account status and pop-up visibility
	let hasAccount = writable(false); // Adjust this value based on actual account status
	let showPopup = writable(false);
	let loanApplicationId = writable('')

	function handleApplyNow() {
		showPopup.set(true);
	}

	function closePopup() {
		showPopup.set(false);
	}

	function formatAadhaar(event) {
		// Remove non-numeric characters
		let input = event.target.value.replace(/[^0-9]/g, '');

		// Format input to 'xxxx-xxxx-xxxx'
		const formatted = input.match(/.{1,4}/g)?.join('-') || '';
		event.target.value = formatted;
		Aadhaar = formatted;
	}

	function validateAadhaar(event) {
		const aadhaarPattern = /^\d{4}-\d{4}-\d{4}$/;
		if (!aadhaarPattern.test(Aadhaar)) {
			alert('Please enter a valid Aadhaar number in the format 1234-5678-9101');
			event.preventDefault(); // Prevent form submission
		}
	}

	function validatePANInput(event) {
		// Convert input to uppercase automatically
		event.target.value = event.target.value.toUpperCase();

		// Regular expression for validating PAN format
		const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
		if (!panPattern.test(event.target.value)) {
			event.target.setCustomValidity('Enter a valid PAN in the format: ABCDE1234F');
		} else {
			event.target.setCustomValidity(''); // Clear custom error message if input is valid
		}
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
			if (result.success) {
				// Set loan application ID and show popup
				loanApplicationId.set(result.loanApplicationId);
				showPopup.set(true);
			} else {
				alert('Failed to submit application. Please try again.');
			}
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
						required
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
						required
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
						required
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
						required
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
						required
						bind:value={phonenumber}
						type="tel"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
					/>
				</label>
			</div>

			<!-- Aadhaar Number -->
			<div>
				<label for="Aadhaar" class="block text-sm mb-1"
					>Aadhaar number:
					<input
						required
						bind:value={aadhaar}
						id="Aadhaar"
						type="text"
						maxlength="14"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
						on:input={formatAadhaar}
					/>
				</label>
			</div>

			<!-- Pan Number -->
			<div>
				<label for="PAN" class="block text-sm mb-1"
					>Pan number:
					<input
						required
						bind:value={Pancardno}
						id="PAN"
						type="text"
						maxlength="10"
						class="w-full p-2 text-black border rounded focus:outline-none focus:ring focus:ring-[#5A1323]"
						title="Enter a valid PAN in the format: ABCDE1234F"
						on:input={validatePANInput}
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
					<h2 class="text-lg font-bold mb-2">Your Application Id is :{$loanApplicationId}</h2>
					<p class="text-sm">
						Thank you for banking with us. we'll get back to you soon. In order to track the
						application status, please login to netbanking. <a
							href="/home"
							class="text-normal font-bold text-gray-300"><u>Continue</u></a
						>
					</p>
				{:else}
					<!-- Pop-up content for users without an account -->
					<h2 class="text-lg font-bold mb-2">Your Application Id is : {$loanApplicationId}</h2>
					<p class="text-lg">
						Thank you for applying,we'll get back to you soon!
						<a href="/home" class="text-normal font-bold text-gray-300"><u>Continue</u></a><br />
						Hey! It appears that you don't have an account with us. Would you like to open one?
						<a href="/newAccount" class="text-normal font-bold text-gray-300"><u>Click here</u></a>
					</p>
				{/if}
			</div>
		</div>
	{/if}
</form>
