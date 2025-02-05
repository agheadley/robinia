import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient'

export const GET = async (event) => {
  //console.log(event);
	const {
		url,
		locals
	} = event;
	const code =url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/';

  console.log(url.searchParams);

  //console.log(code);

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      throw redirect(303, `/${next.slice(1)}`);
    }
  }

  // return the user to an error page with instructions
  throw redirect(303, '/auth/auth-code-error');
};