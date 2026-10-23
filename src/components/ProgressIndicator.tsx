export default function ProgressIndicator({ current, total = 3 }: { current: number; total?: number }) {
  return (
    <div className="flex justify-center gap-2 mb-4" role="group" aria-label={`Étape ${current + 1} sur ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-7 rounded-full transition-colors duration-500 ${
            i <= current ? 'bg-gradient-to-r from-rose to-strawberry' : 'bg-blush'
          }`}
        />
      ))}
    </div>
  );
}