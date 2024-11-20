<script>
    import { Icon } from "svelte-icons-pack";
    import { BiSolidCog } from "svelte-icons-pack/bi";
    import { BiSolidUserDetail } from "svelte-icons-pack/bi";
    import { BiSolidCalendarEvent } from "svelte-icons-pack/bi";
    import { BiSolidKey } from 'svelte-icons-pack/bi';
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { BiLogOut } from "svelte-icons-pack/bi";
    import ChangeLogin from '../changelogin/+page.svelte';
    import ChangeTransaction from '../changeTransaction/+page.svelte';

    let showPopup = null; // Can be 'login' or 'transaction' to track which popup to show

    function openPopup(type) {
            showPopup = type;
        }

    function closePopup() {
            showPopup = null;
        }

</script>

<div class="flex flex-col items-center min-h-screen bg-gray-100">
    <!-- Settings Header -->
    <div class="w-full bg-[#772035] flex justify-between items-center text-white h-[10dvh]">
        <div><button class="ml-2 text-2xl"><a href="/Home"><Icon src={ BiSolidLeftArrow} className="h-6 w-6"/></a></button></div>
        <div class=" text-2xl font-semibold">Settings</div>
        <div class="mr-6 "></div>
    </div>

    <!-- Settings Options -->
    <div class="bg-white shadow-md rounded-lg p-6 mt-24 ">
        <div class="grid grid-cols-2 gap-4">
        
            <button class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidUserDetail } className="h-6 w-10 " />
                <a href="/PersonalDeets">
                <span>Personal Details</span></a>
            </button>
            

            <button class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidCalendarEvent } className="h-6 w-10 " />
                <span>Digital Planner</span>
            </button>

            <button on:click={openPopup} class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidKey } className="h-6 w-10 "  />
                <span>Change Login PIN</span>
            </button>

            <button on:click={() => openPopup('transaction')} class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={BiSolidKey} className="h-6 w-10" />
                <span>Change Transaction PIN</span>
            </button>
        </div>
    </div>

    <!-- Logout Button -->
    <a href="/" class="mt-8 flex items-center space-x-0.2 text-[#772035] text-lg font-semibold">
        <Icon src={ BiLogOut } className="h-6 w-10 fill-[#772035]"  />
        <span>Logout</span>
    </a>
    <!-- Popup Modal -->
    {#if showPopup}
        <!-- Background Blur Effect -->
        <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
            <div class="w-full max-w-md p-6 rounded-lg shadow-lg transition-transform transform translate-y-full animate-slideUp">
                <ChangeLogin on:close={closePopup} />
            </div>
        </div>
    {/if}
    {#if showPopup === 'transaction'}
    <!-- Transaction PIN Popup -->
    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
        <div class="w-full max-w-md p-6 rounded-lg shadow-lg transition-transform transform translate-y-full animate-slideUp">
            <ChangeTransaction on:close={() => showPopup = null} />
        </div>
    </div>
    {/if}
</div>

<style>
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
        transform: translateY(0);}
</style>