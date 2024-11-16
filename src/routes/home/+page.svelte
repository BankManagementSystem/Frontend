<script>
    import Navbar from '$lib/components/navbar.svelte';
    import { FiEye, FiEyeOff } from "svelte-icons-pack/fi";
    import { Icon } from "svelte-icons-pack";
    import { Button } from "$lib/components/ui/button/index.js";
    let accountNumber = "Enter Id to fetch";
    let availableBalance = "Not Available";
    let isBalanceVisible = false;
</script>
<Navbar/>
<slot/>
<div class="w-full h-[80vh] flex flex-col">
    <div class="ml-14 mt-14 w-[60dvh] h-[35dvh] bg-gradient-to-r from-[#1D1A3E] to-[#3F5E75] rounded-2xl shadow-lg p-5 text-white relative">
        <div class="text-sm font-light">Savings account</div>
        <div class="text-xl font-bold mt-2">{accountNumber}</div>
        
        <div class="flex items-end justify-between mt-14">
            <div>
                <div class="text-2xl font-bold">₹ {isBalanceVisible ? availableBalance : 'X,XX,XXX'}</div>
                <div class="text-sm font-light">Available balance</div>
            </div>
            <button
            class="btn w-8 h-8 flex items-center justify-center bg-white rounded-full text-black hover:bg-gray-200 transition"
            on:click={() => (isBalanceVisible = !isBalanceVisible)}
            >
            {#if isBalanceVisible}
                <Icon src={FiEyeOff}/>
            {:else}
                <Icon src={FiEye}/>
            {/if}
            </button>
        </div>
    </div>

    <div class="flex flex-col gap-8 mt-4 ml-14 justify-center items-center w-[60dvh] h-[30dvh]">
            <div>
                <a href="/Accounts">
                <button class=" bg-[#FDFDFD] rounded-3xl w-[50dvh] h-[8dvh] text-black text-2xl font-semibold border-2 border-black shadow-lg hover:bg-gray-100 hover:text-[#772035]">
                    View all accounts
                </button></a>
            </div>
            <div>
                <button class=" bg-[#FDFDFD] rounded-3xl w-[50dvh] h-[8dvh] text-black text-2xl font-semibold border-2 border-black shadow-lg hover:bg-gray-100 hover:text-[#772035]">
                    View statements
                </button>
            </div>
    </div>
</div>
