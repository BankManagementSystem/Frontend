<script>
    import { Icon } from 'svelte-hero-icons';
    import { AiOutlineClose } from "svelte-icons-pack/ai";;
    import { AiOutlineEye } from "svelte-icons-pack/ai";
    import { goto } from '$app/navigation';
    let showPassword = false;

    // State variables to store the input values
    let loginPIN = '';
    let newLoginPIN = '';
    let confirmPIN = '';
    let successMessage = '';
     
    function handleSubmit() {

         if (!loginPIN || !newLoginPIN || !confirmPIN) {
            successMessage = "Please fill in all fields.";
        }
        else if (newLoginPIN === confirmPIN) {
            successMessage = "Successfully changed the login PIN!";
            goto('./settings'); 
        }
        else {
            successMessage = "The new PIN and confirmation PIN do not match.";
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
        <Icon src={AiOutlineClose} class="h-6 w-6 fill-white" />
    </button>

    <!-- Modal Content -->
    <div class="mb-4">
        <h2 class="text-lg text-center font-semibold">Change login PIN</h2>
    </div>

    <!-- Input Fields -->
    <div class="space-y-4">
        <!-- Enter Login PIN -->
        <div class="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter login PIN"
                class="w-full px-4 py-2 rounded-md text-gray-900"
                bind:value={loginPIN} 
            />
            <button
                on:click={() => (showPassword = !showPassword)}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
                <Icon src={AiOutlineEye} class="h-6 w-10 fill-black" />
            </button>
        </div>

        <!-- Enter New Login PIN -->
        <div class="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new login PIN"
                class="w-full px-4 py-2 rounded-md text-gray-900"
                bind:value={newLoginPIN} 
            />
            <button
                on:click={() => (showPassword = !showPassword)}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
                <Icon src={AiOutlineEye} class="h-6 w-10 fill-black" />
            </button>
        </div>

        <!-- Confirm New Login PIN -->
        <div class="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter to confirm"
                class="w-full px-4 py-2 rounded-md text-gray-900"
                bind:value={confirmPIN} 
            />
            <button
                on:click={() => (showPassword = !showPassword)}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
                <Icon src={AiOutlineEye} class="h-6 w-10 fill-black" />
            </button>
        </div>
    </div>

    <!-- Submit Button -->
    <button on:click={handleSubmit} class="bg-white text-[#772035] w-60 mt-6 py-2 rounded-lg font-semibold mx-auto block">
        <span>Submit</span>
    </button>

    <!-- Success Message -->
    {#if successMessage}
        <p class="text-green-500 mt-4 text-center">{successMessage}</p>
    {/if}
</div>
