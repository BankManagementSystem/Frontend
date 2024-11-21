<script>
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
    import { AiOutlineEyeInvisible } from "svelte-icons-pack/ai";
    import { AiOutlineEye } from "svelte-icons-pack/ai";
    import { AiOutlineCloseCircle } from "svelte-icons-pack/ai";

    let creditPin = '';
    let Pin = '';
    let showPassword1 = false;
    let showPassword2 = false;
    let showPassword3 = false;
    let confirmPIN = '';
    let successMessage = '';

    function handleSubmit() {

    if (!creditPin || !confirmPIN) {
        successMessage = "Please fill in all fields.";
    }
    else if (creditPin === confirmPIN) {
        successMessage = "Successfully changed the login PIN!"; 
    }
    else {
        successMessage = "The new PIN and confirmation PIN do not match.";
    }
    setTimeout(() => {
                    successMessage = ''; // Hide popup after 3 seconds
                }, 3000);
    }
</script>

<div class="flex items-center justify-between bg-[#FDFDFD] text-[#772035] h-[10dvh] font-bold text-3xl border-2 border-black">
    <div class="ml-4">
        <a href="/CreditCards">
        <Icon src={BiSolidLeftArrow}/>
        </a>
    </div>
    <div>Set New PIN</div>
    <div class="mr-4"></div>
</div>

<div class="flex justify-center items-center bg-gradient-to-b from-[#C73659] via-[#E4B9C2] to-[#C73659] h-[90dvh]"> <!-- bg-gradient-to-b from-[#B33150]  to-primary via-[#C73659]--> <!--bg-secondary bg-opacity-[90%]-->
    <div class ="flex flex-col gap-2 rounded-sm justify-center   items-center font-semibold text-lg bg-primary shadow-2xl h-[70dvh] w-[70dvh]">
        <div >Enter PIN</div>
        <div class="relative">
            <input
                type={showPassword3 ? "text" : "password"}
                placeholder="Enter PIN"
                class="w-full px-4 py-2 rounded-md text-gray-900 border-2 border-secondary"
                bind:value={Pin} 
                maxlength="4"
                on:input={(e) => Pin = e.target.value.replace(/[^0-9]/g, "")} 
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

        <div class="mt-2">
            Enter a new 4 digit PIN
        </div>
        <div class="relative">
            <input
                type={showPassword1 ? "text" : "password"}
                placeholder="Enter New PIN"
                class="w-full px-4 py-2 rounded-md text-gray-900 border-2 border-secondary"
                bind:value={creditPin} 
                maxlength="4"
                on:input={(e) => creditPin = e.target.value.replace(/[^0-9]/g, "")} 
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
        <div class="mt-4">
            Re-enter the 4 digit PIN
        </div>
        <div class="relative">
            <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Re-enter to confirm"
                class="w-full px-4 py-2 rounded-md text-gray-900 border-2 border-secondary"
                bind:value={confirmPIN} 
                maxlength="4"
                on:input={(e) => confirmPIN = e.target.value.replace(/[^0-9]/g, "")} 
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
        <div>
            <button on:click={handleSubmit} class="bg-secondary text-primary w-40 text-xl mt-6 py-2 rounded-lg font-semibold mx-auto block">
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
<!--
<style>
    @keyframes gradient-x {
        0%{
            background-position: 0% 50%;
        }
        50%{
            background-position: 100% 50%;
        }
        100%{
            background-position: 0% 50%;
        }
    }
    .animate-gradient-x{
        animation: gradient-x 4s ease infinite;
        background-size: 200% 200%;
    }
</style>
-->