// eslint-disable-next-line no-unused-vars
import { h } from "preact";
import styles from "./style.module.css";

export default function Header() {
  return (
    <header class={styles.header}>
      <a class={styles.title} href="/">
        blog.takurinton.dev
      </a>
    </header>
  );
}
