<script lang="ts">
	import { BiSolidLeftArrow } from 'svelte-icons-pack/bi';
	import { Icon } from 'svelte-icons-pack';
	// No special logic needed for now
	import { Separator } from '$lib/components/ui/separator';
	import { goto } from '$app/navigation';
	import jwt_decode from 'jwt-decode';

	async function handleBack(event) {
		event.preventDefault(); // Prevent default behavior for the back action

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
					// Token is valid
					goto('/Cards'); // Redirect to accounts page
				}
			} catch (error) {
				console.error('Error decoding token:', error);
				alert('Invalid session. Please log in again.');
				localStorage.removeItem('authToken'); // Clear invalid token
				goto('/'); // Redirect to login or home page
			}
		} else {
			// No token found
			goto('/'); // Redirect to login or home page
		}
	}
</script>

<div class="w-full bg-[#772035] flex justify-between items-center text-white h-[10dvh]">
	<div>
		<button class="ml-2 text-2xl" on:click={handleBack}>
            <Icon src={BiSolidLeftArrow} className="h-6 w-6" />
        </button>
	</div>
	<div class=" text-2xl font-semibold">Credit Card Options</div>
	<div class="mr-6"></div>
</div>

<div
	class="flex flex-row mt-10 ml-20 bg-primary shadow-xl h-[55dvh] justify-between mr-20 rounded-xl border-2 border-secondary"
>
	<div
		class="ml-4 mt-4 relative w-96 h-56 bg-gradient-to-l from-purple-900 to-blue-950 rounded-xl p-4 shadow-xl text-white"
	>
		<!-- Gem Background -->
		<div class="absolute inset-0">
			<img
				src="/images/jupyter.jpg"
				alt="Jupyter"
				class="object-cover w-full h-full rounded-xl opacity-60"
			/>
		</div>

		<!-- Card Content -->
		<div class="relative flex flex-col h-full">
			<!-- Bank Logo -->
			<div class="flex w-full justify-end">
				<div class="flex flex-col items-center">
					<div class="text-lg font-bold">NITTE Bank</div>
				</div>
			</div>
			<div class="flex flex-row justify-between items-center mt-3 ml-3">
				<div class="flex items-center">
					<img src="/images/chip.png" alt="Emerald Gem" class="w-10 h-10" />
				</div>
				<div class="flex flex-row items-center gap-2">
					<span class="text-sm">Jupyter</span>
					<img src="/images/contactless.png" alt="Emerald Gem" class="w-8 h-8" />
				</div>
			</div>
			<!-- Card Details -->
			<div class="mt-auto">
				<!-- Card Holder -->
				<div class="text-lg font-semibold">NIDHISH SHETTIGAR</div>
				<!-- Valid Dates -->
				<div class="flex justify-between mt-1 text-sm">
					<div>
						<span>VALID FROM</span> <span class="font-bold">03/24</span>
					</div>
					<div>
						<span>VALID THRU</span> <span class="font-bold">03/29</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex w-[105dvh]">
		<div class="flex flex-col">
			<div class="ml-10 mt-3 text-2xl font-semibold">Jupyter Credit Card</div>
			<div class="ml-10 mt-8 text-md font-medium">
				<ul class="list-disc ml-8 w-[88dvh] flex flex-col gap-2">
					<li>Unlimited complimentary Domestic & International lounge access.</li>
					<li>
						BOGO offer on movie & event tickets, Up to four times every month on tickets worth up to
						₹750
					</li>
					<li>
						Up to 4 rounds of complimentary golf basis the applicable spends on the previous month.
					</li>
				</ul>
			</div>
			<div
				class="ml-10 mt-8 h-[6dvh] flex justify-center rounded-lg items-center space-x-4 text-sm bg-gray-100 w-[65dvh]"
			>
				<div>Joining Fee: ₹12000+GST</div>
				<Separator orientation="vertical" class="" />
				<div>Annual Fee: ₹12000+GST</div>
			</div>
		</div>
	</div>
</div>

<div
	class="flex flex-row mt-10 ml-20 bg-primary shadow-xl h-[55dvh] justify-between mr-20 rounded-xl border-2 border-secondary"
>
	<div
		class="ml-4 mt-4 relative w-96 h-56 bg-gradient-to-r from-yellow-700 to-orange-700 rounded-xl p-4 shadow-xl text-white"
	>
		<!-- Gem Background -->
		<div class="absolute inset-0">
			<img
				src="/images/saturn.jpeg"
				alt="Saturn"
				class="object-cover w-full h-full rounded-xl opacity-80"
			/>
		</div>

		<!-- Card Content -->
		<div class="relative flex flex-col h-full">
			<!-- Bank Logo -->
			<div class="flex w-full justify-end">
				<div class="flex flex-col items-center">
					<div class="text-lg font-bold">NITTE Bank</div>
				</div>
			</div>
			<div class="flex flex-row justify-between items-center mt-3 ml-3">
				<div class="flex items-center">
					<img src="/images/chip.png" alt="Emerald Gem" class="w-10 h-10" />
				</div>
				<div class="flex flex-row items-center gap-2">
					<span class="text-sm">Saturn</span>
					<img src="/images/contactless.png" alt="Emerald Gem" class="w-8 h-8" />
				</div>
			</div>
			<!-- Card Details -->
			<div class="mt-auto">
				<!-- Card Holder -->
				<div class="text-lg font-semibold">NIDHISH SHETTIGAR</div>
				<!-- Valid Dates -->
				<div class="flex justify-between mt-1 text-sm">
					<div>
						<span>VALID FROM</span> <span class="font-bold">03/24</span>
					</div>
					<div>
						<span>VALID THRU</span> <span class="font-bold">03/29</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex w-[105dvh]">
		<div class="flex flex-col">
			<div class="ml-10 mt-3 text-2xl font-semibold">Saturn Credit Card</div>
			<div class="ml-10 mt-8 text-md font-medium">
				<ul class="list-disc ml-8 w-[88dvh] flex flex-col gap-2">
					<li>Welcome vouchers worth Rs. 9000+</li>
					<li>
						Buy one movie ticket, get Rs 500 off on second tikcet, on BookMyShow, twice per month
					</li>
					<li>Two Complimentary International Airport Lounge Access, per year</li>
					<li>Four Complimentary Domestic Airport Lounge Access, per quarter</li>
				</ul>
			</div>
			<div
				class="ml-10 mt-8 h-[6dvh] flex justify-center rounded-lg items-center space-x-4 text-sm bg-gray-100 w-[65dvh]"
			>
				<div>Joining Fee: ₹6500+GST</div>
				<Separator orientation="vertical" class="" />
				<div>Annual Fee: ₹6500+GST</div>
			</div>
		</div>
	</div>
</div>

<div
	class="flex flex-row mt-10 ml-20 bg-primary shadow-xl h-[55dvh] justify-between mr-20 rounded-xl border-2 border-secondary"
>
	<div
		class="ml-4 mt-4 relative w-96 h-56 bg-gradient-to-r from-red-900 to-black rounded-xl p-4 shadow-xl text-white"
	>
		<!-- Gem Background -->
		<div class="absolute inset-0">
			<img
				src="/images/mars.jpeg"
				alt="Mars"
				class="object-cover w-full h-full rounded-xl opacity-80"
			/>
		</div>

		<!-- Card Content -->
		<div class="relative flex flex-col h-full">
			<!-- Bank Logo -->
			<div class="flex w-full justify-end">
				<div class="flex flex-col items-center">
					<div class="text-lg font-bold">NITTE Bank</div>
				</div>
			</div>
			<div class="flex flex-row justify-between items-center mt-3 ml-3">
				<div class="flex items-center">
					<img src="/images/chip.png" alt="Emerald Gem" class="w-10 h-10" />
				</div>
				<div class="flex flex-row items-center gap-2">
					<span class="text-sm">Mars</span>
					<img src="/images/contactless.png" alt="Emerald Gem" class="w-8 h-8" />
				</div>
			</div>
			<!-- Card Details -->
			<div class="mt-auto">
				<!-- Card Holder -->
				<div class="text-lg font-semibold">NIDHISH SHETTIGAR</div>
				<!-- Valid Dates -->
				<div class="flex justify-between mt-1 text-sm">
					<div>
						<span>VALID FROM</span> <span class="font-bold">03/24</span>
					</div>
					<div>
						<span>VALID THRU</span> <span class="font-bold">03/29</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex w-[105dvh]">
		<div class="flex flex-col">
			<div class="ml-10 mt-3 text-2xl font-semibold">Mars Credit Card</div>
			<div class="ml-10 mt-8 text-md font-medium">
				<ul class="list-disc ml-8 w-[88dvh] flex flex-col gap-2">
					<li>Welcome vouchers worth Rs. 5000+</li>
					<li>25% discount on movie tickets, on BookMyShow and Inox, twice per month</li>
					<li>Air Accident insurance of Rs 1 cr and lost card liability Rs 50k</li>
					<li>Two Complimentary rounds of golf, per month</li>
				</ul>
			</div>
			<div
				class="ml-10 mt-8 h-[6dvh] flex justify-center rounded-lg items-center space-x-4 text-sm bg-gray-100 w-[65dvh]"
			>
				<div>Joining Fee: ₹3000+GST</div>
				<Separator orientation="vertical" class="" />
				<div>Annual Fee: ₹3000+GST</div>
			</div>
		</div>
	</div>
</div>

<div
	class="flex flex-row mt-10 ml-20 mb-10 bg-primary shadow-xl h-[55dvh] justify-between mr-20 rounded-xl border-2 border-secondary"
>
	<div
		class="ml-4 mt-4 relative w-96 h-56 bg-gradient-to-r from-green-600 via-green-500 to-blue-400 rounded-xl p-4 shadow-xl text-white"
	>
		<!-- Gem Background -->
		<div class="absolute inset-0">
			<img
				src="/images/earth.jpeg"
				alt="Earth"
				class="object-cover w-full h-full rounded-xl opacity-80"
			/>
		</div>

		<!-- Card Content -->
		<div class="relative flex flex-col h-full">
			<!-- Bank Logo -->
			<div class="flex w-full justify-end">
				<div class="flex flex-col items-center">
					<div class="text-lg font-bold">NITTE Bank</div>
				</div>
			</div>
			<div class="flex flex-row justify-between items-center mt-3 ml-3">
				<div class="flex items-center">
					<img src="/images/chip.png" alt="Emerald Gem" class="w-10 h-10" />
				</div>
				<div class="flex flex-row items-center gap-2">
					<span class="text-sm">Earth</span>
					<img src="/images/contactless.png" alt="Emerald Gem" class="w-8 h-8" />
				</div>
			</div>
			<!-- Card Details -->
			<div class="mt-auto">
				<!-- Card Holder -->
				<div class="text-lg font-semibold">NIDHISH SHETTIGAR</div>
				<!-- Valid Dates -->
				<div class="flex justify-between mt-1 text-sm">
					<div>
						<span>VALID FROM</span> <span class="font-bold">03/24</span>
					</div>
					<div>
						<span>VALID THRU</span> <span class="font-bold">03/29</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex w-[105dvh]">
		<div class="flex flex-col">
			<div class="ml-10 mt-3 text-2xl font-semibold">Earth Credit Card</div>
			<div class="ml-10 mt-8 text-md font-medium">
				<ul class="list-disc ml-8 w-[88dvh] flex flex-col gap-2">
					<li>25% discount on movie tickets, on BookMyShow and Inox, twice per month</li>
					<li>One Complimentary Railway and Domestic Airport Lounge Access, per quarter</li>
					<li>1% Fuel Surcharge waiver at HPCL Petrol Pumps</li>
				</ul>
			</div>
			<div
				class="ml-10 mt-8 h-[6dvh] flex justify-center rounded-lg items-center space-x-4 text-sm bg-gray-100 w-[65dvh]"
			>
				<div>Joining Fee: ₹500/ NIL</div>
				<Separator orientation="vertical" class="" />
				<div>Annual Fee: ₹500/ NIL</div>
			</div>
		</div>
	</div>
</div>
