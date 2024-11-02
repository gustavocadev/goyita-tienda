import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const isValidSession = locals.pb.authStore.isValid;
  if (isValidSession) {
    redirect(302, '/');
  }
  return {};
};

const schema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
});

export const actions = {
  register: async ({ request, locals }) => {
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }
    const { email, fullName, password, passwordConfirm } = form.data;

    try {
      await locals.pb.collection('users').create({
        name: fullName,
        email,
        password,
        passwordConfirm,
      });
    } catch (error) {
      console.log(error);
    }
    redirect(302, '/');
  },
};
