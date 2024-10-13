import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { ReviewForm } from "./ReviewForm";
import { Movie } from "../AppStateTypes";
import { postNewReview } from "../requests/postRequests";
import React from "react";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

jest.mock("../requests/postRequests");

const mockMovie: Movie = {
  id: 1,
  title: "Mock Movie",
  reviews: [],
  filmCompanyId: 0,
  cost: 0,
  releaseYear: 0,
};

describe("ReviewForm", () => {
  it("renders the form when a movie is selected", () => {
    render(<ReviewForm selectedMovie={mockMovie} />);

    expect(screen.getByText("Submit new review")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("displays the response message on successful submission", async () => {
    (postNewReview as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        message: "Thank you for your review!",
      });
    });

    render(<ReviewForm selectedMovie={mockMovie} />);

    fireEvent.change(screen.getByTestId("review-input"), {
      target: { value: "Great movie!" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() =>
      expect(screen.getByText("Thank you for your review!")).toBeInTheDocument()
    );
  });
});
