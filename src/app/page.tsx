"use client"

import styles from "./page.module.css";
import { Game } from "./game";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <Game />
      </main>
    </Provider>
  );
}
