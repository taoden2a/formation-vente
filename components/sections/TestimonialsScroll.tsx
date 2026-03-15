'use client'

interface Testimonial {
  name: string
  role: string
  text: string
  stat?: string
  rating: number
  initials: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Thomas R.',
    role: 'Commercial B2B',
    text: 'Taux de closing ×2 en trois mois. J\'avais essayé d\'autres méthodes, mais ici on comprend vraiment pourquoi le client décide — pas juste comment le convaincre.',
    stat: '×2 taux de closing',
    rating: 5,
    initials: 'TR',
    color: 'from-blue-500/30 to-blue-600/20',
  },
  {
    name: 'Sarah M.',
    role: 'Entrepreneure',
    text: 'Enfin une méthode claire pour comprendre la psychologie d\'achat. Je structure mes offres complètement différemment et mes clients comprennent mieux ma valeur.',
    rating: 5,
    initials: 'SM',
    color: 'from-purple-500/30 to-purple-600/20',
  },
  {
    name: 'Julien K.',
    role: 'Freelance UI/UX',
    text: 'Ce qui m\'a frappé : aucun script de vente. On apprend à lire le client, pas à le manipuler. Résultat : mes clients signent avec conviction, pas sous pression.',
    rating: 5,
    initials: 'JK',
    color: 'from-orange-500/30 to-orange-600/20',
  },
  {
    name: 'Amina D.',
    role: 'Fondatrice de startup',
    text: 'Les modules sur les biais cognitifs ont transformé ma façon de pitcher. +60% de prospects qualifiés depuis que j\'ai changé mon approche.',
    stat: '+60% prospects qualifiés',
    rating: 5,
    initials: 'AD',
    color: 'from-teal-500/30 to-teal-600/20',
  },
  {
    name: 'Marc L.',
    role: 'Consultant indépendant',
    text: 'J\'ai appliqué les exercices directement sur mes propositions commerciales. Premier mois : +40% de taux d\'acceptation. Deuxième mois : pareil.',
    stat: '+40% taux d\'acceptation',
    rating: 5,
    initials: 'ML',
    color: 'from-rose-500/30 to-rose-600/20',
  },
  {
    name: 'Léa V.',
    role: 'Chargée de développement',
    text: 'Le module sur la mise en pratique finale m\'a permis de consolider tout ce que j\'avais appris. J\'ai directement appliqué sur mon prochain client.',
    rating: 5,
    initials: 'LV',
    color: 'from-emerald-500/30 to-emerald-600/20',
  },
  {
    name: 'Nicolas F.',
    role: 'Directeur commercial',
    text: 'Formation concise, dense, sans rembourrage. Chaque leçon apporte une grille de lecture utilisable immédiatement. J\'ai formé toute mon équipe avec.',
    rating: 5,
    initials: 'NF',
    color: 'from-indigo-500/30 to-indigo-600/20',
  },
]

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-orange-400">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] mx-2 sm:mx-3 bg-white/[0.07] border border-white/10 rounded-2xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
          {t.initials}
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
          <p className="text-gray-500 text-xs">{t.role}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} />)}
      </div>

      {/* Stat badge */}
      {t.stat && (
        <div className="inline-block px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-semibold mb-3">
          {t.stat}
        </div>
      )}

      {/* Text */}
      <p className="text-gray-400 text-sm leading-relaxed">
        &ldquo;{t.text}&rdquo;
      </p>
    </div>
  )
}

export function TestimonialsScroll() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="section-spacing overflow-hidden">
      <div className="container-width mb-8 sm:mb-12">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">Témoignages</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Ils ont compris pour vendre
          </h2>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

        <div className="testimonials-marquee flex w-max">
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
