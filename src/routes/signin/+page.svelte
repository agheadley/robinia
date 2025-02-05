<script lang="ts">
import { supabase } from '$lib/supabaseClient'
import { redirect } from '@sveltejs/kit';


const signin=async()=>{

    const { data: { user } } = await supabase.auth.getUser();
    if(user) {
        console.log(user);
    } else {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider:'azure',
            options: {
            redirectTo: 'http://localhost:5173/callback',
            },
        })
  
        if (data.url) {
            console.log(data.url);
            redirect(302,data.url) // use the redirect API for your server framework
        }
    }
    
};





$effect(()=>{
    console.log('+page.svelte mounted');
    
    signin();

     
     
     
});
</script>


