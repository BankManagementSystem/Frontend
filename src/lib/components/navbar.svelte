<script>
    import { IoSettingsOutline } from "svelte-icons-pack/io";
    import { CgProfile } from "svelte-icons-pack/cg";
    import {Icon} from "svelte-icons-pack";
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex flex-col bg-[#772035] h-[20vh] text-[#FDFDFD]">
    <div class="flex flex-row justify-between ml-10 mr-10 mt-2 items-center h-[10dvh]">
        <div class="text-2xl font-bold"><a href="./">NITTE Bank</a></div>
        <div class="flex flex-row gap-4">
            <div class="text-white"><Icon src={CgProfile} size="40" /></div> 
            <!--<div class="text-white"><Icon src={IoSettingsOutline} size="40" /></div> -->
            <button class="bg-white rounded-full hover:bg-gray-200">
                <Icon src={IoSettingsOutline} size="40" />
            </button>
        </div>
    </div>
    <div class="flex flex-row justify-between ml-24 mr-24 mt-2 font-bold text-2xl items-center  h-[8dvh]">
        <div><a href="./Home">Home</a></div>
        <div><a href="./Accounts">Accounts</a></div>
        <div><a href="./Transfer-details">Transfer</a></div>
        <div><a href="./Cards">Cards</a></div>
        <div><a href="./Loans">Loans</a></div>
    </div>
</div>