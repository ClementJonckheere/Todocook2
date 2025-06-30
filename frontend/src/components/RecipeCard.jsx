export default function RecipeCard({ title, calories }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{calories} kcal</p>
      </div>
      <button className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold hover:bg-green-600">
        +
      </button>
    </div>
  );
}
