function findOdd(arrayDeNumeros) {
  const numberMapping = {};

  arrayDeNumeros.forEach((numeroEnPosicion) => {
    if (numberMapping[numeroEnPosicion] === undefined) {
      numberMapping[numeroEnPosicion] = 1;
    } else {
      numberMapping[numeroEnPosicion] = numberMapping[numeroEnPosicion] + 1;
    }
  });

  const impar = Object.keys(numberMapping).find((key) => {
    console.log(`clave: ${key} valor ${numberMapping[key]}`);
    return numberMapping[key] % 2 === 1;
  });

  return impar;
}

console.log(findOdd([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1]));





// const numberMapping = {
//     1: 2,
//     2: 4,
//     3: 6,
//     4: 1
//   }
