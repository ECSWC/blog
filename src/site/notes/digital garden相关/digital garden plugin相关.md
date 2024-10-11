---
{"dg-publish":true,"dg-pinned":true,"dg-show-toc":true,"dg-content-classes":true,"dg-note-icon":true,"tags":["dg-publish"],"sticker":"emoji//1f469-200d-1f4bb","permalink":"/digital garden相关/digital garden plugin相关/","pinned":true,"contentClasses":"","dgShowToc":true,"dgPassFrontmatter":true,"noteIcon":true,"updated":"2024-10-12T01:25:14.720+08:00"}
---


👉🏼[digital garden plugin](https://github.com/oleeskild/obsidian-digital-garden)向blog传递obsidian中dataviewjs数据的方式是传递`代码结果`的`明文数据`
---
- 因此无法传递chartjs的“图像数据”

👉🏼经过[digital garden plugin](https://github.com/oleeskild/obsidian-digital-garden)上传的dataview数据会被打包成`<p><span>…</p></span>`的形式，在外面套一层标签，其无法成为标签的子集，只能通过全局`document.getElementsByTagName("p")[i]`的形式获取数据
	- `<p><span>…</p></span>`会破坏`<script>`完整性，因此只能放在不同的块
