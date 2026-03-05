export default function StarRating({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating > star - 1;
        const pct = partial
          ? Math.round((rating - Math.floor(rating)) * 100)
          : 0;

        return (
          <svg
            key={star}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="shrink-0"
          >
            <defs>
              {partial && (
                <linearGradient id={`sg-${star}`}>
                  <stop offset={`${pct}%`} stopColor="#0A0A0A" />
                  <stop offset={`${pct}%`} stopColor="#E8E6E1" />
                </linearGradient>
              )}
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={
                filled ? "#0A0A0A" : partial ? `url(#sg-${star})` : "#E8E6E1"
              }
            />
          </svg>
        );
      })}
    </div>
  );
}
