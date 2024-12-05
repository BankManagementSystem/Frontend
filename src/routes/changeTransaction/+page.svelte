<script lang="ts">
    import { Icon } from 'svelte-icons-pack';
    import { AiOutlineCloseCircle } from "svelte-icons-pack/ai";;
    import { AiOutlineEye } from "svelte-icons-pack/ai";
    import { AiOutlineEyeInvisible } from "svelte-icons-pack/ai";
    import jwt_decode from 'jwt-decode';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    let showPassword1 = false;
    let showPassword2 = false;
    let showPassword3 = false;
    let onmessage = "";

    // State variables to store the input values
    let currentPin = "";
    let TransactionPIN = '';
    let newTransactionPIN = '';
    let confirmPIN = '';
    
    

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
    // function handleSubmit() {

    //      if (!TransactionPIN || !newTransactionPIN || !confirmPIN) {
    //         successMessage = "Please fill in all fields.";
    //     }
    //     else if (newTransactionPIN === confirmPIN) {
    //         successMessage = "Successfully changed the transaction PIN!";
    //         goto('/Settin'); 
    //     }
    //     else {
    //         successMessage = "The new PIN and confirmation PIN do not match.";
    //     }
    // }

    // Fetch current PIN on component mount
    onMount(async () => {
        try {
            const response = await fetch('/api/transaction-pin');
            if (response.ok) {
                const data = await response.json();
                TransactionPIN = data.TransactionPIN; // Current PIN from the database
            } else {
                console.error("Error fetching login PIN:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

    // Function to handle PIN update
    async function handleChangePin() {
        // Front-end validation
        if ( !currentPin || !newTransactionPIN || !confirmPIN) {
            onmessage = 'Please fill in all fields.';
            return;
        }

        if (newTransactionPIN != confirmPIN) {
            onmessage = 'The new PIN and confirmation PIN do not match.';
            return;
        }

        try {
            const response = await fetch('/api/transaction-pin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId,
                    currentPin,
                    newTransactionPIN,
                }),
            });

            const result = await response.json();

            if (result.success) {
                onmessage = result.message; // Successfully changed the PIN
                // Clear input fields
                currentPin = '';
                newTransactionPIN = '';
                confirmPIN = '';
                dispatch("submitSuccess");
            } else {
                onmessage = result.message; // Error message from the backend
            }
        } catch (error) {
            console.error('Error changing PIN:', error);
            onmessage = 'An error occurred. Please try again later.';
        }
    }

    // Function to close (navigate or handle logic)
    function handleClose() {
        // Emit the 'close' event to the parent
        dispatch('close');
    }
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div class="bg-[#772035] justify-center text-white rounded-lg shadow-lg w-80 p-6 relative mx-auto block">
    <!-- Close Button at the top-right corner -->
    <button on:click={handleClose} class="absolute top-2 right-2 text-white text-xl z-50">
        <Icon src={AiOutlineCloseCircle} className="h-6 w-6 fill-white" />
    </button>

    <!-- Modal Content -->
    <div class="mb-4">
        <h2 class="text-lg text-center font-semibold">Change Transaction PIN</h2>
    </div>

    <!-- Input Fields -->
    <div class="space-y-4">
        <!-- Enter Login PIN -->
        <div class="relative">
            <input
                type={showPassword1 ? "text" : "password"}
                placeholder="Enter transaction PIN"
                class="w-full px-4 py-2 rounded-md text-gray-900"
                bind:value={currentPin} 
                maxlength="6"
                on:input={(e) => TransactionPIN = e.target.value.replace(/[^0-9]/g, "")} 
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

        <!-- Enter New Transaction PIN -->
        <div class="relative">
            <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Enter new transaction PIN"
                class="w-full px-4 py-2 rounded-md text-gray-900"
                bind:value={newTransactionPIN} 
                maxlength="6"
                on:input={(e) => newTransactionPIN = e.target.value.replace(/[^0-9]/g, "")} 
            />
            <button
                on:click={() => (showPassword2 = !showPassword2)}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
            {#if showPassword2}
                <Icon src={AiOutlineEyeInvisible} className="h-6 w-10 fill-black"/>
            {:else}
                <Icon src={AiOutlineEye} className="h-6 w-10 fill-black"/>
            {/if}
            </button>
        </div>

        <!-- Confirm New Transaction PIN -->
        <div class="relative">
            <input
            type={showPassword3 ? "text" : "password"}
            placeholder="Re-enter to confirm"
            class="w-full px-4 py-2 rounded-md text-gray-900 border border-gray-300"
            bind:value={confirmPIN}
            maxlength="6"
            on:input={(e) => confirmPIN = e.target.value.replace(/[^0-9]/g, "")} 
        />
            <button
                on:click={() => (showPassword3 = !showPassword3)}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
            {#if showPassword3}
                <Icon src={AiOutlineEyeInvisible} className="h-6 w-10 fill-black"/>
            {:else}
                <Icon src={AiOutlineEye} className="h-6 w-10 fill-black"/>
            {/if}
            </button>
        </div>
    </div>

    <!-- Submit Button -->
    <button on:click={handleChangePin} class="bg-white text-[#772035] w-60 mt-6 py-2 rounded-lg font-semibold mx-auto block">
        <span>Submit</span>
    </button>

    <!-- Success Message -->
    {#if onmessage}
        <p class="text-primary mt-4 text-center">{onmessage}</p>
    {/if}
</div>