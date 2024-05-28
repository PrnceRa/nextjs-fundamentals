import React from "react";

import styles from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/src/lib/meals";
import { notFound } from "next/navigation";

export const generateMetadata = async ({params : {mealsSlug}}) => {
    const meals = await getMeal(mealsSlug);
    if(!meals)notFound();
    return { title : meals.title , description : meals.summary}
}

const MealDetailsPage = async ({ params: { mealsSlug } }) => {
  const meals = await getMeal(mealsSlug);
  if (!meals) {
    return notFound();
  }
  let { title, creator, summary, creator_email, image, instructions } = meals;
  instructions = instructions.replace(/\n/g, "<br/>");
  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image fill src={image} alt={title} sizes="small" />
        </div>
        <div className={styles.headerText}>
          <h1>{title}</h1>
          <p className={styles.creator}>
            by <a href={`mainto:${creator_email}`}>{creator}</a>
          </p>
          <p className={styles.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{ __html: instructions }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailsPage;
