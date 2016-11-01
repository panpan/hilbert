function Rec1(array, start, pp) {
  if(start === 0){
    const temp = array[0];
    array[0] = pp;
    return temp;
  }
  const left = Rec1(array, start - 1, pp * array[start]);
  const temp = array[start];
  array[start] = left * pp;
  return left * temp;
}

function helper(array){
  if(array.length <=1) {
  return null;
  }
  Rec1(array, array.length-1, 1);
  return array;
}

console.log(helper([1,2,3,4]));
console.log(helper([1]));
const el = new Array(10000).fill(1.01);
console.log(helper(el));
