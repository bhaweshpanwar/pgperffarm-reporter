Frontend Design: Performance Test Visualization Interface
=========================================================

Overview
--------
This document describes the design of a performance test visualization interface.  
It is organized into layers, each with clear responsibilities, followed by details on rendering, interaction, event flow, and performance considerations.

Contents
--------
1. Architecture Overview
2. Data Layer
3. SVG Layer Structure
4. Control & UI Layer
5. Rendering & Visualization Layer
6. Interaction Layer
7. Event Flow & State Management
8. Performance Considerations

Architecture Overview
---------------------
The application follows a four-layer architecture:

- **Interaction Layer (UI Events):** Brushing, tooltips, keyboard, clicks
- **Control & UI Layer (State Management):** Central state object, event listeners, DOM manipulation
- **Rendering Layer (D3 Visualization):** SVG generation, scales, axes, data binding
- **Data Layer (Transform):** Flatten nested data, pre-calculate scale counts

Data Layer
----------
Input Format
~~~~~~~~~~~~
The backend injects a global ``RESULTS_DATA`` object with nested structure:

.. code-block:: javascript

   {
     "100": {
       "REL_13_STABLE": {
         "reversed": [
           {
             "revision": "3850fcca...",
             "ctime": 1708386677,
             "metric": 564578.0
           }
         ]
       }
     }
   }

Transformation
~~~~~~~~~~~~~~
Function: ``transformChartData(nestedData)``  
Purpose: Convert nested object into flat array optimized for D3.js.

Algorithm:
.. code-block:: javascript

   1. Initialize empty flatData array
   2. Iterate scales, branches, results
   3. Create flat objects with branch, scale, revision, ctime, metric
   4. Push to flatData
   5. Return flatData

Pre-calculation of Scale Counts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code-block:: javascript

   const counts = d3.rollup(
     allData,
     (v) => v.length,
     (d) => d.scale
   );
   scaleDataCounts = new Map(counts);

Stored in ``Map<number, number>`` for O(1) lookup.

SVG Layer Structure
-------------------
The visualization uses a layered SVG hierarchy to control rendering order and interaction zones.

Layers (bottom to top):
~~~~~~~~~~~~~~~~~~~~~~~
- Definitions (clip paths)
- Main chart (grid, axes)
- Clipped content (lines, circles, brush overlay)
- Brush overlay
- Context chart (mini timeline, context brush)

Key Details
~~~~~~~~~~~
- **Clip Path:** Prevents overflow into margins
- **Brush Overlay:** Circles raised above overlay for interaction
- **Context Chart:** Positioned below main chart for overview navigation

Control & UI Layer
------------------
State Management
~~~~~~~~~~~~~~~~
Central state object:

.. code-block:: javascript

   const currentFilters = {
     scale: number | null,
     branches: Array<string>
   };

Update Flow:  
``User Action → Update currentFilters → applyFiltersAndRender() → Re-render Chart``

Filter Controls
~~~~~~~~~~~~~~~
- **Scale Dropdown:** Selects scale, resets branches  
- **Branch Multi-Select:** Dynamically generated checkboxes, event delegation for efficiency  
- **Y-Axis Mode:** Radio buttons for "zero" vs "zoom" mode

Rendering & Visualization Layer
-------------------------------
Main Function: ``renderChart(data, colorScale)``

Pipeline:
~~~~~~~~~
1. Clear SVG
2. Validate data
3. Calculate dimensions
4. Initialize scales
5. Create groups
6. Draw grid lines
7. Draw axes
8. Draw data visualization
9. Draw context chart
10. Attach brushes
11. Draw interactive elements
12. Attach event handlers

Interaction Layer
-----------------
Brushes
~~~~~~~
- **Main Chart Brush:** Zoom into date range  
- **Context Chart Brush:** Timeline navigation, synchronized with main chart

Redraw Function
~~~~~~~~~~~~~~~
``redrawChart(duration=500)`` updates axes, grids, and transitions.

Y-Axis Updates
~~~~~~~~~~~~~~
``updateYAxis(data, duration=250)`` adjusts domain based on visible range and mode.

Keyboard Navigation
~~~~~~~~~~~~~~~~~~~
- Left Arrow: Pan left  
- Right Arrow: Pan right  
- Escape: Reset zoom

Tooltip System
~~~~~~~~~~~~~~
Hovering circles shows commit details with smart positioning.  
Tooltips adapt placement (top, bottom, left, right) to fit within bounds.

Legend Interaction
~~~~~~~~~~~~~~~~~~
Clicking legend items toggles branch filters and updates chart.

Event Flow & State Management
-----------------------------
Event Flow
~~~~~~~~~~
- Scale dropdown → updates filters → re-render  
- Branch checkbox → updates filters → re-render  
- Y-axis mode → updates axis only  
- Brushes → update domains → redraw  
- Keyboard → pan/reset zoom  
- Circle hover → tooltip  
- Legend click → toggles branch filter

applyFiltersAndRender()
~~~~~~~~~~~~~~~~~~~~~~~
Steps:
1. Filter by scale  
2. Extract branches  
3. Create color scale  
4. Filter by selected branches  
5. Render chart and legend

Performance Considerations
--------------------------
- **Data Transformation:** One-time O(n) cost  
- **Filtering:** O(n) for scale, O(m) for branches  
- **D3 Binding:** Use key functions for efficiency  
- **SVG Clearing:** Full clear for simplicity, partial updates possible  
- **Transitions:** Fast for interaction, smooth for zoom  
- **Event Delegation:** Efficient checkbox handling  
- **Tooltip Delay:** Prevents flicker when moving between circle and tooltip
