<script lang="ts">
	
let testRead = async()=>{
	let response = await fetch('/edge/read', {
		method: 'POST',
		body: JSON.stringify({table:"test_person_table",select:"*"}),
		headers: {'content-type': 'application/json'}
	});
	let data = await response.json();
	console.log('testRead()',data);
};
$effect(()=>{
	console.log('+page.svelte mounted');
	testRead();

	
});

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="robina" />
</svelte:head>

<section>

	Testing 1,2,3 ...
</section>

<style>

</style>

