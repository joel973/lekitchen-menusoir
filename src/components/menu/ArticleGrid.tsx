import { ArticleCard } from "./ArticleCard";

const demoArticles = [
  {
    id: "1",
    title: "Double Cheese Supreme",
    description: "Double steak haché, cheddar fondu, sauce signature, oignons caramélisés",
    price: 12.90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    allergens: ["Gluten", "Lactose"],
    prepTime: "12-15 min",
  },
  {
    id: "2",
    title: "Crispy Chicken",
    description: "Poulet croustillant, laitue, tomates, sauce ranch",
    price: 9.90,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
    allergens: ["Gluten"],
    prepTime: "10 min",
  },
  {
    id: "3",
    title: "Veggie Delight",
    description: "Steak végétal, avocat, roquette, sauce vegan",
    price: 11.90,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    allergens: ["Soja"],
    prepTime: "8-10 min",
  },
];

export const ArticleGrid = () => {
  return (
    <div className="container py-6">
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
    </div>
  );
};