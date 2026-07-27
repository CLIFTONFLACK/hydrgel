const STEPS = [
  { n: '1', title: 'Pour', body: '330 ml of contaminated water — about the size of a soft drink can.' },
  { n: '2', title: 'Wait', body: 'Three minutes. The silver-based cryogel absorbs and purifies.' },
  { n: '3', title: 'Drink', body: 'Safe, clean, tasteless water. Reusable up to 100 times.' },
]

export default function ProcessDiagram() {
  return (
    <figure className="bg-gray-50 rounded-2xl p-8">
      <figcaption className="text-sm font-semibold text-gray-900 mb-6">How it works</figcaption>
      <ol className="space-y-6">
        {STEPS.map((s, i) => (
          <li key={s.n} className="relative flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              {s.n}
            </div>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-5 top-10 h-6 w-0.5 bg-blue-200"
              />
            )}
            <div className="ml-4">
              <h4 className="font-semibold text-green-500">{s.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}
