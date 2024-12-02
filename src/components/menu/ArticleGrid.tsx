import { ArticleCard } from "./ArticleCard";

const demoArticles = [
  {
    id: "1",
    title: "McFLURRY™ DAIM",
    description: "Dessert glacé à base de lait saveur vanille avec nappage au miel",
    price: 5.35,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af",
    allergens: ["Lactose"],
    prepTime: "5 min",
  },
  {
    id: "2",
    title: "BIG MAC™ CHICKEN",
    description: "Pain spécial, spécialités panées au poulet, salade, oignon, cornichon",
    price: 11.60,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
    allergens: ["Gluten"],
    prepTime: "10 min",
  },
  {
    id: "3",
    title: "6 VEGGIE McNUGGETS®",
    description: "Spécialité panée à base de blé et de maïs",
    price: 11.60,
    image: "https://images.unsplash.com/photo-1648146298465-4493d0f96362",
    allergens: ["Gluten"],
    prepTime: "8 min",
  },
];

export const ArticleGrid = () => {
  return (
    <div className="flex flex-col divide-y">
      {demoArticles.map((article) => (
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
  );
};