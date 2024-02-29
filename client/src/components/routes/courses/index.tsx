import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CourseCard from "./CourseCard";

interface indexProps {}

const CoursesSection: FC<indexProps> = ({}) => {
  const { data, isLoading } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCourses(data?.courses);
    }
  }, [data]);

  return (
    <section
      id="testimonials"
      className=" px-4 md:container relative space-y-12 py-24 sm:py-32"
    >
      <div className="space-y-6 text-cente">
        <h1 className="text-4xl max-w-2xl font-bold">{`Ready to Start Your Journey? Explore Our Featured Roadmaps`}</h1>
        <p className="mx-aut max-w-2xl leading-relaxed">
          {` Explore our handpicked selection of featured courses, curated to help
          you achieve your learning goals and aspirations. Whether you're a
          beginner, intermediate learner, or seasoned professional, there's something for you on Lincher`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {courses &&
          courses.map((course: any, index: number) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: -100 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.25 },
              }}
            >
              <>
                <CourseCard course={course} />
              </>
            </motion.figure>
          ))}
      </div>
    </section>
  );
};

export default CoursesSection;
