import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { MovieTable } from "./MovieTable";
import { fetchMovies, fetchMovieCompanies } from "../requests/getRequests";
import React from "react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

jest.mock("../requests/getRequests");

const mockFetchMovies = fetchMovies as jest.MockedFunction<typeof fetchMovies>;
const mockFetchMovieCompanies = fetchMovieCompanies as jest.MockedFunction<
  typeof fetchMovieCompanies
>;

describe("MovieTable", () => {
  beforeEach(() => {
    mockFetchMovies.mockResolvedValue([]);
    mockFetchMovieCompanies.mockResolvedValue([]);
  });

  it("renders loading state initially", async () => {
    render(<MovieTable setSelectedMovie={jest.fn()} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error message when data fetching fails", async () => {
    mockFetchMovies.mockRejectedValue(new Error("Failed to fetch movies"));
    render(<MovieTable setSelectedMovie={jest.fn()} />);
    await waitFor(() => screen.getByText(/Unable to load movie data/i));
    expect(screen.getByText(/Click to try again/i)).toBeInTheDocument();
  });

  it("renders movie table when data is successfully fetched", async () => {
    mockFetchMovies.mockResolvedValue([
      {
        id: 1,
        title: "Test Movie",
        filmCompanyId: 1,
        reviews: [1, 2, 3],
        cost: 0,
        releaseYear: 0,
      },
    ]);
    mockFetchMovieCompanies.mockResolvedValue([
      { id: 1, name: "Test Company" },
    ]);
    render(<MovieTable setSelectedMovie={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByText("Test Movie")).toBeInTheDocument();
      expect(screen.getByText("Test Company")).toBeInTheDocument();
    });
  });

  it("calls setSelectedMovie when a row is clicked", async () => {
    const setSelectedMovieMock = jest.fn();
    mockFetchMovies.mockResolvedValue([
      {
        id: 1,
        title: "Test Movie",
        filmCompanyId: 1,
        reviews: [1, 2, 3],
        cost: 0,
        releaseYear: 0,
      },
    ]);
    mockFetchMovieCompanies.mockResolvedValue([
      { id: 1, name: "Test Company" },
    ]);
    render(<MovieTable setSelectedMovie={setSelectedMovieMock} />);
    await waitFor(() => {
      expect(screen.getByText("Test Movie")).toBeInTheDocument();
      expect(screen.getByText("Test Company")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Test Movie"));
    expect(setSelectedMovieMock).toHaveBeenCalledWith({
      id: 1,
      title: "Test Movie",
      filmCompanyId: 1,
      reviews: [1, 2, 3],
      cost: 0,
      releaseYear: 0,
    });
  });
});
