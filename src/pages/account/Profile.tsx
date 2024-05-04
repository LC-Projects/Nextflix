import React, { useEffect, useState } from "react";
import styled from "styled-components";
import general from "../../variables/general";
import colors from "../../variables/colors";
import useAccount from "../../hooks/useAccount";
import { AccountI } from "../../types/account/AccountFavoriteMoviesI";
import { useAppSelector } from "../../app/hooks";
import { editUser } from "../../api/authRequest";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ResponseI {
    code: number;
    message: string;
}
export default function Profile() {
  // Redux
  const { account } = useAccount<AccountI>({
    user_id: useAppSelector((state) => state.auth.id),
  });

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editUser<ResponseI>({
      user_id: account.user?.id || "", // Convert user_id to string
      email,
      last_name: lastName,
      first_name: firstName,
      nick_name: nickName,
    }).then((res) => res).then((res) => {
        switch (res.code) {
          case 200:
            toast.success(res.message);
            break;
          case 404:
          case 500:
            toast.error(res.message);
            break;
          default:
            toast.error(res.message);
            break;
        }
      });
  };

  useEffect(() => {
    setLastName(account.user?.lastName || "");
    setFirstName(account.user?.firstName || "");
    setNickName(account.user?.nickName || "");
    setEmail(account.user?.email || "");
  }, [account]);

  return (
    <ProfileStyled>
      <div className="container">
        <form onSubmit={handleFormSubmit} className="profileForm">
          <label htmlFor="last_name">Last Name :</label>
          <input
            type="text"
            value={lastName}
            name="last_name"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <label htmlFor="first_name">First Name :</label>
          <input
            type="text"
            value={firstName}
            name="first_name"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
            <label htmlFor="nick_name">Nickname :</label>
          <input
            type="text"
            value={nickName}
            name="nick_name"
            placeholder="Nickname"
            onChange={(e) => setNickName(e.target.value)}
          />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            value={email}
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      </div>
      <ToastContainer />
    </ProfileStyled>
  );
}

const ProfileStyled = styled.div`
    height: 67vh;
  .container {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
  }
form {
    display: flex;
    flex-direction: column;
    width: 60%;
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
  }
`;
