const categories = ["All", "Tech", "Vlogs", "Education", "Gaming", "Music", "Travel"];

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
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          active === cat
            ? "metallic-card text-foreground shadow-lg border border-metallic-shine/20"
            : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
