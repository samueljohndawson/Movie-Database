import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Movie, MovieCompany, TableData } from "./AppStateTypes";
import { calculateAverage } from "./helperFunctions";
import React, { useEffect } from "react";
import { fetchMovies, fetchMovieCompanies } from "./requests";

export const newMovieTable = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [movieCompanies, setMovieCompanies] = React.useState<MovieCompany[]>(
    []
  );
  const [rows, setRows] = React.useState<TableData[]>([]);

  const RefreshButton = () => {
    if (movieCompanies) {
      return (
        <Button
          variant="contained"
          onClick={() => {
            fetchData();
          }}
        >
          {"Refresh"}
        </Button>
      );
    } else {
      return <p>No movies loaded yet</p>;
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const movieData = await fetchMovies();
      const companyData = await fetchMovieCompanies();
      setMovies(movieData);
      setMovieCompanies(companyData);
      setRows(createRows(movieData, companyData));
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleClick = (movieId: number) => {
    const mov = movies.find((movie) => movie.id === movieId);
    setSelectedMovie(mov);
    // setSubmitted(false);
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
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ border: 0 }}
        onRowClick={(data) => {
          handleClick(data.row.id);
        }}
        disableColumnResize
      />
    </Paper>
  );
};
