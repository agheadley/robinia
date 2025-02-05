<script lang="ts">


    import {fade} from 'svelte/transition';
    import * as icon from '$lib/icon';
    
    let { open = $bindable(),title,children } = $props();

    
   
</script>


{#if open}
<div class="parent" transition:fade={{ duration: 200 }}>
    <div role="cell" tabindex=0 class="background" onkeydown={()=>open=false} onclick={()=>open=false}></div>
    <div class="modal">
        <div class="row">
            <div class="col"><b>{title}</b></div>
            <div class="col">
                <a href = {'javascript:void(0);'} onclick={()=>open=false}>{@html icon.xCircle()}</a>
            </div>
        </div>
        <div>
            {@render children?.()}
        </div>
    </div>
</div>
{/if}

<style>


.row {
    display:flex;
    justify-content: space-between;
}

.col {
    padding:1rem;
}

.parent{
    position:fixed;
    top:0px;
    left:0px;
    width:100vw;
    height:100vh;
    z-index:10000;
}

.background{
    position:fixed;
    top:0px;
    left: 0px;
    width:100vw;
    height:100vh;
    background-color:#333;
    opacity: 0.5;
}

.modal{
    padding:2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width:20rem;
    /*max-width:50rem;*/
    max-width:90vw;
    min-height:20rem;
    max-height:90vh;
    background-color: white;
    border-radius:0.3rem;
    border:1px solid white;
    overflow:auto;
}
</style>
