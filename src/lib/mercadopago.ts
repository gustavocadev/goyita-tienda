import { MP_ACCESS_TOKEN } from '$env/static/private';
import { MercadoPagoConfig } from 'mercadopago';

export const client = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN,
  options: { timeout: 5000, idempotencyKey: 'abc' },
});
