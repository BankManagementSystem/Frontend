<script lang="ts">
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
	import { goto } from '$app/navigation';
</script>

<div class="w-full bg-[#772035] flex justify-between items-center text-white h-[10dvh]">
    <div><button class="ml-2 text-2xl"><a href="/"><Icon src={ BiSolidLeftArrow} className="h-6 w-6"/></a></button></div>
    <div class=" text-2xl font-semibold">Locker Options</div>
    <div class="mr-6 "></div>
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
<div class=" flex justify-center items-center min-w-full mb-10">
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
