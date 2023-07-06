export default function getHashTag(array) {
  const arr = array.split(' ');
  const data = [];
  if (!arr[0]) return array
  for (const hashTag of arr) {
    var text = hashTag.replace(/\s/g, '')
    if (!text || !text === "") continue
    
    data.push(text)
  }
  return data;
}