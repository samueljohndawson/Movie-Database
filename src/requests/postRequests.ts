export const postNewReview = async (movieId: number, review: string) => {
  const response = await fetch("http://localhost:4321/submitReview", {
    method: "POST",
    body: JSON.stringify({
      movieId: movieId,
      review: review,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return response.json();
};
