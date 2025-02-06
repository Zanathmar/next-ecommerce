import { Fragment } from "react";
import CategoryHeader from "./_partials/CategoryHeader";
import CategoryProducts from "./_partials/CategoryProducts";



export default function CategoryPage({ params }) {
  return (
    <Fragment>
        <div>
      <h1 className="text-2xl font-bold">Category: {params.category}</h1>
      <p>Display products from the {params.category} category here.</p>
    </div>
      <CategoryHeader category={params.category} />
      <CategoryProducts category={params.category} />
    </Fragment>
  );
}