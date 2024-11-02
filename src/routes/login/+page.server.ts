import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export const load = async ({ locals }) => {
  const isValidSession = locals.pb.authStore.isValid;
  if (isValidSession) {
    redirect(302, '/');
  }
  return {};
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const actions = {
  login: async ({ request, locals }) => {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }
    const { email, password } = form.data;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await locals.pb.collection('users').authWithPassword(email, password);

    redirect(302, '/');
  },
};
