import { ArticleCard } from "./ArticleCard";

const demoArticles = [
  {
    id: "1",
    title: "Salade César",
    description: "Laitue romaine, croûtons, parmesan, sauce césar maison",
    price: 12.90,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
  },
  {
    id: "2",
    title: "Burrata",
    description: "Burrata crémeuse, tomates cerises, basilic frais",
    price: 14.90,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af",
  },
  {
    id: "3",
    title: "Carpaccio de Bœuf",
    description: "Fines tranches de bœuf, copeaux de parmesan, roquette",
    price: 16.90,
    image: "https://images.unsplash.com/photo-1648146298465-4493d0f96362",
  },
];

export const ArticleGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {demoArticles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          description={article.description}
          price={article.price}
          image={article.image}
        />
      ))}
    </div>
  );
};