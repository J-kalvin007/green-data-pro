"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getChampsByUser } from "@/action";
import { ChampFormData } from "@/type";

interface SelectionnerChampProps {
  onSelect: (champ: ChampFormData | null) => void; // callback parent
}

function SelectionnerChamp({ onSelect }: SelectionnerChampProps) {
  const { user } = useUser();
  const [champs, setChamps] = useState<ChampFormData[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  // Charger les champs depuis la base
  useEffect(() => {
    if (!user?.id) return;

    const fetchChamps = async () => {
      try {
        const result = await getChampsByUser(user.id);
        if (result) setChamps(result);
      } catch (error) {
        console.error("Erreur lors du chargement des champs :", error);
      }
    };

    fetchChamps();
  }, [user]);

  // Gestion du changement de sélection
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);

    const selectedChamp = champs.find((champ) => champ.id === id) || null;

    // Appeler la fonction parent
    onSelect(selectedChamp);

    
  };



  return (


    <div className="w-full mx-auto">

      <label className="block font-medium mb-2">Choisir un champ :</label>
      <select
        className="select select-bordered w-full rounded-xl h-10 border border-base-800 focus:outline-none"
        value={selectedId}
        onChange={handleSelectChange}
      >
        <option value="">-- Sélectionnez un champ --</option>
        {champs.map((champ) => (
          <option key={champ.id} value={champ.id}>
            {champ.nom} ({champ.village})
          </option>
        ))}
      </select>

    </div>
  );
}

export default SelectionnerChamp;
