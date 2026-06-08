import React, { memo } from "react";
import Link from "next/link";

export interface CardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Card = memo<CardProps>(({ title, children, className = "", href, style, onClick }) => {
  const cardContent = (
    <div className={`ag-card group ${className}`} style={style} onClick={onClick}>
      {title && (
        <h3 className="font-heading text-phi-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors duration-382 mb-phi-md">
          {title}
        </h3>
      )}
      <div className="text-phi-base leading-relaxed text-[var(--text-secondary)]">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline select-none outline-none">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
});

Card.displayName = "Card";
export default Card;
