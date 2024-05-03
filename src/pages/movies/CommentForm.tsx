import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { setReload } from "../../features/auth/authSlices";
import APP_CONFIGS from "../../variables/configs";

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
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const { id } = useAppSelector((state) => state.auth);
  const [comment, setComment] = useState("");

  const handleReset = () => {
    setRating(0);
    setComment("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${APP_CONFIGS.backend_url}/api/movies/comments`, {
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
          dispatch(setReload(!auth.reload));
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
      <StarRatingStyled onSubmit={handleSubmit}>
        <h3>Leave a comment</h3>

        <label htmlFor="rating">Rate the movie</label>
        <StarRating rating={rating} setRating={setRating} />

        <label htmlFor="comment">Comment</label>
        <textarea name="comment" value={comment} cols={80} rows={10} onChange={(e) => setComment(e.target.value)}></textarea>

        <div><input type="submit" value="Submit" /></div>
      </StarRatingStyled>
      <ToastContainer />
    </>
  );
}

export default CommentForm;


const StarRatingStyled = styled.form`
  max-width: 600px;

  display: grid;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 16px;

  label {
    margin-top: 10px;
  }

  textarea {
    margin: 10px 0;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 8px;
    padding: 10px;
  }

  input[type="submit"] {
    background-color: #ff0000;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: fit-content;
    float: right;
    font-size: 1.2em;
  }
`;