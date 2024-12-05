<script>
    import {Icon} from 'svelte-icons-pack';
    import {BiSolidLeftArrow} from 'svelte-icons-pack/bi';
    import {goto} from '$app/navigation';

    let Name = '';
    let IFSC = '';
    let Manager = '';
    let NOE = '';
    let Address1 = "";
    let Address2 = "";
    let Address3 = "";
    let Address4 = "";
    let Address5 = "";
    let Phone = '';
    let Email = '';

    async function handleCreate() {
    try {
        const response = await fetch('/api/new-branch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name, IFSC,
                Address1, Address2, Address3, Address4, Address5,
                Manager ,NOE, Phone, Email
            })
        });

        const result = await response.json();

        if (result.success) {
            alert('Branch created successfully!');
            // Optionally redirect to another page
        } else {
            alert(result.message || 'Failed to create Branch.');
        }
    } catch (error) {
        console.error('Error creating Branch:', error);
        alert('An error occurred. Please try again.');
    }
}


    async function handleBack(event) {
        event.preventDefault();
        goto('/EBranches');
    }
</script>

<div class="flex items-center justify-between bg-[#D9D9D9] text-[#772035] h-[10dvh] font-bold text-3xl w-full">
    <div class="ml-4">
        <button on:click={handleBack}>
        <Icon src={BiSolidLeftArrow} />
        </button>
    </div>
    <div>New Branch</div>
    <div class="mr-4"></div>
</div>
<div class="flex items-center justify-center min-h-[90dvh] mt-10">
    <!-- Card -->
    <div class="w-full max-w-md p-6 rounded-lg shadow-lg bg-[#772035]">
        <div>
            <label for="name" class="block text-gray-200 font-semibold mb-1">Branch Name:</label>
            <input required  bind:value={Name} id="name" type="text" placeholder="Enter Branch name" class="w-full p-2 rounded mb-2 bg-primary"  />
        </div>
        <div>
            <label for="ifsc" class="block text-gray-200 font-semibold mb-1">IFSC Code:</label>
            <input required  bind:value={IFSC} id="ifsc" type="text" placeholder="Enter Branch IFSC Code" class="w-full p-2 rounded mb-2 bg-primary"  />
        </div>
                <div>
                <label for="address" class="block text-gray-200 font-semibold mb-1">Address:</label>
                <input required  bind:value={Address1} id="address" type="text" placeholder="Enter Building/House" class="w-full p-2 rounded mb-2 bg-primary" />
                <div class="flex space-x-2">
                    <input required  bind:value={Address2} id="address" type="text" placeholder="Enter City" class="w-1/2 p-2 rounded mb-2 bg-primary" />
                    <input required  bind:value={Address3} id="address" type="text" placeholder="Enter District" class="w-1/2 p-2 rounded mb-2 bg-primary" />
                </div>
                <div class="flex space-x-2">
                    <input required  bind:value={Address4} id="address" type="text" placeholder="Enter State" class="w-1/2 p-2 rounded mb-2 bg-primary" />
                    <input required  bind:value={Address5} id="address" type="text" placeholder="Enter Pincode" class="w-1/2 p-2 rounded mb-2 bg-primary" />
                </div>
            </div>
        <div>
            <label for="mname" class="block text-gray-200 font-semibold mb-1">Branch Manager Id:</label>
            <input required  bind:value={Manager} id="mname" type="text" placeholder="Enter Branch Manager Id" class="w-full p-2 rounded mb-2 bg-primary"  />
        </div>
        <div>
            <label for="number" class="block text-gray-200 font-semibold mb-1">Number of Emplyees:</label>
            <input required  bind:value={NOE} id="number" type="number" placeholder="Enter Number of Employees" class="w-full p-2 rounded mb-2 bg-primary border"  />
        </div>
        <div>
            <label for="number" class="block text-gray-200 font-semibold mb-1">Phone Number:</label>
            <input required  bind:value={Phone} id="number" type="number" placeholder="Enter Phone Number" class="w-full p-2 rounded mb-2 bg-primary border"  />
        </div>
        <div>
            <label for="number" class="block text-gray-200 font-semibold mb-1">Email:</label>
            <input required  bind:value={Email} id="number" type="email" placeholder="Enter Email" class="w-full p-2 rounded mb-2 bg-primary border"  />
        </div>
        <div class="flex justify-center mt-4">
            <button on:click={handleCreate} class="w-1/3 p-2 rounded bg-gray-100 font-semibold text-[#772035]">Add Branch</button>
        </div>
    </div>
</div>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

/* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
</style>