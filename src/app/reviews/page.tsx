import { Suspense } from "react";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewFilters, Review } from "@/interfaces/review/types";
import { PaginationParams } from "@/interfaces/common/pagination.types";
import { ReviewApiService } from "@/services/review.api";

// Étendre le type Review pour inclure _id et tool
interface ExtendedReview extends Review {
  _id: string;
  tool?: {
    name: string;
    images: string[];
    category: string;
    location: {
      city: string;
      country: string;
    };
  };
}

export const dynamic = "force-dynamic";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const reviewApi = new ReviewApiService();
  const filters: ReviewFilters = {};
  const pagination: PaginationParams = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
  };

  if (searchParams.userId) filters.userId = searchParams.userId as string;
  if (searchParams.toolId) filters.toolId = searchParams.toolId as string;
  if (searchParams.minRating)
    filters.minRating = Number(searchParams.minRating);
  if (searchParams.maxRating)
    filters.maxRating = Number(searchParams.maxRating);
  if (searchParams.startDate)
    filters.startDate = new Date(searchParams.startDate as string);
  if (searchParams.endDate)
    filters.endDate = new Date(searchParams.endDate as string);

  const { data: reviews } = await reviewApi.getReviews(filters, pagination);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Avis</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <ReviewList reviews={(reviews as unknown as ExtendedReview[]) || []} />
      </Suspense>
    </div>
  );
}
