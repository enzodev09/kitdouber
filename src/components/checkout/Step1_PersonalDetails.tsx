import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type PersonalDetails = {
  fullName: string;
  email: string;
  phone: string;
};

type Props = {
  data: PersonalDetails;
  onChange: (data: Partial<PersonalDetails>) => void;
};

const Step1_PersonalDetails = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Dados pessoais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input
            id="fullName"
            placeholder="Seu nome completo"
            className="bg-white border-gray-300 text-slate-900"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@email.com"
            className="bg-white border-gray-300 text-slate-900"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            placeholder="(xx) xxxxx-xxxx"
            className="bg-white border-gray-300 text-slate-900"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1_PersonalDetails;
