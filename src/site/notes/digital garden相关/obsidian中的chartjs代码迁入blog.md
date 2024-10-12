---
{"dg-publish":true,"dg-pinned":true,"dg-show-toc":true,"dg-content-classes":true,"dg-note-icon":true,"tags":["dg-publish"],"sticker":"emoji//1f469-200d-1f4bb","permalink":"/digital garden相关/obsidian中的chartjs代码迁入blog/","pinned":true,"contentClasses":"","dgShowToc":true,"dgPassFrontmatter":true,"noteIcon":true,"updated":"2024-10-12T11:06:55.257+08:00"}
---



<!DOCTYPE html>  
</html>  
<body> 

<p><span>63.89,63.78,64.78,62.50,62.67,62.78,63.63,63.25,63.89,63.00,64.00,64.29,64.11,63.50,63.56,64.00,63.89,64.86,64.86,63.86,64.29,64.09,NaN,64.13,63.57,65.00,66.63,65.63,65.78</span></p><p><span>64.23,63.48,63.86,63.25,63.43,63.96,63.48,63.33,63.85,63.64,63.92,63.19,63.37,63.57,63.52,64.22,63.63,63.85,64.02,63.95,64.04,63.71,63.36,63.90,63.98,64.42,64.63,65.08,64.85</span></p><p><span>5.7501,5.7402,5.8302,5,5.6403,5.6502,5.0904,5.06,5.7501,4.41,3.84,4.5003,5.7699,5.08,5.7204,5.76,5.7501,4.5402,4.5402,4.4702,4.5003,7.0499,NaN,5.1304,4.4499,5.2,5.3304,5.2504,5.9201999999999995</span></p><p><span>08-30,09-02,09-03,09-04,09-05,09-06,09-09,09-10,09-11,09-12,09-13,09-14,09-18,09-19,09-20,09-23,09-24,09-25,09-26,09-27,09-28,09-29,09-30,10-06,10-07,10-08,10-09,10-10,10-11</span></p>
 

👉🏼HTML通用
--- 

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<div class="chart" style="height:184px">
  <canvas id="myChart"></canvas>
</div>
      
<script>
const ctx = document.getElementById('myChart');

// 分段颜色折线图用到↓
const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;					  
//渐变↓
let gradient_grey=(ctx) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 85, 0, 180);
//(向右透明, 1的中心虚化范围, 向左透明, 向下放出1);
        gradient.addColorStop(0, 'rgba(201, 203, 207, 0.4)');
        gradient.addColorStop(0.35, 'rgba(201, 203, 207, 0.2)');
        gradient.addColorStop(1, 'rgba(201, 203, 207, 0.1)');
        return gradient;
      };
let gradient_red=(ctx) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 140, 0, 300);
////(向右透明, 相互扩散叠加, 向左透明, 1的位置);
       gradient.addColorStop(0, 'rgba(255, 167, 79, 0.2)');
	   gradient.addColorStop(0.4, 'rgba(255, 187, 79, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 77, 79, 0.8)');
        
        return gradient;
      };
let gradient_green=(ctx) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 180, 0, 380);
////(向右透明, 相互扩散叠加, 向左透明, 1的位置);
        gradient.addColorStop(0, 'rgba(0,176,80, 0.1)');
        gradient.addColorStop(0.65, 'rgba(0,176,80, 0.55)');
        gradient.addColorStop(1, 'rgba(0,176,80,0.99)');
        return gradient;
      };
	const test = document.getElementsByTagName("p");
	//test.getElementsByTagName("p")[0].innerHTML="123";
        let labels_0 = [];
	let labels = [];
	for(var i = 0; i < test.length; i++){
        labels_0.push(""+(test[i].innerHTML));
};
	
	//labels_0=labels_0[0];//需要确保第一个打印
	//labels_0=labels_0.replace("<span>","").replace("</span>","");
	//labels=labels_0.split(",");
	
	let wordsData_0=labels_0[0].replace("<span>","").replace("</span>","").split(",");
	let sum_all_date_0=labels_0[1].replace("<span>","").replace("</span>","").split(",");
	let ShuLiang_each_Percentage_0=labels_0[2].replace("<span>","").replace("</span>","").split(",");
	let filesData_0=labels_0[3].replace("<span>","").replace("</span>","").split(",");
	//labels=labels_0.join(",");
	
	let wordsData=[];
	let sum_all_date=[];
	let ShuLiang_each_Percentage=[];
	let filesData=[];
	
	for(var i=0;i<wordsData_0.length;i++){
		//x: ""+filesData[i]
		wordsData.push(wordsData_0[i]*1)
			//({ x: i*1, y: wordsData_0[i]*1})
	};
	for(var i=0;i<sum_all_date_0.length;i++){
		//x: ""+filesData[i]
		sum_all_date.push(sum_all_date_0[i]*1)
			//({ x: i*1, y: wordsData_0[i]*1})
	};
	for(var i=0;i<ShuLiang_each_Percentage_0.length;i++){
		//x: ""+filesData[i]
		ShuLiang_each_Percentage.push(ShuLiang_each_Percentage_0[i]*1)
			//({ x: i*1, y: wordsData_0[i]*1})
	};
	for(var i=0;i<filesData_0.length;i++){
		//x: ""+filesData[i]
		filesData.push(""+filesData_0[i])
			//({ x: i*1, y: wordsData_0[i]*1})
	};
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
window.alert(wordsData_0);
	//labels =labels.split(";")[1];
    // create random Data
    const data = {
      labels: filesData,//x轴标签
      datasets: [
          {
            label: '你',
            data: wordsData_0,
            borderColor: '#ff0000',
            backgroundColor: '#ff000088',
            order: 1
          },
          {
            label: '所有人得分率',
            data:  sum_all_date,
            borderColor: '#0000ff', 
            backgroundColor:'#0000ff88',
            type: 'line',
            order: 0
          }
	      {
            label: '数量×得分率',
            data:  ShuLiang_each_Percentage,
            borderColor: '#0000ff', 
            backgroundColor:'#0000ff88',
            type: 'line',
            order: 2
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
        

// 调用 obsidian chart API👇🏼
//window.renderChart(chartData, this.container);

// P.S.
// renderChart 可以多次调用即绘制多张图表
      </script>


</body>
</html>

---

- 对于解决dataviewjs在blog运行chartjs很有帮助👇🏼
	1. [dataviewjs导入外部js的示例](https://forum.obsidian.md/t/use-chartjs-with-dataview/58752)
	2. [html通用的chartjs示例](https://stackoverflow.com/questions/74651498/how-do-i-run-o)
artjs示例](https://stackoverflow.com/questions/74651498/how-do-i-run-o)
