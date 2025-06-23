import { Category } from '@/types'
import Link from 'next/link'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 group"
    >
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-3">{category.icon}</span>
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
      </div>
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
        {category.description}
      </p>
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {category.subcategories.slice(0, 2).map((sub) => (
            <span
              key={sub.name}
              className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {sub.name}
            </span>
          ))}
          {category.subcategories.length > 2 && (
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
              +{category.subcategories.length - 2}
            </span>
          )}
        </div>
      )}
    </Link>
  )
} 