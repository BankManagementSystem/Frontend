<script lang="ts">
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import jwt_decode from 'jwt-decode';

    onMount(() => {
		const details = localStorage.getItem('accountNumber');
		if (details) {
			accountId = JSON.parse(details);
            console.log(accountId)
		}
	});

    function handleBack(){
        localStorage.removeItem('accountNumber');
        goto(`/AccountDetails/${accountId}`);
    }

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
    let statements = [];
    let customerId = '';
    let accountId = '';
    async function fetchTransactions() {
        try {
            const response = await fetch(`/api/statements?id=${accountId}`);
            if (response.ok) {
                statements = await response.json();
            } else {
                console.error("Error fetching transactions:", await response.text());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }
    onMount(() => {
        fetchTransactions();
    });
    /*
    let Id = 300000000000;
    let Amount = 100.00;
    let Method = "UPI";
    let Receiver = "Sanidhya";
    let Brand = "Rupay";
    */
    function formatDate(date){
    const months = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    const d = new Date(date);
    return {
        day: d.getDate(),
        month: months[d.getMonth()],
        year: d.getFullYear()
    };
    }
</script>

<div class="mt-10 flex flex-col">
    <div class="text-3xl font-bold ml-2 flex flex-row justify-between items-center">
        <div class="w-10"><button on:click={handleBack}><Icon src={BiSolidLeftArrow}/></button></div>
        <div>Statements</div>   
        <div class="mr-4 w-10"></div>
    </div>
    <div class="flex flex-row border-2 border-black h-[9dvh] items-center font-bold text-xl bg-[#D9D9D9] justify-between mt-5">
        <div class="ml-14">
            Date
        </div>
        
        <div class="ml-96">
            Particulars
        </div>
        <div class="flex flex-row gap-6 mr-12">
            <div class="ml-96 ">
                Amount
            </div>
            <div class="">
                
            </div>
        </div>
    </div>
    {#each statements as transaction}
    <div class="flex flex-row border-2 border-black h-[15dvh] items-center font-bold justify-between">
        <div class="flex flex-col ml-4 items-center justify-center w-[20dvh]">
            <div>
                {formatDate(transaction.Date).day} {formatDate(transaction.Date).month}
            </div>
            <div>
                {formatDate(transaction.Date).year}
            </div>
        </div>
        <div class="w-[90dvh] flex justify-center">
            {transaction.Method}/{transaction.Id}/{transaction.Receiver}/{transaction.Name}
        </div>
        <div class="flex flex-row w-[28dvh] justify-start items-start gap-3 mr-8" >
            <div class=" w-[45dvh] flex justify-end">
                ₹ {transaction.Amount.toFixed(2)}
            </div>  
            <div class="">
                {transaction.Type}
            </div>
        </div>
    </div>
    {/each}
</div>