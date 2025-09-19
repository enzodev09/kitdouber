import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type ShippingDetails = {
  address: string;
  number: string;
  zip: string; // CEP
  selectedOptionId?: string;
  selectedOptionPrice?: number;
};

type ShippingOption = {
  id: string;
  label: string;
  price: number; // em BRL
  eta: string; // prazo
};

const mockOptions: ShippingOption[] = [
  { id: "economy", label: "Econômico", price: 0, eta: "6-8 dias úteis" },
  { id: "standard", label: "Padrão", price: 19.9, eta: "3-5 dias úteis" },
  { id: "express", label: "Expresso", price: 34.9, eta: "1-2 dias úteis" },
];

type Props = {
  data: ShippingDetails;
  onChange: (data: Partial<ShippingDetails>) => void;
};

const Step2_Shipping = ({ data, onChange }: Props) => {
  const [options, setOptions] = useState<ShippingOption[]>(mockOptions);
  const [loading, setLoading] = useState(false);

  const handleCalculateShipping = async () => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
      if (!baseUrl || !anonKey) throw new Error("Supabase env vars ausentes");

      const resp = await fetch(`${baseUrl}/functions/v1/calculate-shipping`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${anonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zip: data.zip }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const json = (await resp.json()) as { options: ShippingOption[] };
      setOptions(json.options);
    } catch (err) {
      console.error("Falha ao calcular frete:", err);
      // Fallback ao mock para não travar o fluxo
      setOptions(mockOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Endereço e Frete</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            placeholder="Rua, avenida..."
            className="bg-white border-gray-300 text-slate-900"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="number">Número</Label>
          <Input
            id="number"
            placeholder="123"
            className="bg-white border-gray-300 text-slate-900"
            value={data.number}
            onChange={(e) => onChange({ number: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="zip">CEP</Label>
          <Input
            id="zip"
            placeholder="00000-000"
            className="bg-white border-gray-300 text-slate-900"
            value={data.zip}
            onChange={(e) => onChange({ zip: e.target.value })}
          />
        </div>
        <div className="md:col-span-2 flex items-end">
          <Button disabled={loading} onClick={handleCalculateShipping} className="w-full md:w-auto">
            {loading ? "Calculando..." : "Calcular Frete"}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-slate-900 font-semibold">Opções de frete</h3>
        <div className="space-y-2">
          {options.map((opt) => (
            <label key={opt.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${data.selectedOptionId === opt.id ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shippingOption"
                  checked={data.selectedOptionId === opt.id}
                  onChange={() => onChange({ selectedOptionId: opt.id, selectedOptionPrice: opt.price })}
                />
                <span className="text-slate-800">{opt.label} • {opt.eta}</span>
              </div>
              <span className="text-slate-900 font-semibold">{opt.price === 0 ? "Grátis" : `R$ ${opt.price.toFixed(2)}`}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2_Shipping;
