<script>
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { Icon } from "svelte-icons-pack";
</script>

<div class="mt-10 flex flex-col">
    <div class="text-3xl font-bold ml-2 flex flex-row items-center">
        <div><a href="/CreditCards"> <Icon src={BiSolidLeftArrow}/> </a></div>
        <div>Transaction History</div>   
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
    <div class="flex flex-row border-2 border-black h-[15dvh] items-center font-bold justify-between">
        <div class="flex flex-col ml-4 items-center justify-center w-[20dvh]">
            <div>
                30 OCT
            </div>
            <div>
                2024
            </div>
        </div>
        <div class="w-[90dvh] flex justify-center">
            UPICC/MOB/429440387632/Smart Point Mangalore/UPI
        </div>
        <div class="flex flex-row w-[28dvh] justify-start items-start gap-3 mr-8" >
            <div class=" w-[45dvh] flex justify-end">
                ₹ 100.00
            </div>  
            <div class="">
                DR
            </div>
        </div>
    </div>
    <div class="flex flex-row border-2 border-black h-[15dvh] items-center font-bold justify-between">
        <div class="flex flex-col ml-4  items-center justify-center w-[20dvh]">
            <div>
                30 OCT
            </div>
            <div>
                2024
            </div>
        </div>
        <div class="w-[90dvh] flex justify-center">
            UPICC/MOB/429440387632/Smart Point Mangalore/UPI
        </div>
        <div class="flex flex-row w-[28dvh] justify-start items-start gap-3 mr-8" >
            <div class=" w-[45dvh] flex justify-end">
                ₹ 100.00
            </div>  
            <div class="">
                DR
            </div>
        </div>
    </div>
</div>