import { ReviewController } from "@/controllers/review.controller";
import { ReviewDetails } from "@/components/reviews/ReviewDetails";

export default async function ReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const reviewController = new ReviewController();
  const { data: review } = await reviewController.getReviewById(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <ReviewDetails review={review} />
    </div>
  );
}
