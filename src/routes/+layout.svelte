<script lang="ts">
	import '../app.css';
	import Alert from '$lib/_Alert.svelte';
	import * as icon from '$lib/icon';
	import {goto} from '$app/navigation';

	let isExam:boolean = $state(false);

	let { children } = $props();



	const reload=()=>{
		
	};

</script>

	<div class="app">
	<!-- simple css adjusted so .container used instead of body - body margin:0 added too to appp.css-->
	<Alert></Alert>
	<div class="container">
	<header>
		
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
