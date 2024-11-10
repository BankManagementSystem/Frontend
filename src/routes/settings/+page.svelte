<script>
    import { BiSolidCog } from "svelte-icons-pack/bi";
    import { BiSolidUserDetail } from "svelte-icons-pack/bi";
    import { BiSolidCalendarEvent } from "svelte-icons-pack/bi";
    import { BiSolidKey } from 'svelte-icons-pack/bi';
</script>

<div class="flex flex-col items-center min-h-screen bg-gray-100">
    <!-- Tab Bar -->
    <div class="w-full bg-gray-900 text-white py-2 text-center">
        <h2 class="text-xl">Tab Bar</h2>
    </div>

    <!-- Settings Header -->
    <div class="w-full bg-maroon-500 flex items-center text-white py-4 px-6">
        <button class="mr-2 text-xl"><BiSolidCog /></button>
        <h1 class="text-2xl font-semibold">Settings</h1>
    </div>

    <!-- Settings Options -->
    <div class="bg-white shadow-md rounded-lg p-6 mt-6">
        <div class="grid grid-cols-2 gap-4">
            <button class="bg-maroon-500 text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <BiSolidUserDetail class="text-2xl mb-2" />
                <span>Personal Details</span>
            </button>

            <button class="bg-maroon-500 text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <BiSolidCalendarEvent class="text-2xl mb-2" />
                <span>Digital Planner</span>
            </button>

            <button class="bg-maroon-500 text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <BiSolidKey class="text-2xl mb-2" />
                <span>Change Login PIN</span>
            </button>

            <button class="bg-maroon-500 text-white rounded-lg flex flex-col items-center justify-center p-4 h-24">
                <BiSolidKey class="text-2xl mb-2" />
                <span>Change Transaction PIN</span>
            </button>
        </div>
    </div>

    <!-- Logout Button -->
    <button class="mt-8 text-maroon-500 text-lg font-semibold">
        Logout
    </button>
</div>

<style>
    .bg-maroon-500 {
        background-color: #800000;
    }
</style>
