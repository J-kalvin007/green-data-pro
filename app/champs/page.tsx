
// ---------------- Original ------------------------


// "use client"

// import { useState, useEffect, use } from "react";
// import CarteGoogle from "../components/Google_Maps";
// import MessageDialog from "../components/Message_Dialog";
// import Wrapper from "../components/Wrapper";
// import { createChamps, getChampsByUser, deleteChamp, updateChamp } from "@/action";
// import { useUser } from "@clerk/nextjs";
// import { toast } from "react-toastify";
// import { ChampFormData } from "@/type";
// import ConfirmDialog from "../components/ConfirmDialog";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { FileImage, Sparkles } from "lucide-react";
// import { useRouter } from "next/navigation";
// import ProductImage from "../components/ProductImage";

// const ChampsPage = () => {


//   const { user } = useUser();
//   const router = useRouter();
//   const [nom, setNom] = useState<string>("");
//   const [village, setVillage] = useState<string>("");
//   const [superficie, setSuperficie] = useState<string>("");
//   const [coordonnees, setCoordonnees] = useState<{ lat: number; lng: number } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [Champs, setChamps] = useState<ChampFormData[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null); 

//   const [isOpen, setIsOpen] = useState(false);
//   const [dialogTitle, setDialogTitle] = useState("");
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [isMapOpen, setIsMapOpen] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedChampId, setSelectedChampId] = useState<string | null>(null);
//   const pathname = usePathname();

//   const resetForm = () => {
//     setNom("");
//     setVillage("");
//     setSuperficie("");
//     setCoordonnees(null);
//     setEditingId(null);
//   };

//   const handleFormSubmit = async (e: React.FormEvent) => {

//     e.preventDefault();

//     if (!nom || !village || !superficie) {
//       setDialogTitle("Formulaire invalide 🚫");
//       setDialogMessage("Veuillez remplir tous les champs !");
//       setIsOpen(true);
//       return false;
//     }

//     if(!file) {
//       toast.error("Veuillez selectionner une image📷.");
//       return;
//     }

//     try {

//       const imageData = new FormData();

//       imageData.append("file", file);

//       const res = await fetch("api/upload", {
//         method : "POST",
//         body : imageData
//       });
//       const data = await res.json();

//       if(!data.success){
//           throw new Error("Erreur lors du chargement de l'image")

//       } else {

//         const formData: ChampFormData = {
//           id: editingId ?? undefined,
//           nom,
//           village,
//           superficie,
//           coordonnees: coordonnees ? `${coordonnees.lat},${coordonnees.lng}` : undefined,
//           imageUrl : imageUrl,
//         };

//         formData.imageUrl = data.path;

//         try {

//           if (user) {

//             if (editingId) {

//               await updateChamp(formData);
//               toast.success("Champ mis à jour avec succès");
//             } 
//             else {

//               await createChamps(user.id, formData);
//               toast.success("Nouveau champ créé avec succès");
//               router.push("/totalChamps");
//             }
//             fetchChamps();
//             resetForm();
//           }

//         } catch (error) {

//           console.error(error);
//           toast.error("Erreur lors de l'opération sur le champ");
//         }
       
//       }

//     } catch (error) {
//       console.error(error)
//       toast.error("Une erreur est survenue, veuillez reesayer.")
//     }

   
//   };


//   const handleFileChange = (e : React.ChangeEvent<HTMLInputElement> ) => {

//     const selectedFile = e.target.files?.[0] || null
//     setFile(selectedFile);
//     if(selectedFile) {
//       setPreviewUrl(URL.createObjectURL(selectedFile))
//     }
//   };


//   const Annuler = () => {
//     resetForm();
//     setDialogTitle("Opération annulée ❌");
//     setDialogMessage("Vous avez annulé l'opération.");
//     setIsOpen(true);
//     setPreviewUrl(null);
//     setImageUrl("");
//   };


//   const handleDeleteClick = (champId: string) => {
//     setSelectedChampId(champId);
//     setMessage("Voulez-vous vraiment supprimer ce champ definitivement ?");
//     setConfirmOpen(true);
//   };

//   const confirmDelete = async () => {

//     if (!selectedChampId) return;

//     try {
      
//       await deleteChamp( selectedChampId);
//       toast.success("Champ supprimé avec succès");
//       fetchChamps();
//     } catch (error) {

//       console.error(error);
//       toast.error("Erreur lors de la suppression du champ");
//     } finally {

//       setConfirmOpen(false);
//       setSelectedChampId(null);
//     }
//   };

//   const updateChamps = (champ: ChampFormData) => {

//     setNom(champ.nom ?? "");
//     setVillage(champ.village ?? "");
//     setSuperficie(champ.superficie ?? "");
//     if (champ.coordonnees) {

//       const [lat, lng] = champ.coordonnees.split(",").map(Number);
//     setCoordonnees({ lat, lng });

//     } else {

//       setCoordonnees(null);
//     }
//     setEditingId(champ.id!);
//   };


//   const fetchChamps = async () => {
//     setLoading(true)

//     if (user?.id) {

//       try {
          
//         const champs = await getChampsByUser(user.id);
//         setChamps(champs ?? []);
      
//       } catch (error){

//         console.error(error)
//       }
//     }

//     setLoading(false)
//   };

//   useEffect(() => {
//     fetchChamps();
//   }, [user]);




// return (


//   <Wrapper>
//     <div>

//      <div className="flex items-center justify-end w-[85%]">
//         <Link
//           href={"/totalChamps"}
//           key={"/totalChamps"}
//           className={`btn-primary btn-sm flex gap-2 items-center bg-slate-800 font-semibold p-1 w-[25%] rounded-[5px] cursor-pointer hover:scale-102 transition-all duration-300 text-white`}
//         >
//           <Sparkles  className="w-4 h-4"/>
//           {"Tous mes champs"}
//         </Link>
//      </div>

//       <div className="p-6 max-w-2xl mx-auto">
//         <form onSubmit={handleFormSubmit} className="card bg-base-100 shadow-xl p-6">
//           <h1 className="text-2xl font-bold text-primary text-center mb-4">
//             🌱 {editingId ? "Modifier Champ" : "Nouveau Champ"}
//           </h1> 
          

//           <div className="grid grid-cols-2 gap-4">

//             <input
//               type="text"
//               placeholder="Nom"
//               value={nom}
//               onChange={(e) => setNom(e.target.value)}
//               className="mb-4 w-full h-10 outline-none bg-white px-5 rounded-xl border border-slate-400"
//             />

//             <input
//               type="text"
//               placeholder="Village"
//               value={village}
//               onChange={(e) => setVillage(e.target.value)}
//               className="mb-4 w-full h-10 outline-none bg-white px-5 rounded-xl border border-slate-400"
//             />

//             <input
//               type="text"
//               placeholder="Superficie"
//               value={superficie}
//               onChange={(e) => setSuperficie(e.target.value)}
//               className="mb-4 w-full h-10 outline-none bg-white px-5 rounded-xl border border-slate-400"
//             />

//              <input 
//                 type="file"
//                 accept="image/*"
//                 placeholder="Photo"
//                 className="file-input file-input-bordered rounded-xl w-full"
//                 onChange={handleFileChange}
//             />

//             <button
//               type="button"
//               className="btn btn-outline w-full mb-3 h-10 rounded-xl"
//               onClick={() => setIsMapOpen(true)}
//             >
//               {coordonnees
//                 ? `📍 Coordonnées sélectionnées : ${coordonnees.lat.toFixed(5)}, ${coordonnees.lng.toFixed(5)}`
//                 : "Sélectionner la localisation sur la carte"}
//             </button>

//             {isMapOpen && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                 <div className="bg-white rounded-lg p-4 w-3/4 h-3/4 relative">
//                   <button
//                     className="btn btn-sm btn-circle absolute top-2 right-2"
//                     onClick={() => setIsMapOpen(false)}
//                   >
//                     ✕
//                   </button>
//                   <CarteGoogle
//                     onSelectLocation={(lat, lng) => {
//                       setCoordonnees({ lat, lng });
//                       setIsMapOpen(false);
//                     }}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           <section className="mt-6 p-4 rounded-lg bg-slate-200 flex flex-row items-center justify-between">

//             <div>

//               <h2 className="text-lg font-semibold mb-2">📋 Prévisualisation</h2>
//               <p><strong>Nom:</strong> {nom || "-"}</p>
//               <p><strong>Village:</strong> {village || "-"}</p>
//               <p><strong>Superficie:</strong> {superficie || "-"} ha</p>
//               <p><strong>Coordonnées:</strong> {coordonnees ? `${coordonnees.lat}, ${coordonnees.lng}` : "-"}</p>  

//             </div>

//             <div 
//               className="md:ml-4 mt-4 md:w-[180px] md:mt-0 border-2 border-primary md:h-[180px] p-5 flex justify-center items-center rounded-3xl"
//             >
//               {
//                 previewUrl && previewUrl !== "" ? (
//                   <ProductImage 
//                     src={previewUrl} 
//                     alt={"image du produit"}  
//                     heightClass="h-40"
//                     widthClass="w-40"       
//                   />

//                 ) : (
//                   <div className="wiggle-animation">
//                     <FileImage  
//                       strokeWidth={1} 
//                       className="h-10 w-10 text-primary"
//                     />
//                   </div>
//                 )
//               }

//             </div>

//           </section>


//           <div className="flex justify-between mt-6">
//             <button type="submit" className="btn btn-primary w-1/2 mr-2">
//               {editingId ? "💾 Modifier" : "✅ Valider"}
//             </button>
//             <button type="button" onClick={Annuler} className="btn btn-outline btn-error w-1/2 ml-2">
//               Retour ❌
//             </button>
//           </div>
//         </form>


//         {
//           loading ? 
//             (
//               <div className="w-full mt-10 flex justify-center items-center">
//               <span className="loading loading-dots text-success"></span>

//               </div>
//             )
//               :
//             (
//               <div className="mt-8">
//                 <h2 className="text-xl font-bold mb-4">
//                   📂 Mes Champs
//                 </h2>
//                 {Champs.length === 0 ? (

//                   <p className="text-gray-500">
//                     Aucun champ enregistré.
//                   </p>

//                 ) : (

//                   <ul className="space-y-3">
//                     {Champs.map((champ) => (
//                       <li
//                         key={champ.id}
//                         className="p-4 bg-slate-100 shadow rounded-xl flex justify-between items-center"
//                       >
//                         <div>
//                           <p className="font-semibold text-lg">   {champ.nom}
//                           </p>
//                           <p className="text-sm text-gray-800">
//                           {champ.village} 
//                           </p>
//                           <p className="text-sm text-gray-800">
//                           {champ.superficie} ha
//                           </p>
//                         </div>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => updateChamps(champ)}
//                             className="btn btn-sm btn-warning"
//                           >
//                             ✏️ Modifier
//                           </button>
//                           <button
//                             onClick={() => handleDeleteClick(champ.id!)}
//                             className="btn btn-sm btn-error"
//                           >
//                             Supprimer
//                           </button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>

//                 )}

//               </div>
//             )
//         }
      
//         <MessageDialog
//           isOpen={isOpen}
//           title={dialogTitle}
//           message={dialogMessage}
//           onConfirm={() => setIsOpen(false)}
//         />
        
        
//         <ConfirmDialog 
//           isOpen={confirmOpen} 
//           message={message} 
//           onConfirm={confirmDelete} 
//           onCancel={() => setConfirmOpen(false)}
//         />

//       </div>

//     </div>

//   </Wrapper>
  
// );
// };

// export default ChampsPage;











// ---------stylle mais avec la couleur verte ----------------


// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import CarteGoogle from "../components/Google_Maps";
// import MessageDialog from "../components/Message_Dialog";
// import Wrapper from "../components/Wrapper";
// import { createChamps, getChampsByUser, deleteChamp, updateChamp } from "@/action";
// import { useUser } from "@clerk/nextjs";
// import { toast } from "react-toastify";
// import { ChampFormData } from "@/type";
// import ConfirmDialog from "../components/ConfirmDialog";
// import Link from "next/link";
// import { FileImage, Sparkles } from "lucide-react";
// import { useRouter } from "next/navigation";
// import ProductImage from "../components/ProductImage";

// const ChampsPage = () => {
//   const { user } = useUser();
//   const router = useRouter();
//   const [nom, setNom] = useState("");
//   const [village, setVillage] = useState("");
//   const [superficie, setSuperficie] = useState("");
//   const [coordonnees, setCoordonnees] = useState<{ lat: number; lng: number } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [Champs, setChamps] = useState<ChampFormData[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [dialogTitle, setDialogTitle] = useState("");
//   const [dialogMessage, setDialogMessage] = useState("");
//   const [isMapOpen, setIsMapOpen] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [selectedChampId, setSelectedChampId] = useState<string | null>(null);

//   const resetForm = () => {
//     setNom("");
//     setVillage("");
//     setSuperficie("");
//     setCoordonnees(null);
//     setEditingId(null);
//     setPreviewUrl(null);
//   };

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!nom || !village || !superficie) {
//       setDialogTitle("Formulaire invalide 🚫");
//       setDialogMessage("Veuillez remplir tous les champs !");
//       setIsOpen(true);
//       return;
//     }
//     if (!file) {
//       toast.error("Veuillez sélectionner une image 📷.");
//       return;
//     }
//     try {
//       const imageData = new FormData();
//       imageData.append("file", file);
//       const res = await fetch("api/upload", { method: "POST", body: imageData });
//       const data = await res.json();
//       if (!data.success) throw new Error("Erreur de chargement de l'image");

//       const formData: ChampFormData = {
//         id: editingId ?? undefined,
//         nom,
//         village,
//         superficie,
//         coordonnees: coordonnees ? `${coordonnees.lat},${coordonnees.lng}` : undefined,
//         imageUrl: data.path,
//       };

//       if (user) {
//         if (editingId) {
//           await updateChamp(formData);
//           toast.success("Champ mis à jour avec succès ✅");
//         } else {
//           await createChamps(user.id, formData);
//           toast.success("Nouveau champ créé 🌱");
//           router.push("/totalChamps");
//         }
//         fetchChamps();
//         resetForm();
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Une erreur est survenue.");
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//     if (selectedFile) setPreviewUrl(URL.createObjectURL(selectedFile));
//   };

//   const Annuler = () => resetForm();

//   const handleDeleteClick = (id: string) => {
//     setSelectedChampId(id);
//     setMessage("Voulez-vous vraiment supprimer ce champ ?");
//     setConfirmOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (!selectedChampId) return;
//     try {
//       await deleteChamp(selectedChampId);
//       toast.success("Champ supprimé avec succès 🗑️");
//       fetchChamps();
//     } catch {
//       toast.error("Erreur lors de la suppression.");
//     } finally {
//       setConfirmOpen(false);
//       setSelectedChampId(null);
//     }
//   };

//   const updateChamps = (champ: ChampFormData) => {
//     setNom(champ.nom ?? "");
//     setVillage(champ.village ?? "");
//     setSuperficie(champ.superficie ?? "");
//     if (champ.coordonnees) {
//       const [lat, lng] = champ.coordonnees.split(",").map(Number);
//       setCoordonnees({ lat, lng });
//     } else setCoordonnees(null);
//     setEditingId(champ.id!);
//   };

//   const fetchChamps = async () => {
//     if (!user?.id) return;
//     setLoading(true);
//     try {
//       const champs = await getChampsByUser(user.id);
//       setChamps(champs ?? []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChamps();
//   }, [user]);

//   return (
//     <Wrapper>
//       <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
//         {/* Lien vers tous les champs */}
//         <Link
//           href="/totalChamps"
//           className="flex items-center justify-center gap-2 px-6 py-3 mb-8 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold shadow-lg hover:shadow-green-300/50 transition-transform hover:scale-105"
//         >
//           <Sparkles className="w-5 h-5" />
//           Tous mes champs
//         </Link>

//         {/* Formulaire */}
//         <motion.form
//           onSubmit={handleFormSubmit}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="w-full max-w-3xl p-8 rounded-3xl backdrop-blur-xl bg-white/30 border border-white/20 shadow-2xl"
//         >
//           <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
//             🌿 {editingId ? "Modifier un Champ" : "Créer un Nouveau Champ"}
//           </h1>

//           <div className="flex flex-col gap-5">
//             <input
//               type="text"
//               placeholder="Nom du champ"
//               value={nom}
//               onChange={(e) => setNom(e.target.value)}
//               className="input bg-white/60 border border-gray-200 rounded-2xl px-4 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
//             />
//             <input
//               type="text"
//               placeholder="Village"
//               value={village}
//               onChange={(e) => setVillage(e.target.value)}
//               className="input bg-white/60 border border-gray-200 rounded-2xl px-4 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
//             />
//             <input
//               type="text"
//               placeholder="Superficie (ha)"
//               value={superficie}
//               onChange={(e) => setSuperficie(e.target.value)}
//               className="input bg-white/60 border border-gray-200 rounded-2xl px-4 py-2 placeholder-gray-500 text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="file-input bg-white/60 rounded-2xl border border-gray-200 w-full"
//             />

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.97 }}
//               type="submit"
//               className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-emerald-300/50 transition-all"
//             >
//               {editingId ? "💾 Mettre à jour" : "✅ Créer le champ"}
//             </motion.button>
//           </div>

//           {/* Prévisualisation */}
//           <motion.section
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="mt-10 p-6 rounded-3xl bg-white/40 backdrop-blur-lg border border-white/20 shadow-inner flex flex-col md:flex-row justify-between gap-6"
//           >
//             <div>
//               <h2 className="text-lg font-semibold text-gray-700 mb-3">📋 Prévisualisation</h2>
//               <p><strong>Nom:</strong> {nom || "-"}</p>
//               <p><strong>Village:</strong> {village || "-"}</p>
//               <p><strong>Superficie:</strong> {superficie || "-"} ha</p>
//               <p><strong>Coordonnées:</strong> {coordonnees ? `${coordonnees.lat}, ${coordonnees.lng}` : "-"}</p>
//             </div>
//             <div className="flex justify-center items-center border-2 border-emerald-300 rounded-3xl p-5 bg-white/40">
            
//               {previewUrl ? (
//                 <ProductImage src={previewUrl} alt="Prévisualisation" widthClass="w-40" heightClass="h-40" />
//               ) : (
//                 <FileImage className="h-10 w-10 text-emerald-500" strokeWidth={1} />
//               )}
//             </div>
//           </motion.section>
//         </motion.form>

//         {/* Liste des champs */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="w-full max-w-5xl mt-12"
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">🌾 Mes Champs</h2>
//           <AnimatePresence>
//             {loading ? (
//               <div className="flex justify-center">
//                 <span className="loading loading-dots text-green-500"></span>
//               </div>
//             ) : Champs.length === 0 ? (
//               <p className="text-center text-gray-500 italic">Aucun champ ajouté.</p>
//             ) : (
//               Champs.map((champ) => (
//                 <motion.div
//                   key={champ.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   className="p-6 mb-4 rounded-3xl backdrop-blur-xl bg-white/30 border border-white/20 shadow-lg flex justify-between items-center hover:shadow-emerald-200/50 transition-all"
//                 >
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">{champ.nom}</h3>
//                     <p className="text-gray-600">{champ.village}</p>
//                     <p className="text-gray-500">{champ.superficie} ha</p>
//                   </div>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       onClick={() => updateChamps(champ)}
//                       className="px-4 py-2 rounded-xl bg-emerald-500/80 text-white shadow hover:bg-emerald-500"
//                     >
//                       Modifier
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       onClick={() => handleDeleteClick(champ.id!)}
//                       className="px-4 py-2 rounded-xl bg-red-500/80 text-white shadow hover:bg-red-500"
//                     >
//                       Supprimer
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Dialogs */}
//         <MessageDialog isOpen={isOpen} title={dialogTitle} message={dialogMessage} onConfirm={() => setIsOpen(false)} />
//         <ConfirmDialog isOpen={confirmOpen} message={message} onConfirm={confirmDelete} onCancel={() => setConfirmOpen(false)} />
//       </div>
//     </Wrapper>
//   );
// };

// export default ChampsPage;

















// --------------- Tres propre et stylee --------------------

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarteGoogle from "../components/Google_Maps";
import MessageDialog from "../components/Message_Dialog";
import Wrapper from "../components/Wrapper";
import { createChamps, getChampsByUser, deleteChamp, updateChamp } from "@/action";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { ChampFormData } from "@/type";
import ConfirmDialog from "../components/ConfirmDialog";
import Link from "next/link";
import { FileImage, Sparkles, MapPin, Edit3, Trash2, Leaf, Droplets } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductImage from "../components/ProductImage";

const ChampsPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [village, setVillage] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [coordonnees, setCoordonnees] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [Champs, setChamps] = useState<ChampFormData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedChampId, setSelectedChampId] = useState<string | null>(null);

  const resetForm = () => {
    setNom("");
    setVillage("");
    setSuperficie("");
    setCoordonnees(null);
    setEditingId(null);
    setPreviewUrl(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !village || !superficie) {
      setDialogTitle("Formulaire invalide 🚫");
      setDialogMessage("Veuillez remplir tous les champs !");
      setIsOpen(true);
      return;
    }
    if (!file) {
      toast.error("Veuillez sélectionner une image 📷.");
      return;
    }
    try {
      const imageData = new FormData();
      imageData.append("file", file);
      const res = await fetch("api/upload", { method: "POST", body: imageData });
      const data = await res.json();
      if (!data.success) throw new Error("Erreur de chargement de l'image");

      const formData: ChampFormData = {
        id: editingId ?? undefined,
        nom,
        village,
        superficie,
        coordonnees: coordonnees ? `${coordonnees.lat},${coordonnees.lng}` : undefined,
        imageUrl: data.path,
      };

      if (user) {
        if (editingId) {
          await updateChamp(formData);
          toast.success("Champ mis à jour avec succès ✅");
        } else {
          await createChamps(user.id, formData);
          toast.success("Nouveau champ créé 🌱");
          router.push("/totalChamps");
        }
        fetchChamps();
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const Annuler = () => resetForm();

  const handleDeleteClick = (id: string) => {
    setSelectedChampId(id);
    setMessage("Voulez-vous vraiment supprimer ce champ ?");
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedChampId) return;
    try {
      await deleteChamp(selectedChampId);
      toast.success("Champ supprimé avec succès 🗑️");
      fetchChamps();
    } catch {
      toast.error("Erreur lors de la suppression.");
    } finally {
      setConfirmOpen(false);
      setSelectedChampId(null);
    }
  };

  const updateChamps = (champ: ChampFormData) => {
    setNom(champ.nom ?? "");
    setVillage(champ.village ?? "");
    setSuperficie(champ.superficie ?? "");
    if (champ.coordonnees) {
      const [lat, lng] = champ.coordonnees.split(",").map(Number);
      setCoordonnees({ lat, lng });
    } else setCoordonnees(null);
    setEditingId(champ.id!);
  };

  const fetchChamps = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const champs = await getChampsByUser(user.id);
      setChamps(champs ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChamps();
  }, [user]);

  return (
    <Wrapper>
      <div className="min-h-screen bg-base-100 py-12 flex flex-col items-center">
        {/* Lien vers tous les champs */}
        <Link
          href="/totalChamps"
          className="flex items-center justify-center gap-2 px-6 py-3 mb-10 rounded-full bg-primary text-primary-content font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
        >
          <Sparkles className="w-5 h-5" />
          Tous mes champs
        </Link>

        {/* Formulaire */}
        <motion.form
          onSubmit={handleFormSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-3xl p-8 rounded-3xl bg-base-200/60 border border-base-300/30 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all"
        >
          <h1 className="text-3xl font-semibold text-center mb-8 flex items-center justify-center gap-2">
            <Leaf className="text-primary w-6 h-6" />{" "}
            {editingId ? "Modifier un Champ" : "Créer un Nouveau Champ"}
          </h1>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Nom du champ"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="input input-bordered input-primary rounded-2xl bg-base-100/70 backdrop-blur-md"
            />
            <input
              type="text"
              placeholder="Village"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="input input-bordered input-primary rounded-2xl bg-base-100/70 backdrop-blur-md"
            />
            <input
              type="text"
              placeholder="Superficie (ha)"
              value={superficie}
              onChange={(e) => setSuperficie(e.target.value)}
              className="input input-bordered input-primary rounded-2xl bg-base-100/70 backdrop-blur-md"
            />

            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full rounded-2xl bg-base-100/60"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                className="btn btn-secondary rounded-2xl flex items-center gap-2"
                onClick={() => setIsMapOpen(true)}
              >
                <MapPin size={18} /> Coordonnées
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn btn-primary rounded-2xl w-full text-lg font-semibold shadow-md hover:shadow-lg"
            >
              {editingId ? "💾 Mettre à jour" : "✅ Créer le champ"}
            </motion.button>
          </div>

          {/* Prévisualisation */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 p-6 rounded-3xl bg-base-200/50 backdrop-blur-xl border border-base-300/30 shadow-inner flex flex-col md:flex-row justify-between gap-6"
          >
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Droplets className="text-primary w-5 h-5" /> Prévisualisation
              </h2>
              <p><strong>Nom:</strong> {nom || "-"}</p>
              <p><strong>Village:</strong> {village || "-"}</p>
              <p><strong>Superficie:</strong> {superficie || "-"} ha</p>
              <p><strong>Coordonnées:</strong> {coordonnees ? `${coordonnees.lat}, ${coordonnees.lng}` : "-"}</p>
            </div>
            <div className="flex justify-center items-center border border-base-300 rounded-3xl p-5 bg-base-100/60 backdrop-blur-md">
              {previewUrl ? (
                <ProductImage src={previewUrl} alt="Prévisualisation" widthClass="w-40" heightClass="h-40" />
              ) : (
                <FileImage className="h-10 w-10 text-primary" strokeWidth={1} />
              )}
            </div>
          </motion.section>
        </motion.form>

        {/* Liste des champs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-5xl mt-12"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
            🌾 Mes Champs
          </h2>
          <AnimatePresence>
            {loading ? (
              <div className="flex justify-center">
                <span className="loading loading-dots text-primary"></span>
              </div>
            ) : Champs.length === 0 ? (
              <p className="text-center opacity-70 italic">Aucun champ ajouté.</p>
            ) : (
              Champs.map((champ) => (
                <motion.div
                  key={champ.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 mb-4 rounded-3xl bg-base-200/60 backdrop-blur-2xl border border-base-300/30 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        🌿 {champ.nom}
                      </h3>
                      <p className="opacity-80">{champ.village}</p>
                      <p className="opacity-60">{champ.superficie} ha</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateChamps(champ)}
                        className="btn btn-outline btn-primary rounded-xl flex items-center gap-1"
                      >
                        <Edit3 size={16} /> Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteClick(champ.id!)}
                        className="btn btn-outline btn-error rounded-xl flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Supprimer
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dialogs */}
        <MessageDialog isOpen={isOpen} title={dialogTitle} message={dialogMessage} onConfirm={() => setIsOpen(false)} />
        <ConfirmDialog isOpen={confirmOpen} message={message} onConfirm={confirmDelete} onCancel={() => setConfirmOpen(false)} />

        {/* Modal Google Map */}
        <AnimatePresence>
          {isMapOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 18 }}
                className="relative w-[90%] max-w-3xl rounded-3xl bg-base-200/80 backdrop-blur-2xl p-6 border border-base-300/40 shadow-2xl"
              >
                <h3 className="text-2xl font-semibold mb-4 text-center">📍 Sélectionner les coordonnées</h3>
                <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-6">
                  <CarteGoogle setCoordonnees={setCoordonnees} />
                </div>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setIsMapOpen(false)} className="btn btn-ghost rounded-xl">Annuler</button>
                  <button onClick={() => setIsMapOpen(false)} className="btn btn-primary rounded-xl">Valider</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Wrapper>
  );
};

export default ChampsPage;





























