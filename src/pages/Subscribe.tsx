import { IgniteLabLogo } from "../components/IgniteLabLogo";
import codeBackground from "../assets/code-background.png";
import { FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_SUBSCRIBE_MUTATION = gql`
  mutation ($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`;

export function Subscribe() {
  const [fieldName, setFieldName] = useState("");
  const [fieldEmail, setFieldEmail] = useState("");
  const navigate = useNavigate();

  const [createSubscribe, { loading }] = useMutation(CREATE_SUBSCRIBE_MUTATION);

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    if (!fieldName.trim() || !fieldEmail.trim()) {
      alert("Preencha os campos com seus dados");
      return;
    }

    await createSubscribe({
      variables: {
        name: fieldName,
        email: fieldEmail
      }
    });

    setFieldName("");
    setFieldEmail("");

    navigate("/event");
  }

  return (
    <div
      className={`min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col
      items-center`}
    >
      <div
        className={`w-full mt-20 max-w-[1100px] mx-auto flex items-center 
        justify-between`}
      >
        <div className={`max-w-[640px]`}>
          <IgniteLabLogo />

          <h1 className={`mt-8 mb-4 text-[40px] leading-tight`}>
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com
            <strong className="text-blue-500"> React JS</strong>
          </h1>

          <p>
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className={`p-8 bg-gray-700 border border-gray-500 rounded`}>
          <strong className={`mb-6 block text-2xl`}>
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubscribe}
            className="w-full flex flex-col gap-2"
          >
            <input
              className={`bg-gray-900 rounded px-5 h-14`}
              type="text"
              placeholder="Seu nome completo"
              onChange={event => setFieldName(event.target.value)}
            />
            <input
              className={`bg-gray-900 rounded px-5 h-14`}
              type="email"
              placeholder="Seu E-mail"
              onChange={event => setFieldEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 py-4 rounded font-bold text-sm bg-green-500 
              uppercase hover:bg-green-700 transition-colors
              disabled:cursor-not-allowed disabled:opacity-50
            `}
            >
              garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img src={codeBackground} alt="" className="mt-10" />
    </div>
  );
}
