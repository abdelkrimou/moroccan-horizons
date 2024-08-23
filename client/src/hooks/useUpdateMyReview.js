import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyReview as updateMyReviewAPI } from "../services/reviews/HandleMyReviews";

export function useUpdateMyReview() {
  const queryClient = useQueryClient();
  const { mutate: updateMyReview, isPending: isUpdating } = useMutation({
    mutationFn: ({ reviewId, updatedData }) =>
      updateMyReviewAPI({ reviewId, updatedData }),
    onSuccess: async () => {
      await queryClient.refetchQueries(["user-review"]);

      toast.success("You have updated your review Successfully");
    },
    onError: () => {
      console.log("fail deleting");
      toast.error("There was an issue with updating your review");
    },
  });
  return [updateMyReview, isUpdating];
}
