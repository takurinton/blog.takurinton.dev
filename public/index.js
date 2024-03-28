import { LocationProvider, Router, ErrorBoundary, hydrate } from "preact-iso";
import NotFound from "./pages/_404";
import Header from "./header";
import Home from "./pages/home";
import Post from "./pages/post";

export function App() {
  return (
    <LocationProvider>
      <div class="app">
        <Header />
        <ErrorBoundary>
          <Router>
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
