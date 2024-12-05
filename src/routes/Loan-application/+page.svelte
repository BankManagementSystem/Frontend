<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import jwt_decode from 'jwt-decode';
	import { Icon } from 'svelte-icons-pack';
	import { BiSolidLeftArrow } from 'svelte-icons-pack/bi';

	let customerDetails = {};

	// Fetch customer details when the user is logged in
	async function fetchcustomer() {
		const token = localStorage.getItem('authToken'); // Retrieve the token
		if (token) {
			try {
				const decoded = jwt_decode<{ exp: number }>(token);
				const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
				if (decoded.exp < currentTime) {
					// Token has expired
					alert('Session expired. Please log in again.');
					localStorage.removeItem('authToken'); // Clear the expired token
					goto('/'); // Redirect to login or home page
				} else {
					const decoded = jwt_decode<{ id: string }>(token);
					customerId = decoded.id; // Extract the Customer ID
					try {
						const response = await fetch(`/api/get-customerdetails?customerId=${customerId}`);
						if (response.ok) {
							const data = await response.json();
							if (data.length > 0) {
								customerDetails = data[0];
								FirstName = customerDetails.FirstName;
								MiddleName = customerDetails.MiddleName;
								LastName = customerDetails.LastName;
								Email = customerDetails.Email;
								MobileNo = customerDetails.MobileNo;
								AadhaarNo = customerDetails.AadhaarNo;
								PanCardNo = customerDetails.PanCardNo;
							} else {
								console.error('Failed to fetch customer details:', data.error);
							}
						} else {
							console.error('Error fetching customer details:', await response.text());
						}
					} catch (error) {
						console.error('Unexpected error:', error);
					}
				}
			} catch (error) {
				console.error('Error decoding token:', error);
				alert('Invalid session. Please log in again.');
				localStorage.removeItem('authToken'); // Clear invalid token
				goto('/'); // Redirect to login or home page
			}
		}
	}
	let customerId = '';
	let hasAccount = writable(false); // Adjust this value based on actual account status
	let showPopup = writable(false);
	let loanApplicationId = writable('');

	let loanDetails = {};
	onMount(() => {
		const details = localStorage.getItem('emidetails');
		if (details) {
			loanDetails = JSON.parse(details);
		}
	});
	onMount(() => {
		fetchcustomer();
	});

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

	let FirstName = '';
	let MiddleName = '';
	let LastName = '';
	let Email = '';
	let MobileNo = '';
	let AadhaarNo = '';
	let PanCardNo = '';

	async function handleSave() {
		try {
			const loanappdetails = {
				loanDetails,
				userDetails: {
					FirstName,
					MiddleName,
					LastName,
					Email,
					MobileNo,
					AadhaarNo,
					PanCardNo
				}
			};
			const response = await fetch('/api/loan-application', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(loanappdetails)
			});
			const result = await response.json();
			if (response.ok && result.success) {
				console.log('Loan Application ID:', result.Id); // Debug ID
				loanApplicationId.set(result.Id); // Set the ID
				showPopup.set(true); // Show the popup
			} else {
				alert(result.message || 'Failed to submit application. Please try again.');
			}
		} catch (error) {
			console.error('Error in handleSave:', error);
			alert('An unexpected error occurred. Please try again.');
		}
	}
</script>

<div
	class="flex items-center justify-between bg-[#D9D9D9] text-[#772035] h-[10dvh] font-bold text-3xl w-full"
>
	<div class="ml-4 cursor-pointer">
		<button on:click={() => goto('/Loans')}>
			<Icon src={BiSolidLeftArrow} />
		</button>
	</div>
	<div>Loan Application Form</div>
	<div class="mr-4"></div>
</div>
<form on:submit|preventDefault={handleSave}>
	<!-- Container for the form -->
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<div class="bg-[#772035] text-white w-96 p-8 rounded-lg shadow-lg">
			<!-- First Name -->
			<div>
				<label class="block text-sm mb-1"
					>First name:
					<input
						required
						bind:value={FirstName}
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
						bind:value={MiddleName}
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
						bind:value={LastName}
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
						bind:value={Email}
						type="Email"
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
						bind:value={MobileNo}
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
						bind:value={AadhaarNo}
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
						bind:value={PanCardNo}
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
					type="submit"
					class="bg-gray-300 text-black px-6 py-1 rounded-lg font-semibold text-sm"
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
