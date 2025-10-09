
"use client"

import { ChampFormData, EditForm } from "@/type";
import SelectionnerChamp from "./Selection_champ";




type Production = "vegetale" | "animale" | "transformation";

type Props = {
  onClose: () => void;
  loading: boolean;
  onSubmit: (form: EditForm) => void; // <-- important
  formData: { numero: string; nomProduit: string; superficie: string };
  onChange: (field: "numero" | "nomProduit" | "superficie", value: string) => void;
  production: Production;
  setProduction: React.Dispatch<React.SetStateAction<Production>>;
  dateDebut: string;
  dateFin: string;
  setDateDebut: (v: string) => void;
  setDateFin: (v: string) => void;
  champSelectionne: ChampFormData | null;
  setChampSelectionne: (champ: ChampFormData | null) => void;
};



const EditModal : React.FC<Props> = ({

onClose,
  loading,
  onSubmit,
  formData,
  onChange,
  production,
  setProduction,
  dateDebut,
  dateFin,
  setDateDebut,
  setDateFin,
  champSelectionne,
  setChampSelectionne,
}) => {

    return (

    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
          ✕
        </button>

        <h3 className="font-bold text-xl text-center mb-4">Modifier un compte d'exploitation</h3>

        <form className="flex flex-col gap-4">
          <input
            placeholder="Numéro"
            value={formData.numero}
            onChange={(e) => onChange("numero", e.target.value)}
            className="input input-bordered w-full h-10 rounded-xl"
          />

          <input
            placeholder="Nom du produit"
            value={formData.nomProduit}
            onChange={(e) => onChange("nomProduit", e.target.value)}
            className="input input-bordered w-full h-10 rounded-xl"
          />

          <input
            placeholder="Superficie (ha)"
            value={formData.superficie}
            onChange={(e) => onChange("superficie", e.target.value)}
            className="input input-bordered w-full h-10 rounded-xl"
          />

          <select
            className="select select-bordered w-full h-10 rounded-xl"
            value={production}
            onChange={(e) => setProduction(e.target.value as Production)}
          >
            <option value="vegetale">Production végétale</option>
            <option value="animale">Production animale</option>
            <option value="transformation">Transformation</option>
          </select>

          <SelectionnerChamp onSelect={setChampSelectionne} />

          {champSelectionne && (
            <div className="p-3 border rounded-lg bg-base-200">
              <p>Champ : <strong>{champSelectionne.nom}</strong> </p>
              <p>Village :<strong> {champSelectionne.village}</strong></p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex justify-between gap-2 mt-2">
                <button 
                    type="button" 
                    className="btn btn-ghost" 
                    onClick={onClose}
                >
                    Annuler

                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={loading}
                    onClick={() =>
                        onSubmit({
                        nomProduit: formData.nomProduit,
                        numeroProduit: formData.numero,
                        superficie: formData.superficie,
                        champId: champSelectionne?.id ?? "",
                        champName: champSelectionne?.nom ?? "",
                        dateDebut,
                        dateFin,
                        typeProduction: production,
                        })
                    }
                    >
                    {loading ? "Traitement..." : "Valider"}
                </button>

            </div>

        </form>

      </div>
      
    </div>

    )
}

export default EditModal