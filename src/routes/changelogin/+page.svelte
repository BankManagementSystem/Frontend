<script>
    import { Icon } from 'svelte-icons-pack';
    import { AiOutlineEyeInvisible } from "svelte-icons-pack/ai";
    import { AiOutlineEye } from "svelte-icons-pack/ai";
    import { AiOutlineCloseCircle } from "svelte-icons-pack/ai";
    import { goto } from '$app/navigation';
    let showPassword1 = false;
    let showPassword2 = false;
    let showPassword3 = false;

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
            goto('./Settin'); 
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
    <button on:click={handleClose} class="absolute top-2 right-2 h-6 w-6 text-xl z-50">
        <Icon src={AiOutlineCloseCircle} />
    </button>

    <!-- Modal Content -->
    <div class="mb-4">
        <h2 class="text-2xl text-center font-semibold">Change login PIN</h2>
    </div>

    <!-- Input Fields -->
    <div class="space-y-4">
        <!-- Enter Login PIN -->
        <div class="relative">
            <input
                type={showPassword1 ? "text" : "password"}
                placeholder="Enter login PIN"
                class="w-full px-4 py-2 rounded-md text-gray-900"
                bind:value={loginPIN} 
                maxlength="4"
                on:input={(e) => loginPIN = e.target.value.replace(/[^0-9]/g, "")} 
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

        <!-- Enter New Login PIN -->
        <div class="relative">
            <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Enter new login PIN"
                class="w-full px-4 py-2 rounded-md text-gray-900"
                bind:value={newLoginPIN} 
                maxlength="4"
                on:input={(e) => newLoginPIN = e.target.value.replace(/[^0-9]/g, "")} 
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

        <!-- Confirm New Login PIN -->
        <div class="relative">
            <input
                type={showPassword3 ? "text" : "password"}
                placeholder="Re-enter to confirm"
                class="w-full px-4 py-2 rounded-md text-gray-900"
                bind:value={confirmPIN} 
                maxlength="4"
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
    <button on:click={handleSubmit} class="bg-white text-[#772035] w-40 text-xl mt-6 py-2 rounded-lg font-semibold mx-auto block">
        <span>Submit</span>
    </button>

    <!-- Success Message -->
    {#if successMessage}
        <p class="text-white mt-4 text-center">{successMessage}</p>
    {/if}
</div>
