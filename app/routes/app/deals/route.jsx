import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { Card, Button } from "@shopify/polaris";
import { getDeals, createDeal, deleteDeal } from "../../models/deal.server";
import { authenticate } from "../../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ deals: await getDeals() });
};

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
    </div>
  );
}
