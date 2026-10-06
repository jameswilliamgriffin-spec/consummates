// All site copy lives here. Edit freely; components only handle layout and motion.
// Items marked PLACEHOLDER still need real content from the band.

export const contact = {
  email: 'info@theconsummates.co.uk', // NOTE: Grace says this mailbox isn't set up yet
  phoneDisplay: '07798 561804',
  phoneHref: 'tel:+447798561804',
  whatsappHref: 'https://wa.me/447798561804?text=' + encodeURIComponent('Hi Grace! We’d love to check your availability for our wedding on '),
  facebook: 'https://www.facebook.com/TheConsummatesBandUK/',
  manager: 'Grace',
}

export const pitch = {
  eyebrow: 'Live wedding & party band · West Midlands',
  statement:
    'A close-knit band of friends with big harmonies, real musicians and one job on your wedding night: a dancefloor that stays full from your first dance to the very last song.',
  body: 'Every song played live. Every detail looked after, from the first message to the final encore.',
}

export const venues = [
  'Villa Park, Birmingham',
  'The Rhodehouse, Sutton Coldfield',
  'Sixways Stadium, Worcester',
  'Dhillon’s Brewery, Coventry',
  'Stanford Farm, Shropshire',
  'The Glade at Rosliston, Derbyshire',
  'Norbreck Castle, Blackpool',
]

export const stats = [
  { id: 'weddings', value: 50, suffix: '+', label: 'Weddings played' },
  { id: 'years', value: 4, suffix: '', label: 'Years together' },
  { id: 'members', value: 6, suffix: '', label: 'Band members' }, // the 6-piece line-up on Gold & Platinum (the full roster, with deps, is 10)
]

export const story = {
  eyebrow: 'Our story',
  title: 'Friends first. Band second. Party always.',
  paragraphs: [
    'The Consummates started with best friends Grace and Mick and a simple idea: a fun, high-energy party band. Grace brought in her fiancé Kev on drums, and from there the line-up grew into a close-knit group built around friendship, big harmonies and a shared love of great live music.',
    'We’re friendly, approachable and easy to work with. We care about the little details and we want every couple to feel looked after, from the first enquiry to the final song.',
    'People always tell us we have a great energy on stage. We look like we’re having fun because we are, and that’s contagious on the dancefloor.',
  ],
}

export const night = {
  eyebrow: 'Your night',
  title: 'How the evening unfolds',
  hint: 'Keep scrolling: the lights go down as the night goes on.',
  steps: [
    { time: 'Afternoon', icon: 'speaker', title: 'We arrive & set up', body: 'We need about 1.5 hours to unload, set up and soundcheck, quietly and out of everyone’s way. Then we disappear until you’re ready.' },
    { time: 'The moment', icon: 'rings', title: 'Your first dance', body: 'Played live, exactly how you’ve imagined it. We’ll learn your song if it isn’t already in our set; that’s included.' },
    { time: 'Set one', icon: 'guitar', title: 'The floor fills', body: 'Songs everyone loves, from the ’60s right up to today: pop, rock, funk and disco, in an order that keeps everyone dancing.' },
    { time: 'Interval', icon: 'coupes', title: 'Food, drinks & DJ', body: 'A flexible break around your evening food. On Gold and Platinum, DJ Nicho keeps the party going between sets.' },
    { time: 'Set two', icon: 'mic', title: 'The big finish', body: 'The anthems, the singalongs and your requests, finishing the night in style.' },
    { time: 'Last song', icon: 'disco', title: 'Until the very end', body: 'A full dancefloor, a happy couple and a night your guests will talk about for years.' },
  ],
}

export type Fav = { title: string; artist?: string; cover?: string }
export type Member = {
  name: string; role: string; photo?: string; core?: boolean
  quote?: string        // optional one-liner under the role
  background?: string   // musical background
  favourites?: Fav[]    // favourite songs to perform live
  fact?: string         // fun fact
}

// Anything left out shows a gentle "To follow" on the card.
export const band = {
  eyebrow: 'Meet the band',
  title: 'The people on your stage',
  intro: 'Grace and Mick play every gig. Every other role has a trusted, rehearsed dep, so we never cancel.',
  members: [
    { name: 'Grace', role: 'Lead vocals & band manager', core: true, photo: '/img/band/grace.webp',
      quote: 'Big vocals, infectious energy and plenty of personality in every performance.',
      background: 'Grace is a seasoned live vocalist with years of experience performing in full bands, duos and smaller acoustic projects. She has performed at weddings, corporate events, festivals, private parties and busy live venues across the Midlands, including Villa Park. Her musical background spans pop, rock, soul, disco and classic party anthems, with a particular love of strong female vocals and harmonies.',
      favourites: [{ title: 'Take It Easy', artist: 'Eagles', cover: '/img/covers/take-it-easy.webp' }] },
    { name: 'Mick', role: 'Bass & logistics', core: true, photo: '/img/band/mick.webp',
      quote: 'You hear the music, but you feel the bass.',
      background: 'First guitar at 14. First public performance in 1994 at Menzies High School: “beyond terrifying”. Switched to bass in 2002, when he realised it was more fun and his band at the time had too many guitarists.',
      favourites: [{ title: 'Grease', artist: 'Frankie Valli', cover: '/img/covers/grease.webp' }],
      fact: 'Once met Michael Sheen and called him Martin by mistake. “I get that a lot,” he replied.' },
    { name: 'Martin', role: 'Guitar',
      background: '32 years on guitar, including keys and guitar in Blondie tribute band Once More Into The Bleach. Best gig: Liverpool’s Mathew Street Festival.',
      favourites: [{ title: 'Proud Mary', artist: 'Ike & Tina Turner', cover: '/img/covers/proud-mary.webp' }],
      fact: 'Playing at the Rose of Tralee festival in Ireland, he was asked to lend his acoustic guitar to the boy band on after them. It turned out to be Westlife.' },
    { name: 'Justin', role: 'Lead guitar',
      background: 'Played in a Queen tribute act after winning a worldwide Brian May guitar-playing contest. Fronted originals band Duck Thieves, supporting The Specials and playing festivals across the UK, and took part in a 100-piece guitar orchestra in Rome.',
      favourites: [{ title: 'Don’t Stop Me Now', artist: 'Queen', cover: '/img/covers/don-t-stop-me-now.webp' }],
      fact: 'Prefers to play barefoot, but will wear shoes for special occasions.' },
    { name: 'Anneka', role: 'Backing vocals',
      background: 'An experienced, versatile vocalist performing gospel, soul, Motown, R&B and pop at popular venues across Birmingham, the Midlands and cities throughout the UK over the last 20 years. As well as the Cover Ducks and The Consummates, she performs as part of a dynamic 7-piece band, moving seamlessly between lead vocals and backing harmonies, alongside her growing work as a solo artist.',
      favourites: [{ title: 'Ain’t No Mountain High Enough' }, { title: 'If I Ain’t Got You', artist: 'Alicia Keys' }] },
    { name: 'Kev', role: 'Drums', photo: '/img/band/kev.webp' },
    { name: 'Chris', role: 'Drums' },
    { name: 'John', role: 'Keys' },
    { name: 'Maddy', role: 'Backing vocals', photo: '/img/band/maddy.webp' },
    { name: 'Betsy', role: 'Backing vocals' },
  ] as Member[],
}

export const gallery = {
  eyebrow: 'In the moment',
  title: 'Real nights. Real dancefloors.',
  images: Array.from({ length: 11 }, (_, i) => `/img/gallery/live-${String(i + 1).padStart(2, '0')}.webp`),
}

export type Song = { title: string; artist: string; cover: string; favourite?: number; christmas?: boolean }

export const setlist = {
  eyebrow: 'The setlist',
  title: 'Floor-fillers, start to finish',
  intro: 'A taste of what we play. Couples can choose and veto songs, and pick three extra requests.',
  cta: 'View the full setlist',
  songs: [
    { title: '500 Miles', artist: 'The Proclaimers', cover: '/img/covers/500-miles.webp' },
    { title: '9 to 5', artist: 'Dolly Parton', cover: '/img/covers/9-to-5.webp', favourite: 4 },
    { title: 'All Right Now', artist: 'Free', cover: '/img/covers/all-right-now.webp' },
    { title: 'Brown Eyed Girl', artist: 'Van Morrison', cover: '/img/covers/brown-eyed-girl.webp' },
    { title: 'Dakota', artist: 'Stereophonics', cover: '/img/covers/dakota.webp' },
    { title: 'Does Your Mother Know', artist: 'ABBA', cover: '/img/covers/does-your-mother-know.webp' },
    { title: 'Don’t Stop Me Now', artist: 'Queen', cover: '/img/covers/don-t-stop-me-now.webp' },
    { title: 'Gimme! Gimme! Gimme!', artist: 'ABBA', cover: '/img/covers/gimme-gimme-gimme.webp', favourite: 2 },
    { title: 'Gimme Some Lovin’', artist: 'The Spencer Davis Group', cover: '/img/covers/gimme-some-lovin.webp' },
    { title: 'Grease', artist: 'Frankie Valli', cover: '/img/covers/grease.webp' },
    { title: 'Here I Go Again', artist: 'Whitesnake', cover: '/img/covers/here-i-go-again.webp' },
    { title: 'Highway to Hell', artist: 'AC/DC', cover: '/img/covers/highway-to-hell.webp' },
    { title: 'Hot Stuff', artist: 'Donna Summer', cover: '/img/covers/hot-stuff.webp' },
    { title: 'I Love Rock ’n’ Roll', artist: 'Joan Jett & the Blackhearts', cover: '/img/covers/i-love-rock-n-roll.webp' },
    { title: 'I Want to Break Free', artist: 'Queen', cover: '/img/covers/i-want-to-break-free.webp' },
    { title: 'I’m a Believer', artist: 'The Monkees', cover: '/img/covers/i-m-a-believer.webp' },
    { title: 'Le Freak / Disco Inferno', artist: 'Chic · The Trammps', cover: '/img/covers/le-freak-disco-inferno.webp' },
    { title: 'Locked Out of Heaven', artist: 'Bruno Mars', cover: '/img/covers/locked-out-of-heaven.webp' },
    { title: 'Long Train Runnin’', artist: 'The Doobie Brothers', cover: '/img/covers/long-train-runnin.webp' },
    { title: 'Merry Christmas Everybody', artist: 'Slade', cover: '/img/covers/merry-christmas-everybody.webp', christmas: true },
    { title: 'Place Your Hands', artist: 'Reef', cover: '/img/covers/place-your-hands.webp' },
    { title: 'Play That Funky Music', artist: 'Wild Cherry', cover: '/img/covers/play-that-funky-music.webp', favourite: 1 },
    { title: 'Proud Mary', artist: 'Ike & Tina Turner', cover: '/img/covers/proud-mary.webp', favourite: 5 },
    { title: 'Red Light Spells Danger', artist: 'Billy Ocean', cover: '/img/covers/red-light-spells-danger.webp' },
    { title: 'Sex on Fire', artist: 'Kings of Leon', cover: '/img/covers/sex-on-fire.webp' },
    { title: 'Shut Up and Dance', artist: 'Walk the Moon', cover: '/img/covers/shut-up-and-dance.webp' },
    { title: 'Since You Been Gone', artist: 'Rainbow', cover: '/img/covers/since-you-been-gone.webp' },
    { title: 'Soul Man', artist: 'Sam & Dave', cover: '/img/covers/soul-man.webp' },
    { title: 'Step Into Christmas', artist: 'Elton John', cover: '/img/covers/step-into-christmas.webp', christmas: true },
    { title: 'Summer of ’69', artist: 'Bryan Adams', cover: '/img/covers/summer-of-69.webp', favourite: 3 },
    { title: 'Sweet Dreams / Seven Nation Army', artist: 'Eurythmics · The White Stripes', cover: '/img/covers/sweet-dreams-seven-nation-army.webp' },
    { title: 'Sweet Home Alabama', artist: 'Lynyrd Skynyrd', cover: '/img/covers/sweet-home-alabama.webp' },
    { title: 'Take It Easy', artist: 'Eagles', cover: '/img/covers/take-it-easy.webp' },
    { title: 'Teenage Dirtbag', artist: 'Wheatus', cover: '/img/covers/teenage-dirtbag.webp' },
    { title: 'You Shook Me All Night Long', artist: 'AC/DC', cover: '/img/covers/you-shook-me-all-night-long.webp' },
  ] as Song[],
}

export const packages = {
  eyebrow: 'Packages',
  title: 'Simple, honest pricing',
  intro: 'No hidden extras. Peak dates are quoted individually.',
  tiers: [
    { name: 'Silver', metal: 'silver', price: '£1,100', features: ['2 × 45-minute live sets', 'Backing music between sets', '100% live', '5-piece band'] },
    { name: 'Gold', metal: 'gold', price: '£1,250', features: ['2 × 45-minute live sets', 'Full wrap-around live DJ', '100% live', '6-piece band'], featured: true },
    { name: 'Platinum', metal: 'platinum', price: '£1,400', features: ['2 × 60-minute live sets', 'Full wrap-around live DJ', '100% live', '6-piece band', 'Your first dance played live'] },
  ],
  includedTitle: 'Every package includes',
  included: [
    { icon: 'heart', title: 'Your first dance', body: 'Learned and played live' },
    { icon: 'requests', title: 'Song requests', body: 'Three extra, on top of the set' },
    { icon: 'calendar', title: 'Planning call', body: 'Timings, songs and details' },
    { icon: 'shield', title: 'Fully insured', body: '£5m public liability (Aviva)' },
    { icon: 'plug', title: 'PAT tested', body: 'All equipment, August 2025' },
    { icon: 'pin', title: 'Travel included', body: 'Within 2 hours of the West Midlands' },
  ],
  extrasTitle: 'Add a little extra',
  extras: [
    { icon: 'turntable', role: 'Live DJ', name: 'DJ Nicho', body: 'West Midlands premier event DJ. Warms up the room, fills the gaps and plays on until the early hours.', href: 'https://www.facebook.com/birminghamdj' },
    { icon: 'microphone', role: 'Solo vocalist', name: 'Betsy Harmony', body: 'A solo vocal set to backing tracks at any point in your day, perfect for the drinks reception.', href: 'https://www.facebook.com/betsyharmonymusic' },
  ],
}

export const booking = {
  eyebrow: 'How booking works',
  title: 'From first message to last song',
  steps: [
    { title: 'Enquire', body: 'Send us your date and venue by WhatsApp, email or phone.' },
    { title: 'Check & quote', body: 'Grace checks availability and sends your quote and package options.' },
    { title: 'Secure your date', body: 'We send a booking agreement, and a 20% deposit makes your date officially yours.' },
    { title: 'Plan the night', body: 'We collect the details: venue, timings, first dance, set preferences and special requests.' },
    { title: 'Final check-in', body: 'A last catch-up before the day, so everything’s confirmed and nothing’s left to chance.' },
    { title: 'Party time', body: 'We arrive, set up and soundcheck, then it’s live music and a full dancefloor.' },
  ],
}

export const events = {
  eyebrow: 'Not just weddings',
  title: 'Corporate parties, Christmas dos and big birthdays too.',
  body: 'The same live show, for any celebration that deserves a full dancefloor.',
  list: ['Corporate events', 'Christmas parties', 'Birthdays', 'Awards evenings', 'Charity events', 'Conventions', 'Private celebrations'],
  cta: 'Ask about your event',
}

// Quotes are verbatim (Cover Ducks reviews, same core members); trimmed only where marked with …
export const testimonials = [
  { quote: '…Superb! Very professional, great musicians and easy to communicate with. All our guests were up dancing from start to finish and had a brilliant time.', name: 'Joe Crawford', context: 'Wedding party' },
  { quote: 'These guys are amazing! … They get the crowd going, so easy to work with and all round professional!', name: 'Mark Wilson', context: 'The Royal Oak' },
  { quote: 'WOW what a fantastic band, ladies you can sing. Great evening, dancers on the second song. Different genres to suit everyone.', name: 'Helen James', context: 'Cubbington Sports & Social Club' },
  { quote: 'They were awesome. So much so that we’ve booked them in for Easter Sunday. Would certainly recommend.', name: 'Chris Mason', context: 'The Brasshouse, Birmingham' },
]

export const faq = [
  { q: 'Can we see you play before we book?', a: 'Yes. We play public gigs so couples can see us live. They’re all listed on our Facebook page.' },
  { q: 'Will you learn our first dance?', a: 'Absolutely, and it’s included in the price. Just give us a little notice.' },
  { q: 'Can we choose the songs?', a: 'Yes. You can choose and veto songs from our setlist, plus pick three extra requests. More than that may incur a small additional cost.' },
  { q: 'What if a band member is ill?', a: 'Every role apart from Grace and Mick has a trusted, rehearsed dep, so we always have cover and never cancel a gig.' },
  { q: 'How far do you travel?', a: 'Anywhere within about two hours of the West Midlands. Further afield is quoted individually to cover travel.' },
  { q: 'What do you need from the venue?', a: 'A space of at least 5m × 3m, two 13-amp sockets, somewhere to change and a bite to eat. We’re happy to play with a noise limiter, and all our equipment is PAT tested.' },
  { q: 'Are you insured?', a: 'Yes. We carry £5 million public liability insurance with Aviva, and all our equipment is PAT tested (most recently in August 2025).' },
  { q: 'How long do you need to set up?', a: 'About 1.5 hours to unload, set up and soundcheck, and around 45 minutes to pack down.' },
  { q: 'How do we secure our date?', a: 'A 20% deposit within a month of booking secures your date. Most couples book around a year ahead, so it’s worth getting in touch early.' },
  { q: 'What do you wear?', a: 'Our signature look: green, with white shirts and black trousers for the men and plenty of sparkle for the women.' },
]
