import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    display: ${(props) => (props.onlyWeb ? "none" : "table-cell")};
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    display: ${(props) => (props.onlyWeb ? "none" : "table-cell")};
  }
`;

export const ButtonIcon = styled.td`
  background: transparent;
  border: none !important;
`;

// Optional styles for thead and tbody
export const Thead = styled.thead``;
export const Tbody = styled.tbody``;

// Optional styles for tr (if needed)
export const Tr = styled.tr``;
