<script >
    import Navbar from "$lib/components/navbar.svelte"; // Import Navbar
    import { page } from '$app/stores';

    // Retrieve the account number from route parameters
    const accountNumber = $page.params.accountNumber;

    // Mock account details (replace with API call if needed)
    let accountDetails = {
        number: accountNumber,
        ifsc: "UBIN0905968",
        name: "NIDHISH SHETTIGAR",
        branch: "MANGALORE - KADRI",
        address: "SO NAVIN SHETTIGAR 3 137 15 303 ISLAND ENCORE KADRI KAMBLA ROAD MANGALORE",
        city: "MANGALORE",
        state: "Karnataka",
        country: "India",
        phone: "9901062621",
        email: "nidhish.shettigar.06@gmail.com",
        type: "Savings",
        openDate: "07/11/2022",
        status: "Active",
        balance: "INR 1,09,654.00"
    };

    // Function to handle "View Statements" click
    /*function viewStatements() {
        alert(Redirecting to statements for account: ${accountDetails.number});
        // You can replace this alert with routing logic or API call
    }*/
</script>

<Navbar />
<slot/>

<div class="container mx-auto mt-10">
    <div class="text-center">
        <h1 class="text-3xl font-bold text-[#732B41]">Account Details</h1>
    </div>
    <div class="mt-6 p-8 bg-white shadow-md rounded-lg mx-auto w-[70%]">
        <!-- General Details Section -->
        <div class="text-xl font-semibold text-[#732B41] mb-4">General Details</div>
        <div class="grid grid-cols-2 gap-4 text-lg">
            <p><strong>Account Number:</strong> {accountDetails.number}</p>
            <p><strong>IFSC:</strong> {accountDetails.ifsc}</p>
            <p><strong>Account Holder:</strong> {accountDetails.name}</p>
            <p><strong>Branch:</strong> {accountDetails.branch}</p>
            <p><strong>Address:</strong> {accountDetails.address}</p>
            <p><strong>City:</strong> {accountDetails.city}</p>
            <p><strong>State:</strong> {accountDetails.state}</p>
            <p><strong>Country:</strong> {accountDetails.country}</p>
            <p><strong>Phone:</strong> {accountDetails.phone}</p>
            <p><strong>Email:</strong> 
                {accountDetails.email}
            </p>
            <p><strong>Account Type:</strong> {accountDetails.type}</p>
            <p><strong>Account Open Date:</strong> {accountDetails.openDate}</p>
        </div>

        <!-- Balance Details Section -->
        <div class="mt-6 p-4 bg-gray-100 rounded-lg">
            <div class="text-xl font-semibold text-[#732B41] mb-2">Balance Details</div>
            <div class="grid grid-cols-2 gap-4 text-lg">
                <p><strong>Status:</strong> {accountDetails.status}</p>
                <p><strong>Available Balance:</strong> {accountDetails.balance}</p>
            </div>
        </div>

        <!-- View Statements Button -->
        <div class="mt-6 text-center">
            <button 
                
                class="px-6 py-2 bg-[#732B41] text-white font-semibold rounded-lg shadow-md hover:bg-[#5a2132]">
                View Statements
            </button>
        </div>
    </div>
</div>