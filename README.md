
### server side auth, sveltekit

https://supabase.com/docs/guides/auth/server-side/sveltekit

- npm @supabase/ssr


#### Azure signin

- https://supabase.com/docs/guides/auth/social-login/auth-azure?queryGroups=framework&framework=sveltekit&queryGroups=environment&environment=server




#### auth/+page.server.ts login :
```
  const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: 'http://localhost:5173/auth/callback',
      },
    })
    
    if (data.url) {
      redirect(302,data.url) // use the redirect API for your server framework
    }
```

### auth/callback/+server.ts

```
import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/private';

  console.log('auth/callback next',next);
  
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      throw redirect(303, `/${next.slice(1)}`);
    }
  }

  // return the user to an error page with instructions
  throw redirect(303, '/auth/auth-code-error');
};

```




