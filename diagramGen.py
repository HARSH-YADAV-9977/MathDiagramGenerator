# -*- coding: utf-8 -*-
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

# Define key points
O = (0, 0)
P = (0, 13)
A = (0,0) # Placeholder, will be calculated
B = (0,0) # Placeholder, will be calculated


# Calculate the coordinates of A and B using trigonometry and the Pythagorean theorem
OA_length = 5
OP_length = 13
PA_length = np.sqrt(OP_length**2 - OA_length**2)
angle_POA = np.arctan(PA_length/OA_length)  # Angle in radians

A = (OA_length * np.sin(angle_POA), OP_length - OA_length * np.cos(angle_POA))
B = (-OA_length * np.sin(angle_POA), OP_length - OA_length * np.cos(angle_POA))


# Create the figure and axes
fig, ax = plt.subplots()

# Draw the circle
circle = patches.Circle(O, 5, edgecolor='blue', facecolor='none')
ax.add_patch(circle)


# Draw the tangents
ax.plot([P[0], A[0]], [P[1], A[1]], 'r-', label='Tangent PA')
ax.plot([P[0], B[0]], [P[1], B[1]], 'g-', label='Tangent PB')


# Draw radii
ax.plot([O[0], A[0]], [O[1], A[1]], 'b--', label='Radius OA')
ax.plot([O[0], B[0]], [O[1], B[1]], 'b--', label='Radius OB')


# Draw OP
ax.plot([O[0], P[0]], [O[1], P[1]], 'k--', label='OP')


# Annotate points
ax.plot(O[0], O[1], 'ko', markersize=5, label='O')
ax.text(O[0] + 0.2, O[1] - 0.5, 'O', fontsize=10)
ax.plot(P[0], P[1], 'ko', markersize=5, label='P')
ax.text(P[0] + 0.2, P[1] + 0.2, 'P', fontsize=10)
ax.plot(A[0], A[1], 'ko', markersize=5, label='A')
ax.text(A[0] + 0.2, A[1] - 0.2, 'A', fontsize=10)
ax.plot(B[0], B[1], 'ko', markersize=5, label='B')
ax.text(B[0] - 0.8, B[1] - 0.2, 'B', fontsize=10)

# Draw angle APB arc
arc_radius = 2
arc_center = P
arc = patches.Arc(arc_center, arc_radius * 2, arc_radius * 2,
                  theta1=90-np.degrees(angle_POA), theta2=90+np.degrees(angle_POA),
                  linewidth=2, color='purple')
ax.add_patch(arc)


# Add labels and annotations (customize these based on what you want to show)
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_xlim(-7, 7)
ax.set_ylim(0, 14)
ax.set_aspect('equal')
ax.grid(True)
ax.legend()

plt.savefig('static/diagram.png')