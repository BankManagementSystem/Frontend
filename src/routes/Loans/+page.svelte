<!-- src/routes/loans/+page.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';
	import { BiSolidLeftArrow } from "svelte-icons-pack/bi";

	// Function to navigate to the EMI Calculator page
	function navigateToEMICalculator() {
		goto('/emicalcperso');
	}
	function navigateToemicalcedu() {
		goto('/emicalcedu');
	}
	function navigateToemicalchome() {
		goto('/emicalchome');
	}
	function navigateToemicalccar() {
		goto('/emicalccar');
	}
</script>

<!-- Loans Content Section -->
<div class="flex flex-col p-4 items-center bg-[#FDFDFD]">
	<div class="bg-white p-4">
		<h1 class="text-red-800 text-center text-3xl font-bold">Available Loan Options:</h1>
	</div>
	<!-- Loan Options List -->
	<div class="space-y-4">
		<!-- Personal Loan Card -->
		<div class="flex-shrink-0 ml-60">
			<h3 class="text-lg font-bold mb-2">Personal Loan</h3>
		</div>
		<div class="flex items-center w-3/4 p-4 ml-44 mr-24 bg-[#EEC1CC] rounded-md shadow-md">
			<div class="flex-shrink-0 mr-4">
				<img
					class="w-100 h-100 object-cover rounded-md"
					src="images/personalloan.png"
					alt="Personal Loan"
				/>
			</div>
			<div class="flex-1 justify-items-center space-y-1">
				<div class="flex justify-start">
					<h4 class="text-base font-semibold">Features and Benefits:</h4>
				</div>
				<div class="flex justify-items-center">
					<ul class="list-disc list-inside text-sm ml-10">
						<li>Personal Loan with attractive interest rates</li>
						<li>
							Discounted processing fee will apply if your repayment is done from your Bank_Name
							Bank Acc. T&C apply
						</li>
					</ul>
				</div>
				<div class="flex justify-start">
					<h4 class="text-base font-semibold text-center">Required documents:</h4>
				</div>
				<div class="flex justify-items-center">
					<ul class="list-disc list-inside text-sm">
						<li>Pan Card</li>
						<li>Aadhaar</li>
						<li>
							Your bank statement of past 12 months in PDF format or your net banking credentials
						</li>
					</ul>
				</div>
			</div>
			<div class="flex justify-start">
				<button
					class="bg-[#1D1D1D] text-white px-6 py-1 rounded-lg font-semibold hover:bg-[#772035] text-sm"
					on:click={navigateToEMICalculator}
				>
					EMI CALCULATOR
				</button>
			</div>
		</div>

		<!-- Education Loan Card -->
		<div class="flex-shrink-0 ml-60">
			<h3 class="text-lg font-bold mb-2">Education Loan</h3>
		</div>
		<div class="flex items-center w-3/4 p-4 ml-44 mr-24 bg-[#EEC1CC] rounded-md shadow-md">
			<div class="flex-shrink-0 mr-4">
				<img
					class="w-100 h-100 object-cover rounded-md"
					src="images/educationloan.png"
					alt="Education Loan"
				/>
			</div>
			<div class="flex-1 justify-items-center space-y-1">
				<div class="flex justify-start">
					<h4 class="text-base font-semibold">Features and Benefits:</h4>
				</div>
				<div class="flex justify-items-center">
					<ul class="list-disc list-inside text-sm">
						<li>Personal Loan with attractive interest rates</li>
						<li>
							Discounted processing fee will apply if your repayment is done from your Bank_Name <br
							/>
							Bank Acc. T&C apply
						</li>
					</ul>
				</div>
				<div class="flex justify-start">
					<h4 class="text-base font-semibold text-center">Required documents:</h4>
				</div>
				<div class="flex justify-items-center">
					<ul class="list-disc list-inside text-sm">
						<li>Pan Card</li>
						<li>Aadhaar</li>
						<li>
							Your bank statement of past 12 months in PDF format or your net banking credentials
						</li>
					</ul>
				</div>
			</div>
			<div class="flex justify-start">
				<button
					class="bg-[#1D1D1D] text-white px-6 py-1 rounded-lg font-semibold hover:bg-[#772035] text-sm"
					on:click={navigateToemicalcedu}
				>
					EMI CALCULATOR
				</button>
			</div>
		</div>

		<!-- Home Loan Card -->
		<div class="flex-shrink-0 ml-60">
			<h3 class="text-lg font-bold mb-2">Home Loan</h3>
		</div>
		<div class="flex items-center w-3/4 p-4 ml-44 mr-24 bg-[#EEC1CC] rounded-md shadow-md">
			<div class="flex-shrink-0 mr-4">
				<img
					class="w-100 h-100 object-cover rounded-md"
					src="images/homeloan.png"
					alt="Home Loan"
				/>
			</div>
			<div class="flex-1 justify-items-center space-y-1">
				<div class="flex justify-start">
					<h4 class="text-base font-semibold">Features and Benefits:</h4>
				</div>
				<div class="flex justify-items-center">
					<ul class="list-disc list-inside text-sm">
						<li>Personal Loan with attractive interest rates</li>
						<li>
							Discounted processing fee will apply if your repayment is done from your Bank_Name <br
							/>
							Bank Acc. T&C apply
						</li>
					</ul>
				</div>
				<div class="flex justify-start">
					<h4 class="text-base font-semibold text-center">Required documents:</h4>
				</div>
				<div class="flex justify-items-center">
					<ul class="list-disc list-inside text-sm">
						<li>Pan Card</li>
						<li>Aadhaar</li>
						<li>
							Your bank statement of past 12 months in PDF format or your net banking credentials
						</li>
					</ul>
				</div>
			</div>
			<div class="flex justify-start">
				<button
					class="bg-[#1D1D1D] text-white px-6 py-1 rounded-lg font-semibold hover:bg-[#772035] text-sm"
					on:click={navigateToemicalchome}
				>
					EMI CALCULATOR
				</button>
			</div>
		</div>

		<!-- Car Loan Card -->
		<div class="flex-shrink-0 ml-60">
			<h3 class="text-lg font-bold mb-2">Car Loan</h3>
		</div>
		<div class="flex items-center w-3/4 p-4 ml-44 mr-24 bg-[#EEC1CC] rounded-md shadow-md">
			<div class="flex-shrink-0 mr-4">
				<img class="w-100 h-100 object-cover rounded-md" src="images/carloan.png" alt="Car Loan" />
			</div>
			<div class="flex-1 justify-items-center space-y-1">
				<div class="flex justify-start">
					<h4 class="text-base font-semibold">Features and Benefits:</h4>
				</div>
				<div class="flex justify-items-center">
					<ul class="list-disc list-inside text-sm">
						<li>Personal Loan with attractive interest rates</li>
						<li>
							Discounted processing fee will apply if your repayment is done from your Bank_Name <br
							/>
							Bank Acc. T&C apply
						</li>
					</ul>
				</div>
				<div class="flex justify-start">
					<h4 class="text-base font-semibold text-center">Required documents:</h4>
				</div>
				<div class="flex justify-items-center">
					<ul class="list-disc list-inside text-sm">
						<li>Pan Card</li>
						<li>Aadhaar</li>
						<li>
							Your bank statement of past 12 months in PDF format or your net banking credentials
						</li>
					</ul>
				</div>
			</div>
			<div class="flex justify-start">
				<button
					class="bg-[#1D1D1D] text-white px-6 py-1 rounded-lg font-semibold hover:bg-[#772035] text-sm"
					on:click={navigateToemicalccar}
				>
					EMI CALCULATOR
				</button>
			</div>
		</div>
	</div>
</div>
