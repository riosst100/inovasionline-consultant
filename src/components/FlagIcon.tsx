export default function FlagIcon({ code, className = "" }: { code: string; className?: string }) {
  return (
    <span
      className={`fi fi-${code.toLowerCase()} rounded-[3px] shrink-0 ${className}`}
      style={{ width: "1.25em", height: "0.9em", backgroundSize: "cover" }}
      aria-hidden
    />
  );
}
