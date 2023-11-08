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
    var M = pat.length;
    var N = txt.length;
  
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
                i = i + 1;
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
    }
}

var txt = tValue || "ABABDABACDABABCABAB";
var pat = pValue || "ABABCABAB";

KMPSearch(pat, txt);
