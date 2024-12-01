<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import {Icon} from "svelte-icons-pack"
    import { Button } from "$lib/components/ui/button/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import ToggleSwitch from "$lib/components/ToggleSwitch2.svelte";
    import * as Carousel from "$lib/components/ui/carousel/index.js"; 
    import { Label } from "$lib/components/ui/label/index.js";
    import { FiEye, FiEyeOff } from "svelte-icons-pack/fi";
    import {onMount} from "svelte";
    import Autoplay from "embla-carousel-autoplay";
    import jwt_decode from 'jwt-decode';
    import { goto } from '$app/navigation';

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
                goto('/login'); // Redirect to login
            } else {
                const decoded = jwt_decode<{ id: string }>(token);
                customerId = decoded.id; // Extract the Customer ID
            }
        } else {
            alert('No token found. Please log in.');
            goto('/login'); // Redirect to login
        }
    });

    const plugin = Autoplay({ delay: 3000, stopOnInteraction: true });

    const numbs = [1,2,3];  
    let accountNumber = "Enter Id to fetch";
    let availableBalance = "Not Available";
    let isBalanceVisible = false;
    let CVV = "";

    let SisChecked = true;
    let CvvisChecked = false;

    const formatDebitNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    let Account = '';
    let customerId = ''; // Id input from the user
    let card = {}; // Holds the fetched card data
    let accounts = [];


    //const selectedAccount = accounts.find(account => account.AccountId === Account);
    let selectedAccount = null; // Holds the currently selected account details

    // Reactive statement to update selectedAccount based on the selected Account ID
    $: selectedAccount = accounts.find(account => account.AccountId === Account);

    // Function to fetch credit card details based on Id
    onMount(async () => {
        try {
            const response = await fetch(`/api/debit-card?id=${customerId}`);
            if (response.ok) {
                accounts = await response.json();
                if (accounts.length > 0) {
                    Account = accounts[0].AccountId;
                    selectedAccount = accounts[0];
                }
                // Check if data is not empty
                /*if (accounts.length > 0) {
                    card = accounts[0];
                    accountNumber = card.Number;
                    availableBalance = card.balance;
                    CVV = card.CVV;
                }*/
                else {
                    SisChecked = false
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

<div class="flex flex-row justify-between">
<div class="flex flex-col text-black h-[80dvh] ml-10">
    <div class="flex flex-row items-center h-[10dvh] mt-2 justify-between">
        <div class="font-bold text-2xl">Debit Card</div>
        <div class="">
            <select required
                bind:value={Account}
                id = "account"
                class="w-[30dvh] px-4 py-2 rounded-md bg-secondary text-primary hover:bg-secondary focus:ring-2 focus:ring-[#A12A48]">
                <option value="" disabled selected class="text-white bg-secondary" >Select Account</option>
                {#each accounts as account}
                <option value={account.AccountId} class="bg-secondary text-primary">{account.AccountId}</option>                    
                {/each}
            </select>
        </div>
    
    </div>
<!---->
    <div class="mt-2 w-[60vh] h-[35dvh] bg-gradient-to-r from-[#1D1A3E] to-[#3F5E75] rounded-2xl shadow-lg p-5 text-white relative">
        <div class="text-2xl font-bold mt-2">   
            {(selectedAccount?.Number) ? formatDebitNumber(selectedAccount.Number) : "Not Available"}
        </div>
        <div class="text-sm font-light">
            Valid Upto: {(selectedAccount?.ExpiryDate) ? formatDebitNumber(selectedAccount.ExpiryDate) : "NA"}
            </div>
        <div class=" flex flex-row text-base font-semibold mt-8"><div>CVV:</div> 
            {#if CvvisChecked}
                <div class="text-primary font-bold font-serif ml-2">
                    {selectedAccount?.CVV || "N/A"}</div>             
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
<div class="w-[132dvh] flex items-center justify-center">
    <Carousel.Root 
        plugins={[plugin]}
        on:mousenter={plugin.stop}
        on:mouseleave={plugin.reset}
        swipe={false}
        opts={ {loop: true}}
        class="w-[110dvh] h-[60dvh]">
        <Carousel.Content class="">
            {#each numbs as num}
            <Carousel.Item class="">
                
                <img
                    class="w-full h-[60dvh] object-cover rounded-xl"
                    src="images/Bank{num}.jpg"
                    alt="Bg{num}"
                />
            </Carousel.Item>
            {/each}
        </Carousel.Content>
        </Carousel.Root>
</div>
</div>