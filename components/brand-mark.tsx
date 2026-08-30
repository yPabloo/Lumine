import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} href="/" aria-label="Lumine — página inicial">
      <span className="brand-star" aria-hidden="true">★</span>
      <span>
        <strong>Lumine</strong>
        {!compact && <small>Desenvolvimento Infantil</small>}
      </span>
    </Link>
  );
}
