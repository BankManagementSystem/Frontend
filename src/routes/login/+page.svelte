<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';

    let userId = "";
    let password = "";
    let captcha = "";
    let ocaptcha = "W93BX";
    let errorMessage = "";
    let successLogin = false;
    let isLoading = false;

    let errorMes = "";


    async function handleLogin(event) {
    if (captcha === ocaptcha){
            errorMes = "The UserId or Password is invalid.";
    }else{
            errorMes = "Captcha is Invalid";
            successLogin = true;
            setTimeout(() => {
                    successLogin = false; // Hide popup after 3 seconds
                }, 5000);
            return;
    }
    event.preventDefault();
    console.log("Function triggered");
    const payload = {
        username: userId,
        password: password,
        captcha: captcha,
    };

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, password }),
        });

        const result = await response.json();
        console.log('API Response:', result); // Log the response for debugging

        if (result.success) {
            isLoading = true;
            localStorage.setItem('authToken', result.token);
            //alert("Login successful!");
            await new Promise(resolve => setTimeout(resolve, 2500));
            goto('/Home'); // Redirect to Home page
        } else {
            successLogin = true;
            setTimeout(() => {
                    successLogin = false; // Hide popup after 3 seconds
                }, 5000);
            //alert("Login Unsuccessful!")
            errorMessage = result.message || "Login failed.";
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred. Please try again.");
    }finally{
        isLoading = false;
    }
}
</script>

<div class="flex flex-col">
    <div class="items-center justify-center mt-6 ml-6 md-0">
        <h1 class = "text-3xl text-red-800">
            Customer Login
        </h1>
    </div>
    <div class="mt-2 ml-64 h-[5dvh]">
        {#if successLogin}
        <div class="flex  items-center w-[46dvh]" >
            <div class="text-red-700 font-semibold flex items-center text-center">
                {errorMes}
            </div>
        </div>
        {/if}
    </div>
    <div class="flex justify-center h-[65dvh]">
        <div>
            <Card.Root class="w-[350px] bg-[#732B41]">
                <Card.Content>
                <form on:submit={handleLogin}>
                    <div class="grid w-full items-center gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <Label class="text-[#FDFDFD]" for="userId">User ID</Label>
                        <Input id="userId" bind:value={userId} placeholder="Enter user Id" />
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
                <div><button type="button" class="outline-button-class bg-primary text-secondary w-20 h-10 rounded-md hover:bg-[#C73659] hover:text-white" on:click={handleLogin}>
                    Login
                </button></div>
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
            <h1>Contact Us: 1800 5700, 1800 5800</h1>
        </div>
        <div>
            <h1>Email: ebank@nittebank.co.in</h1>
        </div>
    </div>
    {#if isLoading}
        <div class="popup">
            <div class="popup-content">
                <div class="spinner"></div>
                <p>Logging in, please wait...</p>
            </div>
        </div>
    {/if}
</div>
<style>
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .popup-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    }
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-top-color: #732B41;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 10px auto;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>