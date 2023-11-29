set terminal pngcairo size 800,600 enhanced font 'Verdana,12'
set output 'chart.png'

set title "String Matching Algorithm Comparison: Brute Force vs. KMP"
set xlabel "Instance"
set ylabel "Time (ms)"
set yrange [0:]

# Set the style of the bars
set style data histograms
set style fill solid
set boxwidth 0.4   # Adjust the width of the bars

# Set the key (legend)
set key top left

# Use comma as the delimiter for CSV files
set datafile separator ","

# Plot the data
plot 'results.dat' using 0:xtic(1) every ::1::1 notitle, \
     for [col=2:3] 'results.dat' using col:xticlabels(1) title columnheader(col)