export default function CategoryHeader({ category }) {
    return (
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold uppercase">{category}</h1>
      </div>
    );
  }