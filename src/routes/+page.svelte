<script>
    import { FaCreditCard } from "svelte-icons-pack/fa";
    import { Icon } from "svelte-icons-pack";
    import { BsTelephone } from "svelte-icons-pack/bs";
    import { ImUserPlus } from "svelte-icons-pack/im";
    import { BsCreditCard2Front } from "svelte-icons-pack/bs";
    import { TrOutlinePigMoney } from "svelte-icons-pack/tr";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    const logins = [
    {
        value: "Customer",
        label: "Customer"
    },
    {
        value: "Employee",
        label: "Employee"
    }
    ];

    let login = $state("");

    const selectedFramework = $derived(
    logins.find((f) => f.value === login)?.label ?? ""
);
</script>

<div class="bg-[#772035] h-[100dvh] flex flex-col">
    <div class = "flex flex-row justify-between h-10 ml-12 mr-12 mt-6 text-[#FDFDFD]">
        <div class="text-3xl"><h1>Nitte Bank</h1></div>
        <div class="bg-[#FDFDFD] flex border-spacing-2 rounded-full w-20 h-[7dvh] justify-center items-center">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger class="text-[#772035] font-semibold text-xl">Login</DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Group>
                        <DropdownMenu.GroupHeading>Log on to <br>internet banking</DropdownMenu.GroupHeading>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item><a href="./login">Customer</a></DropdownMenu.Item>
                        <DropdownMenu.Item><a href="./employeelogin">Employee</a></DropdownMenu.Item>
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    </div>
    <div class="bg-gray-500 mt-9">
        <img class="w-full h-[45dvh]" src="images/home.png" alt="Login">
    </div>
    <div class="ml-24 flex flex-row mt-10 mr-24 h-[35dvh] justify-between ">
        <div class="w-[80dvh] flex flex-col bg-[#FDFDFD] gap-2 rounded-3xl top-[57%] h-[35dvh] left-[10%] absolute shadow-md shadow-white">
                <div class="ml-10 mt-4 text-black font-bold  ">OFFERS FOR YOU!</div>
                <div class="flex flex-row justify-center gap-2 ">
                    <a href="./newAccount">
                    <div class="flex flex-row gap-2 w-52 items-center justify-center ">
                        <div class="flex flex-row ml-2 items-center justify-center"><Icon src={ImUserPlus} className="h-6 w-10 fill-black"/></div>
                        <div class="flex flex-col">
                        <div class="text-black font-bold">New Account</div>
                        <div class="text-black">Create your new account online</div>
                        </div>
                        
                    </div>
                    </a>
                    <a href="/NewCreditCard">
                    <div class="flex flex-row gap-2 w-52 items-center justify-center ">
                        <div class="flex flex-row ml-2 items-center justify-center"><Icon src={FaCreditCard} className="h-6 w-10 fill-black"/></div>
                        <div class="flex flex-col">
                            <div class="text-black font-bold">Credit Cards</div>
                            <div class="text-black">Get the right card for you</div>
                        </div>
                    </div>
                    </a>
                </div>
                <div class=" flex flex-row justify-center gap-2">
                    <a href="./Loans">
                        <div class="flex flex-row gap-2 w-52 items-center  ">
                        <div class="flex flex-row ml-2 items-center justify-center"><Icon src={TrOutlinePigMoney} className="h-6 w-10"/></div>
                        <div class="flex flex-col">
                        <div class="text-black font-bold">Loans</div>
                        <div class="text-black">For all your personal needs</div>
                        </div>
                    </div>
                    </a>
                    <a href="./Home">
                    <div class="flex flex-row gap-2 w-52 items-center justify-center ">
                        <div class="flex flex-row ml-2 items-center justify-center"><Icon src={BsCreditCard2Front} className="h-6 w-10 fill-black"/></div>
                        <div class="flex flex-col">
                            <div class="text-black font-bold mr-4">Fixed Deposits</div>
                            <div class="text-black">Invest wisely with our FD</div>
                        </div>
                    </div>
                    </a>
                </div>
        </div>
        <div class="w-1/3 bg-[#FDFDFD] rounded-3xl top-[57%] left-[57%] absolute h-[35dvh] shadow-md shadow-white">
            <div class="flex flex-col items-start justify-start h-[35dvh] w-[60dvh] ">
                <div class="ml-6 mt-10 text-2xl font-semibold">For your banking needs and queries</div>
                <div class="ml-6 mt-4 text-2xl font-bold flex flex-row items-center gap-3">
                    <div><Icon src={BsTelephone} color="#772035 "/></div>
                    <div>1800 5700, 1800 5800</div>
                </div>
            </div>
        </div>
    </div>
</div>

