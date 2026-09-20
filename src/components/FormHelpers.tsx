export function Required() {
  return <span className="text-red-500">*</span>;
}

export function RequiredNote({ text = "Wajib diisi" }: { text?: string }) {
  return (
    <p className="text-xs text-slate-400">
      <span className="text-red-500">*</span> {text}
    </p>
  );
}
