<script>
	import { IoSettingsOutline } from 'svelte-icons-pack/io';
	import { CgProfile } from 'svelte-icons-pack/cg';
	import { Icon } from 'svelte-icons-pack';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	// Tracks the currently active button

	const isActive = (path) => {
		return $page.url.pathname === path; // Compare the current path with the given path
	};

	async function handleHome(event) {
		event.preventDefault();
		goto('/employeesHome');
	}

	async function handleLoan(event) {
		event.preventDefault();
		goto('/ELoanApplications');
	}

	async function handleBranches(event) {
		event.preventDefault();
		goto('/EBranches');
	}
</script>

<div class="flex flex-col bg-[#772035] h-[20vh] text-[#FDFDFD]">
	<div class="flex flex-row justify-between ml-10 mr-10 mt-2 items-center h-[10dvh]">
		<div class="text-2xl font-bold"><a href="/employeesHome">NITTE Bank</a></div>
		<div class="flex flex-row gap-4 text-white">
			<div class="text-white"><Icon src={CgProfile} size="40" /></div>
			<!--<div class="text-white"><Icon src={IoSettingsOutline} size="40" /></div> -->
			<div class="text-white">
				<a href="/ESettings">
					<button class="bg-primary rounded-full hover:bg-gray-200">
						<Icon src={IoSettingsOutline} size="40" />
					</button></a
				>
			</div>
		</div>
	</div>
	<div
		class="flex flex-row justify-between ml-24 mr-24 mt-2 font-bold text-2xl items-center h-[8dvh]"
	>
		<div>
			<div>
				<button class={isActive('/employeesHome') ? 'active' : ''} on:click={handleHome}
					>Home</button
				>
			</div>
		</div>
		<div>
			<button class={isActive('/ELoanApplications') ? 'active' : ''} on:click={handleLoan}
				>Loan Applications</button
			>
		</div>
		<div>
			<button class={isActive('/EBranches') ? 'active' : ''} on:click={handleBranches}
				>Branches</button
			>
		</div>
	</div>
</div>

<style>
	.active {
		text-decoration: underline;
		color: white; /* Optional: Highlight active button color */
	}
</style>
