// All site copy lives here. Edit freely; components only handle layout and motion.
// Items marked PLACEHOLDER still need real content from the band.

export const contact = {
  email: 'info@theconsummates.co.uk', // NOTE: Grace says this mailbox isn't set up yet
  phoneDisplay: '07798 561804',
  phoneHref: 'tel:+447798561804',
  whatsappHref: 'https://wa.me/447798561804?text=' + encodeURIComponent('Hi Grace! We’d love to check your availability for our wedding on '),
  facebook: 'https://www.facebook.com/TheConsummatesBandUK/',
  instagram: 'https://www.instagram.com/theconsummatesbanduk/',
  manager: 'Grace',
}

export const pitch = {
  statement:
    'A close-knit band of friends with big harmonies, real musicians and one job on your wedding night: a dancefloor that stays full from your first dance to the very last song.',
  body: 'Everything you hear is played live, and Grace looks after the planning from your first message.',
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

export const story = {
  title: 'It started with Grace and Mick',
  paragraphs: [
    'The Consummates started with best friends Grace and Mick and a simple idea: a fun, high-energy party band. Grace brought in her partner Kev on drums, and from there the line-up grew into a close-knit group built around friendship, big harmonies and a shared love of great live music.',
    // TODO: a real detail would land better here, e.g. a favourite wedding or venue the band would happily name.
    'We’re easy to deal with. Grace sorts your booking from the first message, and we take care of the small stuff so you can enjoy the day.',
    'People always tell us we have a great energy on stage. We look like we’re having fun because we are, and that’s contagious on the dancefloor.',
  ],
}

export const night = {
  title: 'How the evening unfolds',
  hint: 'Keep scrolling: the lights go down as the night goes on.',
  steps: [
    { time: 'Afternoon', icon: 'speaker', title: 'We arrive & set up', body: 'We need about 1.5 hours to unload, set up and soundcheck, quietly and out of everyone’s way. Then we disappear until you’re ready.' },
    { time: 'The moment', icon: 'rings', title: 'Your first dance', body: 'Played live, exactly how you’ve imagined it. We’ll learn your song if it isn’t already in our set; that’s included.' },
    { time: 'Set one', icon: 'guitar', title: 'The floor fills', body: 'Songs everyone loves, from the ’60s right up to today: pop, rock, funk and disco, in an order that keeps everyone dancing.' },
    { time: 'Interval', icon: 'coupes', title: 'Food, drinks & DJ', body: 'A flexible break around your evening food. On Gold and Platinum, DJ Nicho keeps the party going between sets.' },
    { time: 'Set two', icon: 'mic', title: 'The big finish', body: 'The big anthems, the singalongs and your requests.' },
    { time: 'Last song', icon: 'disco', title: 'Until the very end', body: 'One last song, and everyone on the dancefloor for it.' },
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
    { name: 'Martin', role: 'Guitar', photo: '/img/band/martin.webp',
      background: '32 years on guitar, including keys and guitar in Blondie tribute band Once More Into The Bleach. Best gig: Liverpool’s Mathew Street Festival.',
      favourites: [{ title: 'Proud Mary', artist: 'Ike & Tina Turner', cover: '/img/covers/proud-mary.webp' }],
      fact: 'Playing at the Rose of Tralee festival in Ireland, he was asked to lend his acoustic guitar to the boy band on after them. It turned out to be Westlife.' },
    { name: 'Justin', role: 'Lead guitar', photo: '/img/band/justin.webp',
      background: 'Played in a Queen tribute act after winning a worldwide Brian May guitar-playing contest. Fronted originals band Duck Thieves, supporting The Specials and playing festivals across the UK, and took part in a 100-piece guitar orchestra in Rome.',
      favourites: [{ title: 'Don’t Stop Me Now', artist: 'Queen', cover: '/img/covers/don-t-stop-me-now.webp' }],
      fact: 'Prefers to play barefoot, but will wear shoes for special occasions.' },
    { name: 'Anneka', role: 'Backing vocals', photo: '/img/band/anneka.webp',
      background: 'An experienced, versatile vocalist performing gospel, soul, Motown, R&B and pop at popular venues across Birmingham, the Midlands and cities throughout the UK over the last 20 years. As well as the Cover Ducks and The Consummates, she performs as part of a dynamic 7-piece band, moving seamlessly between lead vocals and backing harmonies, alongside her growing work as a solo artist.',
      favourites: [{ title: 'Ain’t No Mountain High Enough' }, { title: 'If I Ain’t Got You', artist: 'Alicia Keys' }],
      fact: 'Nigerian cuisine is her favourite.' },
    { name: 'Kev', role: 'Drums', photo: '/img/band/kev.webp',
      background: 'Half of the rhythm section and the driving force behind the band. He enjoys playing all genres, but has a passion for disco and funk.',
      favourites: [{ title: 'Summer of ’69', artist: 'Bryan Adams', cover: '/img/covers/summer-of-69.webp' }],
      fact: 'Loved break dancing and body popping as a teenager, and can still do the moonwalk!' },
    { name: 'Chris', role: 'Drums' },
    { name: 'John', role: 'Keys', photo: '/img/band/john.webp' },
    { name: 'Maddy', role: 'Backing vocals', photo: '/img/band/maddy.webp',
      background: 'Trained in musical theatre at the University of Chichester, where she took a degree in Musical Theatre Performance, then went on to sing soul, pop and rock in cover bands. She also teaches singing in schools and privately.',
      favourites: [{ title: 'Grease', artist: 'Frankie Valli', cover: '/img/covers/grease.webp' }] },
    { name: 'Betsy', role: 'Backing vocals', photo: '/img/band/betsy.webp' },
  ] as Member[],
}

export const gallery = {
  title: 'Real nights. Real dancefloors.',
  images: Array.from({ length: 11 }, (_, i) => `/img/gallery/live-${String(i + 1).padStart(2, '0')}.webp`),
}

export type Song = { title: string; artist: string; cover: string; favourite?: number; christmas?: boolean }

export const setlist = {
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
  title: 'How booking works',
  steps: [
    { title: 'Enquire', body: 'Send us your date and venue by WhatsApp, email or phone.' },
    { title: 'Check & quote', body: 'Grace checks availability and sends your quote and package options.' },
    { title: 'Secure your date', body: 'We send a booking agreement, and a 20% deposit makes your date officially yours.' },
    { title: 'Plan the night', body: 'We collect the details: venue, timings, first dance, set preferences and special requests.' },
    { title: 'Final check-in', body: 'A last catch-up before the day to confirm timings and songs.' },
    { title: 'Party time', body: 'We arrive, set up and soundcheck, then it’s live music and a full dancefloor.' },
  ],
}

export const events = {
  title: 'Corporate parties, Christmas dos and big birthdays too.',
  body: 'We bring the same show to work dos and birthdays as we do to weddings.',
  list: ['Corporate events', 'Christmas parties', 'Birthdays', 'Awards evenings', 'Charity events', 'Conventions', 'Private celebrations'],
  cta: 'Ask about your event',
}

// From the band's Last Minute Musicians listing (all rated 10/10, written when the band was called
// The Cover Ducks). Excerpts in the clients' own words, trimmed with "…" to drop the old name and keep
// them short; spelling and punctuation lightly tidied.
export const testimonials = [
  { quote: 'Superb! Very professional, great musicians and easy to communicate with. All our guests were up dancing from start to finish and had a brilliant time… Thanks for adding so much to our special day!', name: 'Joe', context: 'Wedding' },
  { quote: 'They were so much fun, everyone was up dancing immediately… We were able to change songs we didn’t like and they even arranged a DJ for afterwards. Best wedding band ever!', name: 'Becki', context: 'Wedding' },
  { quote: 'An awesome band who we recently had the pleasure of enjoying at a friend’s wedding. Great vocals and amazing musicians. Would definitely recommend.', name: 'Tajinder', context: 'Wedding guest' },
  { quote: 'From the first contact and at such a hard time, they were great… When it was time to play, wow, everyone from young to old loved their sound and energy. I can’t recommend them enough.', name: 'Helen', context: 'Celebration of life' },
  { quote: 'Brilliant from start to finish. Great energy, real crowd-pleasers and hit after hit. The six-piece band sounded fantastic, and the planning and communication beforehand were excellent too.', name: 'Paul', context: 'Son’s 21st birthday party' },
  { quote: 'The word incredible doesn’t even sum these guys up enough… They brought such a good vibe to our party, getting everyone up dancing. They even personalised a song for our group.', name: 'Krissie', context: 'Private party' },
  { quote: 'Professional, friendly, full of personality, and the voices and skill!!! The talent on display was evident. Thank you so much!', name: 'Becky', context: '40th birthday party' },
  { quote: 'A big thank you for making my partner’s 60th birthday the best ever! You guys were amazing and everyone loved you!', name: 'Yaz', context: '60th birthday party' },
  { quote: 'They were just fabulous. They had a great variety of songs, and the audience was loving it. Would definitely recommend!', name: 'Kelly', context: 'Charity ball' },
  { quote: 'We could not have been happier. They brought the energy and the hits!! Would definitely recommend.', name: 'Sam', context: 'Festival headliner' },
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
