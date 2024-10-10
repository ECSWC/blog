---
{"dg-publish":true,"dg-pinned":true,"dg-show-toc":true,"dg-content-classes":true,"dg-note-icon":true,"tags":["dg-publish"],"sticker":"emoji//1f469-200d-1f4bb","permalink":"/审核/审核结果-数字花园版/测试chartjs/","pinned":true,"contentClasses":"","dgShowToc":true,"dgPassFrontmatter":true,"noteIcon":true,"created":"2024-08-22T16:25:02.891+08:00","updated":"2024-10-10T20:09:15.164+08:00"}
---

<html>
  <script src="https://https://github.com/ECSWC/blog/tree/main/chart.js"></script>
<div class="chart" style="height:184px">
  <canvas id="myChart"></canvas>
</div>
<script>
const ctx = document.getElementById('myChart');
      
    const labels = [1,2,3,4,5,6,7];
    // create random Data
    const helpData1 = labels.map( _ => Math.random() * 100);
    const helpData2 = labels.map( _ => Math.random() * 100);
    const data = {
      labels: labels,
      datasets: [
          {
            label: 'Dataset 1',
            data: helpData1,
            borderColor: '#ff0000',
            backgroundColor: '#ff000088',
            order: 1
          },
          {
            label: 'Dataset 2',
            data:  helpData2,
            borderColor: '#0000ff', 
            backgroundColor:'#0000ff88',
            type: 'line',
            order: 0
          }
      ]
    };
   const config = {
      type: 'bar',
      data: data,
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Combined Line/Bar Chart'
            }
          }
      },
    };
          
    new Chart(
        ctx,
        config
    );
</script>
</html>
