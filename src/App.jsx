import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MovieListing from "./components/MovieListing";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieListing />} />

        <Route
          path="*"
          element={
            <main className="flex min-h-screen items-center justify-center px-5">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
                  404
                </p>

                <h1 className="mt-3 text-5xl font-black text-white">
                  Page Not Found
                </h1>

                <p className="mt-4 text-slate-400">
                  The page you're looking for doesn't exist.
                </p>

                <a
                  href="/"
                  className="mt-7 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black transition hover:bg-orange-400"
                >
                  Back Home
                </a>
              </div>
            </main>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;