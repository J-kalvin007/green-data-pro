

import { existsSync} from "fs";
import { mkdir, writeFile, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("file") as unknown as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "Aucun fichier reçu." });
    }

    // Convertir en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer le dossier si nécessaire
    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Générer un nom unique
    const ext = file.name.split(".").pop();
    const uniqueName = crypto.randomUUID() + "." + ext;
    const filePath = join(uploadDir, uniqueName);

    // Écriture du fichier sur le disque
    await writeFile(filePath, buffer);

    // URL publique accessible via /public
    const publicPath = `/uploads/${uniqueName}`;

    return NextResponse.json({ success: true, path: publicPath });

  } catch (error) {

    console.error("Erreur upload:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'upload." },
      { status: 500 }
    );
    
  }
}




export async function DELETE(request: NextRequest) {
  try {
    const { path } = await request.json();

    if(!path) {
      return NextResponse.json({ success: false, message:  "Chemin invalide!" }, {status: 400} );
    }

    // const filePath  = join(process.cwd(), "public", path);
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    const filePath = join(process.cwd(), "public", normalizedPath);


    if(!existsSync(filePath)){
      return NextResponse.json({ success: false, message : "Image non trouvee"}, {status : 404 } );
    }

    await unlink(filePath)
    return NextResponse.json({ success: true, message : "Image supprimee avec succes"}, {status : 200 } );

  } 
catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de la suppresion de l'iamge." },
      { status: 500 }
    );
  }
}

