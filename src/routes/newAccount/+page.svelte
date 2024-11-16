<script>
    import { Icon } from "svelte-icons-pack";
    import { BiSolidLeftArrow } from "svelte-icons-pack/bi";
  
    // Function to navigate back
    function goBack() {
      history.back();
    }
  </script>
  
  <!-- Header -->
  <div class="flex items-center justify-between bg-[#D9D9D9] text-[#772035] h-[10dvh] font-bold text-3xl w-full">
    <div class="ml-4 cursor-pointer" on:click={goBack}>
      <Icon src={BiSolidLeftArrow} />
    </div>
    <div>New Account</div>
    <div class="mr-4"></div>
  </div>
  
  <!-- Centering Container -->
  <div class="flex items-center justify-center min-h-[90dvh] mt-10">
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
        <div class="flex justify-center mt-4">
          <button type="submit" class="w-1/3 p-2 rounded bg-gray-100 font-semibold text-[#772035]">Apply now</button>
        </div>
      </form>
    </div>
  </div>
  