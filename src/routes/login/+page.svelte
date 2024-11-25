<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { onMount } from "svelte";
    import { Icon } from 'svelte-icons-pack';
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { goto } from '$app/navigation';
    import { AiOutlineReload } from "svelte-icons-pack/ai";

    let userId = "";
    let password = "";
    let captcha = "W93BX";
    let ocaptcha = "W93BX";
    let generatedCaptcha = "";
    let enteredCaptcha = "";
    let errorMessage = "";
    let successLogin = false;
    let isLoading = false;
    let errorMes = "";

    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const digits = "0123456789";


    function generateCaptcha() {
        const first = alphabets[Math.floor(Math.random() * alphabets.length)];
        const second = digits[Math.floor(Math.random() * digits.length)];
        const third = digits[Math.floor(Math.random() * digits.length)];
        const fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
        const fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
        const sixth = digits[Math.floor(Math.random() * digits.length)];
        // Combine all characters to form the captcha
        generatedCaptcha = `${first}${second}${third}${fourth}${fifth}${sixth}`;
        enteredCaptcha = ""; // Clear the input field
    }

    function validateCaptcha() {
        if (enteredCaptcha === generatedCaptcha) {
            return true;
        }
        return false;
    }

    async function handleLogin(event) {
        event.preventDefault();
        if (!validateCaptcha()) {
            errorMes = "Captcha is invalid. Please try again.";
            successLogin = true;
            setTimeout(() => {
                    successLogin = false; // Hide popup after 3 seconds
                }, 5000);
            return;
        }
    console.log("Function triggered");
    isLoading = true;
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
            errorMes = result.message;
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
    onMount(() => {
        generateCaptcha();
    });

    async function handleForgotPassword() {
        if (!userId) {
            alert("Please enter your User ID.");
            return;
        }

        try {
            const response = await fetch("/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || "A password reset link has been sent via SMS.");
            } else {
                alert(result.error || "Unable to send SMS. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    }
</script>
<div class="w-full bg-[#772035] flex justify-between items-center text-white h-[10dvh]">
    <div><button class="ml-2 text-2xl"><a href="/"><Icon src={ BiSolidLeftArrow} className="h-6 w-6"/></a></button></div>
    <div class="text-2xl font-bold"><a href="/">NITTE Bank</a></div>
    <div class="mr-6 "></div>
</div>
<div class="flex flex-col">
    <div class="items-center justify-center mt-6 ml-6 md-0">
        <h1 class = "text-3xl text-red-800">
            Customer Login
        </h1>
    </div>
    <div class="mt-2 ml-60 h-[5dvh]">
        {#if successLogin}
        <div class="flex items-center w-[46dvh]" >
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
                        <Input id="userId" bind:value={userId} placeholder="Enter user Id"/>
                    </div>
                    <div class="flex flex-col space-y-1.5 justify-center">
                        <Label class="text-[#FDFDFD]" for="name">Password</Label>
                        <Input id="password" bind:value={password} placeholder="Enter password" type="password"/>
                    </div>
                    <div class="flex flex-col space-y-1.5 ">
                        <Label class="text-[#FDFDFD]" for="framework">Verification</Label>
                        <div class="flex flex-row justify-between items-center">
                            <div class="w-20">
                                <input  
                                    bind:value={generatedCaptcha}
                                    type="text" 
                                    readonly 
                                    class="text-2xl font-bold text-center rounded-md line-through h-10 w-[40dvh]">
                            </div>
                            <div>
                                <button type="button" on:click={generateCaptcha} >
                                    <Icon src={AiOutlineReload} className="h-10 w-10"/>
                                </button>
                            </div>
                        </div>
                        <!--
                        <input 
                            bind:value={enteredCaptcha}
                            id="enteredCaptcha" 
                            placeholder="Enter the captcha.." 
                            class="h-10 rounded-md">-->
                        <Input id="enteredCaptcha" bind:value={enteredCaptcha} placeholder="Enter the Captcha.." class="h-10 rounded-md"/>
                    </div>
                    </div>
                </form>
                </Card.Content>
                <Card.Footer class="flex flex-col text-[#732B41]">
                <div><button type="button" class="outline-button-class bg-primary text-secondary w-20 h-10 rounded-md hover:bg-[#C73659] hover:text-white" on:click={handleLogin}>
                    Login
                </button></div>
                <div class="flex flex-col mt-2 justify-start space-y-1.5 text-[#FDFDFD]">
                    <button on:click={handleForgotPassword}>Forgot password?</button>
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