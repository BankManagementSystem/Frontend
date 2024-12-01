<!-- src/routes/display-usernames/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    let usernames = [];

    onMount(async () => {
        try {
            const response = await fetch('/api/get-usernames');
            if (response.ok) {
                usernames = await response.json();
            } else {
                console.error("Error fetching usernames:", await response.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });
</script>
<div class = "flex h-screen justify-center items-center bg-gray-600">
<div><h1>Usernames</h1>
{#if usernames.length > 0}
    <ul>
        {#each usernames as user}
            <li>{user.Id} {user.Password}</li>
        {/each} 
    </ul>
{:else}
    <p>No usernames found.</p>
{/if}
</div> 
</div>