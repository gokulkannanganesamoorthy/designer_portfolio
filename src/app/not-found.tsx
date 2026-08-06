import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Signal Lost</h2>
        <p className={styles.description}>
          The digital experience you are looking for has either been moved or never existed in this dimension.
        </p>
        <Link href="/" className={styles.homeLink}>
          Return to Reality
        </Link>
      </div>
    </main>
  );
}
