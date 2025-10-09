
"use client"

import { deleteChamp, getChampsByUser } from "@/action";
import Wrapper from "../components/Wrapper"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ChampFormData } from "@/type";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/ConfirmDialog";
import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";


const totalChamps = () => {

    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [Champs, setChamps] = useState<ChampFormData[]>([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedChampId, setSelectedChampId] = useState("");
    const router = useRouter();


    const fetchChamps = async () => {

        setLoading(true)

        if (user?.id) {
            try {
                const champs = await getChampsByUser(user.id);
                setChamps(champs ?? []);
            
            } catch (error){
                console.error(error)
            }
        }
        setLoading(false)
    };


    useEffect(() => {
        fetchChamps();
    }, [user]);


    // const updateChamps = (champ: ChampFormData) => {

    //     setNom(champ.nom ?? "");
    //     setVillage(champ.village ?? "");
    //     setSuperficie(champ.superficie ?? "");
    //     if (champ.coordonnees) {

    //     const [lat, lng] = champ.coordonnees.split(",").map(Number);
    //     setCoordonnees({ lat, lng });

    //     } else {

    //     setCoordonnees(null);
    //     }
    //     setEditingId(champ.id!);
    // };

    const confirmDelete = async () => {
        
        if (!selectedChampId) return;
    
        try {
    
          await deleteChamp(selectedChampId);
          toast.success("Champ supprimé avec succès");
          fetchChamps();

        } catch (error) {
    
          console.error(error);
          toast.error("Erreur lors de la suppression du champ");

        } finally {
    
          setConfirmOpen(false);
          setSelectedChampId("");
        }
    };

    // const handleDeleteClick = (champId: string) => {
    //     setSelectedChampId(champId);
    //     setMessage("Voulez-vous vraiment supprimer ce champ definitivement ?");
    //     setConfirmOpen(true);
    // };

    const backPage = () => {
        router.push("/champs");
    }
    

    return (


        <Wrapper>
            

            <div className="mt-8">
                {loading ? (
                    <div className="w-full mt-10 flex justify-center items-center h-64">
                        <span className="loading loading-dots loading-xl text-primary"></span>
                    </div>
                ) : (
                    <div className="animate-fadeIn">
                        <div>

                            <div className="flex items-center justify-start">
                                <button 
                                    className="btn hover:bg-slate-400 rounded-[10px] my-2 hover:scale-105 transition-all duration-300 text-slate-800 shadow-xl"
                                    onClick={backPage}
                                >
                                    <ArrowBigLeft />
                                    Retour
                                </button>
                            </div>

                            <h2 className="text-3xl font-extrabold mb-6 text-center text-primary flex items-center justify-center gap-2">
                            🌾 <span>Tous mes Champs</span>
                            </h2>

                            
                        </div>

                        {Champs.length === 0 ? (
                            <p className="text-gray-500 text-center italic bg-base-200 py-6 rounded-xl shadow-inner">
                            Aucun champ enregistré.
                            </p>
                        ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {Champs.map((champ) => {

                                const imageUrl = champ.imageUrl;

                                return (
                                    <div
                                        key={champ.id}
                                        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 hover:border-primary/30 rounded-2xl overflow-hidden group"
                                    >
                                        <figure className="relative h-40 overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt={champ.nom}
                                            className="object-cover object-center w-full h-full group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent"></div>
                                        <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                            {champ.village}
                                        </span>
                                        </figure>

                                        <div className="card-body">
                                        <h3 className="card-title text-lg font-bold text-primary group-hover:text-primary-focus transition-colors duration-200">
                                            {champ.nom}
                                        </h3>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            📍Village : <span className="font-medium">{champ.village}</span>
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            🚩Superfice : 
                                                <span className="font-medium">
                                                    {champ.superficie} ha
                                                </span>
                                        </p>

                                        <div className="card-actions justify-end mt-4">
                                            <button
                                            onClick={() => {
                                                if(!champ.id){
                                                    toast.error(" ID du champs introuvable pour la suppression")
                                                } else {
                                                    
                                                    setConfirmOpen(true);
                                                    setSelectedChampId(champ.id);
                                                    setMessage("Supprimer ce champs definitivement?");
                                                }

                                            }}
                                            className="btn btn-sm btn-error btn-outline hover:scale-102 transition-all duration-300 rounded-[5px]"
                                            >
                                            Supprimer
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                    );
                            })}
                                </div>
                        )}
                    </div>
                )}
            </div>



            <ConfirmDialog 
                isOpen={confirmOpen} 
                message={message} 
                onConfirm={confirmDelete} 
                onCancel={() => setConfirmOpen(false)}
            />

        </Wrapper>
    )
}

export default totalChamps;