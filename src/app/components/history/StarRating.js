"use client";

export default function StarRating({ value = 0, onChange }) {
  // value: 0..5
  const handle = (n) => onChange?.(n);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          aria-label={`Rate ${n}`}
          onClick={() => handle(n)}
          className="p-1"
        >
          <Star filled={n <= value} size={20} />
        </button>
      ))}
    </div>
  );
}

function Star({ filled, size = 20 }) {
  // simple inline svg to support filled/outline
  return filled ? (
    <svg width={size} height={size} viewBox="0 0 24 24" className="text-yellow-500">
      <path
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" className="text-gray-400">
      <path
        d="M22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28L5.5 10.5l4.38-.38L12 6.1l2.12 4.02 4.38.38-3.74 3.39 1 4.28L12 15.4z"
        fill="currentColor"
      />
    </svg>
  );
}
