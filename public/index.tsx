import {
  LocationProvider,
  Router,
  lazy,
  ErrorBoundary,
  hydrate,
} from "preact-iso";
import NotFound from "./pages/_404";
import Header from "./header";
import { h } from "preact";

const Home = lazy(() => import("./pages/home"));
const Post = lazy(() => import("./pages/post"));
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

export async function prerender(data) {
  return (await import("./prerender.js")).prerender(<App {...data} />);
}

// @ts-ignore
if (module.hot)
  // @ts-ignore
  module.hot.accept((u) => hydrate(<u.module.App />, document.body));
