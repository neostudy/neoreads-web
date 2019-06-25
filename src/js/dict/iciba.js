import axios from 'axios'
import keys from '../../keys.js'

export function lookupICIBA(word) {
  let key = keys["iciba"]
  let url = `/iciba/api/dictionary.php?type=json&w=${word}&key=${key}`
  return axios.get(url)
}