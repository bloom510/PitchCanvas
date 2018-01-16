# PitchCanvas
A pitch circle represents the chromatic scale, ascending in clockwise direction. One circle represents all transpositions. For more information, check out Miles Okazaki's  <a href='http://www.milesokazaki.com/wp-content/uploads/2016/02/visual-reference-smaller.pdf#page=5' target='_blank'>Visual Reference for Musicians (p5)</a>.

Questions or comments? I'd love to hear from you!

Drop me a line at: bloom510@protonmail.com

A more detailed explanation of the code will be created at a later point in time. For now, feel free to read through the comments.

In a nutshell, the code creates a circle out of 12 equally distributed dots by:

1) Creating a dot object with various parameters and methods for drawing and changing properties.
2) Passing 12 dots into an array, effectively storing discrete canvas objects into memory
3) Arrange each dot along the perimeter of a larger circle, computing the polar coordinates for each point for a given radius using the formula angle = 360° * index / number of sides. 2π radians make up the 360 degrees in a circle.

Finally, click handlers are set up for each dot using the distance formula √x^2 + y^2
as well as the ability to lift the brush and erase the canvas.
