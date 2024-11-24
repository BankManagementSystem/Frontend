<!--<script lang="ts">
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
    import { AiOutlineEyeInvisible } from "svelte-icons-pack/ai";
    import { AiOutlineEye } from "svelte-icons-pack/ai";
    import { goto } from '$app/navigation';
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
            const response = await fetch(`/api/pay-bill?id=${customerId}`);
            if (response.ok) {
                accounts = await response.json();
            } else {
                console.error("Error fetching usernames:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

    let amount = '';
    let Account = '';
    let showPassword1 = false;
    let PIN = '';
    let successMessage = '';

    async function handleSubmit() {
        const selectedAccount = accounts.find(account => account.AccountId === Account);

        if (!PIN || !amount || !Account) {
            successMessage = "Please fill in all fields.";
        } else if (!selectedAccount) {
            successMessage = "Invalid account selected.";
        } else if (parseFloat(amount) > selectedAccount.balance) {
            successMessage = "Amount exceeds available balance.";
        } else if (PIN != selectedAccount.TPin) {
            successMessage = "Invalid transaction PIN.";
        } else {
            await updateBalances(customerId, Account, parseFloat(amount));
            successMessage = "Transaction successful!";
            // Additional logic for successful submission (e.g., update balances, API calls)
        }

        setTimeout(() => {
            successMessage = ''; // Hide popup after 3 seconds
        }, 3000);
    }

    export async function updateBalances(customerId, accountId, amount) {
    try {
        const response = await fetch('/api/pay-bill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerId,
                accountId,
                amount,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); // Show success message
        } else {
            alert(data.message || "Failed to update balances");
        }
    } catch (error) {
        console.error("Error updating balances:", error);
        alert("An error occurred. Please try again.");
    }
}
</script>-->
<script lang="ts">
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
    import { AiOutlineEyeInvisible } from "svelte-icons-pack/ai";
    import { AiOutlineEye } from "svelte-icons-pack/ai";
    import { goto } from '$app/navigation';
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

    onMount (() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = jwt_decode(token);
            customerId = decoded.id; // Extract the Customer ID
    }
    });

    onMount(async () => {
        try {
            const response = await fetch(`/api/pay-bill?id=${customerId}`);
            if (response.ok) {
                accounts = await response.json();
            } else {
                console.error("Error fetching usernames:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

    let accounts = [];
    let customerId = '';
    let amount = '';
    let Account = '';
    let showPassword1 = false;
    let PIN = '';
    let successMessage = '';

    // Utility function to hash PIN using SHA-256
    async function hashPIN(pin: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(pin);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    async function handleSubmit() {
        const selectedAccount = accounts.find(account => account.AccountId === Account);

        if (!PIN || !amount || !Account) {
            successMessage = "Please fill in all fields.";
        } else if (!selectedAccount) {
            successMessage = "Invalid account selected.";
        } else if (parseFloat(amount) > selectedAccount.balance) {
            successMessage = "Amount exceeds available balance.";
        } else {
            // Hash the PIN before sending it to the backend
            const hashedPIN = await hashPIN(PIN);

            await updateBalances(customerId, Account, parseFloat(amount), hashedPIN);
        }

        setTimeout(() => {
            successMessage = ''; // Hide popup after 3 seconds
        }, 3000);
    }

    export async function updateBalances(customerId, accountId, amount, hashedPIN) {
        try {
            const response = await fetch('/api/pay-bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId,
                    accountId,
                    amount,
                    hashedPIN,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                successMessage  = data.message; // Show success message
            } else {
                successMessage = data.message || "Failed to update balances";
            }
        } catch (error) {
            console.error("Error updating balances:", error);
            alert("An error occurred. Please try again.");
        }
    }
</script>

<div class="flex items-center justify-between bg-[#FDFDFD] text-[#772035] h-[10dvh] font-bold text-3xl border-2 border-black">
    <div class="ml-4">
        <a href="/CreditCards">
        <Icon src={BiSolidLeftArrow}/>
        </a>
    </div>
    <div>Pay Bill</div>
    <div class="mr-4"></div>
</div>

<div class="flex justify-center items-center bg-gradient-to-b from-[#C73659] via-[#E4B9C2] to-[#C73659] h-[90dvh]"> <!-- bg-gradient-to-b from-[#B33150]  to-primary via-[#C73659]--> <!--bg-secondary bg-opacity-[90%]-->
    <div class ="flex flex-col gap-2 rounded-sm justify-center items-center font-semibold text-lg bg-secondary text-white shadow-2xl h-[70dvh] w-[70dvh]">
        <div class="">Select Account</div>
        <div class="relative">
            <select required
                bind:value={Account}
                id = "account"
                class="w-[41dvh] px-4 py-2 rounded-md bg-primary text-gray-900 hover:bg-primary focus:ring-2 focus:ring-[#A12A48]">
                <option value="" disabled selected class="" >Select Account</option>
                {#each accounts as account}
                <option value={account.AccountId} class="bg-secondary text-primary">{account.AccountId}</option>                    
                {/each}
            </select>
        </div>

        <div class="mt-2">
            Enter Amount
        </div>
        <div class="relative">
            <input
                type="number"
                placeholder="Enter Payment Amount"
                class="w-[41dvh] px-4 py-2 rounded-md text-gray-900 border-2 border-secondary no-spinner"   
                bind:value={amount}  
            />
        </div>
        <div class="mt-4">
            Enter Transaction PIN
        </div>
        <div class="relative">
            <input
                type={showPassword1 ? "text" : "password"}
                placeholder="Enter PIN"
                class="w-[41dvh] px-4 py-2 rounded-md text-gray-900 border-2 border-secondary"
                bind:value={PIN} 
                maxlength="6"
                on:input={(e) => PIN = e.target.value.replace(/[^0-9]/g, "")} 
            />
            <button
                on:click={() => (showPassword1 = !showPassword1)}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
            {#if showPassword1}
                <Icon src={AiOutlineEyeInvisible} className="h-6 w-10 fill-black"/>
            {:else}
                <Icon src={AiOutlineEye} className="h-6 w-10 fill-black"/>
            {/if}
            </button>
        </div>
        <div>
            <button on:click={handleSubmit} class="bg-primary text-secondary hover:bg-gray-200 w-40 text-xl mt-6 py-2 rounded-lg font-semibold mx-auto block">
                <span>Submit</span>
            </button>
        </div>
    </div>
</div>
{#if successMessage}
<div class="top-[10%] left-[81%] flex justify-center items-center h-[10dvh] w-[40dvh] absolute bg-primary shadow-2xl rounded-xl" >
    <div class="text-black font-semibold flex justify-center items-center text-center">
        {successMessage}
    </div>
</div>
{/if}

<style>

.no-spinner::-webkit-inner-spin-button,

.no-spinner::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.no-spinner {
  -moz-appearance: textfield; /* For Firefox */
}
</style>
