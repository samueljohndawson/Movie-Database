import { ReviewResponse } from "../AppStateTypes";

export const postNewReview = async (
  movieId: number,
  review: string
): Promise<ReviewResponse> => {
  const response: Response = await fetch("http://localhost:4321/submitReview", {
    method: "POST",
    body: JSON.stringify({
      movieId: movieId,
      review: review,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to submit review. Response code: ${response.status}`
    );
  }
  const data: ReviewResponse = await response.json();
  return data;
};
