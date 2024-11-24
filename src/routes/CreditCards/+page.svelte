<script lang="ts">
    import Navbar from '$lib/components/navbar.svelte';
    import { FiEye, FiEyeOff } from "svelte-icons-pack/fi";
    import { BsCreditCard2Front } from "svelte-icons-pack/bs";
    import { TrOutlineDeviceIpadHorizontalSearch } from "svelte-icons-pack/tr";
    import { TrOutlineCreditCardOff } from "svelte-icons-pack/tr";
    import { RiDocumentArticleLine } from "svelte-icons-pack/ri";
    import { CgPassword } from "svelte-icons-pack/cg";
    import { Icon } from "svelte-icons-pack";
    import { Button } from "$lib/components/ui/button/index.js";
    import { onMount } from 'svelte';
    import jwt_decode from 'jwt-decode';
    import { goto } from '$app/navigation';

    let customerId = '';

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

    let accountNumber = "Fetching";
    let availableBalance = "Not Available";
    let isBalanceVisible = false;
    let inputId = 1; // Id input from the user
    let card = {}; // Holds the fetched card data

    // Function to fetch credit card details based on Id
    onMount(async () => {
        if (!inputId) {
            alert("Please enter a valid Id");
            return; 
        }

        try {
            const response = await fetch(`/api/credit-cards?id=${inputId}`);
            if (response.ok) {
                const data = await response.json();
                // Check if data is not empty
                if (data.length > 0) {
                    card = data[0];
                    accountNumber = card.accountno;
                    availableBalance = card.balance;
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

<div class="text-black font-bold text-3xl ml-10 mt-6">
    Credit Card
</div>

<div class="flex flex-col items-center">
    <!-- Input field to enter Id -->
    <!--<input
        type="number"
        placeholder="Enter User Id"
        bind:value={inputId}
        class="mb-4 p-2 border rounded"
    />
    <button
        on:click={fetchCreditCardDetails}
        class="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
    >
        Fetch Details
    </button>-->

    <div class="w-[60dvh] h-[35dvh] bg-gradient-to-r from-[#1D1A3E] to-[#3F5E75] rounded-2xl shadow-lg p-5 text-white relative">
        <div class="text-sm font-medium"></div>
        <div class="text-2xl font-bold mt-2">{accountNumber}</div>
        
        <div class="flex items-end justify-between mt-14">
            <div>
                <div class="text-2xl font-bold">₹ {isBalanceVisible ? availableBalance : 'X,XX,XXX'}</div>
                <div class="text-sm font-light">Available Limit</div>
            </div>

            <!-- Clickable Icon for toggling visibility -->
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
</div>
<div class="flex justify-center">
<div class="flex flex-col bg-[#A91D3A] h-[29dvh] w-[170dvh] rounded-lg ml-10 mr-10 mt-6">
    <div class="flex flex-row justify-between mt-4 ">
        <div class="flex font-bold ml-10 text-2xl text-[#D9D9D9] ">
            Credit Card
        </div>
        <div class="flex mr-10">
            <!--<button
                class="mb-6 px-8 py-1 bg-[#F7E1E6] text-[#A91D3A] rounded-full hover:bg-[#EEC1CC]">
                Transactions
            </button>-->
            <Button href="/CreditTransactions" class="rounded-full bg-[#F7E1E6] text-[#A91D3A] hover:bg-[#EEC1CC]">Transactions</Button>
        </div>
    </div>    
    <div class="flex flex-row justify-center mt-8 gap-24 h-20">
        <a href="./CreditControls">
        <div class="flex flex-col justify-center items-center">
            <div class="flex bg-[#F7E1E6] w-32 h-12 rounded-xl justify-center items-center"><Icon src={BsCreditCard2Front} size="30" /></div>
            <div class="text-[#D9D9D9]">Card Controls</div>
        </div>
        </a>
        <a href="./SetPin">
            <div class="flex flex-col justify-center items-center">
            <div class="bg-[#F7E1E6] w-32 h-12 rounded-xl flex justify-center items-center"><Icon src={CgPassword} size="30" /></div>
            <div class="text-[#D9D9D9]">Set Pin</div>
            </div>  
        </a>
        <a href="./PayBill">
        <div class="flex flex-col justify-center items-center ">
            <div class="bg-[#F7E1E6] w-32 h-12 rounded-xl flex justify-center items-center"><Icon src={RiDocumentArticleLine} size="30" /></div>
            <div class="text-[#D9D9D9]">Pay Bill</div>
        </div>
        </a>
        <div class="flex flex-col justify-center items-center">
            <div class="bg-[#F7E1E6] w-32 h-12 rounded-xl flex justify-center items-center"><Icon src={TrOutlineCreditCardOff} size="30" /></div>
            <div class="text-[#D9D9D9]">Block Card</div>
        </div>
        <!--<div class="flex flex-col justify-center items-center">
            <div class="bg-[#F7E1E6] w-32 h-12 rounded-xl flex justify-center items-center"><Icon src={TrOutlineDeviceIpadHorizontalSearch} size="30" /></div>
            <div class="text-[#D9D9D9]">View More</div>
        </div>-->
    </div>
</div>
</div>