import styled from "styled-components";
import { AuthenticationI } from "../types/auth";
import colors from "../variables/colors";
import general from "../variables/general";
import { Link, useNavigate } from "react-router-dom";
import { AuthDB } from "../api/authRequest";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm() {
  // Init
  const navigate = useNavigate();

  // Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password2 = formData.get("password2") as string;

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }
    await AuthDB<AuthenticationI>("register", { email, password }).then(
      (res: AuthenticationI) => {
        switch (res.code) {
          case 201:
            navigate("/login");
            break;
          default:
            toast.error(res.message);
            break;
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
        <ToastContainer />
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
