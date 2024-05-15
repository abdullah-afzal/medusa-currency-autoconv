import {
  Button,
  Container,
  Heading,
  Select,
  // CurrencyInput,
  Input,
  DatePicker,
  Label,
} from "@medusajs/ui";
// import { ArrowLeft } from "@medusajs/icons";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useAdminCurrencies,
  useAdminCustomPost,
  useAdminCustomQuery,
} from "medusa-react";

const EditRate = () => {
  const { currencies, isLoading: isCurrenciesLoading } = useAdminCurrencies({
    limit: 120,
    offset: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useAdminCustomQuery(`/manual-rates/${id}`, [
    "get-manual-rate",
  ]);
  const { mutate } = useAdminCustomPost(`/manual-rates/${id}`, ["update-manual-rate"]);
  const [code, setCode] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [currencyCode, setCurrencyCode] = useState({});
  const [rate, setRate] = useState(0);
  const [expiryDate, setExpiryDate] = useState(null);

  const handleCurrencyUpdate = (selectedCurrency) => {
    setCode(selectedCurrency);
    setSymbol(currencyCode[selectedCurrency]);
  };

  useEffect(() => {
    if (!isCurrenciesLoading) {
      const currencyCodeMap = {};
      currencies.forEach((currency) => {
        currencyCodeMap[currency.code] = currency.symbol;
      });
      setCurrencyCode(currencyCodeMap);
    }
  }, [isCurrenciesLoading, currencies]);

  useEffect(() => {
    if (data) {
      setCode(data.rate.code);
      setRate(data.rate.rate);
      setSymbol(currencyCode[data.rate.code]);
      setExpiryDate(new Date(data.rate.expires_at));
    }
  }, [data]);

  const handleRateChange = (value) => {
    setRate(value);
  };

  const handleDateChange = (date) => {
    setExpiryDate(date);
  };

  const handleSave = () => {
    mutate(
      {
        code: code,
        rate: rate,
        expires_at: expiryDate,
      },
      {
        onSuccess: () => {
          navigate("/a/rates");
        },
      }
    );
  };

  return (
    <>
      <div
        style={{ display: "inline-flex", alignItems: "center", margin: "15px" }}
      >
        <Link to={"/a/rates"} className="gap-x-2 flex flex-center">
          {/* <ArrowLeft />  */}
          Back to Rates
        </Link>
      </div>
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="overflow-y-auto px-24 py-8 flex flex-col gap-y-4">
            <Heading level="h1">Add manual settings for a currency</Heading>

            <Label>Select Currency from Drop down to add</Label>
            <div className="w-[256px]">
              <Select
                onValueChange={(selectedCurrency) =>
                  handleCurrencyUpdate(selectedCurrency)
                }
                value={code}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Select a currency" />
                </Select.Trigger>
                <Select.Content>
                  {currencies?.map((item) => (
                    <Select.Item key={item.code} value={item.code}>
                      {item.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>

            <Label>Add Rate for Selected Currency:</Label>
            <div className="max-w-[250px]">
              {/* <CurrencyInput
                symbol={symbol}
                code={code}
                disabled={code == null}
                value={rate}
                onChange={(e) => handleRateChange(e.target.value)}
              /> */}
              <Input
                value={rate}
                disabled={code == null}
                onChange={(e) => handleRateChange(e.target.value)}
              />
            </div>

            <Label>Add Expiry Date </Label>
            <div className="w-[250px]">
              <DatePicker
                placeholder="Pick a date"
                onChange={handleDateChange}
                value={expiryDate}
              />
            </div>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditRate;
