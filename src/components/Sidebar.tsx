import { gql, useQuery } from "@apollo/client";
import { Lesson } from "./Lesson";

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      title
      availableAt
      lessonType
      slug
    }
  }
`;

interface GetLessonsQueryResponse {
  lessons: Array<{
    id: string;
    title: string;
    slug: string;
    availableAt: string;
    lessonType: "live" | "class";
  }>;
}

export function Sidebar() {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);

  return (
    <aside className={`w-[348px] p-6 bg-gray-700 border-l border-gray-600`}>
      <span
        className={`mb-6 pb-6 font-bold text-2xl block border-b 
        border-gray-600`}
      >
        Cronograma de aulas
      </span>

      <div className={`flex flex-col gap-8`}>
        {data?.lessons.map(lesson => (
          <Lesson
            key={lesson.id}
            title={lesson.title}
            type={lesson.lessonType}
            availableAt={new Date(lesson.availableAt)}
            lessonSlug={lesson.slug}
          />
        ))}
      </div>
    </aside>
  );
}
