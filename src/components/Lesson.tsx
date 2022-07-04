import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  title: string;
  lessonSlug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, lessonSlug, availableAt, type }: LessonProps) {
  const { slug } = useParams<{ slug: string }>();
  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR
    }
  );

  const isActiveLesson = slug === lessonSlug;

  return (
    <Link to={`/event/lesson/${lessonSlug}`} className={`flex flex-col group`}>
      <span className={`block mb-1 text-gray-300`}>
        {availableDateFormatted}
      </span>

      <div
        className={`p-4 rounded border border-gray-500 
        group-hover:border-green-500 transition-colors
        ${isActiveLesson && "bg-green-500 text-white"}  
      `}
      >
        <div className={`flex items-center justify-between`}>
          {isLessonAvailable ? (
            <span
              className={`flex items-center gap-2 text-sm font-medium 
            ${isActiveLesson && "text-white"}
            ${!isActiveLesson && "text-blue-500"}
          `}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span
              className={`flex items-center gap-2 text-sm 
            font-medium text-orange-500
          `}
            >
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={`py-[2px] px-2 uppercase border text-xs text-white rounded
            ${isActiveLesson && "border-white"}
            ${!isActiveLesson && "border-green-400"}  
           `}
          >
            {type === "live" ? "ao vivo" : "aula prática"}
          </span>
        </div>

        <strong
          className={`mt-5 block 
          ${isActiveLesson && "text-white"}
          ${!isActiveLesson && "text-gray-200"}
        `}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
