<script lang="ts">
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
	import Button from "$lib/components/ui/button/button.svelte";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import jwt_decode from 'jwt-decode';
    import ToggleSwitch from "$lib/components/ToggleSwitch.svelte";

    let cardNumber = "";
    let customerId = '';
    let cards = [];
    let card = {};
    let cardid = '';
    let Domi = 0;
    let IisChecked = false;
    let CisChecked = false;
    let OisChecked = false;
    let AisChecked = false;
    let PisChecked = false;
    let user = "";
    let message = "";
    let savedMessage = "";
    let showPopup = false;

    onMount(() => {
        const details = localStorage.getItem('creditcardNumber');
        if (details) {
            cardNumber = JSON.parse(details);
        }
    });

    function isTokenExpired(token: string): boolean {
        try {
            const decoded = jwt_decode<{ exp: number }>(token);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return decoded.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true; // Treat invalid tokens as expired
        }
    }

    onMount(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            if (isTokenExpired(token)) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('authToken');
                goto('/login');
            } else {
                const decoded = jwt_decode<{ id: string }>(token);
                customerId = decoded.id;
            }
        } else {
            alert('No token found. Please log in.');
            goto('/login');
        }
    });

    async function handleSave() {
        console.log("Button clicked, handleSave function called");
        try {
            // Send a POST request with the id and new username
            const response = await fetch('/api/card-limits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cardid, Domi, IisChecked, CisChecked, OisChecked, AisChecked, PisChecked})
            }).catch(error => console.error("Fetch error:", error));

            const result = await response.json();
            if (result.success) {
                message = "Saved Sucessfully!";
                showPopup = true; // Show popup on success
                setTimeout(() => {
                    showPopup = false; // Hide popup after 3 seconds
                }, 2000);
            } else {
                message = result.message || "Failed to update username.";
            }
        } catch (error) {
            console.error("Error updating username:", error);
            message = "An error occurred. Please try again.";
        }
    }   
    
    onMount(async () => {
        try {
            const response = await fetch(`/api/card-limits?id=${cardNumber}`);
            if (response.ok) {
                cards = await response.json();
                card = cards[0];
                cardid = card.Id;
                Domi = card.DomesticAmount;
                IisChecked = card.International;
                CisChecked = card.Contactless;
                OisChecked = card.Online;
                AisChecked = card.ATM;
                PisChecked = card.PosQr;
            } else {
                console.error("Error fetching usernames:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

    async function handleBack(){
        localStorage.removeItem('cardNumber');
        goto("/CreditCards");
    }
</script>



<form on:submit|preventDefault={handleSave}>
<div class="flex items-center justify-between relative bg-[#FDFDFD] text-[#772035] h-[10dvh] border-secondary border-b-2 font-bold text-3xl">
    <div class="ml-4">
        <button on:click={handleBack}>
        <Icon src={BiSolidLeftArrow}/>
        </button>
    </div>
    <div>Credit Card Limits</div>
    <div class="mr-4"></div>
</div>
<div class="glass-background flex flex-col justify-center gap-5 items-center h-screen bg-gradient-to-b from-[#C73659] via-[#E4B9C2] to-[#C73659]" > <!--bg-gradient-to-b from-primary  to-primary via-[#C73659]-->
    <div class="bg-[#772035] w-[70dvh] h-[18dvh] rounded-lg border-2 border-[#772035] flex flex-col">
        <div class="text-xl font-bold mt-3 ml-6 text-[#FDFDFD]">
            Domestic
        </div>
        <div class="mt-4 flex flex-row justify-between">
            <div class="ml-6 flex flex-row relative" >
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">₹</span>
                <input bind:value={Domi} type="number" class="pl-8 pr-4 py-1 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9EBEE]" >
            </div>
            <div class="mr-6 font-semibold text-[#FDFDFD]">Daily Limit</div>
        </div>
    </div>
    
    <div class="bg-[#772035] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6  text-[#FDFDFD]">
            International
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={IisChecked} />
        </div>
    </div>

    <div class="bg-[#772035] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6  text-[#FDFDFD]">
            Contactless
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={CisChecked} />
        </div>
    </div>

    <div class="bg-[#772035] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6  text-[#FDFDFD]">
            Online
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={OisChecked} />
        </div>
    </div>

    <div class="bg-[#772035] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6 text-[#FDFDFD]">
            ATM
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={AisChecked} />
        </div>
    </div>

    <div class="bg-[#772035] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6 text-[#FDFDFD]">
            POS & QR
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={PisChecked}/>
        </div>
    </div>
    <div>
        <!--<button type="submit"  class="bg-[#772035] text-[#FDFDFD] hover:bg-[#EEC1CC] rounded-xl w-36 h-10">Save Changes</button>-->
        <Button 
            variant="outline" 
            class="bg-[#772035] text-[#FDFDFD] hover:bg-[#EEC1CC]"
            type="submit"
        > 
            Save Changes
        </Button>
    </div>
    {#if showPopup}
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div class="bg-white p-4 rounded-lg shadow-lg">
                <p class="text-lg font-semibold text-[#772035]">Changes saved successfully!</p>
            </div>
        </div>
    {/if}
</div>
</form>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

/* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
</style>
<!--
<style>
    @keyframes gradient-x {
        0%{
            background-position: 0% 50%;
        }
        50%{
            background-position: 100% 50%;
        }
        100%{
            background-position: 0% 50%;
        }
    }
    .animate-gradient-x{
        animation: gradient-x 4s ease infinite;
        background-size: 200% 200%;
    }
</style>
-->