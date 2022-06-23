import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link } from "react-router-dom";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR
    }
  );

  return (
    <Link to={`/event/lesson/${slug}`} className={`flex flex-col group`}>
      <span className={`block mb-1 text-gray-300`}>
        {availableDateFormatted}
      </span>

      <div
        className={`p-4 rounded border border-gray-500 
        group-hover:border-green-500 transition-colors`}
      >
        <div className={`flex items-center justify-between`}>
          {isLessonAvailable ? (
            <span
              className={`flex items-center gap-2 text-sm 
            font-medium text-blue-500
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
            className={`py-[2px] px-2 border border-green-400 
            text-xs text-white rounded
           `}
          >
            {type === "live" ? "AO VIVO" : "Aula prática"}
          </span>
        </div>

        <strong className={`mt-5 block text-gray-200`}>{title}</strong>
      </div>
    </Link>
  );
}
