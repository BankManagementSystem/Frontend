<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { onMount } from "svelte";

    let userId = "";
    let password = "";
    let captcha = "";

    async function handleLogin(event) {
        event.preventDefault(); // Prevent default form submission

        // Prepare the request payload
        const payload = {
            username: userId,
            password: password,
            captcha: captcha
        };

        try {
            // Send a POST request to your Django backend
            const response = await fetch("/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Handle the response from the server
            const result = await response.json();
            if (result.success) {
                alert("Login successful!");
                // Redirect user or update UI as needed
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    }
</script>

<div class="flex flex-col">
    <div class="items-center justify-center mt-6 ml-6 md-0">
        <h1 class = "text-3xl text-red-800">
            Customer Login
        </h1>
    </div>
    <div class="flex justify-center mt-10 h-[65dvh]">
        <div>
            <Card.Root class="w-[350px] bg-[#732B41]">
                <Card.Content>
                <form on:submit={handleLogin}>
                    <div class="grid w-full items-center gap-4">
<<<<<<< HEAD
                    <div class="flex flex-col space-y-1.5 text-[#FDFDFD]">
                        <Label for="name">User ID</Label>
                        <Input id="name" placeholder="Enter user Id"  />
=======
                    <div class="flex flex-col space-y-1.5">
                        <Label class="text-[#FDFDFD]" for="userId">User ID</Label>
                        <Input id="userId" bind:value={userId} placeholder="Enter user Id" />
>>>>>>> 167d7159bc44412fe9e06e0a5ec4c6aa290f6db5
                    </div>
                    <div class="flex flex-col space-y-1.5 ">
                        <Label class="text-[#FDFDFD]" for="name">Password</Label>
                        <Input id="password" bind:value={password} placeholder="Enter password" type="password"/>
                    </div>
                    <div class="flex flex-col space-y-1.5 ">
                        <Label class="text-[#FDFDFD]" for="framework">Verification</Label>
                        <div>
                            <img class="h-10 rounded-lg" src="images/captcha.jpg" alt="Captcha">
                        </div>
                        <Input id="captcha" bind:value={captcha} placeholder="Enter Captcha" />
                    </div>
                    </div>
                </form>
                </Card.Content>
                <Card.Footer class="flex flex-col text-[#732B41]">
                <div><Button variant="outline" type="submit">Login</Button></div>
                <div class="flex flex-col mt-2 justify-start space-y-1.5 text-[#FDFDFD]">
                    <h1>Forgot password?</h1>
                </div>
                </Card.Footer>
            </Card.Root>
        </div>
        <div>
            <img class="w-full h-[66dvh] rounded-lg" src="images/login.png" alt="Login">
        </div>
    </div>
    <div class="flex row mt-16 ml-24 mr-24 justify-between">
        <div>
            <h1>Contact Us: XXXX XXXX XXXX,  XXXX XXX XX XX</h1>
        </div>
        <div>
            <h1>Email: ebank@bankname.co.in</h1>
        </div>
    </div>
</div>