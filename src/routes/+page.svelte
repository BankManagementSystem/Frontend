<script>
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
    <div class = "flex flex-row justify-between h-10 ml-12 mr-12 mt-6 text-3xl text-[#FDFDFD]">
        <div><h1>Bank Name</h1></div>
        <div class="bg-[#FDFDFD] flex border-spacing-2 rounded-full w-28 justify-center items-center">
            <DropdownMenu.Root>
            <DropdownMenu.Trigger class="text-[#772035] text-1xl ">Login</DropdownMenu.Trigger>
            <DropdownMenu.Content>
            <DropdownMenu.Group>
                <DropdownMenu.GroupHeading>Log on to <br>internet banking</DropdownMenu.GroupHeading>
                <DropdownMenu.Separator />
                <DropdownMenu.Item><a href="./login">Customer</a></DropdownMenu.Item>
                <DropdownMenu.Item><a href="./employeelogin">Employee</a></DropdownMenu.Item>
            </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root></div>
    </div>
    <div class="bg-gray-500 mt-16">
        <img class="w-full h-[35dvh]" src="images/home.png" alt="Login">
    </div>
    <div class="ml-24 flex flex-row mt-10 mr-24 h-[30dvh] justify-between ">
        <div class="w-3/6 flex flex-col bg-[#FDFDFD] gap-2 rounded-3xl">
                <div class="ml-4 mt-4 text-black">OFFERS FOR YOU!</div>
                <div class="flex flex-row gap-14">
                    <div class="ml-16 flex flex-col">
                        <div class="text-black font-bold">Credit Cards</div>
                        <div class="text-black">Get the right card for you</div>
                    </div>
                    <div class="mr-6     flex flex-col ">
                        <div class="text-black font-bold">Debit Card</div>
                        <div class="text-black">A perfect debit card for you</div>
                    </div>
                </div>
                <div class="flex flex-row gap-28">
                    <div class="ml-16 flex flex-col">
                        <div class="text-black font-bold">Loans</div>
                        <div class="text-black">For all your needs</div>
                    </div>
                    <div class="mr-6 justify-left flex flex-col ">
                        <div class="text-black font-bold mr-4">Fixed Deposit</div>
                        <div class="text-black">Invest wisely with our FD</div>
                    </div>
                </div>
        </div>
        <div class="w-1/3 bg-[#FDFDFD] rounded-3xl">
            hi
        </div>
    </div>
</div>

