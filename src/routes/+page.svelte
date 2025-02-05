<script lang="ts">
import { supabase } from '$lib/supabaseClient'

const testRead = async()=>{
	let response = await fetch('/edge/read', {
		method: 'POST',
		body: JSON.stringify({table:"group_table",select:"*"}),
		headers: {'content-type': 'application/json'}
	});
	let data = await response.json();
	console.log('testRead()',data);
};
$effect(()=>{
	console.log('+page.svelte mounted');
	testRead();

	

	
});


const checkUser=async()=>{
	//console.log(user);
};

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="robina" />
</svelte:head>

<section>

	Testing 1,2,3 ...
</section>


<section>
	<a href='/signin'>Signin</a>
	<button onclick={checkUser}>User?</button>
</section>
<style>

</style>

