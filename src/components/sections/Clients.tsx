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
        <div className={styles.header}>
          <span className="mono-label">[04] Selected Partners</span>
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
