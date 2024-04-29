import styled from "styled-components";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayoutStyled>
      <div></div>
      <div>{children}</div>
    </AuthLayoutStyled>
  );
}

const AuthLayoutStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  height: 100vh;

  > div:first-child {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("https://picsum.photos/2000/2000");

    &:after {
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    max-width: 35vw;
    width: 100%;
    padding: 20px 40px;
  }
`;
