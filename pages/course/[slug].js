import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import HeroBanner from '../../components/course/HeroBanner';
import CourseDetails from '../../components/course/CourseDetails';
import CourseOutline from '../../components/course/CourseOutline';
import CourseInstructors from '../../components/course/CourseInstructors';
import EnrollmentCTA from '../../components/course/EnrollmentCTA';
import { getCourseBySlug, getAllCourses } from '../../lib/hygraph';

export default function CoursePage({ course }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{course.title} | Your Course Platform</title>
        <meta name="description" content={course.summary} />
      </Head>
      
      <HeroBanner 
        title={course.title}
        image={course.heroBanner}
        institution={course.partnerInstitution}
      />
      
      <CourseDetails 
        description={course.description}
        summary={course.summary}
        duration={course.duration}
        startDate={course.startDate}
        price={course.price}
        deadline={course.enrollmentDeadline}
        outcomes={course.learningOutcomes}
        prerequisites={course.prerequisites}
      />
      
      <CourseOutline outline={course.courseOutline} />
      
      <CourseInstructors instructors={course.instructors} />
      
      <EnrollmentCTA 
        title={course.title}
        price={course.price}
        startDate={course.startDate}
        deadline={course.enrollmentDeadline}
        certification={course.certificationDetails}
      />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const course = await getCourseBySlug(params.slug);
  
  return {
    props: {
      course,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const courses = await getAllCourses();
  
  return {
    paths: courses.map((course) => ({
      params: { slug: course.slug },
    })),
    fallback: 'blocking',
  };
}