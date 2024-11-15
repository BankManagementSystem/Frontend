<!-- src/routes/transfer.svelte -->
<script>
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/navbar.svelte';
	// Function to handle reset
	function handleReset() {
		// Logic to reset the form fields
	}
</script>

<Navbar />
<div class="max-w-4xl mx-auto p-4 rounded-md shadow-md">
	<h1 class="text-2xl font-bold text-black">Fund transfer to another bank account:</h1>
</div>
<div class="border border-gray-400 max-w-4xl mx-auto p-4 rounded-md shadow-md">
	<h2 class="text-xl font-bond text-black">Payment details:</h2>
</div>
<div class="min-h-screen p-8">
	<div class="max-w-4xl mx-auto bg-[#772035] p-8 rounded-md shadow-md border border-gray-400">
		<!-- Form starts here -->
		<form>
			<!-- Set Payment Date and Frequency -->
			<div class="mb-6 border-b border-black pb-4 gap-2">
				<h2 class="font-semibold text-xl text-white mb-2">
					Set Payment Date and Reference number:
				</h2>
				<div class="flex flex-col justify-between w-[84dvh] ml-24 gap-2">
					<div class="flex flex-row justify-between">
						<div class="flex justify-end text-white w-[23dvh] font-medium mb-1 ">
						    Transaction Ref Name*
                        </div>
                        <div>
						    <input type="text" class="w-[50dvh] border rounded-md p-2 ml-10 text-black" required />
                        </div>
					</div>
					<div class="flex flex-row justify-between">
						<div class="flex justify-end text-white w-[23dvh] font-medium mb-1 ">
						    Transaction Date *
                        </div>
                        <div>
						    <input type="date" class="w-[50dvh] border rounded-md p-2 ml-4 text-black" required />
                        </div>
					</div>
				</div>
			</div>
			<!-- Make a Payment from -->
			<div class="mb-6 border-b border-black pb-4">
				<h2 class="font-semibold text-white text-xl mb-2">Make a Payment from:</h2>
                <div class="flex flex-col justify-between w-[84dvh] ml-24 gap-2">
					<div class="flex flex-row justify-between">
                        <div class="flex text-white w-[23dvh] justify-end font-medium mb-1">
                            Pay From Account*
                        </div>
                        <div>
                            <input type="text" class="w-[50dvh] border rounded-md p-2 text-black" required />
                        </div>
                    </div>
                </div>
            </div>
			<!-- Make a Payment to -->
			<div class="flex flex-col mb-6 border-b border-black pb-4">
				<h2 class="font-semibold text-xl text-white mb-2">Make a Payment to:</h2>
				<div class="flex flex-col justify-between w-[84dvh] ml-24 gap-2">
					<div class="flex flex-row justify-between">
						<div class="flex justify-end text-white w-[23dvh] font-medium mb-1 ">
							Payee's Account No.*
                        </div>
                        <div>
							<input type="text" class="w-[50dvh] border rounded-md p-2 text-black" required />
                        </div>
					</div>
					<div class="flex flex-row justify-between">
						<div class="flex justify-end text-white w-[23dvh] font-medium mb-1">
							Payee's IFSC Code*
                        </div>
                        <div>
							<input type="text" class="w-[50dvh] border rounded-md p-2 text-black" required />
						</div>
					</div>
					<div class="col-span-2 flex flex-row justify-between">
						<div class="flex text-white w-[23dvh] justify-end font-medium mb-1">
							Amount* (INR)
                        </div>
                        <div>
							<input type="number" class="w-[50dvh] border rounded-md p-2 text-black" required />
						</div>
					</div>
				</div>
			</div>
			<!-- Network and Other Details -->
			<div class="mb-6">
				<h2 class="font-semibold text-xl text-white mb-2">Network and Other Details:</h2>
                <div class="flex flex-col justify-between w-[84dvh] ml-24 gap-2">
					<div class="flex flex-row justify-between">
                        <div class="flex text-white w-[23dvh] justify-end font-medium mb-1">
                            Transaction Mode*
                        </div>
                        <div>
                            <input type="text" class="w-[50dvh] border rounded-md p-2 text-black" required />
                        </div>
                    </div>
                </div>
			</div>
			<!-- Buttons -->
			<div class="flex justify-end space-x-4">
				<button
					type="submit"
					class="bg-[#772035] text-white px-6 py-2 rounded-md hover:bg-gray-400"
				>
					Continue
				</button>
				<button
					type="reset"
					class="bg-[#772035] text-white px-6 py-2 rounded-md hover:bg-gray-400"
					on:click={handleReset}
				>
					Reset
				</button>
			</div>
		</form>
	</div>
</div>
