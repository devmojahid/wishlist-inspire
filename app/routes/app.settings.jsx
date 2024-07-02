import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Divider,
  useBreakpoints,
  Button
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { json } from "@remix-run/node";
import db from "../db.server";

export async function loader(){
  // let settingsdata = await db.setting.findFirst();
  // let settingsdata = await db.setting.findFirst({ where: { id: 1 } });
  // let settingsdata = await db.setting.findUnique({ where: { id: 1 } });
  let settingsdata = { name: "My App", description: "My app description"}


  return json(settingsdata);
}

export async function action({ request }){
  let settings = await request.formData();
  settings = Object.fromEntries(settings);
  await db.setting.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      name: settings.name,
      description: settings.description
    },
    update: {
      name: settings.name,
      description: settings.description
    }
  });
  return json(settings);
}

export default function SettingsPage() {
  const settingsdata = useLoaderData();
  const [settings, setSettings] = useState(settingsdata);
  const { smUp } = useBreakpoints();
  return (
    <Page>
      <TitleBar title="Settings page" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Configure your app settings. These settings will be used in various places in your app.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField label="App Name" name="name" value={settings?.name} onChange={(value) => setSettings({ ...settings, name: value })} />
                <TextField label="App Description" name="description" value={settings?.description} onChange={(value) => setSettings({ ...settings, description: value })} />
              <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
        {smUp ? <Divider /> : null}
      </BlockStack>
    </Page>
  );
}
