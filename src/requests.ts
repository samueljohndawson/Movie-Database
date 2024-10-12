import { Movie, MovieCompany } from "./AppStateTypes";

export const fetchMovies = async () => {
  let data: Movie[] = [];
  const response = await fetch("http://localhost:4321/movies", {
    method: "GET",
  });

  if (response.ok) {
    data = await response.json();
  } else {
    throw new Error(
      "Failed to fetch movies. Response code: " + response.status
    );
  }
  return data;
};

export const fetchMovieCompanies = async () => {
  let data: MovieCompany[] = [];
  const response = await fetch("http://localhost:4321/movieCompanies", {
    method: "GET",
  });

  if (response.ok) {
    data = await response.json();
  } else {
    throw new Error(
      "Failed to fetch movie companies. Response code: " + response.status
    );
  }

  return data;
};

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
