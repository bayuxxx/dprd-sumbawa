export const BASE_URL = '/api';

/**
 * Mengubah path gambar relatif dari backend (e.g. "/uploads/banners/foto.jpg")
 * menjadi URL lengkap yang bisa diakses oleh browser.
 *
 * - Di development: Vite proxy meneruskan /uploads ke backend
 * - Di production: sesuaikan VITE_BACKEND_URL jika backend terpisah
 *
 * Jika url sudah berupa URL absolut (http/https/data:blob), langsung dikembalikan.
 */
export function getImageUrl(url: string | null | undefined): string {
  if (!url) return '';

  // Sudah URL absolut (http, https, data, blob) → langsung return
  if (/^(https?:\/\/|data:|blob:)/i.test(url)) return url;

  // Path relatif dari backend (e.g. "/uploads/...")
  // Di dev, Vite proxy handle. Di prod, bisa prefix VITE_BACKEND_URL.
  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
  return `${backendUrl}${url}`;
}
