import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSearch, faList, faStream, faVolumeUp, faHeart, faQuoteLeft, faComments, faPenSquare, faPen, faGlobeAsia, faQuestion, faBookReader, faPenAlt, faTrash, faSort, faPlay, faNewspaper, faBook, faEdit, faHandsHelping, faShareAlt, faUpload } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart, faBookmark as farBookmark} from '@fortawesome/free-regular-svg-icons'
library.add(faUser, faSearch, faList, faStream, faVolumeUp)
library.add(faHeart, faQuoteLeft, faComments, faPenSquare)
library.add(faPen, faGlobeAsia, faQuestion, faBookReader)
library.add(faPlay, faNewspaper, faBook, faEdit, faHandsHelping)
library.add(faPenAlt, faTrash, faSort, faShareAlt, faUpload)

// far: fontawsome regular svg icons
library.add(farHeart, farBookmark)