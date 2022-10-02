import { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";

import { Comment } from "../protocols/models/Comment";
import { Props } from "../protocols/react/Props";
import { getComments } from "../services/graphl/graphlService";

export type CommentsProps = Props & {
  slug: string;
};

export const Comments = ({ slug }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const getCommentsByApi = async (slug: string) => {
      const comments = await getComments(slug);
      setComments(comments);
    };

    getCommentsByApi(slug);
  }, []);

  const hasComments = comments?.length > 0;

  return (
    <>
      {hasComments && (
        <div className="bg-white shadown-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments?.length} Comentários
          </h3>
          {comments.map((comment) => {
            return (
              <div
                key={new Date(
                  comment.createdAt || new Date()
                ).getMilliseconds()}
                className="border-b border-gray-100 mb-4 pb-4"
              >
                dasdsa
                <p className="mb-4">
                  <span className="font-semibold">{comment.name}</span>
                  {` em  ${moment(comment.createdAt).format("DD MMM, YYYY")}`}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">
                  {parse(comment.comment)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
