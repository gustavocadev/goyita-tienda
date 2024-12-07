import { client } from '$lib/mercadopago';
import type { RequestHandler } from '@sveltejs/kit';
import { Payment } from 'mercadopago';

type MpBody = {
  data: {
    id: string;
  };
};

export const POST: RequestHandler = async ({ request, locals }) => {
  const body: MpBody = await request.json();
  console.log({ body });

  // manage the payment in our system
  const payment = await new Payment(client).get({ id: body.data.id });

  if (payment.status === 'approved') {
    console.log('approved');
    // update the order status
    // send an email

    // update the order status
    // locals.pb.collection('orders').update(payment.external_reference, {
    //   status: 2,
    // })

    // validate the payment status
    // if (status === 2){
    //   throw new Error('El pago ya fue aprobado');
    // }

    // create an invoice
    // locals.pb.collection('invoices').create({})
  }

  return new Response(null, {
    status: 200,
  });
};
