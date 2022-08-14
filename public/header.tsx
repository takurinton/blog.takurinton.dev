import { h } from "preact";

export default function Header() {
  return (
    <header>
      <a className="title" href="/">
        blog.takurinton.dev
      </a>
      <nav>
        <a className="sub" href="https://takurinton.dev" target="_blank">
          portfolio
        </a>
        <a className="sub" href="https://dev.takurinton.com" target="_blank">
          memo
        </a>
      </nav>
    </header>
  );
}
