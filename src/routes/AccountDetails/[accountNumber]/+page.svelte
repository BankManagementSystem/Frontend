<script >
    import Navbar from "$lib/components/navbar.svelte"; // Import Navbar
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
    import { page } from '$app/stores';
    import {onMount} from 'svelte';
    import dayjs from 'dayjs';

    function formatDate(dateString) {
        return dayjs(dateString).format('DD-MM-YYYY'); // Format with Day.js
    }

    // Retrieve the account number from route parameters
    const accountNumber = $page.params.accountNumber;

    let accountdetails = [];
    let accountId = accountNumber;
    let accountdeets = {};

    onMount(async () => {
        try {
            const response = await fetch(`/api/get-acc-deets?id=${accountId}`);
            if (response.ok) {
                accountdetails = await response.json();
                accountdeets = accountdetails[0];
                
            } else {
                console.error("Error fetching usernames:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

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

<div class="glass-background flex flex-col justify-center gap-5 items-center h-[120dvh]">
    <div class="flex w-full item-center justify-start   ">
        <div class="ml-2"> <a href="/Accounts">
            <Icon src={BiSolidLeftArrow} size="35" color="#732B41"/>
            </a></div>
        <div class="text-3xl font-bold ml-14 text-[#732B41]">Account Details</div>
    </div>
    <div class="mt-1 p-8 bg-secondary shadow-2xl rounded-lg w-[70%] h-[104dvh] ">
        <!-- General Details Section -->
        <div class="text-2xl font-semibold text-primary border-b-2 border-black h-[7dvh]">General Details</div>
        <div class="flex justify-center border-b-2 border-black h-[55dvh]">
            <div class="flex flex-row gap-20 items-center justify-center text-primary w-[110dvh]">
                <div class="flex flex-col justify-center gap-7 w-1/2 ">
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold">Account Number:</div> <div>{accountNumber}</div></div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold"> Account Holder:</div> <div>{accountdeets.FirstName}{" "}{accountdeets.LastName}</div> </div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold"> Address: </div>  <div>{accountdeets.Address1}</div> </div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold"> State: </div> <div>{accountdeets.State}</div>  </div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold">Phone:</div>  <div>{accountdeets.MobileNo}</div> </div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold">Account Type:</div>  <div>{accountdeets.Type}</div> </div>
                </div>
                <div class="flex flex-col justify-center gap-7 w-1/2 ">
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold">IFSC:</div>  <div>{accountdeets.IFSC}</div> </div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold">Branch:</div>  <div>{accountdeets.BName}</div> </div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold">City:</div>  <div>{accountdeets.City}</div> </div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold">Country:</div>  <div>{accountdeets.country}</div> </div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold">Email:</div>  <div>{accountdeets.Email}</div> </div>
                    <div class="flex flex-row gap-4 items-end text-lg"> <div class="font-bold">Account Open Date:</div>  <div>{formatDate(accountdeets.Date)}</div> </div>
                </div>
            </div>
        </div>
        <!-- Balance Details Section -->
        <div class="h-[21dvh] border-b-2 border-black">
        <div class="mt-6 p-4 bg-gray-100 rounded-lg ">
            <div class="text-xl font-semibold text-[#732B41] mb-4">Balance Details</div>
            <div class="flex flex-row gap-4 text-lg ml-10 mr-10">
                <div class="flex flex-row gap-4 items-end text-lg w-1/2"> <div class="font-bold">Status:</div> <div>{accountdeets.status}</div></div>
                <div class="flex flex-row gap-4 items-end text-lg w-1/2"> <div class="font-bold">Available Balance:</div> <div>₹ {accountdeets.balance}</div> </div>
            </div>
        </div>
        </div>

        <!-- View Statements Button -->
        <a href="/Statements">
        <div class="mt-4">
            <button 
                class="px-6 py-2 bg-primary text-secondary font-semibold rounded-lg shadow-md hover:bg-gray-200">
                View Statements
            </button>
        </div></a>
    </div>
</div>