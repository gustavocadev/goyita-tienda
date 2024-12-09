import * as v from 'valibot';
import { superValidate } from 'sveltekit-superforms/server';
import { valibot } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const isValidSession = locals.pb.authStore.isValid;
  if (isValidSession) {
    redirect(302, '/');
  }
  return {};
};

const schema = v.object({
  fullName: v.pipe(v.string(), v.minLength(1)),
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
  passwordConfirm: v.pipe(v.string(), v.minLength(8)),
});

export const actions = {
  register: async ({ request, locals }) => {
    const form = await superValidate(request, valibot(schema));

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
