import { library } from '@fortawesome/fontawesome-svg-core'

// free-solid-svg
import { faUser, faSearch, faList, faStream, faVolumeUp, faHeart, faQuoteLeft, faComment, faComments, faFire, faMoon, faSun, faChevronUp, faChevronDown, faExclamationCircle, faHashtag, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import { faPenSquare, faPen, faGlobeAsia, faQuestion, faBookReader, faPenAlt, faTrash, faSort } from '@fortawesome/free-solid-svg-icons'
import { faPlay, faNewspaper, faBook, faEdit, faHandsHelping, faShareAlt, faUpload, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faEye, faHome} from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faSearch, faList, faStream, faVolumeUp)
library.add(faHeart, faQuoteLeft, faComment, faComments, faPenSquare)
library.add(faPen, faGlobeAsia, faQuestion, faBookReader)
library.add(faPlay, faNewspaper, faBook, faEdit, faHandsHelping)
library.add(faArrowLeft, faEye, faHome, faFire, faMoon, faSun)
library.add(faChevronUp, faChevronDown, faExclamationCircle, faHashtag)
library.add(faExternalLinkAlt)

// free-regular-svg
import { faHeart as farHeart, faBookmark as farBookmark} from '@fortawesome/free-regular-svg-icons'
library.add(faPenAlt, faTrash, faSort, faShareAlt, faUpload)

// far: fontawsome regular svg icons
library.add(farHeart, farBookmark)