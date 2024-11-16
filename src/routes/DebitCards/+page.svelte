<script>
    import Navbar from "$lib/components/navbar.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import ToggleSwitch from "$lib/components/ToggleSwitch.svelte";
    import { Label } from "$lib/components/ui/label/index.js";
    let SisChecked = false;
</script>
<Navbar/>
<slot/>

<div class="flex flex-col  text-black h-[80dvh] ml-10 mt-0 mr-96" >
    <div class="font-bold mt-10 text-2xl">Debit Card</div>
    <div class="mt-6 w-[56vh] h-[30dvh] bg-gradient-to-r from-[#1D1A3E] to-[#3F5E75] rounded-2xl shadow-lg p-5 text-white relative">
        <div class="text-xl font-bold mt-10">************2930</div>
        <div class="text-sm font-light">Valid Upto: 31-DEC-26</div>
        <div class="flex flex-row gap-16 ">
            <div class="flex flex-row text-sm font-light mt-8 "><div>Status: </div> <div class="text-red-600 ml-2">Switched Off</div></div>
            <div class="w-[18dvh]">
                <img src="images/Rupay.png" class="h-[13dvh] w-[18dvh]" alt="Login">
            </div>
            <!--{#if isBalanceVisible}
                <Icon src={FiEyeOff}/>
            {:else}
                <Icon src={FiEye}/>
            {/if}-->
        </div>
    </div>
    <div class="flex flex-row mt-6 justify-between items-center w-[56vh]">
        <div class="font-bold ml-2 text-2xl">Switch Card On/Off </div>
        <div class="flex">
            <ToggleSwitch bind:checked={SisChecked} />
        </div>
    </div>
    <div class="flex flex-row justify-between mt-14 w-[56dvh]">
        <div class="ml-4"> <Button variant="outline" class=" text-red-600 h-11 rounded-md px-6 text-lg font-bold bg-[#FDFDFD]">Block Card</Button> </div>
        <div class="mr-4"> <Button variant="outline" href="/DebitControls" class=" text-black font-bold h-11 rounded-md px-6 text-lg bg-[#FDFDFD]">Card Limits</Button> </div>
    </div>
</div>