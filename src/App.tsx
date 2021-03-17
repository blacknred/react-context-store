import React from "react";
import styled from "styled-components";
import Feed from './Components/Feed';
import Header from './Components/Header';
import Options from './Components/Options';
import ThemedLayout from './Components/Layout';
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
    <Store.Provider>
      <ThemedLayout>
        <Sidebar>
          <Header />
          <Options />
        </Sidebar>
        <Feed />
      </ThemedLayout>
    </Store.Provider>
  );
}
