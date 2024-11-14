<script>
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
	import Button from "$lib/components/ui/button/button.svelte";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { onMount } from "svelte";
    import ToggleSwitch from "$lib/components/ToggleSwitch.svelte";
    let IisChecked = false;
    let CisChecked = false;
    let OisChecked = true;
    let AisChecked = false;
    let PisChecked = true;

</script>

<div class="flex items-center justify-between bg-[#D9D9D9] text-[#772035] h-[10dvh] font-bold text-3xl">
    <div class="ml-4">
        <a href="/DebitCards">
        <Icon src={BiSolidLeftArrow}/>
        </a>
    </div>
    <div>Debit Card Limits</div>
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
                <input type="number" class="pl-8 pr-4 py-1 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Amount">
            </div>
            <div class="mr-6 font-semibold">Daily Limit</div>
        </div>
    </div>
    
    <div class="bg-[#FDFDFD] text-xl font-bold font-bold w-[70dvh] h-[10dvh] rounded-lg border-2 border-[#772035] flex items-center justify-between">
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
        <Button variant="outline" class="bg-[#772035] text-[#FDFDFD] hover:bg-[#EEC1CC]">Save Changes</Button>
    </div>
</div>