import { Movie, MovieCompany } from "../AppStateTypes";

export const fetchMovies = async (): Promise<Movie[]> => {
  const response: Response = await fetch("http://localhost:4321/movies", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      "Failed to fetch movies. Response code: " + response.status
    );
  }
  const data: Movie[] = await response.json();
  return data;
};

export const fetchMovieCompanies = async (): Promise<MovieCompany[]> => {
  const response: Response = await fetch(
    "http://localhost:4321/movieCompanies",
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch movie companies. Response code: " + response.status
    );
  }
  const data: MovieCompany[] = await response.json();
  return data;
};
