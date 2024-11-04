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
    <div class = "flex flex-row justify-between h-10 ml-12 mr-12 mt-6 text-3xl text-[#FDFDFD] bg-gray-600">
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
    <div class="ml-24 flex flex-row mt-10 mr-24 h-[30dvh] justify-between bg-green-300">
        <div class="w-1/3 bg-[#FDFDFD]">
            ho
        </div>
        <div class="w-1/3 bg-[#3d2424]">
            hi
        </div>
    </div>
</div>

