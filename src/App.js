import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  Page,
  Card,
  Button,
  Checkbox,
  Select,
  TextField,
  Stack,
  Link,
  Icon,
} from "@shopify/polaris";
import { React, useState, useCallback } from "react";
import { DuplicateMinor } from "@shopify/polaris-icons";
import axios from "axios";

function App() {
  //TextField merchant_url
  const [valueUrl, setValueUrl] = useState("");
  const handleChangeUrl = useCallback((newValue) => setValueUrl(newValue), []);

  //Select Apps
  const [selectedApps, setSelectedApps] = useState("Wishlist");
  const handleSelectChangeApps = useCallback(
    (value) => setSelectedApps(value),
    []
  );
  const optionsApps = [
    { label: "Wishlist", value: "Wishlist" },
    { label: "BiSPA", value: "Watchlist" },
    // { label: "HTC", value: "HTC" },
  ];

  //Select Plan
  const [selectedPlan, setSelectedPlan] = useState("Starter");
  const handleSelectChangePlan = useCallback(
    (value) => setSelectedPlan(value),
    []
  );
  const optionsPlan = [
    { label: "Starter", value: "Starter" },
    { label: "Premium", value: "Premium" },
    { label: "Pro", value: "Pro" },
    { label: "Enterprise", value: "Enterprise" },
  ];

  //Checkbox Trial
  const [checkedTrial, setCheckedTrial] = useState(false);
  const handleChangeTrial = useCallback(
    (newChecked) => setCheckedTrial(newChecked),
    []
  );

  //TextField Price
  const [valuePrice, setValuePrice] = useState("0");
  const handleChangePrice = useCallback(
    (newValue) => setValuePrice(newValue),
    []
  );

  //Checkbox Trial
  const [checkedAnnual, setCheckedAnnual] = useState(false);
  const handleChangeAnnual = useCallback(
    (newChecked) => setCheckedAnnual(newChecked),
    []
  );

  // Button state & API Call
  const [paymentLink, setLink] = useState("");
  const [generated, setGenerated] = useState(false);

  function submitFunc(event) {
    console.log("Invokeddddd");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "m-url": valueUrl,
        "app-name": selectedApps,
        plan: selectedPlan,
        trial: checkedTrial ? "1" : "0",
        price: valuePrice,
        annual: checkedAnnual,
      }),
    };
    console.log(requestOptions.body);
    fetch("http://127.0.0.1:5000/generate-payment", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLink(data.confirmation_url);
        setGenerated(true);
      });

    // const requestOptionsAxios = {
    //   url: "http://127.0.0.1:5000/generate-payment",
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   data: JSON.stringify({
    //     "m-url": valueUrl,
    //     "app-name": selectedApps,
    //     plan: selectedPlan,
    //     trial: checkedTrial ? "1" : "0",
    //     price: valuePrice,
    //     annual: checkedAnnual,
    //   }),
    // };
    // axios(requestOptionsAxios).then((data) => {
    //   console.log(data);
    //   setLink(data.confirmation_url);
    //   setGenerated(true);
    // });
  }

  // Function to Copy Link
  function copyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(paymentLink).then(() => {
        alert("Copied to clipboard");
      });
    } else {
      const el = document.createElement("input");
      el.value = paymentLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      alert("Copied to clipboard");
    }
  }

  return (
    <AppProvider i18n={enTranslations}>
      <Page title="Enterprise Payment Link" narrowWidth={true}>
        <Card sectioned>
          <Stack vertical={true} spacing="loose">
            <TextField
              label="Merchant URL"
              type="text"
              value={valueUrl}
              onChange={handleChangeUrl}
              autoComplete="off"
              placeholder="<shop.myshopify.com>"
            />

            <Select
              label="App"
              // labelInline
              options={optionsApps}
              onChange={handleSelectChangeApps}
              value={selectedApps}
            />

            <Select
              label="Plan"
              // labelInline
              options={optionsPlan}
              onChange={handleSelectChangePlan}
              value={selectedPlan}
            />

            <Checkbox
              label="Trial"
              checked={checkedTrial}
              onChange={handleChangeTrial}
            />

            <TextField
              label="Price"
              type="number"
              value={valuePrice}
              onChange={handleChangePrice}
              autoComplete="off"
            />

            <Checkbox
              label="Annual"
              checked={checkedAnnual}
              onChange={handleChangeAnnual}
            />

            <Button onClick={submitFunc}>Generate Payment Link</Button>

            {generated && (
              <Stack>
                <Link url={paymentLink} id="link">
                  {paymentLink}
                </Link>
                <Button size="slim" onClick={copyLink}>
                  <Icon source={DuplicateMinor} color="base" />{" "}
                </Button>
              </Stack>
            )}
          </Stack>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default App;
