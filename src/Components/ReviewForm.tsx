import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import { Movie } from "../AppStateTypes";
import { postNewReview } from "../requests/postRequests";

interface ReviewFormProps {
  selectedMovie: Movie | undefined;
}
export const ReviewForm = ({ selectedMovie }: ReviewFormProps) => {
  const [isAwaitingResponse, setIsAwaitingResponse] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [newReview, setNewReview] = React.useState<string>("");
  const [responseMessage, setResponseMessage] = React.useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAwaitingResponse(true);
    setSubmitted(true);

    if (selectedMovie && newReview) {
      try {
        const res = await postNewReview(selectedMovie.id, newReview);
        setResponseMessage(res.message);
        setNewReview("");
      } catch (error) {
        console.error("Failed to post new review:", error);
        setResponseMessage("Error submitting review.");
      } finally {
        setIsAwaitingResponse(false);
        setTimeout(() => setSubmitted(false), 5000);
      }
    }
  };

  return (
    <Card sx={{ mt: 5 }}>
      {selectedMovie && !submitted && (
        <form onSubmit={(e) => handleSubmit(e)} aria-label="Submit new review">
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Submit new review
            </Typography>
            <Typography variant="h5" component="div">
              {selectedMovie.title}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Max 100 characters
            </Typography>
            <TextField
              fullWidth
              value={newReview}
              type="textarea"
              multiline
              label="Review"
              variant="outlined"
              inputProps={{ maxLength: 100, "data-testid": "review-input" }}
              required
              onChange={(e) => setNewReview(e.target.value)}
              aria-label="Review input"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              aria-label="Submit review"
            >
              Submit
            </Button>
          </CardActions>
        </form>
      )}
      {isAwaitingResponse ? (
        <CardContent>
          <CircularProgress />
        </CardContent>
      ) : (
        submitted && (
          <CardContent>
            <Typography variant="h5" component="div">
              {responseMessage}
            </Typography>
          </CardContent>
        )
      )}
    </Card>
  );
};
