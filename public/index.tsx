import {
  LocationProvider,
  Router,
  // lazy,
  ErrorBoundary,
  hydrate,
} from "preact-iso";
import NotFound from "./pages/_404";
import Header from "./header";
import Home from "./pages/home";
import Post from "./pages/post";

// eslint-disable-next-line no-unused-vars
import { h } from "preact";

// const Home = lazy(() => import("./pages/home"));
// const Post = lazy(() => import("./pages/post"));

function showLoading() {
  document.body.classList.add("loading");
}
function hideLoading() {
  document.body.classList.remove("loading");
}

export function App() {
  return (
    <LocationProvider>
      <div class="app">
        <Header />
        <ErrorBoundary>
          <Router onLoadStart={showLoading} onLoadEnd={hideLoading}>
            <Home path="/" />
            <Post path="/post/:id" />
            <NotFound default />
          </Router>
        </ErrorBoundary>
      </div>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.body);
}

export async function prerender() {
  return (await import("./prerender.js")).prerender(<App />);
}

// eslint-disable-next-line no-undef
const m: GlobalNodeModule =
  // eslint-disable-next-line no-undef
  typeof module !== "undefined" ? module : ({} as any);
if (m.hot) m.hot.accept((u) => hydrate(<u.module.App />, document.body));
