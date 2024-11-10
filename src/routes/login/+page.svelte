<script>
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
</script>

<div class="flex flex-col">
    <div class="items-center justify-center mt-6 ml-6 md-0">
        <h1 class = "text-3xl text-red-800">
            <!---<Button class="bg-[#732B41] text-white" variant="primary" size="large">Bank Name</Button> -->
            Customer Login
        </h1>
    </div>
    <!---
    <div class="bg-[#732B41] flex flex-col justify-center text-[#FDFDFD]">
        <h3>User ID</h3>
        <input type="text">
        <h3>Password</h3>
    </div>
    -->
    <div class="flex justify-center mt-10 h-[65dvh]">
        <div>
            <Card.Root class="w-[350px] bg-[#732B41]">
                <!--<Card.Header class="text-purple-700">
                <Card.Title>Create project</Card.Title>
                <Card.Description>Deploy your new project in one-click.</Card.Description>
                </Card.Header> -->
                <Card.Content>
                <form>
                    <div class="grid w-full items-center gap-4">
                    <div class="flex flex-col space-y-1.5 text-[#FDFDFD]">
                        <Label for="name">User ID</Label>
                        <Input id="name" placeholder="Enter user Id"  />
                    </div>
                    <div class="flex flex-col space-y-1.5 text-[#FDFDFD]">
                        <Label for="name">Password</Label>
                        <Input id="name" placeholder="Enter password" />
                    </div>
                    <div class="flex flex-col space-y-1.5 text-[#FDFDFD]">
                        <Label for="framework">Verification</Label>
                        <div>
                            <img class="h-10 rounded-lg" src="images/captcha.jpg" alt="Captcha">
                        </div>
                        <Input id="name" placeholder="Enter Captcha" />
                    </div>
                    </div>
                </form>
                </Card.Content>
                <Card.Footer class="flex flex-col text-[#732B41]">
                <div><Button variant="outline">Login</Button></div>
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