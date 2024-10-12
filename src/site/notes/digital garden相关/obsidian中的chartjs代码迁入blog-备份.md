---
{"dg-publish":true,"dg-pinned":true,"dg-show-toc":true,"dg-content-classes":true,"dg-note-icon":true,"tags":["dg-publish"],"sticker":"emoji//1f469-200d-1f4bb","permalink":"/digital garden相关/obsidian中的chartjs代码迁入blog-备份/","pinned":true,"contentClasses":"","dgShowToc":true,"dgPassFrontmatter":true,"noteIcon":true,"updated":"2024-10-12T10:22:29.623+08:00"}
---




<!DOCTYPE html>  
<html>  
<body> 

<p><span>1,2,3,4,5,6,7</span></p>
 

👉🏼HTML通用
--- 

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<div class="chart" style="height:184px">
  <canvas id="myChart"></canvas>
</div>
      
<script>
const ctx = document.getElementById('myChart');

	const test = document.getElementsByTagName("p");
	//test.getElementsByTagName("p")[0].innerHTML="123";
        let labels_0 = [];
	let labels = [];
	for(var i = 0; i < test.length; i++){
        labels_0.push(i+""+(test[i].innerHTML));
};
	
	//labels_0=labels_0[1];//需要确保第一个打印
	//labels_0=labels_0.replace("1<span>","").replace("</span>","");
	//labels=labels_0.split(",");
	labels=labels_0.join(",");
	
		//test.getElementsByTagName("p")[0];
//text.innerHTML=text.innerHTML.replaceAll("<p><span>[", "[").replaceAll("]</span></p>", "]");
	
	//document.getElementById("测试").innerHTML="kkkkk";
	//const labels= document.getElementById("测试").HTMLParagraphElement.text;
	
	//.textContent;
//.getElementsByClassName("测试")
//const labels=labels_0.split("[")[1].join("");
//const labels=labels.split("]")[0].join("");
//const labels=labels.split(",");
	
//const labels=labels_0.split(";")[1];
window.alert(labels);
	//labels =labels.split(";")[1];
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


</body>
</html>

---

- 对于解决dataviewjs在blog运行chartjs很有帮助👇🏼
	1. [dataviewjs导入外部js的示例](https://forum.obsidian.md/t/use-chartjs-with-dataview/58752)
	2. [html通用的chartjs示例](https://stackoverflow.com/questions/74651498/how-do-i-run-o)
artjs示例](https://stackoverflow.com/questions/74651498/how-do-i-run-o)