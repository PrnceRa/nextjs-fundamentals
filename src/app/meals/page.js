import Link from "next/link";

import classes from "./page.module.css";
import MealsGrid from "@/src/components/meals/meals-grid";
import { getMeals } from "@/src/lib/meals";
import { Suspense } from "react";

export const metadata = {
    title : 'All meals',
    description : 'Browser all theavailable meals.'
}

async function MealsData() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching Meals...</p>}
        >
          <MealsData />
        </Suspense>
      </main>
    </>
  );
}
