<!-- ToggleSwitch.svelte -->
<script>
    export let checked = false;
    function toggle() {
        checked = !checked;
    }
</script>

<div class="toggle-switch" on:click={toggle} class:checked={checked}>
    <div class="toggle-thumb"></div>
</div>

<style>
    .toggle-switch {
        width: 40px;
        height: 20px;
        background-color: #B3B3B3;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .toggle-switch.checked {
        background-color: white;
    }

    .toggle-thumb {
        width: 18px;
        height: 18px;
        background-color: #772035;
        border-radius: 9999px;
        transform: translateX(2px);
        transition: transform 0.3s ease;
    }

    .toggle-switch.checked .toggle-thumb {
        transform: translateX(20px);
    }
</style>
