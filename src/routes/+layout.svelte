<script lang="ts">
	 import { invalidate } from '$app/navigation'
  	import { onMount } from 'svelte'
	import '../app.css';
	import Alert from '$lib/_Alert.svelte';
	import * as icon from '$lib/icon';
	import {goto} from '$app/navigation';

  	

	
	let { data,children } = $props();
	let { session, supabase } = $derived(data)

	onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })

	const reload=()=>{
		
	};

</script>

	<div class="app">
	<!-- simple css adjusted so .container used instead of body - body margin:0 added too to appp.css-->
	<Alert></Alert>
	<div class="container">
	<header>
			<p></p>
			<div><a class="brand" href={'javascript:void(0)'} onclick={reload}>Robinia</a></div>
			<div>
				
			</div>
		
		<nav>
			
		  </nav>
	  </header>
	
	  	<main>
			{@render children()}
	
		</main>
	
	  <footer>
		<p>Svelte5 - Typescript -  Supabase - <a href="https://simplecss.org/demo" target=”_blank”>SimpleCSS Guide</a></p>
	  </footer>
	</div>
</div>

	

<style>

.brand  {
	color:#0d47a1;
	font-size:2rem;
	font-weight:bold;
	text-decoration: none;
} 




</style>
