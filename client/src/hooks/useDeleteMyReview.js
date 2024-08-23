import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyReview as deleteMyReviewAPI } from "../services/reviews/HandleMyReviews";

export function useDeleteMyReview() {
  const queryClient = useQueryClient();
  const { mutate: deleteMyReview, isPending: isDeleting } = useMutation({
    mutationFn: (reviewId) => deleteMyReviewAPI(reviewId),
    onSuccess: async () => {
      console.log("success deleting");
      await queryClient.refetchQueries(["user-review"]);

      toast.success("You have deleted the review Successfully");
    },
    onError: () => {
      console.log("fail deleting");
      toast.error("There was an issue with deleting the review");
    },
  });
  return [deleteMyReview, isDeleting];
}
