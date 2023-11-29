// Get the command line arguments from process.argv
const args = process.argv.slice(2);

// Initialize variables to store the values of -p and -t parameters
let pValue = null;
let tValue = null;

// Loop through the command line arguments and look for -p and -t parameters
for (let i = 0; i < args.length; i++) {
  if (args[i] === '-p' && i + 1 < args.length) {
    // If -p is found and there's a value after it, store it in pValue
    pValue = args[i + 1];
  } else if (args[i] === '-t' && i + 1 < args.length) {
    // If -t is found and there's a value after it, store it in tValue
    tValue = args[i + 1];
  }
}

// https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/

function bruteForce(txt, pat)
{
    console.log('===== BRUTE FORCE =====')
    let M = pat.length;
    let N = txt.length;
    var results = [];
 
    /* A loop to slide pat one by one */
    for (let i = 0; i <= N - M; i++) {
        let j;
 
        /* For current index i, check for pattern 
        match */
        for (j = 0; j < M; j++)
            if (txt[i + j] != pat[j])
                break;
 
        // if pat[0...M-1] = txt[i, i+1, ...i+M-1]
        if (j == M) {
            console.log("Pattern found at index " + i);
            results.push(i);
        }
    }

    if(results.length) {
        console.log("Completed. Found pattern at indexes: " + results.join(', '));
        console.log("Total matches: " + results.length);
        console.log(txt)
        for(var i = 0; i < txt.length; i++) {
            if(results.includes(i)) {
              for(var j = 0; j < pat.length; j++) {
                process.stdout.write('^');
              }
              i += pat.length - 1;
            } else {
                process.stdout.write(' ');
            }
        }
    } else {
        console.log("Completed. No matches found.");
    }
    console.log('\n===== BRUTE FORCE =====')
}

function computeLPSArray(pat, M, lps)
{
    // length of the previous longest prefix suffix
    var len = 0;
    var i = 1;
    lps[0] = 0; // lps[0] is always 0
  
    // the loop calculates lps[i] for i = 1 to M-1
    while (i < M) {
        if (pat.charAt(i) == pat.charAt(len)) {
            len++;
            lps[i] = len;
            i++;
        }
        else // (pat[i] != pat[len])
        {
            // This is tricky. Consider the example.
            // AAACAAAA and i = 7. The idea is similar
            // to search step.
            if (len != 0) {
                len = lps[len - 1];
  
                // Also, note that we do not increment
                // i here
            }
            else // if (len == 0)
            {
                lps[i] = len;
                i++;
            }
        }
    }

    console.log("LPS: " + pat);
    console.log("     " + lps.join(''));
    console.log(" ");
}
  
function KMPSearch(pat,txt)
{
    console.log('===== KMP =====')
    var N = txt.length;
    var M = pat.length;
  
    // create lps[] that will hold the longest
    // prefix suffix values for pattern
    var lps = [];
    var j = 0; // index for pat[]
    var results = [];
  
    // Preprocess the pattern (calculate lps[] array)
    computeLPSArray(pat, M, lps);
  
    var i = 0; // index for txt[]
    while ((N - i) >= (M - j)) {
        if (pat.charAt(j) == txt.charAt(i)) {
            j++;
            i++;
        }

        if (j == M) {
            console.log("Found pattern " + "at index " + (i - j) + "\n");
            results.push(i-j);
            j = lps[j - 1];
        }
  
        // mismatch after j matches
        else if (i < N && pat.charAt(j) != txt.charAt(i)) {
            // Do not match lps[0..lps[j-1]] characters,
            // they will match anyway
            if (j != 0)
                j = lps[j - 1];
            else
                i++;
        }
    }

    if(results.length) {
        console.log("Completed. Found pattern at indexes: " + results.join(', '));
        console.log("Total matches: " + results.length);
        console.log(txt)
        for(var i = 0; i < txt.length; i++) {
            if(results.includes(i)) {
              for(var j = 0; j < pat.length; j++) {
                process.stdout.write('^');
              }
              i += pat.length - 1;
            } else {
                process.stdout.write(' ');
            }
        }
    } else {
        console.log("Completed. No matches found.");
    }
    console.log('\n===== KMP =====')
}

var txt = tValue || "ABABDABACDABABCABAB";
var pat = pValue || "ABABCABAB";

const startTimeBruteForce = performance.now();
bruteForce(txt, pat);
const endTimeBruteForce = performance.now();
const executionTimeBruteForce = endTimeBruteForce - startTimeBruteForce;

const startTimeKMP = performance.now();
KMPSearch(pat, txt);
const endTimeKMP = performance.now();
const executionTimeKMP = endTimeKMP - startTimeKMP;

console.log("Execution time (bruteForce): " + executionTimeBruteForce + " milliseconds");
console.log("Execution time (KMPSearch): " + executionTimeKMP + " milliseconds");
