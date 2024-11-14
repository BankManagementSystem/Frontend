<script>
    // Function to navigate back
    function goBack() {
      history.back();
    }
  </script>
  
  <style>
    /* Tailwind styles are applied directly */
  </style>
  
  <div class="flex flex-col items-center min-h-screen bg-gray-100 p-5">
    <!-- Back Arrow Button -->
    <button on:click={goBack} class="self-start mb-4 flex items-center text-[#772035]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>
  
    <!-- Title outside the card -->
    <h1 class="text-3xl font-bold text-[#772035] mb-4">New Account</h1>
  
    <!-- Card -->
    <div class="w-full max-w-md p-6 rounded-lg shadow-lg bg-[#772035]">
      <!-- Form fields -->
      <form class="space-y-4">
        <!-- Name Section -->
        <div>
          <label class="block text-gray-200 font-semibold mb-1">Name:</label>
          <input type="text" placeholder="Enter your first name" class="w-full p-2 rounded mb-2 bg-gray-200" />
          <input type="text" placeholder="Enter your middle name" class="w-full p-2 rounded mb-2 bg-gray-200" />
          <input type="text" placeholder="Enter your last name" class="w-full p-2 rounded bg-gray-200" />
        </div>
  
        <!-- Address Section -->
        <div>
          <label class="block text-gray-200 font-semibold mb-1">Address:</label>
          <input type="text" placeholder="Enter building/house" class="w-full p-2 rounded mb-2 bg-gray-200" />
          <div class="flex space-x-2">
            <input type="text" placeholder="Enter City" class="w-1/2 p-2 rounded mb-2 bg-gray-200" />
            <input type="text" placeholder="Enter District" class="w-1/2 p-2 rounded mb-2 bg-gray-200" />
          </div>
          <div class="flex space-x-2">
            <input type="text" placeholder="Enter State" class="w-1/2 p-2 rounded mb-2 bg-gray-200" />
            <input type="text" placeholder="Enter Pincode" class="w-1/2 p-2 rounded mb-2 bg-gray-200" />
          </div>
        </div>
  
        <!-- Other Sections -->
        <div>
          <label class="block text-gray-200 font-semibold mb-1">Gender:</label>
          <input type="text" placeholder="" class="w-full p-2 rounded bg-gray-200" />
        </div>
        <div>
          <label class="block text-gray-200 font-semibold mb-1">Date of Birth:</label>
          <input type="text" placeholder="DD/MM/YYYY" class="w-full p-2 rounded bg-gray-200" />
        </div>
        <div>
          <label class="block text-gray-200 font-semibold mb-1">Phone number:</label>
          <input type="text" placeholder="" class="w-full p-2 rounded bg-gray-200" />
        </div>
        <div>
          <label class="block text-gray-200 font-semibold mb-1">Email:</label>
          <input type="email" placeholder="" class="w-full p-2 rounded bg-gray-200" />
        </div>
        <div>
          <label class="block text-gray-200 font-semibold mb-1">Adhaar number:</label>
          <input type="text" placeholder="" class="w-full p-2 rounded bg-gray-200" />
        </div>
        <div>
          <label class="block text-gray-200 font-semibold mb-1">PAN number:</label>
          <input type="text" placeholder="" class="w-full p-2 rounded bg-gray-200" />
        </div>
        <div>
          <label class="block text-gray-200 font-semibold mb-1">Type of Account:</label>
          <input type="text" placeholder="" class="w-full p-2 rounded bg-gray-200" />
        </div>
  
        <!-- Submit Button -->
        <div class="mt-4">
          <button type="submit" class="w-full p-2 rounded bg-gray-200 font-semibold text-[#772035]">Apply now</button>
        </div>
      </form>
    </div>
  </div>
  