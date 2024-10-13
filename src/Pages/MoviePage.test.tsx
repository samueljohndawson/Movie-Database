import * as React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import MoviePage from "../Pages/MoviePage";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import "../requests/getRequests";

jest.mock("../requests/getRequests", () => {
  return {
    fetchMovies: jest.fn().mockResolvedValue([
      {
        id: 1,
        title: "Movie 1",
        releaseYear: 2021,
        reviews: [],
        filmCompanyId: 0,
        cost: 0,
      },
      {
        id: 2,
        title: "Movie 2",
        releaseYear: 2020,
        reviews: [],
        filmCompanyId: 0,
        cost: 0,
      },
    ]),
    fetchMovieCompanies: jest.fn().mockResolvedValue([
      {
        id: 0,
        name: "Mock Company",
      },
    ]),
  };
});
describe("MoviePage", () => {
  beforeEach(() => {
    global.innerWidth = 601;
  });
  it("renders MovieTable component", () => {
    render(<MoviePage />);
    expect(screen.getByText("Movie Table")).toBeInTheDocument();
  });

  it("renders ReviewForm component when movie is selected and window width is greater than 600", async () => {
    render(<MoviePage />);

    await waitFor(() =>
      expect(screen.getByText("Movie 1")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Movie 1"));

    await waitFor(() => {
      expect(screen.getByText("Submit new review")).toBeInTheDocument();
      expect(screen.queryByText("Close")).not.toBeInTheDocument();
    });
  });

  it("renders ReviewFormModal component when movie is selected and window width is less than 600", async () => {
    global.innerWidth = 500;
    render(<MoviePage />);
    await waitFor(() =>
      expect(screen.getByText("Movie 1")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Movie 1"));
    await waitFor(() => expect(screen.getByText("Close")).toBeInTheDocument());
  });
});
