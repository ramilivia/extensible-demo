import { useState } from 'react';
import styles from './styles/CourseOutline.module.css';

export default function CourseOutline({ outline }) {
  const [expandedModules, setExpandedModules] = useState([]);
  
  const toggleModule = (moduleIndex) => {
    if (expandedModules.includes(moduleIndex)) {
      setExpandedModules(expandedModules.filter(i => i !== moduleIndex));
    } else {
      setExpandedModules([...expandedModules, moduleIndex]);
    }
  };
  
  return (
    <section className={styles.courseOutline}>
      <div className={styles.container}>
        <h2>{outline.title || 'Course Outline'}</h2>
        
        <div className={styles.modules}>
          {outline.modules.map((module, index) => (
            <div 
              key={index}
              className={`${styles.module} ${expandedModules.includes(index) ? styles.expanded : ''}`}
            >
              <button 
                className={styles.moduleHeader}
                onClick={() => toggleModule(index)}
              >
                <h3>{module.title}</h3>
                <span className={styles.arrow}>
                  {expandedModules.includes(index) ? '−' : '+'}
                </span>
              </button>
              
              {expandedModules.includes(index) && (
                <div className={styles.moduleContent}>
                  <p>{module.description}</p>
                  
                  {module.lessons && module.lessons.length > 0 && (
                    <ul className={styles.lessons}>
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex}>
                          <span className={styles.lessonTitle}>{lesson.title}</span>
                          {lesson.duration && (
                            <span className={styles.lessonDuration}>{lesson.duration}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}