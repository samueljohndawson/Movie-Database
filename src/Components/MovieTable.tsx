import { Button, CircularProgress, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Movie, MovieCompany, TableData } from "../AppStateTypes";
import { calculateAverage } from "../helperFunctions/movieTableHelperFunctions";
import React, { useEffect } from "react";
import { fetchMovies, fetchMovieCompanies } from "../requests/getRequests";
import { RefreshButton } from "./RefreshButton";

interface MovieTableProps {
  setSelectedMovie: (movie: Movie | undefined) => void;
}

export const MovieTable = ({ setSelectedMovie }: MovieTableProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [movieCompanies, setMovieCompanies] = React.useState<MovieCompany[]>(
    []
  );
  const [rows, setRows] = React.useState<TableData[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const movieData: Movie[] = await fetchMovies();
      const companyData: MovieCompany[] = await fetchMovieCompanies();
      setMovies(movieData);
      setMovieCompanies(companyData);
      setRows(createRows(movieData, companyData));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (movieId: number) => {
    const mov = movies.find((movie) => movie.id === movieId);
    setSelectedMovie(mov);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 4 },
    { field: "review", headerName: "Review", type: "number", flex: 2 },
    {
      field: "movieCompany",
      headerName: "Movie Company",
      flex: 4,
    },
  ];
  const createRows = (
    movies: Movie[],
    movieCompanies: MovieCompany[]
  ): TableData[] => {
    return movies.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      review: calculateAverage(movie.reviews),
      movieCompany:
        movieCompanies.find(
          (company: MovieCompany) => company.id === movie.filmCompanyId
        )?.name || "Unknown",
    }));
  };

  return (
    <>
      <h1>Movie Table</h1>
      <p>Total movies: {movies.length}</p>

      {isLoading ? (
        <CircularProgress />
      ) : !movies.length || !movieCompanies.length ? (
        <>
          <p>{"Unable to load movie data. Click to try again."}</p>
          <RefreshButton onClick={fetchData} />
        </>
      ) : (
        <Paper
          sx={{
            height: 400,
            width: "100%",
          }}
          aria-label="List of movies with their titles, reviews, and movie companies"
        >
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{ border: 0, width: "100%" }}
            onRowClick={(data) => {
              handleClick(data.row.id);
            }}
            disableColumnResize
          />
        </Paper>
      )}
    </>
  );
};
