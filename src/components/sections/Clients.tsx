'use client';

import styles from './Clients.module.css';

const CLIENTS = [
  'Symphozen Labs',
  'TAT',
  'Village Woods',
  'Javulli',
  'GRE',
  'Alumade',
  'Castella',
  'CNG',
];

export default function Clients() {
  return (
    <section className={styles.clients} id="clients">
      <div className={styles.container}>
        <div className={styles.logoRow}>
          <h2 className={styles.wordmark}>Brands I collaborated with</h2>
          <p className={styles.tagline}>
            A few partners worth <br /> building with.
          </p>
        </div>

        <div className={styles.grid}>
          {CLIENTS.map((client, index) => (
            <div key={index} className={styles.clientItem}>
              <span className={styles.clientName}>{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
