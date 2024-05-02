import styled from "styled-components";
import { AuthenticationI } from "../types/auth";
import colors from "../variables/colors";
import general from "../variables/general";
import { Link, useNavigate } from "react-router-dom";
import { AuthDB } from "../api/authRequest";
import { useState } from "react";

export default function RegisterForm() {
  // Init
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  // Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password2 = formData.get("password2") as string;

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    await AuthDB<AuthenticationI>("register", { email, password }).then(
      (res: AuthenticationI) => {
        if (res.code === 200) {
          navigate("/login");
        } else {
          setError(res.message);
        }
      }
    );
  };

  //   Render
  return (
    <AuthFormStyled>
      <>
        <div>Welcome to</div>
        <h1>Nextflix</h1>
        <form onSubmit={handleSubmit}>
          <input name="email" type="mail" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <input
            name="password2"
            type="password"
            placeholder="Password confirmation"
          />

          <button type="submit">Register</button>
        </form>

        <p>Already have an account? <Link to="/login">Login now</Link></p>

        {error && <div className="error">{error}</div>}
      </>
    </AuthFormStyled>
  );
}

// Style
const AuthFormStyled = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;

    input {
      padding: 10px;
      border-radius: ${general.border.radius.lg};
      border: 1px solid #ccc;

      &:focus {
        outline: none;
        border-color: ${colors.darkgreen};
      }
    }

    button {
      all: unset;
      text-align: center;
      padding: 10px;
      border-radius: ${general.border.radius.full};
      color: ${colors.white};
      background: ${colors.darkgreen};
    }
  }

  .error {
    color: ${colors.red};
    margin-top: 10px;
    text-align: center;
  }
`;
