/*
  comment to get from git
*/

const generateRandomAlphaNumString = (strSize) => {
  return [...Array(strSize)]
    .map(() => Math.floor(Math.random() * 35).toString(35))
    .join("");
};

module.exports = generateRandomAlphaNumString;

// "4568"
// [0-9a-f,,,]

// base 10: 0,1,2,3,4,5,6,7,8,9,10
// base 16: 0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,10
