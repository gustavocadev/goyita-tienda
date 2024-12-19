import { redirect } from '@sveltejs/kit';
import type { InvoicesResponse } from '../../../../../../pocketbase-types';

export const load = async ({ url, locals }) => {
  const paymentId = url.searchParams.get('payment_id');
  if (!paymentId) {
    redirect(303, '/carrito/pago');
  }

  const invoices = await locals.pb
    .collection('invoices')
    .getFullList<InvoicesResponse>({
      filter: `invoice_number = ${paymentId}`,
    });

  if (invoices.length === 0) {
    redirect(303, '/carrito/pago');
  }

  return { invoice: invoices[0] };
};
