<script lang="ts">
    //import { DB_User, Db_Password } from '$env/static/private';
    import Navbar from '$lib/components/navbar.svelte';
    import { FiEye, FiEyeOff } from "svelte-icons-pack/fi";
    import { Icon } from "svelte-icons-pack";
    import {onMount} from "svelte";
    import Autoplay from "embla-carousel-autoplay";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js"; 
    import * as Card from "$lib/components/ui/card/index.js";
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

    let customerId = '';
    const numbs = [1,2,3];
    let accountNumber = "Enter Id to fetch";
    let availableBalance = "Not Available";
    let accountId = "";
    let type = "Null";
    let isBalanceVisible = false;
    let card = {}; // Holds the fetched card data

    /*onMount (() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwt_decode(token);
            customerId = decoded.id; // Extract the Customer ID
    }
    });*/
    
    // Function to fetch credit card details based on Id
    onMount(async () => {
        try {
            const response = await fetch(`/api/debit-card?id=${customerId}`);
            if (response.ok) {
                const data = await response.json();
                // Check if data is not empty
                if (data.length > 0) {
                    card = data[0];
                    accountId = card.AccountId;
                    accountNumber = card.Number;
                    availableBalance = card.Balance;
                    type = card.Type;
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

    const formatDebitNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    function handleStatements(){
        localStorage.setItem('accountNumber', JSON.stringify(accountId));
        goto('/Statements')
    }

    const plugin = Autoplay({ delay: 3000, stopOnInteraction: true });
</script>
<Navbar/>
<slot/>
<div class="flex flex-row">
    <div class="w-[80vh] h-[80vh] flex flex-col">
        <div class="ml-14 mt-14 w-[60dvh] h-[35dvh] bg-gradient-to-r from-[#1D1A3E] to-[#3F5E75] rounded-2xl shadow-lg p-5 text-white relative">
            <div class="text-sm font-light">{type} card</div>
            <div class="text-2xl font-bold mt-2">{formatDebitNumber(accountNumber)}</div>
            
            <div class="flex items-end justify-between mt-20">
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
        </div>

        <div class="flex flex-col gap-8 mt-4 ml-14 justify-center items-center w-[60dvh] h-[30dvh]">
                <div>
                    <a href="/Accounts">
                    <button class=" bg-[#FDFDFD] rounded-3xl w-[50dvh] h-[8dvh] text-black text-2xl font-semibold border-2 border-black shadow-lg hover:bg-gray-100 hover:text-[#772035]">
                        View all accounts
                    </button></a>
                </div>
                <div>
                    <button on:click={handleStatements} class=" bg-[#FDFDFD] rounded-3xl w-[50dvh] h-[8dvh] text-black text-2xl font-semibold border-2 border-black shadow-lg hover:bg-gray-100 hover:text-[#772035]">
                        View statements
                    </button>
                </div>
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