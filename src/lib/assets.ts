export const getAssetPath = (path: string) => { const isProd = process.env.NODE_ENV === 'production'; return isProd ? '/wg-website' + path : path; };
