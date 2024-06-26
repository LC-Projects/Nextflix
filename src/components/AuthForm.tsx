import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlices";
import { AuthenticationI } from "../types/auth";
import colors from "../variables/colors";
import general from "../variables/general";
import { Link, useNavigate } from "react-router-dom";
import { AuthDB, loginWithToken } from "../api/authRequest";
import { useEffect, useState } from "react";
import { createCookie, eraseCookie, readCookie } from "../api/utilis";

export default function AuthForm() {
  // Redux
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true)

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

    await AuthDB<AuthenticationI>('login', {email, password}).then((res: AuthenticationI) => {
      if (res.code === 200) {
        dispatch(login({
          id: res.user.id,
          token: res.token.token,
          email: res.user.email,
          password,
          loading: false,
          error: "",
          reload: false
        }));
        createCookie("token", res.token.token)
        navigate("/");
      } else {
        setError(res.message);
      }
    });
  };

  useEffect(() => {
    const token = readCookie("token");
    if (token) {
      loginWithToken(token).then((res: AuthenticationI) => {
        switch (res.code) {
          case 401:
            eraseCookie("token");
            window.location.reload();
            break;
          case 200:
            dispatch(login({
              id: res.user.id,
              token: res.user.token,
              email: res.user.email,
              password: null,
              loading: false,
              error: "",
              reload: false
            }));
            navigate("/");
            break;
          default:
            break;
        }
      });
    } else {
      setLoading(false)
    }
  }, []);


  //   Render
  return (
    <AuthFormStyled>

      {loading ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <>
          <div>Welcome to</div>
          <h1>
            Nextflix
          </h1>
          <form onSubmit={handleSubmit}>
            <input name="email" type="mail" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />

            <button type="submit">Login</button>
          </form>
          <p>No account yet? <Link to="/register">Create an account</Link></p>

          {error && <div className="error">{error}</div>}
        </>
      )}

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
