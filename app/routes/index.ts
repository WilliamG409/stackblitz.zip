import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    message: 'StackBlitz Zip API',
    usage: 'Replace stackblitz.com with stackblitz.zip in any StackBlitz URL',
    examples: [
      'https://stackblitz.zip/edit/nuxt-starter-k7spa3r4',
      'https://stackblitz.zip/edit/vitejs-vite-starter',
    ],
    note: 'The .zip extension is optional but recommended for clarity',
  }
})
