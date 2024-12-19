import * as v from 'valibot';
import { message, superValidate } from 'sveltekit-superforms/server';
import { valibot } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

const schema = v.object({
  fullName: v.pipe(
    v.string(),
    v.minLength(1, 'El nombre completo es requerido')
  ),
  email: v.pipe(v.string(), v.email('Correo electrónico inválido')),
  password: v.pipe(
    v.string(),
    v.minLength(8, 'La contraseña debe tener al menos 8 caracteres')
  ),
  passwordConfirm: v.pipe(v.string(), v.minLength(8)),
});

export const load = async ({ locals }) => {
  const isValidSession = locals.pb.authStore.isValid;
  if (isValidSession) {
    redirect(302, '/');
  }

  const form = await superValidate(valibot(schema));

  return { form };
};

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
      return message(form, 'El correo electrónico ya está registrado', {
        status: 409,
      });
    }
    redirect(302, '/');
  },
};
