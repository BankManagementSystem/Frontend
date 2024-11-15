<script>
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
	import Button from "$lib/components/ui/button/button.svelte";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { onMount } from "svelte";
    import ToggleSwitch from "$lib/components/ToggleSwitch.svelte";

    let cards = [];
    let card = {};
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

    async function handleSave() {
        console.log("Button clicked, handleSave function called");
        try {
            // Send a POST request with the id and new username
            const response = await fetch('/api/credit-limits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user, Domi, IisChecked, CisChecked, OisChecked, AisChecked, PisChecked})
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
            const response = await fetch('/api/credit-limits');
            if (response.ok) {
                cards = await response.json();
                card = cards[0];
                Domi = card.domistic;
                IisChecked = card.international;
                CisChecked = card.contact;
                OisChecked = card.onlinee;
                AisChecked = card.ATM;
                PisChecked = card.QR;
                user = card.Id;
            } else {
                console.error("Error fetching usernames:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });
</script>

<form on:submit|preventDefault={handleSave}>
<div class="flex items-center justify-between bg-[#D9D9D9] text-[#772035] h-[10dvh] font-bold text-3xl">
    <div class="ml-4">
        <a href="/CreditCards">
        <Icon src={BiSolidLeftArrow}/>
        </a>
    </div>
    <div>Credit Card Limits</div>
    <div class="mr-4"></div>
</div>
<div class="flex flex-col justify-center gap-5 items-center h-screen">
    <div class="bg-[#FDFDFD] w-[70dvh] h-[18dvh] rounded-lg border-2 border-[#772035] flex flex-col">
        <div class="text-xl font-bold mt-3 ml-6">
            Domestic
        </div>
        <div class="mt-4 flex flex-row justify-between">
            <div class="ml-6 flex flex-row relative" >
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">₹</span>
                <input bind:value={Domi} type="number" class="pl-8 pr-4 py-1 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" >
            </div>
            <div class="mr-6 font-semibold">Daily Limit</div>
        </div>
    </div>
    
    <div class="bg-[#FDFDFD] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6">
            International
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={IisChecked} />
        </div>
    </div>

    <div class="bg-[#FDFDFD] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6">
            Contactless
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={CisChecked} />
        </div>
    </div>

    <div class="bg-[#FDFDFD] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6">
            Online
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={OisChecked} />
        </div>
    </div>

    <div class="bg-[#FDFDFD] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6">
            ATM
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={AisChecked} />
        </div>
    </div>

    <div class="bg-[#FDFDFD] text-xl font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
        <div class="ml-6">
            POS & QR
        </div>
        <div class="mr-6">
            <ToggleSwitch bind:checked={PisChecked} />
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