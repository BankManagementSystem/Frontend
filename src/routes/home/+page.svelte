<script>
    import Navbar from '$lib/components/navbar.svelte';
    import { FiEye, FiEyeOff } from "svelte-icons-pack/fi";
    import { Icon } from "svelte-icons-pack";
    import {onMount} from "svelte";
    import Autoplay from "embla-carousel-autoplay";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js"; 
    import * as Card from "$lib/components/ui/card/index.js";
    const numbs = [ 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let accountNumber = "Enter Id to fetch";
    let availableBalance = "Not Available";
    let isBalanceVisible = false;
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

    const plugin = Autoplay({ delay: 3000, stopOnInteraction: true });
</script>
<Navbar/>
<slot/>
<div class="flex flex-row">
    <div class="w-[80vh] h-[80vh] flex flex-col">
        <div class="ml-14 mt-14 w-[60dvh] h-[35dvh] bg-gradient-to-r from-[#1D1A3E] to-[#3F5E75] rounded-2xl shadow-lg p-5 text-white relative">
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
        </div>

        <div class="flex flex-col gap-8 mt-4 ml-14 justify-center items-center w-[60dvh] h-[30dvh]">
                <div>
                    <a href="/Accounts">
                    <button class=" bg-[#FDFDFD] rounded-3xl w-[50dvh] h-[8dvh] text-black text-2xl font-semibold border-2 border-black shadow-lg hover:bg-gray-100 hover:text-[#772035]">
                        View all accounts
                    </button></a>
                </div>
                <div>
                    <button class=" bg-[#FDFDFD] rounded-3xl w-[50dvh] h-[8dvh] text-black text-2xl font-semibold border-2 border-black shadow-lg hover:bg-gray-100 hover:text-[#772035]">
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
            class="w-[90dvh] h-[70dvh]">
            <Carousel.Content class="">
                {#each numbs as num}
                <Carousel.Item class="">
                    
                    <img
                        class="w-full h-[70dvh] object-cover rounded-xl"
                        src="images/landingBg{num}.jpg"
                        alt="Bg{num}"
                    />
                </Carousel.Item>
                {/each}
            </Carousel.Content>
            </Carousel.Root>
    </div>
</div>