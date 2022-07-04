import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning
} from "phosphor-react";
import { DefaultUi, Player, Youtube } from "@vime/react";
import "@vime/core/themes/default.css";
import { gql, useQuery } from "@apollo/client";

interface VideoProps {
  lessonSlug: string;
}

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;

    teacher: {
      name: string;
      bio: string;
      avatarURL: string;
    };
  };
}

const GET_LESSON_BY_SLUG = gql`
  query ($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        avatarURL
        bio
        name
      }
    }
  }
`;

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG, {
    variables: {
      slug: lessonSlug
    }
  });

  if (!data) {
    return (
      <div className="flex-1">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`flex-1`}>
      <div className={`bg-black flex justify-center`}>
        <div
          className={`w-full h-full 
          max-w-[1100px] max-h-[60vh] aspect-video
        `}
        >
          <Player>
            <Youtube videoId={data?.lesson.videoId!} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className={`p-8 max-w-[1100px] mx-auto`}>
        <div className={`flex items-start gap-16`}>
          <div className={`flex-1`}>
            <h1 className={`text-2xl font-bold`}>{data?.lesson.title}</h1>
            <p className={`mt-4 text-gray-200 leading-relaxed`}>
              {data?.lesson.description}
            </p>

            <div className={`mt-6 flex items-center gap-4`}>
              <img
                className={`h-16 w-16 rounded-full border-2 border-blue-500`}
                src={data?.lesson.teacher.avatarURL}
                alt={data?.lesson.teacher.name}
              />

              <div className={`leading-relaxed`}>
                <strong className={`text-2xl block`}>
                  {data?.lesson.teacher.name}
                </strong>
                <span className={`text-gray-200 text-sm block`}>
                  {data?.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-4`}>
            <a
              href="#"
              className={`flex items-center justify-center p-4 gap-2
            rounded font-bold uppercase bg-green-500 hover:bg-green-700
            transition-colors
          `}
            >
              <DiscordLogo size={24} />
              Comunidade Discord
            </a>

            <a
              href="#"
              className={`flex items-center justify-center p-4 gap-2
            rounded font-bold uppercase text-blue-500 border border-blue-500 
          hover:bg-blue-500 hover:text-gray-700 transition-colors 
          `}
            >
              <Lightning size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className={`mt-20 grid grid-cols-2 gap-8`}>
          <a
            href="#"
            className={`bg-gray-700 
            overflow-hidden rounded flex items-stretch gap-6  
            border-2 border-gray-900 hover:border-green-500
            hover:-translate-y-1 transition ease-in-out duration-300`}
          >
            <div className={`bg-green-700 p-6 h-full flex items-center`}>
              <FileArrowDown size={40} />
            </div>

            <div className={`py-6 leading-relaxed`}>
              <strong className={`text-2xl`}>Material Complementar</strong>
              <p className={`text-sm text-gray-200 mt-2`}>
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>

            <div className={`p-6 h-full flex items-center`}>
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href="#"
            className={`bg-gray-700 
            overflow-hidden rounded flex items-stretch gap-6  
            border-2 border-gray-900 hover:border-green-500
            hover:-translate-y-1 transition ease-in-out duration-300`}
          >
            <div className={`bg-green-700 p-6 h-full flex items-center`}>
              <FileArrowDown size={40} />
            </div>

            <div className={`py-6 leading-relaxed`}>
              <strong className={`text-2xl`}>Wallpapers exclusivos</strong>
              <p className={`text-sm text-gray-200 mt-2`}>
                Baixe wallpapers exclusivos do ignite lab e personalize sua
                máquina
              </p>
            </div>

            <div className={`p-6 h-full flex items-center`}>
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
