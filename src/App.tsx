import { StrictMode } from "react";
import styled from "styled-components";
import Feed from './components/Feed';
import Header from './components/Header';
import Options from './components/Options';
import ThemedLayout from './components/Layout';
import Store from "./store";
import "./styles.css";

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
`;

export default function App() {
  return (
    <StrictMode>
      <Store.Provider>
        <ThemedLayout>
          <Sidebar>
            <Header />
            <Options />
          </Sidebar>
          <Feed />
        </ThemedLayout>
      </Store.Provider>
    </StrictMode>
  );
}
