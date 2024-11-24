<script lang="ts">
    import { Icon } from "svelte-icons-pack";
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
    import { goto } from '$app/navigation';
    import jwt_decode from 'jwt-decode';
  
    // Function to navigate back
    let FN = "";
    let MN = "";
    let LN = "";
    let Address1 = "";
    let Address2 = "";
    let Address3 = "";
    let Address4 = "";
    let Address5 = "";
    let Gender = "";
    let DOB = "";
    let Phone = "";
    let Email = "";
    let Aadhaar = "";
    let PAN = "";
    let Type = "";

    let Address = Address1 + ", " + Address2 + ", " + Address3 + ", " + Address4+ ", " + Address5;

    async function handleCreate() {
        try {
            // Send a POST request with the id and new username
            const response = await fetch('/api/new-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ FN, MN, LN })
            });

            const result = await response.json();
            if (result.success) {
                message = "Username updated successfully!";
            } else {
                message = result.message || "Failed to update username.";
            }
        } catch (error) {
            console.error("Error updating username:", error);
            message = "An error occurred. Please try again.";
        }
    }

    /*function formatAadhaar(event) {
        // Remove non-numeric characters
        let input = event.target.value.replace(/[^0-9]/g, ''); 

        // Add dashes after every 4 digits
        const formatted = input.match(/.{1,4}/g)?.join('-') || '';
        
        event.target.value = formatted;
    }*/
    function formatAadhaar(event) {
        // Remove non-numeric characters
        let input = event.target.value.replace(/[^0-9]/g, '');

        // Format input to 'xxxx-xxxx-xxxx'
        const formatted = input.match(/.{1,4}/g)?.join('-') || '';
        event.target.value = formatted;
        Aadhaar = formatted;
    }

    function validateAadhaar(event) {
        const aadhaarPattern = /^\d{4}-\d{4}-\d{4}$/;
        if (!aadhaarPattern.test(Aadhaar)) {
            alert("Please enter a valid Aadhaar number in the format 1234-5678-9101");
            event.preventDefault(); // Prevent form submission
        }
    }

    function validatePANInput(event) {
        // Convert input to uppercase automatically
        event.target.value = event.target.value.toUpperCase();

        // Regular expression for validating PAN format
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panPattern.test(event.target.value)) {
            event.target.setCustomValidity("Enter a valid PAN in the format: ABCDE1234F");
        } else {
            event.target.setCustomValidity(""); // Clear custom error message if input is valid
        }
    }

    async function handleBack(event) {
    event.preventDefault(); // Prevent default behavior for the back action

    const token = localStorage.getItem('authToken'); // Retrieve the token

    if (token) {
        try {
            const decoded = jwt_decode<{ exp: number }>(token);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

            if (decoded.exp < currentTime) {
                // Token has expired
                alert('Session expired. Please log in again.');
                localStorage.removeItem('authToken'); // Clear the expired token
                goto('/'); // Redirect to login or home page
            } else {
                // Token is valid
                goto('/Accounts'); // Redirect to accounts page
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            alert('Invalid session. Please log in again.');
            localStorage.removeItem('authToken'); // Clear invalid token
            goto('/'); // Redirect to login or home page
        }
    } else {
        // No token found
        goto('/'); // Redirect to login or home page
    }
  }

  </script>
  
  <!-- Header -->
  <div class="flex items-center justify-between bg-[#D9D9D9] text-[#772035] h-[10dvh] font-bold text-3xl w-full">
    <div class="ml-4 cursor-pointer">
      <button on:click={handleBack}>
      <Icon src={BiSolidLeftArrow} />
      </button>
    </div>
    <div>New Account</div>
    <div class="mr-4"></div>
  </div>
  
  <!-- Centering Container -->
  <div class="flex items-center justify-center min-h-[90dvh] mt-10">
    <!-- Card -->
    <div class="w-full max-w-md p-6 rounded-lg shadow-lg bg-[#772035]">
      <!-- Form fields -->
      <form class="space-y-4" on:submit|preventDefault={validateAadhaar} >
        <!-- Name Section -->
        <div>
          <label for="name" class="block text-gray-200 font-semibold mb-1">Name:</label>
          <input required  bind:value={FN} id="name" type="text" placeholder="Enter your first name" class="w-full p-2 rounded mb-2 bg-primary"  />
          <input required  bind:value={MN} id="name" type="text" placeholder="Enter your middle name" class="w-full p-2 rounded mb-2 bg-primary" />
          <input required  bind:value={LN} id="name" type="text" placeholder="Enter your last name" class="w-full p-2 rounded bg-primary" />
        </div>
  
        <!-- Address Section -->
        <div>
          <label for="address" class="block text-gray-200 font-semibold mb-1">Address:</label>
          <input required  bind:value={Address1} id="address" type="text" placeholder="Enter Building/House" class="w-full p-2 rounded mb-2 bg-primary" />
          <div class="flex space-x-2">
            <input required  bind:value={Address2} id="address" type="text" placeholder="Enter City" class="w-1/2 p-2 rounded mb-2 bg-primary" />
            <input required  bind:value={Address3} id="address" type="text" placeholder="Enter District" class="w-1/2 p-2 rounded mb-2 bg-primary" />
          </div>
          <div class="flex space-x-2">
            <input required  bind:value={Address4} id="address" type="text" placeholder="Enter State" class="w-1/2 p-2 rounded mb-2 bg-primary" />
            <input required  bind:value={Address5} id="address" type="text" placeholder="Enter Pincode" class="w-1/2 p-2 rounded mb-2 bg-primary" />
          </div>
        </div>
  
        <!-- Other Sections -->
        <div>
          <select required
              bind:value={Gender} 
              id="Gender" 
              class="w-full p-2 rounded bg-primary text-gray-900"
          >
              <option value="" class="text-black" disabled selected>Select your gender</option>
              <option value="Male" class="bg-secondary text-primary">Male</option>
              <option value="Female" class="bg-secondary text-primary">Female</option>
              <option value="Other" class="bg-secondary text-primary">Other</option>
          </select>
        </div>
        <div>
          <label for="DOB" class="block text-gray-200 font-semibold mb-1">Date of Birth:</label>
          <input required  bind:value={DOB} id="DOB" type="date" placeholder="DD/MM/YYYY" class="w-full p-2 rounded bg-primary" />
        </div>
        <div>
          <label for="PN" class="block text-gray-200 font-semibold mb-1">Phone number:</label>
          <input required  bind:value={Phone} id="PN" type="text" placeholder="" class="w-full p-2 rounded bg-primary" />
        </div>
        <div>
          <label for="Email" class="block text-gray-200 font-semibold mb-1">Email:</label>
          <input required  bind:value={Email} id="Email" type="email" placeholder="" class="w-full p-2 rounded bg-primary" />
        </div>
        <div>
          <label for="Aadhaar" class="block text-gray-200 font-semibold mb-1">Aadhaar number:</label>
          <input       
              required 
              bind:value={Aadhaar} 
              id="Aadhaar" 
              type="text" 
              maxlength="14" 
              class="w-full p-2 rounded bg-primary" 
              on:input={formatAadhaar} 
          />
        </div>
        <div>
          <label for="PAN" class="block text-gray-200 font-semibold mb-1">PAN number:</label>
          <input 
            required 
            bind:value={PAN} 
            id="PAN" 
            type="text" 
            maxlength="10" 
            class="w-full p-2 rounded bg-primary" 
            title="Enter a valid PAN in the format: ABCDE1234F"
            on:input={validatePANInput} 
        />
        </div>
        <div>
          <label for="type" class="block text-gray-200 font-semibold mb-1">Type of Account:</label>
          <select required
              bind:value={Type} 
              id="type" 
              class="w-full p-2 rounded bg-primary text-gray-900 hover:bg-primary focus:ring-2 focus:ring-[#A12A48]"
          >
              <option value="" disabled selected class="" >Select The Type</option>
              <option value="Savings" class="bg-secondary text-primary">Savings</option>
              <option value="Current" class="bg-secondary text-primary">Current</option>
          </select>
        </div>
  
        <!-- Submit Button -->
        <div class="flex justify-center mt-4">
          <button type="submit" class="w-1/3 p-2 rounded bg-gray-100 font-semibold text-[#772035]">Apply now</button>
        </div>
      </form>
    </div>
  </div>
  