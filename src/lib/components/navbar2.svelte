<script lang="ts">
	import { IoSettingsOutline } from 'svelte-icons-pack/io';
	import { CgProfile } from 'svelte-icons-pack/cg';
	import { Icon } from 'svelte-icons-pack';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ChangeLogin from 'C:/Users/ADMIN/Desktop/DBMS_PRO/Frontend/src/routes/changeloginemp/+page.svelte';
	// Tracks the currently active button

	async function handleLogout() {
		// Remove the token from localStorage
		isLoading = true;
		localStorage.removeItem('authToken');
		await new Promise((resolve) => setTimeout(resolve, 2000));
		// Redirect the user to the home page or login page
		window.location.href = '/';
	}
	let successMessage = '';
	let showPopup = null; // Can be 'login' or 'transaction' to track which popup to show
	let isLoading = false;

	function openPopup(type) {
		showPopup = type;
	}

	function closePopup() {
		showPopup = null;
	}

	function handlePopupSuccess() {
		// Close the popup and navigate to the home page
		closePopup();
		successMessage = 'PIN changed successfully!';
		setTimeout(() => (successMessage = ''), 3000);
	}

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
		<div class="flex text-white">
			<!--<div class="text-white"><Icon src={IoSettingsOutline} size="40" /></div>-->
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="text-[#772035] font-semibold text-xl">
					<div class="bg-primary rounded-full hover:bg-gray-200 cursor-pointer">
						<Icon src={IoSettingsOutline} size="40" />
					</div>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.GroupHeading>Settings</DropdownMenu.GroupHeading>
						<DropdownMenu.Separator />
						<DropdownMenu.Item><a href="./EPersonalDetails">Profile</a></DropdownMenu.Item>
						<DropdownMenu.Item>
							<button on:click={openPopup}>Change Login Pin</button>
						</DropdownMenu.Item>
						<DropdownMenu.Item class="bg-secondary text-primary hover:bg-[#C73659]">
							<button on:click={handleLogout}>Logout</button>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
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
	{#if showPopup}
		<!-- Background Blur Effect -->
		<div
			class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300"
		>
			<div
				class="w-full max-w-md p-6 rounded-lg shadow-lg transition-transform transform translate-y-full animate-slideUp"
			>
				<ChangeLogin on:close={closePopup} on:submitSuccess={handlePopupSuccess} />
			</div>
		</div>
	{/if}
</div>
{#if isLoading}
	<div class="popup">
		<div class="popup-content flex flex-col justify-center items-center">
			<div class="spinner"></div>
			<div class="text-secondary">Logging out, please wait...</div>
		</div>
	</div>
{/if}

{#if successMessage}
	<div
		class="top-[20%] left-[81%] flex justify-center items-center h-[10dvh] w-[40dvh] absolute bg-primary shadow-2xl rounded-xl"
	>
		<div class="text-black font-semibold flex justify-center items-center text-center">
			{successMessage}
		</div>
	</div>
{/if}

<style>
	.active {
		text-decoration: underline;
		color: white; /* Optional: Highlight active button color */
	}

	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	.popup-content {
		background: white;
		padding: 20px;
		border-radius: 8px;
		text-align: center;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	}
	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-top-color: #732b41;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 10px auto;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	/* Popup animation: Slide up from below */
	.animate-slideUp {
		transform: translateY(100%);
		transition: transform 0.3s ease-out;
	}

	.fixed {
		position: fixed;
	}

	.backdrop-blur-sm {
		backdrop-filter: blur(5px);
	}

	/* When popup is shown, move it up */
	.fixed div {
		transform: translateY(0);
	}
</style>
