import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function StarRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      {stars.map((star, index) => (
        <span
          key={index}
          onClick={() => setRating(star)}
          style={{
            color: star <= rating ? "#ff0000" : "gray",
            cursor: "pointer",
            fontSize: "2em",
          }}
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

function CommentForm({ movieId }: { movieId: number | string }) {
  const [rating, setRating] = useState(0);
  const { id } = useAppSelector((state) => state.auth);
  const [comment, setComment] = useState("");

  const handleReset = () => {
    setRating(0);
    setComment("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("http://localhost:3333/api/movies/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: id,
        movie_id: movieId,
        rating,
        comment,
      }),
    }).then((res) => res.json()).then((res) => {
        switch (res.code) {
            case 201:
                toast.success(res.message);
                handleReset();
                break;
            case 409:
                toast.error(res.message);
                handleReset();
                break;
            default:
                toast.error(res.message);
                break;
        }
    });
    
  };

return (
    <>
        <form onSubmit={handleSubmit}>
            <StarRating rating={rating} setRating={setRating} />
            <textarea name="comment" value={comment} cols={80} rows={10} onChange={(e) => setComment(e.target.value)}></textarea>
            <input type="submit" value="Send" />
        </form>
        <ToastContainer />
    </>
);
}

export default CommentForm;
