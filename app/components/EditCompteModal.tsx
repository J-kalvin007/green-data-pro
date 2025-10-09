
"use client";

import { useState } from "react";
import { CompteExploitationFrom } from "@/type";

type Props = {
  compte: CompteExploitationFrom;
  onClose: () => void;
  onSave: (updatedData: any) => void;
  loading: boolean;
  dateDebut : string,
  dateFin : string
};

const EditCompteModal = ({ compte, onClose, onSave, loading, dateDebut, dateFin }: Props) => {
  const [form, setForm] = useState({
    nomProduit: compte.nomChamp || "",
    numero: compte.numeroProduit || "",
    superficie: compte.superficie || "",
    typeProduction: compte.typeProduction || "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-base-100 rounded-2xl p-6 w-full max-w-lg shadow-xl border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-center">
          Modifier le compte d’exploitation 🌿
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Nom du produit</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={form.nomProduit}
              onChange={(e) => handleChange("nomProduit", e.target.value)}
            />
          </div>

          <div>
            <label className="label">Numéro</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={form.numero}
              onChange={(e) => handleChange("numero", e.target.value)}
            />
          </div>

          <div>
            <label className="label">Superficie (ha)</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={form.superficie}
              onChange={(e) => handleChange("superficie", e.target.value)}
            />
          </div>

          <div>
            <label className="label">Type de production</label>
            <select
              className="select select-bordered w-full"
              value={form.typeProduction}
              onChange={(e) =>
                handleChange("typeProduction", e.target.value)
              }
            >
              <option value="vegetale">Végétale</option>
              <option value="animale">Animale</option>
              <option value="transformation">Transformation</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="label">Date de début</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={dateDebut}
                onChange={(e) => handleChange("dateDebut", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="label">Date de fin</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={dateFin}
                onChange={(e) => handleChange("dateFin", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost border border-gray-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompteModal;
