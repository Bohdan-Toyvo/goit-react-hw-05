import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main>
      <h2>Page not found</h2>
      <p>
        Go back to<Link to="/">Home</Link>
      </p>
    </main>
  );
}
