import styled from "styled-components";

export const HomeWrapper = styled.div`
  min-height: 100vh;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1050;
`;

export const ModalCard = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
`;