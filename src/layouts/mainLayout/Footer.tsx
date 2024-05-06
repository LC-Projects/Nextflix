import styled from 'styled-components';
import colors from '../../variables/colors';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <FooterStyled>
      <div>&copy; {year} - Produced by Lucky Marty, Jonathan Martin & Mathieu Vidot</div>
    </FooterStyled>
  )
}
const FooterStyled = styled.div`
  background-color: ${colors.black};
  color: #fff;
  padding: 10px;
  text-align: center;
  bottom: 0;
  width: 100%;
  z-index: 999;
`;
