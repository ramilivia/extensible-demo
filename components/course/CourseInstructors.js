import Image from 'next/image';
import styles from './styles/CourseInstructors.module.css';

export default function CourseInstructors({ instructors }) {
  return (
    <section className={styles.instructors}>
      <div className={styles.container}>
        <h2>Course Instructors</h2>
        
        <div className={styles.instructorGrid}>
          {instructors.map((instructor, index) => (
            <div key={index} className={styles.instructorCard}>
              <div className={styles.instructorImage}>
                {instructor.image ? (
                  <Image
                    src={instructor.image.url}
                    alt={instructor.name}
                    width={150}
                    height={150}
                    objectFit="cover"
                  />
                ) : (
                  <div className={styles.placeholderImage}></div>
                )}
              </div>
              <div className={styles.instructorInfo}>
                <h3>{instructor.name}</h3>
                <p className={styles.instructorTitle}>
                  {instructor.title}
                  {instructor.organization && `, ${instructor.organization}`}
                </p>
                <div className={styles.instructorBio}>
                  <p>{instructor.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}