export const FILM_OPEN = 'consummates:open-film'
export const SETLIST_OPEN = 'consummates:open-setlist'
export const openFilm = () => window.dispatchEvent(new Event(FILM_OPEN))
export const openSetlist = () => window.dispatchEvent(new Event(SETLIST_OPEN))
