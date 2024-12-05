<script lang="ts">
    import { Icon } from "svelte-icons-pack";
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { onMount } from 'svelte';
    import jwt_decode from 'jwt-decode';
    import { goto } from '$app/navigation';

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

    let personaldetails = [];
    let person = {};
    onMount(async () => {
        try {
            const response = await fetch(`/api/personal-details?id=${customerId}`);
            if (response.ok) {
                personaldetails = await response.json();
                person = personaldetails[0];
            } else {
                console.error("Error fetching usernames:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });
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
    <div><button class="ml-2 text-2xl"><a href="/Settin">
        <Icon src={ BiSolidLeftArrow} className="h-6 w-6"/>
        </a>
    </button></div>
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
                {person.FirstName} {person.MiddleName} {person.LastName}
            </div>
        </div>

        <!-- Address -->
        <div>
            <label for="address" class="block text-white font-medium">Address</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                {person.Address1} , {person.City}, {person.District}, {person.State}, {person.ZipCode}
            </div>
        </div>

        <!-- Date of Birth -->
        <div>
            <label for="dob" class="block text-white font-medium">Date of Birth</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                {person.DOB}
            </div>
        </div>

        <!-- Gender -->
        <div>
            <label for="gender" class="block text-white font-medium">Gender</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                {person.Gender}
            </div>
        </div>

        <!-- Aadhar Number -->
        <div>
            <label for="aadharNumber" class="block text-white font-medium">Aadhar Number</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg focus:outline-none">
                {person.AadhaarNo}
            </div>
        </div>

        <!-- PAN Number -->
        <div>
            <label for="panNumber" class="block text-white font-medium">PAN Number</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                {person.PanCardNo}
            </div>
        </div>

        <!-- Phone -->
        <div>
            <label for="phone" class="block text-white font-medium">Phone</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg">
                {person.MobileNo}
            </div>
        </div>

        <!-- Email -->
        <div>
            <label for="email" class="block text-white font-medium">Email</label>
            <div class="bg-white w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-red-300">
                {person.Email}
            </div>
        </div>
    </div>
</div>