import React from "react";

// Components
import NutritionHeroCarousel from "./NutritionHeroCarousel";
import NutritionCarousel from "./NutritionCarousel";
import NutritionCard from "./NutritionCard";

function Nutrition() {
  const NutriCard = [
    {
      bg:"red",
      image:"https://dote.zmtcdn.com/prod/data/admin_assets/images/985/1db983abf8a38bdebb42171b5ea7d985_1614756360.png?output-format=webp"
    },
    {
      bg:"blue",
      image:"https://dote.zmtcdn.com/prod/data/admin_assets/images/985/1db983abf8a38bdebb42171b5ea7d985_1614756360.png?output-format=webp"
    },
    {
      bg:"green",
      image:"https://dote.zmtcdn.com/prod/data/admin_assets/images/985/1db983abf8a38bdebb42171b5ea7d985_1614756360.png?output-format=webp"
    },
  ];

  return (
    <div>
      <NutritionHeroCarousel />
      <div className="my-6">
        <NutritionCarousel />
      </div>
      <div className="flex justify-evenly flex-wrap">
        <NutritionCard
          bg="red"
          image="https://dote.zmtcdn.com/prod/data/admin_assets/images/985/1db983abf8a38bdebb42171b5ea7d985_1614756360.png?output-format=webp"
        />
        <NutritionCard
          bg="red"
          image="https://dote.zmtcdn.com/prod/data/admin_assets/images/985/1db983abf8a38bdebb42171b5ea7d985_1614756360.png?output-format=webp"
        />
        <NutritionCard
          bg="red"
          image="https://dote.zmtcdn.com/prod/data/admin_assets/images/985/1db983abf8a38bdebb42171b5ea7d985_1614756360.png?output-format=webp"
        />
        {NutriCard.map((card, index)=>(
          <NutritionCard {...card} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Nutrition;
