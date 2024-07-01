import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  title: string;
  handleClose: () => void;
  children: React.ReactNode;
}

const Layout = styled.div`
  overflow-y: auto;
  box-sizing: border-box;
  width: 100%;
  max-width: ${props => props.theme.maxDeviceWidth};
  min-width: ${props => props.theme.minDeviceWidth};
  height: 100vh;
  padding: 66px 14px 0;
  background: #ffffff;
  font-size: 16px;
  line-height: 19px;
  word-break: normal;
`;

const PopupHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 16px;
  z-index: 999;

  .header-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    max-width: ${props => props.theme.maxDeviceWidth};
    min-width: ${props => props.theme.minDeviceWidth};
    padding: 0 12px;
    border-bottom: 1px solid ${props => props.theme.colors.gray100};
    background: #ffffff;
  }

  h4 {
    margin-left: 30px;
    text-align: center;
    width: inherit;
    font-size: 24px;
    font-weight: bold;
  }

  button {
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

function LayerPopup({ title, handleClose, children }: Props) {
  return (
    <Layout>
      <PopupHeader>
        <div className="header-wrap">
          <h4>{title}</h4>
          <button type="button" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
      </PopupHeader>

      {children}
    </Layout>
  );
}

export default LayerPopup;
