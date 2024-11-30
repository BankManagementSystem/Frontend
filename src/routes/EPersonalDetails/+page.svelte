<script>
    import { BiSolidLeftArrow } from 'svelte-icons-pack/bi';
    import { Icon } from 'svelte-icons-pack';
    let customerDetails = {
        name: "",
        address: "",
        dob: "",
        gender: "",
        aadharNumber: "",
        panNumber: "",
        phone: "",
        email: "",
        accountNumber: "",
    };
</script>

<div class="w-full bg-[#772035] flex justify-between items-center text-white h-[10dvh]">
    <div><button class="ml-2 text-2xl"><a href="/employeesHome"><Icon src={ BiSolidLeftArrow} className="h-6 w-6"/></a></button></div>
    <div class=" text-2xl font-semibold">Profile</div>
    <div class="mr-6 "></div>
</div>
<div class="min-h-screen bg-white flex flex-col items-center p-6">

    <!-- Form Container -->
    <div class="w-full max-w-lg p-6 rounded-lg shadow-lg bg-[#772035] gap-2 flex flex-col">
        <!-- Name -->
        <div>
            <label for="name" class="block text-white font-medium">Name</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                John Doe
            </div>
        </div>

        <!-- Address -->
        <div>
            <label for="address" class="block text-white font-medium">Address</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                123 Main St
            </div>
        </div>

        <!-- Date of Birth -->
        <div>
            <label for="dob" class="block text-white font-medium">Date of Birth</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                01-01-1990
            </div>
        </div>

        <div>
            <label for="gender" class="block text-white font-medium">Branch</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                Branch
            </div>
        </div>

        <div>
            <label for="gender" class="block text-white font-medium">Manager</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                Manager_Name
            </div>
        </div>
        <!-- Phone -->
        <div>
            <label for="phone" class="block text-white font-medium">Phone</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                +91 9876543210
            </div>
        </div>

        <!-- Email -->
        <div>
            <label for="email" class="block text-white font-medium">Email</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300">
                john.doe@example.com
            </div>
        </div>
    </div>
</div>