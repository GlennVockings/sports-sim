export const GamesWrapper = () => {
  return (
    <div className="py-4">
      <p className="font-semibold pb-2 underline">My Games</p>
      <div className="flex flex-col">
        <a href="/1/10" className="p-2 bg-blue-200 rounded-md shadow-xl">
          <p>Sports Day</p>
          <p className="text-sm">Work Sports Day</p>
        </a>
      </div>
    </div>
  )
}