document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const contentWrapper = document.getElementById('contentWrapper');
  const navLinks = document.querySelectorAll('#side-panel a');

  let isSidebarOpen = window.innerWidth >= 768;

  function applySidebarState() {
    if (isSidebarOpen) {
      sidebar.classList.remove('-translate-x-full');
      sidebar.classList.add('translate-x-0');
      sidebarOverlay.classList.toggle('hidden', window.innerWidth >= 768);
    } else {
      sidebar.classList.remove('translate-x-0');
      sidebar.classList.add('-translate-x-full');
      sidebarOverlay.classList.add('hidden');
      mainContent.style.marginLeft = '0px';
    }
  }

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    applySidebarState();
  }

  sidebarToggle.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', toggleSidebar);

  function initializeRecentResultsChart() {
    console.log('Initializing Recent Results Chart...');

    const csvData = `branch,revision,scale,ctime,metric,complete_at,test,machine
REL_16_STABLE,15a2fc0c13be292a4579d0a1bb4f3a06e9a82132,100,1715023200,589102.3,1715026800,dbt2,valilleaf
REL_16_STABLE,7a0e44fdc093119b2b33f8c287f12b061497a1d6,100,1715358800,577230.6,1715362400,dbt2,valilleaf
REL_16_STABLE,3d42a930bc50812c2b2f20117de0fd7a312e5078,100,1715694400,590502.1,1715698000,dbt2,valilleaf
REL_16_STABLE,b55cfc453a27c5e5b9f5dc6a5f91e2cf318a1e71,100,1716030000,582300.7,1716033600,dbt2,valilleaf
REL_16_STABLE,6cf048f4c2749e05d498b4efc6a4b91d776861a3,100,1716365600,579104.2,1716369200,dbt2,valilleaf
REL_15_STABLE,15a2fc0c13be292a4579d0a1bb4f3a06e9a82132,100,1715023200,575300.8,1715026800,dbt2,valilleaf
REL_15_STABLE,7a0e44fdc093119b2b33f8c287f12b061497a1d6,100,1715358800,567450.2,1715362400,dbt2,valilleaf
REL_15_STABLE,3d42a930bc50812c2b2f20117de0fd7a312e5078,100,1715694400,580100.5,1715698000,dbt2,valilleaf
REL_15_STABLE,b55cfc453a27c5e5b9f5dc6a5f91e2cf318a1e71,100,1716030000,572400.3,1716033600,dbt2,valilleaf
REL_15_STABLE,6cf048f4c2749e05d498b4efc6a4b91d776861a3,100,1716365600,569200.9,1716369200,dbt2,valilleaf
REL_14_STABLE,15a2fc0c13be292a4579d0a1bb4f3a06e9a82132,100,1715023200,560200.4,1715026800,dbt2,valilleaf
REL_14_STABLE,7a0e44fdc093119b2b33f8c287f12b061497a1d6,100,1715358800,552300.7,1715362400,dbt2,valilleaf
REL_14_STABLE,3d42a930bc50812c2b2f20117de0fd7a312e5078,100,1715694400,565100.2,1715698000,dbt2,valilleaf
REL_14_STABLE,b55cfc453a27c5e5b9f5dc6a5f91e2cf318a1e71,100,1716030000,557800.6,1716033600,dbt2,valilleaf
REL_14_STABLE,6cf048f4c2749e05d498b4efc6a4b91d776861a3,100,1716365600,554600.1,1716369200,dbt2,valilleaf
REL_13_STABLE,15a2fc0c13be292a4579d0a1bb4f3a06e9a82132,100,1715023200,550100.3,1715026800,dbt2,valilleaf
REL_13_STABLE,7a0e44fdc093119b2b33f8c287f12b061497a1d6,100,1715358800,542200.5,1715362400,dbt2,valilleaf
REL_13_STABLE,3d42a930bc50812c2b2f20117de0fd7a312e5078,100,1715694400,555000.8,1715698000,dbt2,valilleaf
REL_13_STABLE,b55cfc453a27c5e5b9f5dc6a5f91e2cf318a1e71,100,1716030000,547700.4,1716033600,dbt2,valilleaf
REL_13_STABLE,6cf048f4c2749e05d498b4efc6a4b91d776861a3,100,1716365600,544500.0,1716369200,dbt2,valilleaf
REL_12_STABLE,15a2fc0c13be292a4579d0a1bb4f3a06e9a82132,100,1715023200,540000.2,1715026800,dbt2,valilleaf
REL_12_STABLE,7a0e44fdc093119b2b33f8c287f12b061497a1d6,100,1715358800,532100.4,1715362400,dbt2,valilleaf
REL_12_STABLE,3d42a930bc50812c2b2f20117de0fd7a312e5078,100,1715694400,544900.7,1715698000,dbt2,valilleaf
REL_12_STABLE,b55cfc453a27c5e5b9f5dc6a5f91e2cf318a1e71,100,1716030000,537600.3,1716033600,dbt2,valilleaf
REL_12_STABLE,6cf048f4c2749e05d498b4efc6a4b91d776861a3,100,1716365600,534400.9,1716369200,dbt2,valilleaf
REL_11_STABLE,15a2fc0c13be292a4579d0a1bb4f3a06e9a82132,100,1715023200,530000.1,1715026800,dbt2,valilleaf
REL_11_STABLE,7a0e44fdc093119b2b33f8c287f12b061497a1d6,100,1715358800,522100.3,1715362400,dbt2,valilleaf
REL_11_STABLE,3d42a930bc50812c2b2f20117de0fd7a312e5078,100,1715694400,534800.6,1715698000,dbt2,valilleaf
REL_11_STABLE,b55cfc453a27c5e5b9f5dc6a5f91e2cf318a1e71,100,1716030000,527500.2,1716033600,dbt2,valilleaf
REL_11_STABLE,6cf048f4c2749e05d498b4efc6a4b91d776861a3,100,1716365600,524300.8,1716369200,dbt2,valilleaf
REL_10_STABLE,15a2fc0c13be292a4579d0a1bb4f3a06e9a82132,100,1715023200,520000.0,1715026800,dbt2,valilleaf
REL_10_STABLE,7a0e44fdc093119b2b33f8c287f12b061497a1d6,100,1715358800,512100.2,1715362400,dbt2,valilleaf
REL_10_STABLE,3d42a930bc50812c2b2f20117de0fd7a312e5078,100,1715694400,524700.5,1715698000,dbt2,valilleaf
REL_10_STABLE,b55cfc453a27c5e5b9f5dc6a5f91e2cf318a1e71,100,1716030000,517400.1,1716033600,dbt2,valilleaf
REL_10_STABLE,6cf048f4c2749e05d498b4efc6a4b91d776861a3,100,1716365600,514200.7,1716369200,dbt2,valilleaf`;

    const data = d3.csvParse(csvData, (d) => {
      return {
        branch: d.branch,
        revision: d.revision,
        scale: +d.scale,
        ctime: new Date(d.ctime * 1000),
        metric: +d.metric,
        complete_at: new Date(d.complete_at * 1000),
        test: d.test,
        machine: d.machine,
        commit_message: `Placeholder commit message for ${d.revision.substring(
          0,
          7
        )}... Lorem ipsum dolor sit amet...`,
      };
    });

    const initialData = data.filter(
      (d) => d.test === 'dbt2' && d.machine === 'valilleaf'
    );

    const chartContainer = d3.select('.chart-container');
    if (chartContainer.empty()) {
      console.error("Chart container '.chart-container' not found!");
      return;
    }
    const containerWidth = chartContainer.node().getBoundingClientRect().width;

    const svgElement = d3.select('#chart');
    const tooltip = d3.select('#tooltip');
    const legendContainer = d3.select('#legend');
    const filterBtn = d3.select('#chart-filter-btn');
    const filterOverlay = d3.select('#filter-overlay');
    const applyBtn = d3.select('#apply-filters');
    const cancelBtn = d3.select('#cancel-filters');
    const activeFiltersDiv = d3.select('#active-filters');
    const branchFiltersDiv = d3.select('#branch-filters');
    const dateFromInput = d3.select('#date-from');
    const dateToInput = d3.select('#date-to');

    if (svgElement.empty()) {
      console.error("SVG element '#chart' not found!");
      return;
    }
    if (tooltip.empty()) {
      console.error("Tooltip element '#tooltip' not found!");
      return;
    }
    if (legendContainer.empty()) {
      console.error("Legend container '#legend' not found!");
      return;
    }
    if (filterBtn.empty()) {
      console.error("Filter button '#chart-filter-btn' not found!");
    }

    const margin = { top: 50, right: 40, bottom: 60, left: 70 };
    const width = containerWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    svgElement.selectAll('*').remove();

    const svg = svgElement
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const branches = [...new Set(initialData.map((d) => d.branch))].sort();
    const color = d3.scaleOrdinal(d3.schemeTableau10).domain(branches);

    const xAxis = svg
      .append('g')
      .attr('class', 'x-axis axis')
      .attr('transform', `translate(0,${height})`);
    const yAxis = svg.append('g').attr('class', 'y-axis axis');

    const xAxisGrid = svg
      .append('g')
      .attr('class', 'x-grid grid')
      .attr('transform', `translate(0,${height})`);
    const yAxisGrid = svg.append('g').attr('class', 'y-grid grid');

    svg
      .append('text')
      .attr('class', 'axis-label x-label')
      .attr(
        'transform',
        `translate(${width / 2},${height + margin.bottom - 15})`
      )
      .style('text-anchor', 'middle')
      .text('Commit Date');

    svg
      .append('text')
      .attr('class', 'axis-label y-label')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Metric Value');

    const line = d3
      .line()
      .x((d) => x(d.ctime))
      .y((d) => y(d.metric))
      .curve(d3.curveNatural);

    function updateChart(chartData) {
      if (!chartData || chartData.length === 0) {
        console.warn('updateChart called with empty or invalid data.');

        svg.selectAll('.line, .point').remove();
        svg
          .append('text')
          .attr('x', width / 2)
          .attr('y', height / 2)
          .attr('text-anchor', 'middle')
          .text('No data available for the selected filters.');

        x.domain([new Date(), new Date()]);
        y.domain([0, 1]); // Default domain
        xAxis.call(d3.axisBottom(x));
        yAxis.call(d3.axisLeft(y));
        xAxisGrid.call(d3.axisBottom(x).tickSize(-height).tickFormat(''));
        yAxisGrid.call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
        return;
      } else {
        svg
          .selectAll('text')
          .filter(function () {
            return (
              d3.select(this).text() ===
              'No data available for the selected filters.'
            );
          })
          .remove();
      }

      const xExtent = d3.extent(chartData, (d) => d.ctime);
      const yMin = d3.min(chartData, (d) => d.metric);
      const yMax = d3.max(chartData, (d) => d.metric);

      let paddedMin, paddedMax;
      if (yMin === yMax) {
        paddedMin = yMin * 0.95;
        paddedMax = yMax * 1.05;
        if (paddedMin === 0 && paddedMax === 0) {
          paddedMin = -1;
          paddedMax = 1;
        }
      } else {
        const yRange = yMax - yMin;
        paddedMin = yMin - yRange * 0.1;
        paddedMax = yMax + yRange * 0.1;
      }

      x.domain(xExtent);
      y.domain([paddedMin, paddedMax]).nice();

      const dateFormat = d3.timeFormat('%d-%b-%Y');
      const tickCountX = Math.max(5, Math.floor(width / 100));
      xAxis
        .transition()
        .duration(500)
        .call(d3.axisBottom(x).tickFormat(dateFormat));

      yAxis
        .transition()
        .duration(500)
        .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(',')));

      xAxisGrid
        .transition()
        .duration(500)
        .call(d3.axisBottom(x).tickSize(-height).tickFormat(''));

      yAxisGrid
        .transition()
        .duration(500)
        .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(''));

      const dataByBranch = d3.group(chartData, (d) => d.branch);

      svg
        .selectAll('.line')
        .data(dataByBranch, ([branch]) => branch)
        .join(
          (enter) =>
            enter
              .append('path')
              .attr('class', 'line')
              .attr('fill', 'none')
              .attr('stroke', ([branch]) => color(branch))
              .attr('stroke-width', 2.5)
              .attr('opacity', 0)
              .attr('d', ([, values]) =>
                line(values.sort((a, b) => a.ctime - b.ctime))
              )
              .call((enter) =>
                enter.transition().duration(500).attr('opacity', 1)
              ),
          (update) =>
            update
              .transition()
              .duration(500)
              .attr('stroke', ([branch]) => color(branch))
              .attr('d', ([, values]) =>
                line(values.sort((a, b) => a.ctime - b.ctime))
              ),
          (exit) => exit.transition().duration(500).attr('opacity', 0).remove()
        );

      svg
        .selectAll('.point')

        .data(chartData, (d) => `${d.branch}-${d.ctime.getTime()}`)
        .join(
          (enter) =>
            enter
              .append('circle')
              .attr('class', 'point')
              .attr('r', 0)
              .attr('fill', (d) => color(d.branch))
              .attr('cx', (d) => x(d.ctime))
              .attr('cy', (d) => y(d.metric))
              .attr('opacity', 0.8)
              .on('mouseover', showTooltip)
              .on('mouseout', hideTooltip)
              .call((enter) => enter.transition().duration(500).attr('r', 4)),
          (update) =>
            update
              .transition()
              .duration(500)
              .attr('cx', (d) => x(d.ctime))
              .attr('cy', (d) => y(d.metric))
              .attr('fill', (d) => color(d.branch))
              .attr('r', 4),
          (exit) =>
            exit
              .transition()
              .duration(500)
              .attr('r', 0)
              .attr('opacity', 0)
              .remove()
        );
    }

    function showTooltip(event, d) {
      const formattedDate = d.ctime.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      const shortHash = d.revision.substring(0, 7);
      const commitLink = `https://github.com/postgres/postgres/commit/${d.revision}`;

      tooltip.transition().duration(100).style('opacity', 0.95);
      tooltip.html(`
            <div class="tooltip-date">${formattedDate}</div>
            <div class="version-item">
                <span class="version-color" style="background-color:${color(
                  d.branch
                )}"></span>
                <span class="version-name">${d.branch}</span>
                <span class="version-value">${d3.format(',.1f')(
                  d.metric
                )}</span> <!-- Format metric -->
            </div>
            <div class="commit-details">
                <strong>Commit:</strong> ${shortHash}<br>
                <strong>Message:</strong> <span class="commit-message">${
                  d.commit_message || 'N/A'
                }</span>
                <a href="${commitLink}" target="_blank" rel="noopener noreferrer">View Commit →</a>
            </div>
        `);

      const tooltipNode = tooltip.node();
      const tooltipWidth = tooltipNode.offsetWidth;
      const tooltipHeight = tooltipNode.offsetHeight;
      const pageW = window.innerWidth;
      const pageH = window.innerHeight;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let left = event.pageX + 15;
      let top = event.pageY - 15;

      if (left + tooltipWidth > pageW + scrollX) {
        left = event.pageX - tooltipWidth - 15;
      }

      if (top + tooltipHeight > pageH + scrollY) {
        top = event.pageY - tooltipHeight - 15;
      }

      if (top < scrollY) {
        top = event.pageY + 15;
      }

      tooltip.style('left', `${left}px`).style('top', `${top}px`);

      d3.select(this)
        .transition()
        .duration(50)
        .attr('r', 6)
        .attr('stroke', '#333')
        .attr('stroke-width', 1.5);
    }

    function hideTooltip() {
      tooltip.transition().duration(200).style('opacity', 0);

      d3.select(this)
        .transition()
        .duration(100)
        .attr('r', 4)
        .attr('stroke', 'none');
    }

    legendContainer.selectAll('.legend-item').remove();

    branches.forEach((branch) => {
      const legendItem = legendContainer
        .append('div')
        .attr('class', 'legend-item')
        .attr('data-branch', branch)
        .html(
          `<span class="legend-color" style="background-color:${color(
            branch
          )};"></span> ${branch}`
        );

      legendItem.on('click', function () {
        const clickedBranch = d3.select(this).attr('data-branch');
        const checkbox = d3.select(
          `#branch-${clickedBranch.replace(/[^a-zA-Z0-9]/g, '-')}`
        );
        if (checkbox.node()) {
          const isCurrentlyChecked = checkbox.property('checked');
          checkbox.property('checked', !isCurrentlyChecked);

          applyFilters();
        }
      });
    });

    let currentFilters = {
      branches: [...branches],
      dateRange: d3.extent(initialData, (d) => d.ctime),
    };

    const formatDateForInput = d3.timeFormat('%Y-%m-%d');

    branchFiltersDiv.selectAll('div').remove();
    branches.forEach((branch) => {
      const branchId = `branch-${branch.replace(/[^a-zA-Z0-9]/g, '-')}`;
      branchFiltersDiv.append('div').html(`
            <input type="checkbox" id="${branchId}" value="${branch}" ${
        currentFilters.branches.includes(branch) ? 'checked' : ''
      }>
            <label for="${branchId}">${branch}</label>
        `);
    });

    if (currentFilters.dateRange && currentFilters.dateRange[0]) {
      dateFromInput.property(
        'value',
        formatDateForInput(currentFilters.dateRange[0])
      );
    } else {
      dateFromInput.property('value', '');
    }
    if (currentFilters.dateRange && currentFilters.dateRange[1]) {
      dateToInput.property(
        'value',
        formatDateForInput(currentFilters.dateRange[1])
      );
    } else {
      dateToInput.property('value', '');
    }

    if (!filterBtn.empty()) {
      filterBtn.on('click', () => {
        branches.forEach((branch) => {
          const branchId = `branch-${branch.replace(/[^a-zA-Z0-9]/g, '-')}`;
          d3.select(`#${branchId}`).property(
            'checked',
            currentFilters.branches.includes(branch)
          );
        });
        if (currentFilters.dateRange && currentFilters.dateRange[0]) {
          dateFromInput.property(
            'value',
            formatDateForInput(currentFilters.dateRange[0])
          );
        }
        if (currentFilters.dateRange && currentFilters.dateRange[1]) {
          dateToInput.property(
            'value',
            formatDateForInput(currentFilters.dateRange[1])
          );
        }
        filterOverlay.style('display', 'flex');
      });
    }

    if (!cancelBtn.empty()) {
      cancelBtn.on('click', () => {
        filterOverlay.style('display', 'none');
      });
    }

    if (!applyBtn.empty()) {
      applyBtn.on('click', applyFilters);
    }

    function applyFilters() {
      console.log('Applying filters...');

      const selectedBranches = [];
      branchFiltersDiv
        .selectAll('input[type="checkbox"]:checked')
        .each(function () {
          selectedBranches.push(this.value);
        });

      const dateFromStr = dateFromInput.property('value');
      const dateToStr = dateToInput.property('value');
      const dateFrom = dateFromStr ? new Date(dateFromStr + 'T00:00:00') : null;
      const dateTo = dateToStr ? new Date(dateToStr + 'T23:59:59') : null;

      const dateRange = [
        dateFrom && !isNaN(dateFrom)
          ? dateFrom
          : d3.min(initialData, (d) => d.ctime),
        dateTo && !isNaN(dateTo) ? dateTo : d3.max(initialData, (d) => d.ctime),
      ];

      if (dateRange[0] > dateRange[1]) {
        [dateRange[0], dateRange[1]] = [dateRange[1], dateRange[0]];
      }

      currentFilters = {
        branches: selectedBranches,
        dateRange: dateRange,
      };

      const dataForChart = initialData.filter(
        (d) =>
          currentFilters.branches.includes(d.branch) &&
          d.ctime >= currentFilters.dateRange[0] &&
          d.ctime <= currentFilters.dateRange[1]
      );

      console.log(`Filtered data count: ${dataForChart.length}`);

      updateChart(dataForChart);

      d3.selectAll('.legend-item').each(function () {
        const branch = d3.select(this).attr('data-branch');
        d3.select(this).classed(
          'inactive',
          !currentFilters.branches.includes(branch)
        );
      });

      updateActiveFiltersDisplay();

      filterOverlay.style('display', 'none');
    }

    function updateActiveFiltersDisplay() {
      if (activeFiltersDiv.empty()) return;

      const dateFormat = d3.timeFormat('%d %b %Y');
      let filterHtml =
        '<p style="margin: 2px 0;"><strong>Active Filters:</strong></p>';

      filterHtml += `<p style="margin: 2px 0;">Branches: ${
        currentFilters.branches.length === branches.length
          ? 'All'
          : currentFilters.branches.length > 0
          ? currentFilters.branches.join(', ')
          : 'None'
      }</p>`;

      const fullExtent = d3.extent(initialData, (d) => d.ctime);
      const isDefaultDateRange =
        currentFilters.dateRange[0].getTime() === fullExtent[0].getTime() &&
        currentFilters.dateRange[1].getTime() === fullExtent[1].getTime();

      if (isDefaultDateRange) {
        filterHtml += `<p style="margin: 2px 0;">Date Range: All</p>`;
      } else {
        filterHtml += `<p style="margin: 2px 0;">Date Range: ${dateFormat(
          currentFilters.dateRange[0]
        )} to ${dateFormat(currentFilters.dateRange[1])}</p>`;
      }

      activeFiltersDiv.html(filterHtml);
    }

    console.log('Performing initial chart update...');
    updateActiveFiltersDisplay(); // Display initial filters
    updateChart(
      initialData.filter((d) => currentFilters.branches.includes(d.branch))
    );

    d3.selectAll('.legend-item').each(function () {
      const branch = d3.select(this).attr('data-branch');
      d3.select(this).classed(
        'inactive',
        !currentFilters.branches.includes(branch)
      );
    });

    console.log('Recent Results Chart Initialized Successfully.');
  }

  function loadSection(sectionName) {
    console.log(`Loading section: ${sectionName}`);
    fetch(`/static/${sectionName}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load ${sectionName}.html (Status: ${response.status})`
          );
        }
        return response.text();
      })
      .then((html) => {
        contentWrapper.innerHTML = html;
        mainContent.scrollTop = 0;

        if (sectionName === 'recent-results') {
          initializeRecentResultsChart();
        } else {
          console.log(
            `Loaded section ${sectionName}, no chart initialization needed.`
          );
        }
      })
      .catch((err) => {
        console.error('Error loading section:', err);
        contentWrapper.innerHTML = `<div class="p-4 text-red-500">Error loading section: ${sectionName}. Check console for details.</div>`;
      });
  }

  function highlightActiveLink(activeLink) {
    navLinks.forEach((link) => {
      link.classList.remove('bg-[#D6EFFC]', 'border-r-4', 'border-[#30648f]');
      link.classList.add('hover:bg-gray-100');
    });
    activeLink.classList.add('bg-[#D6EFFC]', 'border-r-4', 'border-[#30648f]');
    activeLink.classList.remove('hover:bg-gray-100');
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      if (section) {
        loadSection(section);
        highlightActiveLink(link);

        if (isSidebarOpen && window.innerWidth < 768) {
          toggleSidebar();
        }
      } else {
        console.warn('Clicked link has no data-section attribute:', link);
      }
    });
  });

  applySidebarState();

  const defaultSection = 'home';
  const defaultLink = document.querySelector(
    `#side-panel a[data-section="${defaultSection}"]`
  );
  if (defaultLink) {
    loadSection(defaultSection);
    highlightActiveLink(defaultLink);
  } else {
    console.error(`Default section link "${defaultSection}" not found.`);

    contentWrapper.innerHTML = `<div class="p-4 text-orange-500">Default section not found. Please select a section from the sidebar.</div>`;
  }
});
