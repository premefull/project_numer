var eps = (a, b, e) => {

  var bool = new Array(a.length).fill(false);
  console.log("epsilon");
  for (i = 0; i < a.length; i++) {
    bool[i] = Math.abs((a[i] - b[i]) / a[i]) > e ? true : false;
    console.log(
      "e" + (i + 1) + " " + Math.abs((a[i] - b[i]) / a[i]).toFixed(6)
    );
  }
  for (i = 0; i < a.length; i++) {
    if (bool[i] === true) {
      console.log('true');
      return true;
    }
  }
  console.log('false');
  return false;
};

var A = [
    [5,2,0,0],
    [2,5,2,0],
    [0,2,5,2],
    [0,0,2,5]
]
var B = [12,17,14,7]
var X = new Array(B.length).fill(0);
var Y = new Array(B.length).fill(0);
var ex = true;
const e = 0.000001;
var iteration = 0;
while (ex) {
  var temp = JSON.parse(JSON.stringify(X));
  Y = JSON.parse(JSON.stringify(B));
  console.log("iteration " + iteration);
  for (var i = 0; i < B.length; i++) {
    //console.log("X[" + i + "] : " + X[i]);
    //console.log("Y[" + i + "] : " + Y[i]);
    for (var j = 0; j < B.length; j++) {
      if (j !== i) {
        // console.log();
        // console.log((i+1) + " " + (j+1));
        // console.log(X);
        // console.log(Y);
        // console.log(
        //   "Y[" + (i+1) + "] : " + Y[i] + " - (" + A[i][j] + ")(" + X[j] + ")"
        // );
        Y[i] -= A[i][j] * X[j];
        // console.log("cuurent Y[" +(i+1) + "] : " + Y[i]);
        // console.log();
      }
    }
    Y[i] /= A[i][i];
    Y[i] = Y[i].toFixed(6);
    X[i] = JSON.parse(JSON.stringify(Y[i]));
    // console.log("end --> Y[" + (i+1) + "] : " + Y[i]);
    // console.log();
  }
  console.log("---> " + Y);
  iteration++;
  ex = eps(X, temp, e);
  console.log();
  
}
console.log(iteration-1);
console.log(Y);


