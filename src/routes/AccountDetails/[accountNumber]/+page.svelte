<script lang="ts">
    import { page } from '$app/stores';

    // Retrieve account number from route parameters
    const accountNumber = $page.params.accountNumber;

    // Mock data (replace this with API call or database fetch)
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
</script>

<div class="flex flex-col items-center bg-gray-200 min-h-screen p-8">
    <h1 class="text-2xl font-bold mb-4">Account Details</h1>
    <div class="bg-white p-6 shadow-md rounded-lg w-full max-w-2xl">
        <div class="flex flex-col space-y-4">
            <p><strong>Account Number:</strong> {accountDetails.number}</p>
            <p><strong>Account Holder:</strong> {accountDetails.name}</p>
            <p><strong>Branch:</strong> {accountDetails.branch}</p>
            <p><strong>Available Balance:</strong> {accountDetails.balance}</p>
            <!-- Add more fields as needed -->
        </div>
    </div>
</div>
