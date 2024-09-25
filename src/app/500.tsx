import Link from "next/link";

export default function Custom500() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>500 - Internal Server Error</h1>
      <p>Something went wrong on our end. Please try again later.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}