const feeSource = 'https://help.whatnot.com/hc/en-us/articles/4847069165965-Whatnot-seller-fees'

export const guideContent = {
  en: {
    canadaFees: {
      title: 'Whatnot Fees in Canada: TCG Commission and Sale Examples | WhatFees',
      description: 'See Canadian Whatnot TCG commission tiers and a worked sale example. Understand processing fees, then estimate your own profit with the free calculator.',
      heading: 'Whatnot fees in Canada',
      intro: 'For a Canadian TCG sale, calculate commission and payment processing separately. Your selling price alone does not tell you what you keep.',
      calculatorLink: '/whatnot-fee-calculator/', calculatorCta: 'Calculate your sale',
      checked: 'Commission and processing information checked October 8, 2026. Confirm your own rate in Seller Hub.',
      sections: [
        { title: 'Canadian TCG commission tiers', body: 'Whatnot sets your tier using combined sales across all categories over a 28-day period. That tier applies in the following period; the category of each sale determines its commission rate. These are Canadian TCG rates; other categories can differ.',
          table: { caption: 'Canadian TCG commission · sales in CAD', headings: ['Sales during the period', 'Commission'], rows: [['C$0–9,999', '8.00%'], ['C$10,000–19,999', '7.75%'], ['C$20,000–34,999', '7.50%'], ['C$35,000–49,999', '7.25%'], ['C$50,000–64,999', '7.00%'], ['C$65,000–84,999', '6.75%'], ['C$85,000+', '6.50%']] },
          source: { href: feeSource, label: 'Whatnot’s official fee schedule' } },
        { title: 'Processing uses a different amount', body: 'Canadian payment processing is 2.9% plus C$0.30 per transaction. It applies to the amount paid by the buyer, including shipping and tax. Commission applies to the item price.' },
        { title: 'Example: a C$100 sale', body: 'Assume an 8% commission, a C$60 item cost, C$10 buyer-paid shipping and C$10 buyer-paid tax. Commission is C$8.00. Processing is 2.9% × C$120 + C$0.30 = about C$3.78. Estimated profit is C$100 − C$60 − C$11.78 = C$28.22. This example excludes tax on fees and costs beyond the item.' },
        { title: 'Enter your own costs', body: 'In the calculator, include packaging and seller-paid shipping in total cost. Enter buyer-paid shipping and tax separately because they affect processing. Add tax on fees if it applies. Compare the estimate with the order’s earnings breakdown after the sale.' },
      ],
    },
    boxPricing: {
      title: 'Selling a Booster Box or Packs: Compare Profit After Fees | WhatFees',
      description: 'Compare selling a sealed booster box with selling its packs. Use a worked example to see how order fees, pack prices and unsold inventory change the result.',
      heading: 'Sell the booster box or its packs?',
      intro: 'Opening a box changes what you can sell. Compare the net proceeds from the sealed box with the packs before you open it.',
      calculatorLink: '/break-even-calculator/', calculatorCta: 'Calculate a break-even price',
      sections: [
        { title: 'One box, two selling options', body: 'Suppose a box costs C$80 and contains 16 packs. You could sell it sealed for C$120 or sell each pack for C$8. This example uses 8% commission, 2.9% processing and C$0.30 per order, with no shipping, taxes or packaging. These are editable assumptions, not a quote.',
          table: { caption: 'Fictional example · all packs sold, amounts in CAD', headings: ['Selling option', 'Gross sales', 'Fees', 'Profit'], rows: [['Sealed box · one order', '$120.00', '$13.38', '$26.62'], ['16 packs · 16 orders', '$128.00', '$18.75', '$29.25'], ['16 packs · one order', '$128.00', '$14.25', '$33.75']] } },
        { title: 'The number of orders matters', body: 'Under these assumptions, 16 separate orders incur C$4.80 in fixed fees; one order incurs C$0.30. Selling the packs separately adds C$8 in gross sales but only about C$2.63 in profit compared with selling the sealed box. Packaging and time can reduce that difference further.' },
        { title: 'Unsold packs are still inventory', body: 'If only 10 packs sell at C$8 in separate orders, net proceeds are about C$68.28. You have not recovered the C$80 box cost, and six packs remain. C$5 per pack is a useful cost allocation, but it is not a break-even selling price after fees.' },
        { title: 'Keep sealed boxes and loose packs distinct', body: 'Once a pack is opened, that box can no longer be sold as sealed. Record what remains as loose packs or individual cards. Track the lot’s original cost and sales together to see when the full purchase has been recovered.' },
      ],
    },
  },
  fr: {
    canadaFees: {
      title: 'Frais Whatnot au Canada : commissions TCG et exemple | WhatFees',
      description: 'Consultez les paliers de commission TCG de Whatnot au Canada et un exemple de vente. Calculez vos frais de traitement et votre profit avec le calculateur gratuit.',
      heading: 'Les frais Whatnot au Canada',
      intro: 'Pour une vente TCG au Canada, calculez séparément la commission et le traitement du paiement. Le prix de vente ne correspond pas au montant que vous gardez.',
      calculatorLink: '/fr/whatnot-fee-calculator/', calculatorCta: 'Calculer votre vente',
      checked: 'Commissions et traitement vérifiés le 8 octobre 2026. Confirmez votre taux dans Seller Hub.',
      sections: [
        { title: 'Paliers de commission TCG au Canada', body: 'Whatnot détermine votre palier selon les ventes combinées de toutes les catégories sur 28 jours. Ce palier s’applique à la période suivante; la catégorie de chaque vente détermine sa commission. Voici les taux TCG au Canada; les autres catégories peuvent différer.',
          table: { caption: 'Commission TCG au Canada · ventes en CAD', headings: ['Ventes de la période', 'Commission'], rows: [['0–9 999 $', '8,00 %'], ['10 000–19 999 $', '7,75 %'], ['20 000–34 999 $', '7,50 %'], ['35 000–49 999 $', '7,25 %'], ['50 000–64 999 $', '7,00 %'], ['65 000–84 999 $', '6,75 %'], ['85 000 $ et plus', '6,50 %']] },
          source: { href: feeSource, label: 'Barème officiel de Whatnot' } },
        { title: 'Le traitement porte sur un autre montant', body: 'Au Canada, le traitement coûte 2,9 % plus 0,30 $ par transaction. Il porte sur le montant payé par l’acheteur, livraison et taxes comprises. La commission porte sur le prix de l’article.' },
        { title: 'Exemple : une vente de 100 $ CAD', body: 'Supposons une commission de 8 %, un article coûtant 60 $, une livraison de 10 $ et des taxes de 10 $ payées par l’acheteur. La commission est de 8 $. Le traitement est de 2,9 % × 120 $ + 0,30 $, soit environ 3,78 $. Le profit estimé est de 100 $ − 60 $ − 11,78 $ = 28,22 $. Cet exemple exclut les taxes sur les frais et les coûts autres que l’article.' },
        { title: 'Entrez vos propres coûts', body: 'Incluez l’emballage et la livraison à votre charge dans le coût total. Entrez séparément la livraison et les taxes payées par l’acheteur, qui augmentent le traitement. Ajoutez les taxes sur les frais si elles s’appliquent. Après la vente, comparez l’estimation au détail des revenus de la commande.' },
      ],
    },
    boxPricing: {
      title: 'Vendre une boîte de boosters ou les paquets : quel profit ? | WhatFees',
      description: 'Comparez une boîte scellée et la vente de ses paquets. Un exemple montre l’effet des frais par commande, du prix des paquets et de l’inventaire invendu.',
      heading: 'Vendre la boîte de boosters ou ses paquets ?',
      intro: 'Ouvrir une boîte change ce que vous pouvez vendre. Comparez le revenu net de la boîte scellée avec celui des paquets avant de l’ouvrir.',
      calculatorLink: '/fr/break-even-calculator/', calculatorCta: 'Calculer un prix au seuil de rentabilité',
      sections: [
        { title: 'Une boîte, deux options de vente', body: 'Une boîte coûte 80 $ et contient 16 paquets. Vous pouvez la vendre scellée à 120 $ ou vendre les paquets à 8 $ chacun. Cet exemple utilise une commission de 8 %, un traitement de 2,9 % et des frais fixes de 0,30 $ par commande, sans livraison, taxes ni emballage. Ce sont des hypothèses ajustables.',
          table: { caption: 'Exemple fictif · tous les paquets vendus, montants en CAD', headings: ['Option de vente', 'Ventes brutes', 'Frais', 'Profit'], rows: [['Boîte scellée · une commande', '120,00 $', '13,38 $', '26,62 $'], ['16 paquets · 16 commandes', '128,00 $', '18,75 $', '29,25 $'], ['16 paquets · une commande', '128,00 $', '14,25 $', '33,75 $']] } },
        { title: 'Le nombre de commandes compte', body: 'Avec ces hypothèses, 16 commandes distinctes entraînent 4,80 $ de frais fixes, contre 0,30 $ pour une seule. Les paquets rapportent 8 $ de ventes brutes supplémentaires, mais seulement environ 2,63 $ de profit de plus que la boîte scellée. L’emballage et le temps consacré réduisent encore cet écart.' },
        { title: 'Les paquets invendus restent en inventaire', body: 'Si seulement 10 paquets se vendent à 8 $ dans des commandes distinctes, le revenu net est d’environ 68,28 $. Le coût de la boîte de 80 $ n’est pas encore récupéré et il reste six paquets. Un coût de 5 $ par paquet répartit l’investissement, mais ce n’est pas le prix au seuil de rentabilité après les frais.' },
        { title: 'Distinguez les boîtes scellées des paquets', body: 'Dès qu’un paquet est ouvert, la boîte ne peut plus être vendue comme scellée. Notez ce qui reste en paquets ou en cartes individuelles. Suivez le coût initial du lot et ses ventes ensemble pour savoir quand l’achat complet est récupéré.' },
      ],
    },
  },
}
