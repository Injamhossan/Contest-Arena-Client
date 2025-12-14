import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import Card from "../../components/UI/Card/Card";

const AllContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("endingSoon");
  const [viewMode, setViewMode] = useState("grid");

  // Sync state with URL params if they change (e.g. navigation from same page)
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    
    if (category) {
      setSelectedCategory(category);
    }
    if (search !== null) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchContests();
  }, [selectedCategory, searchTerm, sortBy]);

  const fetchContests = async () => {
    try {
      setLoading(true);
      const params = {
        status: 'confirmed', // ONLY fetch approved contests
        limit: 100, // Fetch enough for client side sorting/display for now
      };

      if (selectedCategory && selectedCategory !== 'All') {
        params.type = selectedCategory;
      }

      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await api.get('/contests', { params });
      let data = response.data.data || [];

      // Client-side sorting because backend currently only sorts by createdAt
      if (sortBy === 'endingSoon') {
        data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      } else if (sortBy === 'popular') {
        data.sort((a, b) => b.participantsCount - a.participantsCount);
      } else if (sortBy === 'newest') {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setContests(data);
    } catch (error) {
      console.error('Error fetching contests:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    "Design",
    "Writing",
    "Coding",
    "Photography",
    "Video",
    "Music",
    "Art",
    "Education", 
    "Gaming",
    "Business",
    "Other",
  ];
  const sortOptions = [
    { value: "endingSoon", label: "Ending Soon" },
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Most Popular" },
  ];

  const displayedContests = contests;

  return (
    <div className="pt-24 pb-12 px-4 sm:px-8 lg:px-16 min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1F2937] dark:text-white mb-4">
          All Contests
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Discover exciting competitions across design, photography, writing,
          and more. Find your perfect challenge and start competing today.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        {/* Search bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search contests..."
            className="w-full rounded-full border text-black dark:text-white border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-12 py-2 text-sm md:text-base outline-none focus:border-gray-400 dark:focus:border-gray-600 focus:bg-white dark:focus:bg-gray-900 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Right-side controls (category, sort, view toggle) */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-end w-full md:w-auto">
          {/* Category dropdown */}
          <div className="relative">
            <select
              className="appearance-none rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white px-4 pr-10 py-2 text-sm md:text-base outline-none focus:border-gray-400 dark:focus:border-gray-600 cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            {/* chevron icon */}
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>

          {/* Sort dropdown (Ending Soon etc.) */}
          <div className="relative">
            <select
              className="appearance-none rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white px-4 pr-10 py-2 text-sm md:text-base outline-none focus:border-gray-400 dark:focus:border-gray-600 cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              ▼
            </span>
          </div>

          {/* View toggle (grid / list) */}
          <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-1 py-1">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition ${
                viewMode === "grid"
                  ? "bg-[#f59f0a] text-white"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {/* grid icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition ${
                viewMode === "list"
                  ? "bg-[#f59f0a] text-white"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {/* list icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h10"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {[
          "creative",
          "digital",
          "illustration",
          "logo",
          "branding",
          "web",
          "mobile",
          "3D",
          "animation",
          "UI/UX",
        ].map((tag) => (
          <button
            key={tag}
            type="button"
            className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setSearchTerm(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a37d8]"></div>
        </div>
      ) : displayedContests.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "flex flex-col gap-6"
          }
        >
          {displayedContests.map((contest) => (
            <Card key={contest._id} item={contest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-4xl font-bold text-gray-400 dark:text-gray-600">
            No contests found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters.
          </p>
          <button
            className="btn btn-primary btn-sm mt-4 text-white"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSortBy("endingSoon");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllContests;