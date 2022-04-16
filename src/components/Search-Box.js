import KitButton from "./kit-button";

import { useState, useRef } from "react";

import { useRouter } from "next/router";

const SearchBox = ({ className }) => {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.search || "");
  const formRef = useRef(null);

  let classNameSearch = [
    className,
    "w-full container mx-auto flex items-center",
  ].join(" ");

  const searchMovies = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/movies",
      query: {
        search: search,
        page: 1,
      },
    });
  };

  return (
    <form
      id="searchForm"
      ref={formRef}
      onReset={searchMovies}
      className={classNameSearch}
      onSubmit={searchMovies}
    >
      <input
        id="search-box-input"
        name="search"
        type="search"
        autoComplete="off"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (e.target.value == "") {
            // this.formRef.submit();
            router.push({
              pathname: "/movies",
              query: {
                page: 1,
              },
            });
          }
        }}
        className="py-2 px-4 ring-0 focus:ring-0 rounded-full h-12 backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-gray-300  bg-black/70 focus:border-2 focus:border-primary-700 outline-0 focus:outline-0 outline-none focus:outline-none text-white hover:border-primary-700 hover:border-2 grow w-full md:w-1/2 lg:w-1/3 placeholder:text-gray-300"
        placeholder="Search movies here..."
      />
      <KitButton variant="circle" className="ml-2 bg-primary-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            className="fill-white"
            d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
          />
        </svg>
      </KitButton>
    </form>
  );
};

export default SearchBox;
