<script>
    import { Icon } from "svelte-icons-pack";
    import { BiSolidCog } from "svelte-icons-pack/bi";
    import { BiSolidUserDetail } from "svelte-icons-pack/bi";
    import { BiSolidCalendarEvent } from "svelte-icons-pack/bi";
    import { BiSolidKey } from 'svelte-icons-pack/bi';
    import { BiLogOut } from "svelte-icons-pack/bi";
    import ChangeLogin from '../changelogin/+page.svelte'; // Import the popup component

    let showPopup = false;

    // Function to open and close the popup
    function openPopup() {
        showPopup = true;
    }

    function closePopup() {
        showPopup = false;
    }
</script>

<div class="flex flex-col items-center min-h-screen bg-gray-100">
    <!-- Settings Header -->
    <div class="w-full h-30 bg-[#772035] flex items-center text-white py-4 px-6">
        <button class="mr-2 text-xl"><Icon src={ BiSolidCog } className="h-6 w-10 fill-black"/></button>
        <h1 class="text-2xl font-semibold">Settings</h1>
    </div>

    <!-- Settings Options -->
    <div class="bg-white shadow-md rounded-lg p-6 mt-24 ">
        <div class="grid grid-cols-2 gap-4">
            <button class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidUserDetail } className="h-6 w-10 fill-black" />
                <span>Personal Details</span>
            </button>

            <button class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidCalendarEvent } className="h-6 w-10 fill-black" />
                <span>Digital Planner</span>
            </button>

            <button on:click={openPopup} class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidKey } className="h-6 w-10 fill-black"  />
                <span>Change Login PIN</span>
            </button>

            <button class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidKey } className="h-6 w-10 fill-black"  />
                <span>Change Transaction PIN</span>
            </button>
        </div>
    </div>

    <!-- Logout Button -->
    <a href="../routes/+page.svelte" class="mt-8 flex items-center space-x-0.2 text-[#772035] text-lg font-semibold">
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
        transform: translateY(0);
    }
</style>