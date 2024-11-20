<script>
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

<div class="min-h-screen bg-white flex flex-col items-center p-6">
    <!-- Header -->
    <div class="w-full max-w-4xl bg-white text-white py-4 px-6 rounded-t-lg">
        <h1 class="text-3xl font-bold text-[#772035] text-center">Personal Details</h1>
    </div>

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

        <!-- Gender -->
        <div>
            <label for="gender" class="block text-white font-medium">Gender</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                Male
            </div>
        </div>

        <!-- Aadhar Number -->
        <div>
            <label for="aadharNumber" class="block text-white font-medium">Aadhar Number</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg focus:outline-none">
                1234-5678-9102
            </div>
        </div>

        <!-- PAN Number -->
        <div>
            <label for="panNumber" class="block text-white font-medium">PAN Number</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                ABCD1234E
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