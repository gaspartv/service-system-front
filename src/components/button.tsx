export default function Button({ children }: any) {
  return (
    <button
      type="submit"
      className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      {children}
    </button>
  )
}
