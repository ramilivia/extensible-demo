import { useState } from 'react';
import styles from './CourseDetails.module.css';
import Button from '../shared/Button';

export default function CourseDetails({ 
  description, 
  summary, 
  duration, 
  startDate, 
  price, 
  deadline,
  outcomes,
  prerequisites
}) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'outcomes', label: 'Learning Outcomes' },
    { id: 'prerequisites', label: 'Prerequisites' },
  ];
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <section className={styles.courseDetails}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <div className={styles.tabs}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className={styles.tabContent}>
              {activeTab === 'overview' && (
                <div>
                  <p className={styles.summary}>{summary}</p>
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
              )}
              
              {activeTab === 'outcomes' && (
                <div>
                  <h3>What You&apos;ll Learn</h3>
                  <ul>
                    {outcomes?.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'prerequisites' && (
                <div>
                  <h3>Prerequisites</h3>
                  <div dangerouslySetInnerHTML={{ __html: prerequisites }}></div>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <h3>At a Glance</h3>
              <ul>
                <li>
                  <span>Duration:</span> {duration}
                </li>
                <li>
                  <span>Start Date:</span> {formatDate(startDate)}
                </li>
                <li>
                  <span>Deadline:</span> {formatDate(deadline)}
                </li>
                <li>
                  <span>Price:</span> ${price}
                </li>
              </ul>
              <Button 
                className={styles.ctaButton}
                href="#enroll"
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