export default function Section({
  title,
  subtitle,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      {(title || subtitle) && (
        <header className="mb-6">
          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
          {subtitle && <p className="text-gray-700 mt-1">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
