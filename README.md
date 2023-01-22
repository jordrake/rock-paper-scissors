## Rock Paper Scissors

# Description

This is a simulation game of Rock Paper Scissors in a grid format. Each cell can either be a rock, paper, scissors or empty and each turn they move one space in a cardinal direction.

If an object encounters an non-empty cell, they will fight according to the standard rock, paper, scissors rules of engagement (rock > scissors > paper > rock) and the winner occupies the space. Empty cells are a guranteed victory.

# Philosophy

My intention is to create several algorithms to determine how each object moves (e.g. randomly, nearest winning fight etc...) as well as other toggles that modify certain mechanics.

My other aim is to keep this repository as thin as possible with no dependencies by utilising modern browser technology to avoid a build/compile step. Ultimately I want to challenge myself to build well structured, maintainable code
that can be run on a simple http server.
