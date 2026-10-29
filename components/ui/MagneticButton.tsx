type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  external?: boolean;
  rel?: string;
};

const variants = {
  solid: "bg-gold text-canvas hover:bg-[#e0c25a] border border-gold",
  outline:
    "border border-gold/70 text-ivory bg-transparent hover:bg-gold/10 hover:border-gold",
  ghost: "border border-transparent text-ivory hover:text-gold",
};

export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  className = "",
  external = false,
  rel,
}: MagneticButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-3 px-5 py-3.5 text-[10px] sm:min-h-0 sm:px-7 sm:py-3.5 sm:text-[11px] tracking-[0.28em] uppercase font-medium transition-colors duration-300 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        {...(external
          ? { target: "_blank", rel: rel ?? "noreferrer" }
          : rel
            ? { rel }
            : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
