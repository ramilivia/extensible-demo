import styles from './EnrollmentCTA.module.css';
import Button from '../shared/Button';

export default function EnrollmentCTA({ title, price, startDate, deadline, certification }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <section className={styles.enrollmentCTA} id="enroll">
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <h2>Enroll in {title}</h2>
          <p className={styles.price}>${price}</p>
          
          <div className={styles.ctaDetails}>
            <div className={styles.ctaInfo}>
              <p>
                <strong>Start Date:</strong> {formatDate(startDate)}
              </p>
              <p>
                <strong>Deadline:</strong> {formatDate(deadline)}
              </p>
              {certification && (
                <p>
                  <strong>Certification:</strong> {certification}
                </p>
              )}
            </div>
            
            <div className={styles.ctaAction}>
              <Button 
                href="https://www.your-enrollment-link.com" 
                className={styles.enrollButton}
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}