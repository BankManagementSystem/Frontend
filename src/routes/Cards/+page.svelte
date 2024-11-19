<script>
    import Navbar from "$lib/components/navbar.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
</script>
<Navbar/>
<slot/>

<div class="flex flex-col  text-[#772035] h-[80dvh] ml-10 mr-96">
    <div class="font-bold mt-6 text-3xl ">Debit Card</div>
    <div class = "bg-primary flex flex-col gap-2 mt-5 h-[15dvh] justify-center rounded-2xl border-solid border-2 shadow-xl border-[#772035] ">
        <div class="ml-6">
            Fetch your debit card details by clicking on view cards.
        </div>
        <div class="ml-6">
            <Button variant="outline" href="/DebitCards" class="rounded-full text-[#FDFDFD] bg-[#772035]" > View Cards </Button>
        </div>
    </div>  
    <div class="font-bold mt-6 text-3xl ">Credit Card</div>
    <div class = "flex flex-col gap-2 mt-5 h-[15dvh] justify-center rounded-2xl border-solid border-2 shadow-xl border-[#772035]">
        <div class="ml-6">
            Add credit card and get access to all services.
        </div>
        <div class="ml-6">
            <Button variant="outline" class="rounded-full text-[#FDFDFD] bg-[#772035]"> Apply Now </Button>
        </div>
    </div> 
    <div class = "flex flex-col gap-2 mt-5 h-[15dvh] justify-center rounded-2xl border-solid border-2 shadow-xl border-[#772035] ">
        <div class="ml-6">
            Fetch your credit card details by clicking on view cards.
        </div>
        <div class="ml-6">
            <Button variant="outline" class="rounded-full text-[#FDFDFD] bg-[#772035]" href="/CreditCards"> View Cards </Button>
        </div>
    </div> 
</div>