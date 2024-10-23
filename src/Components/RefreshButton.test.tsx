import { RefreshButton } from "./RefreshButton";
import { render, screen, fireEvent } from "@testing-library/react";

describe("RefreshButton", () => {
  it("should call onClick prop when clicked", () => {
    const mockOnClick = jest.fn();
    render(<RefreshButton onClick={mockOnClick} />);

    fireEvent.click(screen.getByText("Refresh"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
