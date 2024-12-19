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

  const paymentId = body.data?.id;
  if (!paymentId) {
    return new Response(null, {
      status: 200,
    });
  }

  // manage the payment in our system
  const payment = await new Payment(client).get({ id: body.data.id });

  if (payment.status === 'approved') {
    console.log('approved');

    const orderId = payment.metadata.orderId;
    const userId = payment.metadata.userId;
    console.log({
      'payment.metadata': payment.metadata,
    });

    // send an email

    if (orderId && userId) {
      // update the order status
      await locals.pb.collection('orders').update(orderId, {
        status: 2,
      });

      // validate the payment status
      // if (status === 2){
      //   throw new Error('El pago ya fue aprobado');
      // }

      // create an invoice
      await locals.pb.collection('invoices').create({
        order_id: orderId,
        user_id: userId,
        total_amount: payment.transaction_amount,
        status: 1,
        invoice_number: payment.id,
      });
    }
  }

  return new Response(null, {
    status: 200,
  });
};
