<script lang="ts">
    import { TrOutlineCurrencyRupee } from "svelte-icons-pack/tr";
    import { Button } from "$lib/components/ui/button/index.js";
    import {Icon} from 'svelte-icons-pack';
    import { goto } from '$app/navigation';
	import Navbar from "$lib/components/navbar.svelte";
    import { onMount } from 'svelte';
    import jwt_decode from 'jwt-decode';

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

    //SELECT A.Id, Type, status, balance FROM accounts A, accounttypes A1 WHERE A.Id = A1.AccountId AND A.CustomerId = ?
    let accounts = [];
    let customerId = '';

    onMount (() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwt_decode(token);
            customerId = decoded.id; // Extract the Customer ID
    }
    });

    onMount(async () => {
        try {
            const response = await fetch(`/api/get-accounts?id=${customerId}`);
            if (response.ok) {
                accounts = await response.json();
            } else {
                console.error("Error fetching accounts:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

    /*let accounts = [
        { number: '059622010000925', type: 'Checking', status: 'Active', balance: '1,000.00' },
        { number: '059622010000926', type: 'Savings', status: 'Active', balance: '2500000.00' }
    ];*/

    function viewAccountDetails(accountNumber: string) {
        goto(`/AccountDetails/${accountNumber}`);
    }
</script>
<Navbar/>
<slot/>
<div class="mt-10 ml-14">
    <h2 class="text-3xl font-bold text-[#732B41] ">My Operative Accounts</h2>
</div>
<div class="p-8 flex flex-col items-center h-[67dvh]">
    <div class = "text-xl font-bold text-[#732B41] w-[150dvh]">
        Operatives Account List
    </div>
    <div class=" flex justify-center items-center min-w-full mt-2">
        <table class="shadow-md w-[150dvh] border border-gray-300 bg-white">
            <thead class="bg-[#151515]">
                <tr class="text-[#FDFDFD]">
                    <th class="p-4 text-left border border-gray-300">Account Number</th>
                    <th class="p-4 text-left border border-gray-300">Account Type</th>
                    <th class="p-4 text-left border border-gray-300">Status</th>
                    <th class="p-4 text-left border border-gray-300">Balance</th>
                </tr>
            </thead>
            <tbody>
                {#each accounts as account}
                    <tr class="border-t">
                        <td class="p-4 border border-gray-300">
                            <button 
                                class="hover:underline"
                                on:click={() => viewAccountDetails(account.AccountId)}>
                                {account.AccountId}
                            </button>
                        </td>
                        <td class="p-4 border border-gray-300">{account.Type}</td>
                        <td class="p-4 border border-gray-300">{account.Status}</td>
                        <td class="p-4 border border-gray-300 flex flex-row items-center justify-end"><Icon src={TrOutlineCurrencyRupee}/> {account.balance}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <div class=" mt-6 w-[150dvh]">
        <div class="">
        <Button href="newAccount" class="bg-[#732B41] hover:bg-[#C73659] text-white py-2 px-4 rounded-md">Create New Account</Button>
    </div>
    </div>
</div>