import { ReviewApiService } from "@/services/review.api";
import { ReviewDetails } from "@/components/reviews/ReviewDetails";
import { notFound } from "next/navigation";

export default async function ReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const reviewApiService = new ReviewApiService();
  const { data: review } = await reviewApiService.getReviewById(params.id);

  if (!review) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ReviewDetails review={review} />
    </div>
  );
}
