import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlices";
import { AuthenticationI } from "../types/auth";
import colors from "../variables/colors";
import general from "../variables/general";
import { useNavigate } from "react-router-dom";
import { loginViaApi } from "../api/authRequest";
import { useState } from "react";

export default function AuthForm() {
  // Redux
  const dispatch = useAppDispatch();

  // Init
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  // Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const api_key = e.currentTarget.apikey.value;
    const account_id = e.currentTarget.accountId.value;

    await loginViaApi(api_key).then((res: AuthenticationI) => {
      if (res.success) {
        dispatch(login({
          api_key,
          account_id,
          loading: false,
          error: "",
          reload: false
        }));
        navigate("/");
      } else {
        setError(res.status_message);
      }
    });
  };

  //   Render
  return (
    <AuthFormStyled>
      <div>Welcome to</div>
      <h1>
        TMBD <small>by Lucky Marty</small>
      </h1>
      <form onSubmit={handleSubmit}>
        <input name="apikey" type="text" placeholder="API KEY" />
        <input name="accountId" type="text" placeholder="Account ID" />
    
        <button type="submit">Login</button>
      </form>

      {error && <div className="error">{error}</div>}

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
