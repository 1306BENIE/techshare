import React from "react";
import { ReviewController } from "@/controllers/review.controller";
import { ReviewList } from "@/components/reviews/ReviewList";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const reviewController = new ReviewController();

  const filters = {
    userId: searchParams.userId as string,
    toolId: searchParams.toolId as string,
    minRating: searchParams.minRating
      ? Number(searchParams.minRating)
      : undefined,
    maxRating: searchParams.maxRating
      ? Number(searchParams.maxRating)
      : undefined,
  };

  const pagination = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
    sortBy: searchParams.sortBy as string,
    sortOrder: searchParams.sortOrder as "asc" | "desc",
  };

  const { data: reviews } = await reviewController.getReviews(
    filters,
    pagination
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Avis</h1>
      <ReviewList reviews={reviews} />
    </div>
  );
}
