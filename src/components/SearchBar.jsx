import { useState } from "react";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (query.trim() === "") {
            toast.error("Please enter a search term!");
            return;
        }

        onSubmit(query);
        setQuery("");
    };

    return (
        <header>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    autoComplete="off"
      autofocus
      placeholder="Search images and photos"
                />
                <button type="submit">Search</button>
            </form>
        </header>
    );
};

export default SearchBar;