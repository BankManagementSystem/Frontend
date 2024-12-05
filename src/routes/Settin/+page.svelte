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
    import {goto} from '$app/navigation';

    let isLoading = false;
    async function handleLogout() {
        // Remove the token from localStorage
        isLoading = true;
        localStorage.removeItem("authToken");
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Redirect the user to the home page or login page
        window.location.href = "/";
    }
	
    function handleDashBoard() {
        goto("/DashBoard");
    }

    function handleProfile() {
        goto("/PersonalDeets");
    }

    let successMessage = '';
    /**
	 * @type {string | null}
	 */
    let showPopup = null; // Can be 'login' or 'transaction' to track which popup to show
    function handlePopupSuccess() {
        // Close the popup and navigate to the home page
        closePopup();
        successMessage = "PIN changed successfully!";
        setTimeout(() => (successMessage = ""), 3000);
    }
    /**
	 * @param {string | null} type
	 */
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
            <button on:click={handleProfile} class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidUserDetail } className="h-6 w-10 " />
                <span>Profile</span>
            </button>


            <button on:click={handleDashBoard} class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidCalendarEvent } className="h-6 w-10 " />
                <span>Digital Planner</span>
            </button>

            <button on:click={() => openPopup('login')} class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={ BiSolidKey } className="h-6 w-10 "  />
                <span>Change Login PIN</span>
            </button>

            <button on:click={() => openPopup('transaction')} class="bg-[#772035] text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <Icon src={BiSolidKey} className="h-6 w-10" />
                <span>Change Transaction PIN</span>
            </button>
        </div>
    </div>

    <div class="mt-10">
        <button type="button" class="outline-button-class bg-secondary text-primary w-20 h-10 rounded-md hover:bg-[#C73659] hover:text-white" on:click={handleLogout}>
        Logout
    </button></div>
    <!-- Popup Modal -->
    {#if showPopup === 'login'}
        <!-- Background Blur Effect -->
        <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
            <div class="w-full max-w-md p-6 rounded-lg shadow-lg transition-transform transform translate-y-full animate-slideUp">
                <ChangeLogin on:close={closePopup} 
                on:submitSuccess={handlePopupSuccess}/>
                
            </div>
        </div>
    {/if}
    {#if showPopup === 'transaction'}
    <!-- Transaction PIN Popup -->
    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
        <div class="w-full max-w-md p-6 rounded-lg shadow-lg transition-transform transform translate-y-full animate-slideUp">
            <ChangeTransaction on:close={() => showPopup = null}
            on:submitSuccess={handlePopupSuccess} />
        </div>
    </div>
    {/if}
    {#if successMessage}
	<div class="top-[10%] left-[81%] flex justify-center items-center h-[10dvh] w-[40dvh] absolute bg-primary shadow-2xl rounded-xl" >
		<div class="text-black font-semibold flex justify-center items-center text-center">
			{successMessage}
		</div>
	</div>
	{/if}
    {#if isLoading}
        <div class="popup">
            <div class="popup-content">
                <div class="spinner"></div>
                <p>Logging out, please wait...</p>
            </div>
        </div>
    {/if}
</div>

<style>
    /* Popup animation: Slide up from below */
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
        border-top-color: #732B41;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 10px auto;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
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