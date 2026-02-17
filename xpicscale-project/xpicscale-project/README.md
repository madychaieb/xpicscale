# xPicScale

Transforme tes photos en images pro qui convertissent.

## Déploiement sur Vercel (5 min)

### 1. Crée un repo GitHub
- Va sur github.com → "New repository"
- Nom : `xpicscale`
- Public ou Private → Create

### 2. Upload les fichiers
- Sur la page du repo, clique "uploading an existing file"
- Drag & drop TOUS les fichiers de ce dossier
- Clique "Commit changes"

### 3. Déploie sur Vercel
- Va sur vercel.com → "Add New Project"
- Sélectionne ton repo `xpicscale`
- Dans "Environment Variables", ajoute :
  - Name: `NEXT_PUBLIC_GEMINI_API_KEY`
  - Value: ta clé API Google AI Studio
- Clique "Deploy"

### 4. C'est en ligne !
Ton site est live sur `xpicscale.vercel.app`

## Clé API
- Crée ta clé sur https://aistudio.google.com/apikey
- NE JAMAIS la mettre dans le code
- Toujours la mettre dans les variables d'environnement Vercel
