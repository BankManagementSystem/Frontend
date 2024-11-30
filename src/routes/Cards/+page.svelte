<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import {onMount} from 'svelte';
    import { Button } from "$lib/components/ui/button/index.js";
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
</script>
<Navbar/>
<slot/>

<div class="flex flex-col  text-[#772035] h-[80dvh] ml-10 mr-96">
    <div class="font-bold mt-6 text-3xl ">Debit Card</div>
    <div class = "bg-primary flex flex-col gap-2 mt-5 h-[15dvh] justify-center rounded-2xl border-solid border-2 shadow-xl border-[#772035] ">
        <div class="ml-6">
            Fetch your debit card details by clicking on view cards.
        </div>
        <div class="ml-6">
            <Button variant="outline" href="/DebitCards" class="rounded-full text-[#FDFDFD] bg-[#772035]" > View Cards </Button>
        </div>
    </div>  
    <div class="font-bold mt-6 text-3xl ">Credit Card</div>
    <div class = "flex flex-col gap-2 mt-5 h-[15dvh] justify-center rounded-2xl border-solid border-2 shadow-xl border-[#772035]">
        <div class="ml-6">
            Add credit card and get access to all services.
        </div>
        <div class="ml-6">
            <Button variant="outline" class="rounded-full text-[#FDFDFD] bg-[#772035]" href="/NewCreditCard"> Apply Now </Button>
        </div>
    </div> 
    <div class = "flex flex-col gap-2 mt-5 h-[15dvh] justify-center rounded-2xl border-solid border-2 shadow-xl border-[#772035] ">
        <div class="ml-6">
            Fetch your credit card details by clicking on view cards.
        </div>
        <div class="ml-6">
            <Button variant="outline" class="rounded-full text-[#FDFDFD] bg-[#772035]" href="/CreditCards"> View Cards </Button>
        </div>
    </div> 
</div>