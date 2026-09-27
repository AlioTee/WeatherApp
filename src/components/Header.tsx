import { useState, type SubmitEvent } from "react";
import "../styles/header.css";

type HeaderProps = {
  onSearch: (search: string) => Promise<void>;
  isLoading: boolean;
  onSearchSubmit?: () => void;
};

export default function Header({ onSearch, isLoading, onSearchSubmit }: HeaderProps) {
  const [search, setSearch] = useState("");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      onSearchSubmit?.();
      await onSearch(trimmedSearch);
      setSearch("");
    }
  }

  return (
    <header className="header wrapper">
      <div className="header__content">
        <a href="/" className="header__homelink">
          <img className="header__logo" src="/assets/images/logo.svg" alt="Weather Now Home" />
        </a>

        <form className="header__search" onSubmit={handleSubmit}>
          <input
            className="header__textbox"
            type="text"
            placeholder="Search for a place..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isLoading}
          />
          <button className="header__button" type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </header>
  );
}