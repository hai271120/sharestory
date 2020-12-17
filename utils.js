export function getDataFromDoc(doc)
{
    const data= doc.data();
    data.id= doc.id;
    return data; 
}
/**
 * 
 * @param {string} key
 * @param {object} value
 */
export function getDataFromDocs(docs)
{
   return docs.docs.map(getDataFromDoc);
}
export function savetolocalStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value))
}
export function getitemlocalStorage(key,value){
   return JSON.parse(localStorage.getItem(key))
}
/*
14/12/2020 21:20
*/
export function covertDate(dataStr){
    const date = new Date(dataStr)
    const day = validateNiceNumber(date.getDate())
    const month = validateNiceNumber(date.getMonth()+1);
    const year = validateNiceNumber(date.getFullYear())
    const hour = validateNiceNumber(date.getHours())
    const minutes = validateNiceNumber(date.getMinutes())
    return`${day}/${month}/${year} ${hour}:${minutes}` 
}
function validateNiceNumber(number){
    return (number<10) ? ("0" + number) : (number)
}