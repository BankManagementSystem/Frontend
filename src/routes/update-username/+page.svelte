<!-- src/routes/update-username/+page.svelte -->
<script>
    import { onMount } from 'svelte';

    let id = '';
    let newUsername = '';
    let message = '';

    async function handleUpdate() {
        try {
            // Send a POST request with the id and new username
            const response = await fetch('/api/update-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, newUsername })
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
</script>

<div class="text-black bg-slate-500 flex justify-center items-center h-screen flex-col">
    <h1>Update Username</h1>
    <div >
    <form on:submit|preventDefault={handleUpdate}>
    <div>
        <label for="id">User ID:</label><br>
        <input id="id" bind:value={id} placeholder="Enter user ID" required />
    </div>

    <div>
        <label for="newUsername">New Username:</label><br>
        <input id="newUsername" bind:value={newUsername} placeholder="Enter new username" required />
    </div>

    <button type="submit">Update Username</button>
</form>
<p>{message}</p>
</div>
</div>

