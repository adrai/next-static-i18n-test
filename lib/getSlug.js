export default function getSlug(url) {
  return (new URL(url).pathname.split('/').pop()).slice(0, -3);
}