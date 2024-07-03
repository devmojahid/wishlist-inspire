import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { Card, Button } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { getDeals } = await import("../models/deal.server");
  return json({ deals: await getDeals() });
}

// export async function action({ request }) {
//   let settings = await request.formData();
//   settings = Object.fromEntries(settings);
//   return json(settings);
// }

// export const action = async ({ request }) => {
//   let formData = new URLSearchParams(await request.text());
//   let actionType = formData.get("action");
//   let { createDeal, deleteDeal } = await import("../models/deal.server");

//   if (actionType === "create") {
//     const name = formData.get("name");
//     const price = formData.get("price");
//     const startDate = formData.get("startDate");
//     const endDate = formData.get("endDate");
//     await createDeal({ name, price, startDate, endDate });
//   } else if (actionType === "delete") {
//     const id = formData.get("id");
//     await deleteDeal(id);
//   }

//   return redirect("/app/deals");
// };

export default function Deals() {
  const { deals } = useLoaderData();

  return (
    <div>
      <h1>Deals</h1>
      <div>
        {deals.map((deal) => (
          <Card key={deal.id}>
            <Card.Section>
              <p>{deal.title}</p>
              <p>{deal.description}</p>
            </Card.Section>
            <Card.Section>
              <Form method="post" action={`/app/deals/${deal.id}/delete`}>
                <Button submit destructive>
                  Delete
                </Button>
              </Form>
            </Card.Section>
          </Card>
        ))}
      </div>
      <Form method="post">
        <input type="text" name="name" placeholder="Deal Name" required />
        <input type="text" name="price" placeholder="Deal Price" required />
        <input type="date" name="startDate" required />
        <input type="date" name="endDate" required />
        <Button primary submit={true}>
          Create Deal
        </Button>
      </Form>
    </div>
  );
}
