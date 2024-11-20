<script>
    import Navbar from "$lib/components/navbar.svelte";
    import {Icon} from "svelte-icons-pack"
    import { Button } from "$lib/components/ui/button/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import ToggleSwitch from "$lib/components/ToggleSwitch2.svelte";
    import { Label } from "$lib/components/ui/label/index.js";
    import { FiEye, FiEyeOff } from "svelte-icons-pack/fi";
    import {onMount} from "svelte";

    let accountNumber = "Enter Id to fetch";
    let availableBalance = "Not Available";
    let isBalanceVisible = false;
    let CVV = "";

    let SisChecked = false;
    let CvvisChecked = false;

    const formatDebitNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    let inputId = 925; // Id input from the user
    let card = {}; // Holds the fetched card data

    // Function to fetch credit card details based on Id
    onMount(async () => {
        if (!inputId) {
            alert("Please enter a valid Id");
            return; 
        }
        try {
            const response = await fetch(`/api/debit-card?id=${inputId}`);
            if (response.ok) {
                const data = await response.json();
                // Check if data is not empty
                if (data.length > 0) {
                    card = data[0];
                    accountNumber = card.Number;
                    availableBalance = card.balance;
                    CVV = card.CVV;
                } else {
                    accountNumber = "Not Found";
                    availableBalance = "Not Available";
                }
            } else {
                console.error("Error fetching credit card details:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

</script>
<Navbar/>
<slot/>

<div class="flex flex-col text-black h-[80dvh] ml-10 mr-96" >
    <div class="font-bold mt-6 text-2xl">Debit Card</div>
<!---->
    <div class="mt-4 w-[60vh] h-[35dvh] bg-gradient-to-r from-[#1D1A3E] to-[#3F5E75] rounded-2xl shadow-lg p-5 text-white relative">
        <div class="text-2xl font-bold mt-2">{formatDebitNumber(accountNumber)}</div>
        <div class="text-sm font-light">Valid Upto: 31-DEC-26</div>
        <div class=" flex flex-row text-base font-semibold mt-8"><div>CVV:</div> 
            {#if CvvisChecked}
                <div class="text-primary font-bold font-serif ml-2"> {CVV} </div>             
            {:else}
                <div class="text-red-600 ml-2"></div>
            {/if}
        </div>
        <div class="flex flex-row gap-16 justify-between">
            <div class="flex flex-row text-base font-bold mt-8  w-[44dvh]"><div>Status: </div> 
                {#if SisChecked}
                <div class="text-green-400 ml-2"> Switched On </div>             
                {:else}
                <div class="text-red-600 ml-2"> Switched Off</div>
                {/if}
            </div>
            <div class=" w-[29dvh] mt-1">
                <img src="images/Rupay.png" class="h-[13dvh] w-[18dvh]" alt="Login">
            </div>
        </div>
    </div>
    <!--
    <div class="mt-8 w-[60dvh] h-[35dvh] bg-gradient-to-r from-[#1D1A3E] to-[#3F5E75] rounded-2xl shadow-lg p-5 text-white relative">
        <div class="text-sm font-light">Savings account</div>
        <div class="text-2xl font-bold mt-2">{formatDebitNumber(accountNumber)}</div>
        
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
    </div>-->
    <div class="flex flex-row mt-2 justify-between items-center w-[60dvh] h-[9dvh]">
        <div class="font-bold ml-2 text-2xl">Switch Card On/Off </div>
        <div class="flex mr-2">
            <ToggleSwitch bind:checked={SisChecked} />
        </div>
    </div>
    <div class="flex flex-row justify-between items-center w-[60dvh] h-[9dvh]">
        <div class="font-bold ml-2 text-2xl">Show CVV </div>
        <div class="flex mr-2">
            <ToggleSwitch bind:checked={CvvisChecked} />
        </div>
    </div>
    <div class="flex flex-row justify-between mt-4 w-[60dvh] ">
        <div class="ml-4"> <Button variant="outline" class=" text-red-600 h-11 rounded-md px-6 text-lg font-bold bg-[#FDFDFD] shadow-xl">Block Card</Button> </div>
        <div class="mr-4"> <Button variant="outline" href="/DebitControls" class=" text-black font-bold h-11 rounded-md px-6 text-lg bg-[#FDFDFD] hover:bg-gray-200 shadow-lg">Card Limits</Button> </div>
    </div>
</div>