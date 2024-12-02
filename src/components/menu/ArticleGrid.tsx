import { useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { SearchBar } from "./SearchBar";

const demoArticles = [
  {
    id: "1",
    title: "Salade César",
    description: "Laitue romaine, croûtons, parmesan, sauce césar maison",
    price: 12.90,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
    allergens: ["Gluten", "Lactose"],
    prepTime: "15 min",
  },
  {
    id: "2",
    title: "Burrata",
    description: "Burrata crémeuse, tomates cerises, basilic frais",
    price: 14.90,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af",
    allergens: ["Lactose"],
    prepTime: "10 min",
  },
  {
    id: "3",
    title: "Carpaccio de Bœuf",
    description: "Fines tranches de bœuf, copeaux de parmesan, roquette",
    price: 16.90,
    image: "https://images.unsplash.com/photo-1648146298465-4493d0f96362",
    allergens: ["Lactose"],
    prepTime: "12 min",
  },
];

export const ArticleGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = demoArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SearchBar onSearch={setSearchQuery} />
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            price={article.price}
            image={article.image}
            allergens={article.allergens}
            prepTime={article.prepTime}
          />
        ))}
      </div>
    </div>
  );
};