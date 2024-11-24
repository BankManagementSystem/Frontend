<script>
	import { IoSettingsOutline } from 'svelte-icons-pack/io';
	import { CgProfile } from 'svelte-icons-pack/cg';
	import { Icon } from 'svelte-icons-pack';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

    const isActive = (path) => {
        return $page.url.pathname === path; // Compare the current path with the given path
    };

	async function handleHome(event){
		event.preventDefault();
		goto('/Home');
	}
	async function handleAccounts(event){
		event.preventDefault();
		goto('/Accounts');
	}
	async function handleTransfer(event){
		event.preventDefault();
		goto('/transfer');
	}
	async function handleCards(event){
		event.preventDefault();
		goto('/Cards');
	}
	async function handleLoans(event){
		event.preventDefault();
		goto('/Loans');
	}
	async function handleLockers(event){
		event.preventDefault();
		goto('/Lockers');
	}
	async function handleSetting(event){
		event.preventDefault();
		goto('/Settin');
	}
</script>

<div class="flex flex-col bg-[#772035] h-[20vh] text-[#FDFDFD]">
	<div class="flex flex-row justify-between ml-10 mr-10 mt-2 items-center h-[10dvh]">
		<div class="text-2xl font-bold"><a href="/Home">NITTE Bank</a></div>
		<div class="flex flex-row gap-4 text-white">
			<div class="text-white"><Icon src={CgProfile} size="40" /></div>
			<!--<div class="text-white"><Icon src={IoSettingsOutline} size="40" /></div> -->
			<div class="text-white">
					<button class="bg-primary rounded-full hover:bg-gray-200" on:click={handleSetting}>
						<Icon src={IoSettingsOutline} size="40" />
					</button>
			</div>
		</div>
	</div>
	<div
		class="flex flex-row justify-between ml-24 mr-24 mt-2 font-bold text-2xl items-center h-[8dvh]"
	>
		<div><button class={isActive('/Home') ? 'active' : ''} on:click={handleHome}>Home</button></div>
		<div><button class={isActive('/Accounts') ? 'active' : ''} on:click={handleAccounts}>Accounts</button></div>
		<div><button class={isActive('/transfer') ? 'active' : ''} on:click={handleTransfer}>Transfer</button></div>
		<div><button class={isActive('/Cards') ? 'active' : ''} on:click={handleCards}>Cards</button></div>
		<div><button class={isActive('/Loans') ? 'active' : ''} on:click={handleLoans}>Loans</button></div>
		<div><button class={isActive('/Lockers') ? 'active' : ''} on:click={handleLockers}>Lockers</button></div>
	</div>
</div>

<style>
    .active {
        text-decoration: underline;
        color: white; /* Optional: Highlight active button color */
    }
</style>