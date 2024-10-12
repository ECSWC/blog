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
	let sum_all_date=labels_0[1].replace("<span>","").replace("</span>","").split(",");
	let ShuLiang_each_Percentage=labels_0[2].replace("<span>","").replace("</span>","").split(",");
	let filesData=labels_0[3].replace("<span>","").replace("</span>","").split(",");
	//labels=labels_0.join(",");
	
	let wordsData=[];
	for(var i=0;i<wordsData_0.length;i++){
		wordsData.push(filesData[i], wordsData_0[i]*1);
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
window.alert(wordsData);
	//labels =labels.split(";")[1];
    // create random Data
    const chartData = {
    type: "line",
    data: {
        datasets: [
          {
                label: "「"+tags.replace("#","")+"-增长」",
                data: wordsData,
                backgroundColor: gradient_red,
                borderColor: ['rgba(255, 77, 79, 1)'],
                segment: {
borderColor: ctx => skipped(ctx,'rgb(0,0,0,0.4)')||down(ctx,'rgb(0,176,80)'),
backgroundColor: ctx => skipped(ctx,'rgba(0,0,0,0.4)')||down(ctx,'rgba(0,176,80, 0.15)'),
borderDash: ctx =>skipped(ctx,[0,0]),
},
//segment定义分段颜色，不要忘了定义“const skipped“和“const down”
				//spanGaps: true,
				//允许为null画线段↑
                borderWidth: 1.8,
                fill: true,  // 填充线下方的背景区域
            pointRadius: 1.4, // 点形状的半径。如果设置为 0，则不渲染该点。
            pointStyle:'circle',
            tension: 0.3,  // 线的贝塞尔曲线张力。设置为 0 以绘制直线。
                order: 1
                
            },
            {
                label: "「"+tags.replace("#","")+"-下降」",
               // data:"",
                backgroundColor: ['rgba(0,176,80,0.1)'],
                borderColor: ['rgba(0,176,80,1)'],
                borderWidth: 1.8,
                },
            {
                label: "「所有人」",
                data: sum_all_date,
                backgroundColor: ['rgba(255, 170, 50, 0.2)'],
                borderColor: ['rgba(255, 170, 50, 10)'],
                borderWidth: 0.6,
                borderDash: ctx =>(ctx,[4,4]),
                fill:false,
                pointRadius: 0.12,
                tension: 0.02,
                order: 2
        
               // backgroundColor: ['rgba(54, 162, 235, 0.2)'],
               // borderColor: ['rgba(54, 162, 235, 1)'],
        },
        {
                label: "「"+tags.replace("#","")+"」"+"的(提交数量×得分率)",
                data: ShuLiang_each_Percentage,
                type: "line",
                yAxisID: 'A',
                backgroundColor: gradient_grey,
                borderColor: ['rgba(201, 203, 207, 10)'],
                borderWidth: 0.60,
                borderDash: ctx =>(ctx,[4,4]),
                fill: true,  // 填充线下方的背景区域
            pointRadius:0.12, // 点形状的半径。如果设置为 0，则不渲染该点。
            pointStyle:'circle',
            tension: 0.03,  // 线的贝塞尔曲线张力。设置为 0 以绘制直线。
                order: 10,
                
                
                 
                

            },],
    },
    options: {
        pointHoverBorderWidth: 6,
        interaction: {
            mode: 'index',
            axis: 'y',
        },
        plugins: {
          legend: {  display: true,position: 'top',},//隐藏label下：bottom
            //title: {
                //display: true,
               // text: '',//大标题
               // font: { weight: 'bold italic', size: '16px', family: 'Barlow' },
            //},
            subtitle: {
                display: true,
                text: '💯得分率(近30天)',
                font: { size: '14px', style: 'italic', family: 'sans-serif' }
            }
        },
        animations: {
            tension: {
                //duration: 1000,
                //easing: 'easeInOutSine',
                //from: 0,
               // to: 0,//线条跳动幅度（动画），0则静止直线，相同数值为静止曲线
                //loop: true
            }
        },
        scales: {
            
            y: {
                stacked:false,
                //borderColor:'rgba(255, 170, 50, 10.35)',
                border: {
                    display: true,
                    width: 0.8,//0.8
                    //borderColor:['rgba(255, 170, 50, 10.35)'],//金色
                },
                
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    color: 'rgba(239, 239, 239, 1)',//轴线宽度
                    //borderColor:'rgba(255, 170, 50, 10.35)',
                },
            },
            A: {
            beginAtZero:true,
            position: 'right',
                stacked:false,
                border: {
                    display: true,
                    width: 0.8,
                },
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    color: 'rgba(239, 239, 239, 0)',//轴线宽度
                    borderColor:'rgba(255, 170, 50, 10.35)',
                },
            },
            x: {
                border: {
                    display: true,
                    width: 0.8,
                },
                grid: {
                display: true,
                    color: 'rgba(239, 239, 239,0)',
                    borderColor:'rgba(255, 170, 50, 10.35)',
                },
            },
        },
    },
};
//
          
    new Chart(
        ctx,
        chartData);
        

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
