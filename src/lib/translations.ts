
export const translations = {
  fr: {
    about: {
      title: "À Propos",
      subtitle: "Notre histoire est une histoire de passion pour l'artisanat, de profond respect pour le patrimoine et de vision d'un monde plus connecté et créatif.",
      founderName: "Yattara Ousmane",
      founderRole: "Créateur du Projet",
      founderBio: "Passionné par la richesse culturelle et le talent des artisans, Yattara Ousmane a imaginé cette plateforme pour offrir une vitrine mondiale aux créateurs. Son objectif est de construire un pont entre les mains qui créent et les cœurs qui apprécient l'authenticité et le savoir-faire."
    },
    dashboard: {
      title: "Tableau de Bord Artisan",
      addArtworkButton: "Ajouter une œuvre",
      stats: {
        title: "Aperçu de votre activité",
        totalSales: "Ventes brutes",
        totalSalesDesc: "Chiffre d'affaires total de vos œuvres.",
        earnings: "Vos revenus",
        earningsDesc: (commission: number) => `Après ${commission * 100}% de commission`,
        totalViews: "Vues totales",
        totalViewsDesc: "Nombre de fois que vos œuvres ont été vues.",
        activeArtworks: "Œuvres actives",
        activeArtworksDesc: (publishedCount: number) => `${publishedCount} publiées en ce moment`,
        salesReportTitle: "Rapport des ventes",
        salesReportDesc: "Ventes de vos œuvres sur les 6 derniers mois.",
        viewsByArtworkTitle: "Vues par œuvre",
        viewsByArtworkDesc: "Répartition des vues sur vos créations."
      },
      projections: {
        title: "Projections Financières",
        description: "Estimations des revenus potentiels de la plateforme.",
        chartTitle: "Répartition par source",
        totalProjected: "Revenu total projeté",
        subscriptions: "Abonnements Premium",
        salesCommissions: "Commissions sur Ventes",
        musicSales: "Ventes Musique",
        sponsorship: "Sponsoring",
        advertising: "Publicité",
        copyright: "Droits d'auteur"
      },
      addArtworkForm: {
        titleLabel: "Titre de l'œuvre",
        titlePlaceholder: "Ex: Masque Africain en bois",
        categoryLabel: "Catégorie",
        categoryPlaceholder: "Sélectionnez une catégorie",
        priceLabel: "Prix (en €)",
        pricePlaceholder: "150",
        descriptionLabel: "Description",
        descriptionPlaceholder: "Décrivez votre œuvre...",
        imageLabel: "Image de l'œuvre",
        imagePlaceholder: "Cliquez pour télécharger",
        submitButton: "Ajouter l'œuvre"
      },
      addNewsForm: {
          titleLabel: "Titre de l'actualité",
          titlePlaceholder: "Ex: Nouvelle collection disponible",
          contentLabel: "Contenu",
          contentPlaceholder: "Rédigez le corps de votre article ici...",
          imageLabel: "Image de l'actualité",
          imagePlaceholder: "Cliquez pour télécharger",
          submitButton: "Publier l'actualité"
      },
      myArtworks: {
        title: "Mes Œuvres",
        description: (count: number, limit: number, isPremium: boolean) => 
          isPremium 
          ? `Vous avez ${count} œuvres dans votre catalogue.` 
          : `Vous avez ${count}/${limit} œuvres. Passez à Premium pour en ajouter plus.`,
        table: {
          image: "Image",
          title: "Titre",
          category: "Catégorie",
          price: "Prix",
          views: "Vues",
          sales: "Ventes",
          status: "Statut",
          actions: "Actions",
        },
        editSoon: "La modification sera bientôt disponible.",
        editAction: "Modifier",
        publishAction: "Publier",
        deleteAction: "Supprimer"
      },
      newsManagement: {
        title: "Gestion des Actualités",
        description: "Gérez les articles et les événements de la plateforme.",
        addNewsButton: "Ajouter une actualité",
        table: {
            title: "Titre",
            publicationDate: "Date de publication",
            actions: "Actions"
        },
        noNewsFound: "Aucune actualité trouvée.",
        editSoon: "La modification sera bientôt disponible.",
        editAction: "Modifier",
        deleteAction: "Supprimer",
        addDialog: {
            title: "Ajouter une nouvelle actualité",
            description: "Rédigez et publiez un nouvel article pour la section Actualités."
        },
        deleteDialog: {
            title: "Êtes-vous sûr de vouloir supprimer cette actualité ?",
            description: (title: string) => `L'actualité "${title}" sera définitivement supprimée. Cette action est irréversible.`,
            cancel: "Annuler",
            confirm: "Supprimer"
        }
      },
      deleteArtworkDialog: {
        title: "Êtes-vous sûr ?",
        description: (title: string) => `L'œuvre "${title}" sera définitivement supprimée de votre catalogue. Cette action est irréversible.`,
        cancel: "Annuler",
        confirm: "Supprimer",
      },
      addArtworkDialog: {
        title: "Ajouter une nouvelle œuvre",
        description: "Renseignez les détails de votre création pour l'ajouter à votre catalogue."
      },
      toasts: {
        notAuthenticated: "Non authentifié",
        mustBeLoggedIn: "Vous devez être connecté pour effectuer cette action.",
        limitReached: "Limite atteinte",
        limitReachedDesc: "Passez au compte Premium pour ajouter plus d'œuvres.",
        artworkAdded: "Œuvre ajoutée !",
        artworkAddedDesc: (title: string) => `Votre œuvre "${title}" a été ajoutée en tant que brouillon.`,
        artworkDeleted: "Œuvre supprimée",
        artworkDeletedDesc: (title: string) => `"${title}" a été supprimée de votre catalogue.`,
        artworkPublished: "Œuvre publiée !",
        artworkPublishedDesc: (title: string) => `"${title}" est maintenant visible dans le catalogue.`,
        newsAdded: "Actualité ajoutée !",
        newsAddedDesc: (title: string) => `L'article "${title}" a été publié.`,
        newsDeleted: "Actualité supprimée",
        newsDeletedDesc: "L'article a bien été supprimé.",
        error: "Erreur",
        deleteFailed: "La suppression a échoué. Veuillez réessayer.",
        publishFailed: "La publication a échoué. Veuillez réessayer."
      }
    }
  },
  en: {
    about: {
      title: "About Us",
      subtitle: "Our story is one of passion for craftsmanship, deep respect for heritage, and a vision for a more connected and creative world.",
      founderName: "Yattara Ousmane",
      founderRole: "Project Creator",
      founderBio: "Passionate about the cultural richness and talent of artisans, Yattara Ousmane envisioned this platform to offer a global showcase for creators. His goal is to build a bridge between the hands that create and the hearts that appreciate authenticity and craftsmanship."
    }
  }
};
