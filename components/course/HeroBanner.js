import Image from 'next/image';
import styles from './HeroBanner.module.css';

export default function HeroBanner({ title, image, institution }) {
  return (
    <div className={styles.heroBanner}>
      <div className={styles.overlay}></div>
      <Image 
        src={image.url}
        alt={image.alt || title}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.institutionLogo}>
            {institution?.logo && (
              <Image
                src={institution.logo.url}
                alt={institution.name}
                width={150}
                height={50}
                objectFit="contain"
              />
            )}
          </div>
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}