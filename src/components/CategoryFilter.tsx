const categories = ["Full Videos", "Shorts Videos", "Travel Videos", "Vlog Videos"];

interface CategoryFilterProps {
  active: string;
  onChange: (cat: string) => void;
}

const CategoryFilter = ({ active, onChange }: CategoryFilterProps) => (
  <div className="flex gap-2 flex-wrap">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={`px-4 py-2 rounded-lg text-sm font-bold text-white transition-all duration-300 ease-out ${
          active === cat
            ? "metallic-card shadow-lg border border-white/30 shadow-white/20"
            : "bg-secondary/80 hover:bg-white/20 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
