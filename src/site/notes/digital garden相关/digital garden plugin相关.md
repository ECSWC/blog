---
{"dg-publish":true,"dg-pinned":true,"dg-show-toc":true,"dg-content-classes":true,"dg-note-icon":true,"tags":["dg-publish"],"sticker":"emoji//1f469-200d-1f4bb","permalink":"/digital garden相关/digital garden plugin相关/","pinned":true,"contentClasses":"","dgShowToc":true,"dgPassFrontmatter":true,"noteIcon":true,"updated":"2024-10-12T10:43:55.312+08:00"}
---


👉🏼[digital garden plugin](https://github.com/oleeskild/obsidian-digital-garden)向blog传递obsidian中dataviewjs数据的方式是传递打包成`<p><span>…</p></span>`的`代码结果`的`明文数据`，会破坏`<script>`完整性，因此无法和`在HTML运行chartjs`的代码放在`同一个块`，前者只能通过全局`document.getElementsByTagName("p")[i]`的形式获取后者数据
---
- 打包成`<p><span>…</p></span>`的dataview数据，在外面套一层标签，其无法成为标签的子集，因此无法使用更方便的`document.getElementById("").innerHTML`

