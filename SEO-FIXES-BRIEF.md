# Brief SEO — Corrections à implémenter sur statut-juridique-entreprise.fr

## Contexte

Site statique HTML/CSS (5 pages + assets). Analyse SEO réalisée le 27/02/2026.
Ce document liste **toutes les modifications à apporter**, fichier par fichier, avec les chaînes exactes à trouver/remplacer.

**Domaine de production :** `https://statut-juridique-entreprise.fr`
**Favicon local :** `/images/favicon-statut-juridique-entreprise.png`

---

## robots.txt

### FIX-1 — Ajouter le protocole HTTPS dans la directive Sitemap

```
TROUVER :
Sitemap: statut-juridique-entreprise.fr/sitemap.xml

REMPLACER PAR :
Sitemap: https://statut-juridique-entreprise.fr/sitemap.xml
```

---

## sitemap.xml

### FIX-2 — Ajouter `https://` sur toutes les `<loc>` et corriger l'URL de l'index

Remplacements ligne par ligne (5 occurrences de `<loc>` + 5 occurrences de `<xhtml:link>`).

```
TROUVER :
    <loc>statut-juridique-entreprise.fr/index.html</loc>
REMPLACER PAR :
    <loc>https://statut-juridique-entreprise.fr/</loc>

TROUVER :
    <xhtml:link rel="alternate" hreflang="fr" href="statut-juridique-entreprise.fr/index.html" />
REMPLACER PAR :
    <xhtml:link rel="alternate" hreflang="fr" href="https://statut-juridique-entreprise.fr/" />

TROUVER :
    <loc>statut-juridique-entreprise.fr/tableau-comparatif-des-differents-statuts-juridiques.html</loc>
REMPLACER PAR :
    <loc>https://statut-juridique-entreprise.fr/tableau-comparatif-des-differents-statuts-juridiques.html</loc>

TROUVER :
    <xhtml:link rel="alternate" hreflang="fr" href="statut-juridique-entreprise.fr/tableau-comparatif-des-differents-statuts-juridiques.html" />
REMPLACER PAR :
    <xhtml:link rel="alternate" hreflang="fr" href="https://statut-juridique-entreprise.fr/tableau-comparatif-des-differents-statuts-juridiques.html" />

TROUVER :
    <loc>statut-juridique-entreprise.fr/statut-juridique-entreprise-exemple.html</loc>
REMPLACER PAR :
    <loc>https://statut-juridique-entreprise.fr/statut-juridique-entreprise-exemple.html</loc>

TROUVER :
    <xhtml:link rel="alternate" hreflang="fr" href="statut-juridique-entreprise.fr/statut-juridique-entreprise-exemple.html" />
REMPLACER PAR :
    <xhtml:link rel="alternate" hreflang="fr" href="https://statut-juridique-entreprise.fr/statut-juridique-entreprise-exemple.html" />

TROUVER :
    <loc>statut-juridique-entreprise.fr/statut-juridique-entreprise-definition.html</loc>
REMPLACER PAR :
    <loc>https://statut-juridique-entreprise.fr/statut-juridique-entreprise-definition.html</loc>

TROUVER :
    <xhtml:link rel="alternate" hreflang="fr" href="statut-juridique-entreprise.fr/statut-juridique-entreprise-definition.html" />
REMPLACER PAR :
    <xhtml:link rel="alternate" hreflang="fr" href="https://statut-juridique-entreprise.fr/statut-juridique-entreprise-definition.html" />

TROUVER :
    <loc>statut-juridique-entreprise.fr/statut-juridique-entreprise-pdf.html</loc>
REMPLACER PAR :
    <loc>https://statut-juridique-entreprise.fr/statut-juridique-entreprise-pdf.html</loc>

TROUVER :
    <xhtml:link rel="alternate" hreflang="fr" href="statut-juridique-entreprise.fr/statut-juridique-entreprise-pdf.html" />
REMPLACER PAR :
    <xhtml:link rel="alternate" hreflang="fr" href="https://statut-juridique-entreprise.fr/statut-juridique-entreprise-pdf.html" />
```

---

## index.html

### FIX-3 — Corriger l'URL canonique (ligne 27)

```
TROUVER :
    <link rel="canonical" href="statut-juridique-entreprise.fr">
REMPLACER PAR :
    <link rel="canonical" href="https://statut-juridique-entreprise.fr/">
```

### FIX-4 — Supprimer les 8 balises `<meta charset>` dupliquées (lignes 18–26)

Ces 8 lignes consécutives doivent être supprimées en intégralité. La balise légitime est à la ligne 3 (`<meta charset="UTF-8">` dans le `<head>`).

```
TROUVER ET SUPPRIMER ce bloc exact (lignes 18 à 26) :
<meta charset="UTF-8">
<meta http-equiv="content-language" content="fr">
<meta charset="UTF-8">
<meta charset="UTF-8">
<meta charset="UTF-8">
<meta charset="UTF-8">
<meta charset="UTF-8">
<meta charset="UTF-8">
<meta charset="UTF-8">
```

> Note : conserver la balise `<meta http-equiv="content-language" content="fr">` en la déplaçant juste après la balise `<meta name="keywords">` existante (ligne 7), puis supprimer les 8 lignes ci-dessus.

### FIX-5 — Supprimer le second chargement de Tailwind CDN (ligne 141)

```
TROUVER ce bloc exact (ligne 141-142) :
    <script src="https://cdn.tailwindcss.com"></script>
        <script>tailwind.config={theme:{extend:{colors:{primary:"#0052cc",secondary:"#00a3ff",contrast:"#ffffff","contrast-darker":"#f1f5f9"}}}}</script>
REMPLACER PAR :
    (supprimer ces deux lignes)
```

Le premier chargement à la ligne 30 (avec sa config complète) est conservé.

### FIX-6 — Ajouter `og:url` et les hints de performance

Insérer immédiatement après `<meta property="og:type" content="website">` (ligne 9) :

```html
    <meta property="og:url" content="https://statut-juridique-entreprise.fr/">
```

Insérer immédiatement avant `<link href="https://fonts.googleapis.com/css2?...` (ligne 29) :

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### FIX-7 — Remplacer le favicon DiceBear par le fichier local (ligne 140)

```
TROUVER :
    <link rel="icon" href="https://api.dicebear.com/9.x/shapes/png?seed=statut%20juridique%20entreprise">
REMPLACER PAR :
    <link rel="icon" href="/images/favicon-statut-juridique-entreprise.png" type="image/png">
```

### FIX-8 — Ajouter `loading="lazy"` sur les images hors hero

Les 2 images sous le fold (les images hero ne reçoivent PAS lazy) :

```
TROUVER (ligne 3425) :
alt="Entrepreneur inquiet face aux conséquences d'un mauvais choix de statut juridique" class="rounded-2xl
REMPLACER PAR :
alt="Entrepreneur inquiet face aux conséquences d'un mauvais choix de statut juridique" loading="lazy" class="rounded-2xl

TROUVER (ligne 3494) :
alt="Expert-comptable conseillant un entrepreneur sur le choix de son statut juridique" class="rounded-3xl
REMPLACER PAR :
alt="Expert-comptable conseillant un entrepreneur sur le choix de son statut juridique" loading="lazy" class="rounded-3xl
```

---

## statut-juridique-entreprise-definition.html

### FIX-9 — Corriger l'URL canonique (ligne 11)

```
TROUVER :
    <link rel="canonical" href="statut-juridique-entreprise.fr/statut-juridique-entreprise-definition.html">
REMPLACER PAR :
    <link rel="canonical" href="https://statut-juridique-entreprise.fr/statut-juridique-entreprise-definition.html">
```

### FIX-10 — Supprimer le `<meta charset>` dupliqué (ligne 10)

```
TROUVER ce bloc exact :
    <meta http-equiv="content-language" content="fr">
    <meta charset="UTF-8">
REMPLACER PAR :
    <meta http-equiv="content-language" content="fr">
```

(supprimer uniquement la seconde ligne `<meta charset="UTF-8">`)

### FIX-11 — Ajouter `og:url`, favicon, preconnect et données structurées

Insérer après `<meta property="og:type" content="website">` :

```html
    <meta property="og:url" content="https://statut-juridique-entreprise.fr/statut-juridique-entreprise-definition.html">
```

Insérer avant `<link href="https://fonts.googleapis.com/css2?...` :

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Ajouter une balise favicon (absente sur cette page). Insérer après `<link rel="stylesheet" href="/styles.css">` :

```html
    <link rel="icon" href="/images/favicon-statut-juridique-entreprise.png" type="image/png">
```

Ajouter des données structurées. Insérer juste avant `</head>` :

```html
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://statut-juridique-entreprise.fr/"},{"@type":"ListItem","position":2,"name":"Définition du statut juridique","item":"https://statut-juridique-entreprise.fr/statut-juridique-entreprise-definition.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Définition : Qu'est-ce qu'un statut juridique d'entreprise ?","description":"Découvrez la définition exacte du statut juridique d'entreprise, la différence entre personne physique et morale, et les 4 piliers fondamentaux pour bien choisir.","url":"https://statut-juridique-entreprise.fr/statut-juridique-entreprise-definition.html","inLanguage":"fr","isPartOf":{"@type":"WebSite","name":"statut-juridique-entreprise.fr","url":"https://statut-juridique-entreprise.fr/"}}</script>
```

### FIX-12 — Ajouter `loading="lazy"` sur l'image (ligne 363)

```
TROUVER :
                    <img src="https://images.unsplash.com/photo-1556740772-1a741367b93e
REMPLACER PAR :
                    <img loading="lazy" src="https://images.unsplash.com/photo-1556740772-1a741367b93e
```

---

## statut-juridique-entreprise-exemple.html

### FIX-13 — Corriger l'URL canonique (ligne 28)

```
TROUVER :
    <link rel="canonical" href="statut-juridique-entreprise.fr/statut-juridique-entreprise-exemple.html">
REMPLACER PAR :
    <link rel="canonical" href="https://statut-juridique-entreprise.fr/statut-juridique-entreprise-exemple.html">
```

### FIX-14 — Supprimer le `<meta charset>` dupliqué (ligne 27)

```
TROUVER ce bloc exact :
    <meta http-equiv="content-language" content="fr">
    <meta charset="UTF-8">
REMPLACER PAR :
    <meta http-equiv="content-language" content="fr">
```

### FIX-15 — Ajouter `og:url`, favicon, preconnect et données structurées

Insérer après `<meta property="og:type" content="website">` :

```html
    <meta property="og:url" content="https://statut-juridique-entreprise.fr/statut-juridique-entreprise-exemple.html">
```

Insérer avant `<link href="https://fonts.googleapis.com/css2?...` :

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Insérer après `<link rel="stylesheet" href="/styles.css">` :

```html
    <link rel="icon" href="/images/favicon-statut-juridique-entreprise.png" type="image/png">
```

Insérer juste avant `</head>` :

```html
<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://statut-juridique-entreprise.fr/"},{"@type":"ListItem","position":2,"name":"Exemples de statuts juridiques","item":"https://statut-juridique-entreprise.fr/statut-juridique-entreprise-exemple.html"}]}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Exemples de Statuts Juridiques selon le Profil d'Entrepreneur | Guide 2026","description":"Découvrez des cas pratiques et exemples de choix de statuts juridiques (freelance, artisan, startup, e-commerce) pour vous guider dans votre création d'entreprise.","url":"https://statut-juridique-entreprise.fr/statut-juridique-entreprise-exemple.html","inLanguage":"fr","isPartOf":{"@type":"WebSite","name":"statut-juridique-entreprise.fr","url":"https://statut-juridique-entreprise.fr/"}}</script>
```

### FIX-16 — Ajouter `loading="lazy"` sur les images hors hero

L'image hero est à la ligne 300 (première image de la page, dans la section hero). Toutes les images suivantes sont hors hero et doivent recevoir `loading="lazy"` :

Lignes 330, 386, 443, 501, 561, 620, 681, 739, 799 — chacune commence par `<img src="https://images.unsplash.com/`.

```
RÈGLE : pour chaque balise <img src="https://images.unsplash.com/ dans ce fichier,
SAUF la première (ligne 300 — image hero),
AJOUTER l'attribut loading="lazy" :

TROUVER :  <img src="https://images.unsplash.com/
REMPLACER PAR :  <img loading="lazy" src="https://images.unsplash.com/

(appliquer uniquement aux occurrences 2 à 10, pas à la première)
```

---

## statut-juridique-entreprise-pdf.html

### FIX-17 — Corriger l'URL canonique (ligne 13)

```
TROUVER :
    <link rel="canonical" href="statut-juridique-entreprise.fr/statut-juridique-entreprise-pdf.html">
REMPLACER PAR :
    <link rel="canonical" href="https://statut-juridique-entreprise.fr/statut-juridique-entreprise-pdf.html">
```

### FIX-18 — Supprimer le `<meta charset>` dupliqué (ligne 12)

```
TROUVER ce bloc exact :
    <meta http-equiv="content-language" content="fr">
    <meta charset="UTF-8">
REMPLACER PAR :
    <meta http-equiv="content-language" content="fr">
```

### FIX-19 — Ajouter `og:url`, og:type/title/description manquants, favicon, preconnect

Cette page n'a pas de balises Open Graph. Insérer le bloc suivant après `<meta name="keywords" ...>` et avant `<meta http-equiv="content-language"...>` :

```html
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://statut-juridique-entreprise.fr/statut-juridique-entreprise-pdf.html">
    <meta property="og:title" content="Télécharger le guide PDF gratuit sur les statuts juridiques d'entreprise">
    <meta property="og:description" content="Téléchargez gratuitement notre guide complet au format PDF pour bien choisir le statut juridique de votre entreprise. Tableau comparatif, conseils et questions clés.">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="Guide PDF gratuit – Statuts juridiques d'entreprise">
    <meta property="twitter:description" content="Téléchargez notre guide complet pour choisir le bon statut juridique : micro-entreprise, EI, EURL, SARL, SAS, SASU.">
```

Insérer avant `<link href="https://fonts.googleapis.com/css2?...` :

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Insérer après `<link rel="stylesheet" href="/styles.css">` :

```html
    <link rel="icon" href="/images/favicon-statut-juridique-entreprise.png" type="image/png">
```

### FIX-20 — Ajouter `loading="lazy"` sur l'image (ligne 416)

```
TROUVER :
                            <img src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f
REMPLACER PAR :
                            <img loading="lazy" src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f
```

---

## tableau-comparatif-des-differents-statuts-juridiques.html

### FIX-21 — Corriger l'URL canonique (ligne 32-33)

```
TROUVER :
    <link rel="canonical"
        href="statut-juridique-entreprise.fr/tableau-comparatif-des-differents-statuts-juridiques.html">
REMPLACER PAR :
    <link rel="canonical" href="https://statut-juridique-entreprise.fr/tableau-comparatif-des-differents-statuts-juridiques.html">
```

### FIX-22 — Supprimer les 6 balises `<meta charset>` dupliquées (lignes 25–31)

```
TROUVER ce bloc exact (6 lignes consécutives) :
    <meta charset="UTF-8">
    <meta http-equiv="content-language" content="fr">
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta charset="UTF-8">
REMPLACER PAR :
    <meta http-equiv="content-language" content="fr">
```

(conserver uniquement la ligne `content-language`, supprimer les 6 `charset`)

### FIX-23 — Supprimer le second chargement de Tailwind CDN (ligne 191)

```
TROUVER (ligne 191) :
    <script src="https://cdn.tailwindcss.com"></script>
REMPLACER PAR :
    (supprimer cette ligne)
```

> Attention : il faut supprimer uniquement la seconde occurrence (ligne 191). La première occurrence (ligne 35, avec la config tailwind.config juste après) doit être conservée.

### FIX-24 — Ajouter `og:url`, preconnect, favicon

Insérer après `<meta property="og:type" content="website">` (ligne 12) :

```html
    <meta property="og:url" content="https://statut-juridique-entreprise.fr/tableau-comparatif-des-differents-statuts-juridiques.html">
```

Insérer avant `<link href="https://fonts.googleapis.com/css2?...` :

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

La balise favicon est déjà présente (ligne 190) — vérifier qu'elle pointe vers le fichier local :

```
TROUVER :
    <link rel="icon" href="https://api.dicebear.com/9.x/shapes/png?seed=statut%20juridique%20entreprise">
REMPLACER PAR :
    <link rel="icon" href="/images/favicon-statut-juridique-entreprise.png" type="image/png">
```

### FIX-25 — Ajouter `loading="lazy"` sur les images hors hero

L'image hero est à la ligne 453 (dans la section hero, juste après le H1). Les images des lignes 1361 et 2607 sont hors hero.

```
TROUVER (ligne 1361) :
                        <img src="https://images.unsplash.com/photo-1582787252196-55af238b3cf8
REMPLACER PAR :
                        <img loading="lazy" src="https://images.unsplash.com/photo-1582787252196-55af238b3cf8

TROUVER (ligne 2607) :
                    <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5
REMPLACER PAR :
                    <img loading="lazy" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5
```

---

## Récapitulatif des modifications par fichier

| Fichier | Fixes à appliquer |
|---|---|
| `robots.txt` | FIX-1 |
| `sitemap.xml` | FIX-2 |
| `index.html` | FIX-3, FIX-4, FIX-5, FIX-6, FIX-7, FIX-8 |
| `statut-juridique-entreprise-definition.html` | FIX-9, FIX-10, FIX-11, FIX-12 |
| `statut-juridique-entreprise-exemple.html` | FIX-13, FIX-14, FIX-15, FIX-16 |
| `statut-juridique-entreprise-pdf.html` | FIX-17, FIX-18, FIX-19, FIX-20 |
| `tableau-comparatif-des-differents-statuts-juridiques.html` | FIX-21, FIX-22, FIX-23, FIX-24, FIX-25 |

## Checklist de validation post-implémentation

- [ ] `robots.txt` : `Sitemap:` commence par `https://`
- [ ] `sitemap.xml` : toutes les `<loc>` commencent par `https://`
- [ ] Chaque page a exactement **1** balise `<meta charset="UTF-8">`
- [ ] Chaque page a exactement **1** balise `<script src="https://cdn.tailwindcss.com">`
- [ ] Chaque page a une balise `<link rel="canonical">` avec `https://`
- [ ] Chaque page a une balise `<meta property="og:url">` avec `https://`
- [ ] Chaque page a un favicon pointant vers `/images/favicon-statut-juridique-entreprise.png`
- [ ] Chaque page a les 2 balises `<link rel="preconnect">` pour Google Fonts
- [ ] `statut-juridique-entreprise-definition.html` et `statut-juridique-entreprise-exemple.html` ont des données structurées JSON-LD
- [ ] Toutes les images hors hero ont `loading="lazy"`
- [ ] `statut-juridique-entreprise-pdf.html` a des balises `og:*` et `twitter:*`
