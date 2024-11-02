import { TypedPocketBase } from '../pocketbase-types';
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pb: TypedPocketBase;
      user: TypedPocketBase.default['authStore']['model'];
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
