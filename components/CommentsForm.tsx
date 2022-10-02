import React, { useEffect } from "react";
import { RefObject, useRef, useState } from "react";
import { Comment } from "../protocols/models/Comment";
import { Props } from "../protocols/react/Props";
import { submitComment } from "../services/graphl/graphlService";

export type CommentsFormProps = Props & {
  slug: string;
};

export const CommentsForm = ({ slug }: CommentsFormProps) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl = useRef() as RefObject<HTMLTextAreaElement>;
  const nameEl = useRef() as RefObject<HTMLInputElement>;
  const emailEl = useRef() as RefObject<HTMLInputElement>;
  const storeDataEl = useRef() as RefObject<HTMLInputElement>;

  useEffect(() => {
    nameEl.current!.value = window.localStorage.getItem("name") || "";
    emailEl.current!.value = window.localStorage.getItem("email") || "DASDSA";
  }, []);

  const handleCommentSubmission = async () => {
    setError(false);

    const { value: comment } = commentEl.current as any;
    const { value: name } = nameEl.current as any;
    const { value: email } = emailEl.current as any;
    const { checked: storeData } = storeDataEl.current as any;

    const isAllInputsAreNotFilleds = !comment || !name || !email || !storeData;

    if (isAllInputsAreNotFilleds) {
      setError(true);
      return;
    }

    const commentObj: Comment = {
      name,
      email,
      comment,
      slug,
    };

    const localStorage = window.localStorage;
    if (storeData) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }

    const submitCommentResponse = await submitComment(commentObj);

    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">PostDetail</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          name="comment"
          id="comment-text-area"
          placeholder="Comentário"
          className="py-2 px-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          ref={nameEl}
          name="name"
          id="name-input"
          type="text"
          placeholder="Name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <input
          ref={emailEl}
          name="email"
          id="email-input"
          type="email"
          placeholder="Email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Salvar meu e-mail e nome para os próximos comentários
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">Todos os items são necessários.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Comentar o post
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comentário enviado para revisão
          </span>
        )}
      </div>
    </div>
  );
};
