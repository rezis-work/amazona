// // SearchInput.tsx
// import React, { useState, FC } from "react";

// interface SearchInputProps {
//   onSearch: (query: string) => void;
// }

// const SearchInput: FC<SearchInputProps> = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     onSearch(query);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="search-form">
//       <input
//         type="text"
//         placeholder="Search..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="input-class-names" // Your input styles here
//       />
//       <button type="submit" className="search-button-class-names">
//         Search
//       </button>
//     </form>
//   );
// };

// export default SearchInput;
