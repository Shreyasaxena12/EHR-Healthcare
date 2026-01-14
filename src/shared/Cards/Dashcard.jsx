export default function DashCard({ num, text, icon, bgColor = "bg-white", textColor = "text-gray-700" }) {
  return (
    <div className="flex flex-col items-center justify-center p-1">
      <div
        className={`flex items-center gap-4 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${bgColor} w-full max-w-sm`}
      >
        {icon && <div className="text-6xl text-[var(--clr-lemon)]">{icon}</div>}

        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">{num}</h2>
          <p className={`mt-1 text-sm font-medium ${textColor} truncate`}>{text}</p>
        </div>
      </div>
    </div>
  );
}
