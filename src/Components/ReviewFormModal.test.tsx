import { Movie } from "../AppStateTypes";
import { expect, test, describe, it } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ReviewFormModal } from "./ReviewFormModal";
import "@testing-library/jest-dom/jest-globals";
import React from "react";

describe("ReviewFormModal component", () => {
  const mockMovie = {
    id: 1,
    reviews: [],
    title: "Test Movie",
    filmCompanyId: 0,
    cost: 0,
    releaseYear: 0,
  };

  it("renders without crashing", () => {
    render(<ReviewFormModal selectedMovie={mockMovie} />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("closes when the close button is clicked", async () => {
    const { getByText } = render(<ReviewFormModal selectedMovie={mockMovie} />);
    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
    await waitFor(() =>
      expect(screen.queryByText("Close")).not.toBeInTheDocument()
    );
  });

  it("does not render when selectedMovie is undefined", () => {
    render(<ReviewFormModal selectedMovie={undefined} />);
    expect(screen.queryByText("Close")).not.toBeInTheDocument();
  });
});
