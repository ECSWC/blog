---
{"dg-publish":true,"permalink":"/网站建设/数字花园/obsidian/如何修改文章目录TOC(Table of Contents)？/","dgPassFrontmatter":true,"noteIcon":"","updated":"2024-11-07T12:28:57.431+08:00"}
---

<div class="long-cang">digitalGarden插件自带的用于生成文章目录的代码存放位置：src/site/_include/components/sidebar.njk</div>

<h2 class="H1_Underline">👨🏼‍💻用来表达目录TOC的代码为：</h2>

```JavaScript
<aside>
    <div class="sidebar">
        <div class="sidebar-container">
	        {% for imp in dynamics.sidebar.top %}
                        {% include imp %}
                  {% endfor %}
            <!-- 此处为…原思维导图代码… -->

            {% if settings.dgShowToc === true %}
                {% set tocHtml = (content and (content|toc)) %}
                {% if tocHtml %}
                    <div class="toc">
                        <div class="toc-title-container">
                            <div class="toc-title">
                                🗺️本页面包含的内容：
                            </div>
                        </div>
                        <div class="toc-container">
                            {{ tocHtml | safe }}
                        </div>
                    </div>
                {% endif %}
            {% endif %}

            <!-- 此处为…原反链代码… -->
            {% for imp in dynamics.sidebar.bottom %}
                        {% include imp %}
                  {% endfor %}
        </div>
    </div>
</aside>


```

<h2 class="H1_Underline">🧩修改思路：</h2>

<h3 class="long-cang">👢避开原toc：</h3>

因为除了部分user文件夹，其他文件都会随着插件的更新而变更，所以直接修改sidebar.njk并不安全，更好的选择是在src/site/_includes/components/user/common/footer中新建TableOfContent.njk用于存放自定义TOC

为了不影响且避免和digitalGarden插件自带的文章目录TOC冲突，可以有一个巧妙的方法，自定义TOC中：
将{%if settings.dgShowToc === true%}变为{%if settings.dgShowToc === false%}，

即在digitalGarden插件自带的文章目录隐藏时，我们自定义的文章目录出现。

代码变为：

```JavaScript
<aside>
    <div class="sidebar">
        <div class="sidebar-container">
	        {% for imp in dynamics.sidebar.top %}
                        {% include imp %}
                  {% endfor %}
            <!-- 此处为…原思维导图代码… -->

            {% if settings.dgShowToc === false %}
                {% set tocHtml = (content and (content|toc)) %}
                {% if tocHtml %}
                    <div class="toc">
                        <div class="toc-title-container">
                            <div class="toc-title">
                                🗺️本页面包含的内容：
                            </div>
                        </div>
                        <div class="toc-container">
                            {{ tocHtml | safe }}
                        </div>
                    </div>
                {% endif %}
            {% endif %}

            <!-- 此处为…原反链代码… -->
            {% for imp in dynamics.sidebar.bottom %}
                        {% include imp %}
                  {% endfor %}
        </div>
    </div>
</aside>


```

<h3 class="long-cang">🎨进行一些美化：</h3>

为了观察我们对TOC的修改，在njk文件中加入css及控制css的script，变为：

```JavaScript
<aside>
    <div class="sidebar">
        <div class="sidebar-container">
            {% for imp in dynamics.sidebar.top %}
                {% include imp %}
            {% endfor %}
            
            <!-- 此处为…原思维导图代码… -->

            <div class="toc-wrapper">
                <div class="toc-button" onclick="toggleToc()">🗺️目录</div> <!-- 点击按钮 -->
                <div class="toc">
                    <div class="toc-title-container">
                        <div class="toc-title">
                            🗺️本页面包含的内容：
                        </div>
                    </div>
                    <div class="toc-container">
                        {% if settings.dgShowToc === false %}
                            {% set tocHtml = (content and (content|toc)) %}
                            {% if tocHtml %}
                                {{ tocHtml | safe }}
                            {% endif %}
                        {% endif %}
                    </div>
                </div>
            </div>

            <!-- 此处为…原反链代码… -->
            {% for imp in dynamics.sidebar.bottom %}
                {% include imp %}
            {% endfor %}
        </div>
    </div>
</aside>

<style>
.sidebar-container {
    position: relative; /* 改为 relative，确保其他内容正常流动 */
}

.toc-wrapper {
    position: relative; /* 保持相对定位，便于子元素定位 */
}

/* 按钮固定在右上角 */
.toc-button {
    position: fixed; /* 固定定位 */
    right: 20px; /* 距离右边的距离 */
    top: 100px; /* 距离顶部的距离，向下移动了 100px 的位置 */
    display: inline-block; /* 默认状态显示为按钮 */
    width: 75px; /* 按钮宽度 */
    height: 30px; /* 按钮高度 */
    background-color: #007bff; /* 按钮背景颜色 */
    color: white; /* 按钮文字颜色 */
    text-align: center; /* 文字居中 */
    line-height: 30px; /* 行高使文字居中 */
    cursor: pointer; /* 鼠标移上去显示手形光标 */
    border: none; /* 去除边框 */
    z-index: 100; /* 确保按钮在最上层 */
}

/* 长方形的样式 */
.toc {
    display: none; /* 默认隐藏 toc */
    width: 300px; /* 点击后宽度 */
    height: auto; /* 高度自动调整 */
    background-color: #f8f9fa; /* 背景颜色 */
    border: 1px solid #ccc; /* 边框 */
    position: fixed; /* 固定定位以便不被遮挡 */
    z-index: 99; /* z-index 值低于按钮 */
    right: 80px; /* 不与按钮重叠，距离右边的距离 */
    top: 100px; /* 与按钮的顶部位置一致 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}
</style>

<script>
function toggleToc() {
    var tocButton = document.querySelector('.toc-button');
    var toc = document.querySelector('.toc');

    if (toc.style.display === "none" || toc.style.display === "") {
        toc.style.display = "block"; // 显示 toc
        tocButton.innerHTML = "-"; // 更新按钮为关闭图标
    } else {
        toc.style.display = "none"; // 隐藏 toc
        tocButton.innerHTML = "🗺️目录"; // 更新按钮为打开图标
    }
}

// 初始状态
document.querySelector('.toc').style.display = "none"; // 初始化时隐藏 toc
</script>

```

<h2 class="H1_Underline">👾一些小问题：</h2>

<h3 class="long-cang">🥣toc空白？</h3>

点击按钮发现没有内容，修改原toc-container内TOC及对应的js以出现满足以下要求的TOC：
1. 包含或不包含 class 的所有 `<h2>`、`<h3>` 和 `<h4>`。
2. 标题开头包含或不包含图标的所有 `<h2>`、`<h3>` 和 `<h4>`。
3. 标题内容包含或不包含中文的所有 `<h2>`、`<h3>` 和 `<h4>`。

```JavaScript
<aside>
    <div class="sidebar">
        <div class="sidebar-container">
            {% for imp in dynamics.sidebar.top %}
                {% include imp %}
            {% endfor %}
            
            <div class="toc-wrapper">
                <div class="toc-button" onclick="toggleToc()">🗺️目录</div> <!-- 点击按钮 -->
                <div class="toc">
                    <div class="toc-title-container">
                        <div class="toc-title">
                            🗺️本页面包含的内容：
                        </div>
                    </div>
                    <div class="toc-container">
                        <!-- 这里的内容将通过 JavaScript 动态生成 -->
                    </div>
                </div>
            </div>

            {% for imp in dynamics.sidebar.bottom %}
                {% include imp %}
            {% endfor %}
        </div>
    </div>
</aside>

<style>
.sidebar-container {
    position: relative; /* 改为 relative，确保其他内容正常流动 */
}

.toc-wrapper {
    position: relative; /* 保持相对定位，便于子元素定位 */
}

/* 按钮固定在右上角 */
.toc-button {
    position: fixed; /* 固定定位 */
    right: 20px; /* 距离右边的距离 */
    top: 100px; /* 距离顶部的距离，向下移动了 100px 的位置 */
    display: inline-block; /* 默认状态显示为按钮 */
    width: 75px; /* 按钮宽度 */
    height: 30px; /* 按钮高度 */
    background-color: #007bff; /* 按钮背景颜色 */
    color: white; /* 按钮文字颜色 */
    text-align: center; /* 文字居中 */
    line-height: 30px; /* 行高使文字居中 */
    cursor: pointer; /* 鼠标移上去显示手形光标 */
    border: none; /* 去除边框 */
    z-index: 100; /* 确保按钮在最上层 */
}

/* 长方形的样式 */
.toc {
    display: none; /* 默认隐藏 toc */
    width: 300px; /* 点击后宽度 */
    height: auto; /* 高度自动调整 */
    background-color: #f8f9fa; /* 背景颜色 */
    border: 1px solid #ccc; /* 边框 */
    position: fixed; /* 固定定位以便不被遮挡 */
    z-index: 99; /* z-index 值低于按钮 */
    right: 80px; /* 不与按钮重叠，距离右边的距离 */
    top: 100px; /* 与按钮的顶部位置一致 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}
</style>

<script>
function toggleToc() {
    var tocButton = document.querySelector('.toc-button');
    var toc = document.querySelector('.toc .toc-container');

    // 清空 TOC 内容
    toc.innerHTML = '';

    // 获取所有 <h2>, <h3>, <h4> 标签
    var headers = document.querySelectorAll('h2, h3, h4');

    headers.forEach(function(header) {
        var titleText = header.innerText.trim();
        var hasIcon = header.querySelector('i') !== null; // 假设图标是 <i> 标签
        var isChinese = /[\u4e00-\u9fa5]/.test(titleText); // 判断是否包含中文

        // 不做过滤，添加所有类型的标题
        var tocItem = `<div>${titleText}</div>`;
        toc.innerHTML += tocItem; // 将符合条件的标题加入 TOC
    });

    // 切换显示/隐藏 TOC
    if (toc.parentElement.style.display === "none" || toc.parentElement.style.display === "") {
        toc.parentElement.style.display = "block"; // 显示 TOC
        tocButton.innerHTML = "-"; // 更新按钮为关闭图标
    } else {
        toc.parentElement.style.display = "none"; // 隐藏 TOC
        tocButton.innerHTML = "🗺️目录"; // 更新按钮为打开图标
    }
}

// 初始状态
document.querySelector('.toc').style.display = "none"; // 初始化时隐藏 toc
</script>

```

<h3 class="long-cang">👨🏼‍🦽toc无法跳转？</h3>

修改目标：
1. 点击TOC标题后进行跳转。
2. TOC中`<h2>`、`<h3>` 和 `<h4>`根据级别大小缩进。

修改如下：
 1. **跳转功能**: 使用 `header.id = headerId;` 为每个标题生成 ID，并在 TOC 中为每个标题添加链接 (`<a href="#${headerId}">`)。
2. **标题缩进**: 在 CSS 中，通过 `padding-left` 来设置每个标题级别的缩进。
    
    - `<h2>`：不缩进
    - `<h3>`：左边缩进 20px
    - `<h4>`：左边缩进 40px
    - 每个标题开头增加┗，使结构更清晰。

```JavaScript
<aside>
    <div class="sidebar">
        <div class="sidebar-container">
            {% for imp in dynamics.sidebar.top %}
                {% include imp %}
            {% endfor %}
            
            <div class="toc-wrapper">
                <div class="toc-button" onclick="toggleToc()">🗺️目录</div> <!-- 点击按钮 -->
                <div class="toc">
                    <div class="toc-title-container">
                        <div class="toc-title">
                            🗺️本页面包含的内容：
                        </div>
                    </div>
                    <div class="toc-container">
                        <!-- 这里的内容将通过 JavaScript 动态生成 -->
                    </div>
                </div>
            </div>

            {% for imp in dynamics.sidebar.bottom %}
                {% include imp %}
            {% endfor %}
        </div>
    </div>
</aside>

<style>
.sidebar-container {
    position: relative; /* 改为 relative，确保其他内容正常流动 */
}

.toc-wrapper {
    position: relative; /* 保持相对定位，便于子元素定位 */
}

/* 按钮固定在右上角 */
.toc-button {
    position: fixed; /* 固定定位 */
    right: 20px; /* 距离右边的距离 */
    top: 100px; /* 距离顶部的距离，向下移动了 100px 的位置 */
    display: inline-block; /* 默认状态显示为按钮 */
    width: 75px; /* 按钮宽度 */
    height: 30px; /* 按钮高度 */
    background-color: #007bff; /* 按钮背景颜色 */
    color: white; /* 按钮文字颜色 */
    text-align: center; /* 文字居中 */
    line-height: 30px; /* 行高使文字居中 */
    cursor: pointer; /* 鼠标移上去显示手形光标 */
    border: none; /* 去除边框 */
    z-index: 100; /* 确保按钮在最上层 */
}

/* 长方形的样式 */
.toc {
    display: none; /* 默认隐藏 toc */
    width: 300px; /* 点击后宽度 */
    height: auto; /* 高度自动调整 */
    background-color: #f8f9fa; /* 背景颜色 */
    border: 1px solid #ccc; /* 边框 */
    position: fixed; /* 固定定位以便不被遮挡 */
    z-index: 99; /* z-index 值低于按钮 */
    right: 80px; /* 不与按钮重叠，距离右边的距离 */
    top: 100px; /* 与按钮的顶部位置一致 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}

.toc-container {
    padding-left: 10px; /* 添加一些左内边距 */
}

/* 为不同级别的标题设置不同的缩进 */
.toc-container h2 {
    margin: 5px 0; /* 添加上下边距 */
}

.toc-container h3 {
    margin: 5px 0; /* 添加上下边距 */
    padding-left: 15px; /* 垂直缩进 */
}

.toc-container h4 {
    margin: 5px 0; /* 添加上下边距 */
    padding-left: 30px; /* 更深的缩进 */
}
</style>

<script>
function toggleToc() {
    var tocButton = document.querySelector('.toc-button');
    var toc = document.querySelector('.toc .toc-container');

    // 清空 TOC 内容
    toc.innerHTML = '';

    // 获取所有 <h2>, <h3>, <h4> 标签
    var headers = document.querySelectorAll('h2, h3, h4');

    headers.forEach(function(header) {
        var titleText = header.innerText.trim();
        var headerId = titleText.replace(/\s+/g, '-').toLowerCase(); // 创建锚点 ID
        header.id = headerId; // 为每个标题设置相应的 ID

        var tocItem;
        if (header.tagName === 'H2') {
            tocItem = `<div><a href="#${headerId}">┗${titleText}</a></div>`;
        } else if (header.tagName === 'H3') {
            tocItem = `<div style="padding-left: 20px;"><a href="#${headerId}">┗${titleText}</a></div>`;
        } else if (header.tagName === 'H4') {
            tocItem = `<div style="padding-left: 40px;"><a href="#${headerId}">┗${titleText}</a></div>`;
        }

        toc.innerHTML += tocItem; // 将符合条件的标题加入 TOC
    });

    // 切换显示/隐藏 TOC
    if (toc.parentElement.style.display === "none" || toc.parentElement.style.display === "") {
        toc.parentElement.style.display = "block"; // 显示 TOC
        tocButton.innerHTML = "-"; // 更新按钮为关闭图标
    } else {
        toc.parentElement.style.display = "none"; // 隐藏 TOC
        tocButton.innerHTML = "🗺️目录"; // 更新按钮为打开图标
    }
}

// 初始状态
document.querySelector('.toc').style.display = "none"; // 初始化时隐藏 toc
</script>

```

<h3 class="long-cang">🏞️进行一些美化：</h3>

1. 按钮改为圆角。
2. 按钮背景改为白色磨砂。
3. TOC背景改为一张图片。
4. TOC背景为黑色磨砂。

```JavaScript
<aside>
    <div class="sidebar">
        <div class="sidebar-container">
            {% for imp in dynamics.sidebar.top %}
                {% include imp %}
            {% endfor %}

            <div class="toc-wrapper">
                <div class="toc-button" onclick="toggleToc()">🗺️目录</div> <!-- 点击按钮 -->
                <div class="toc">
                    <div class="toc-title-container">
                        <div class="toc-title">
                            🗺️本页面包含的内容：
                        </div>
                    </div>
                    <div class="toc-container">
                        <!-- 这里的内容将通过 JavaScript 动态生成 -->
                    </div>
                </div>
            </div>

            {% for imp in dynamics.sidebar.bottom %}
                {% include imp %}
            {% endfor %}
        </div>
    </div>
</aside>

<style>
.sidebar-container {
    position: relative; /* 改为 relative，确保其他内容正常流动 */
}

.toc-wrapper {
    position: relative; /* 保持相对定位，便于子元素定位 */
}

/* 按钮样式 */
.toc-button {
    position: fixed; /* 固定定位 */
    right: 20px; /* 距离右边的距离 */
    top: 100px; /* 距离顶部的距离，向下移动了 100px 的位置 */
    display: inline-block; /* 默认状态显示为按钮 */
    width: 75px; /* 按钮宽度 */
    height: 30px; /* 按钮高度 */
    background-color: rgba(255, 255, 255, 0.8); /* 磨砂白色背景 */
    color: #007bff; /* 按钮文字颜色 */
    text-align: center; /* 文字居中 */
    line-height: 30px; /* 行高使文字居中 */
    cursor: pointer; /* 鼠标移上去显示手形光标 */
    border: none; /* 去除边框 */
    z-index: 100; /* 确保按钮在最上层 */
    border-radius: 15px; /* 圆角效果 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}

/* 长方形的样式 */
.toc {
    display: none; /* 默认隐藏 toc */
    width: 300px !important; /* 点击后宽度 */
    height: auto; /* 高度自动调整 */

    background-image: url('https://ice.frostsky.com/2024/11/02/80d7b4bc93547e56a76a8625a26a7461.jpeg'); /* 添加背景图片 */
    background-size: 456%; /* 背景大小 */
    background-position: center; /* 背景中心对齐 */
    
    border: 1px solid #ccc; /* 边框 */
    position: fixed; /* 固定定位以便不被遮挡 */
    z-index: 99; /* z-index 值低于按钮 */
    right: 80px; /* 不与按钮重叠，距离右边的距离 */
    top: 100px; /* 与按钮的顶部位置一致 */
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 1.23); /* 保留文本阴影 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
}

.toc-container {
    color: white !important;

    background-color: rgba(0, 0, 0, 0.3); /* 磨砂黑色背景 */
    backdrop-filter: brightness(0.96) blur(1.23px); /* 应用亮度和模糊效果*/
    
    border-radius: 6px; /* 圆角效果 */
    
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 1.23); /* 保留文本阴影 */
    padding-left: 10px; /* 添加一些左内边距 */
}
.toc-title{
    color: white !important;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 1.23); /* 保留文本阴影 */
}
/* 为不同级别的标题设置不同的缩进 */
.toc-container h2 {
    margin: 5px 0; /* 添加上下边距 */
}

.toc-container h3 {
    margin: 5px 0; /* 添加上下边距 */
    padding-left: 15px; /* 垂直缩进 */
}

.toc-container h4 {
    margin: 5px 0; /* 添加上下边距 */
    padding-left: 30px; /* 更深的缩进 */
}

.toc-container a {
    color: white; /* TOC 中链接的文字颜色 */
    text-size:80;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 1.23); /* 保留文本阴影 */
    text-decoration: none; /* 取消下划线 */
}

.toc-container a:hover {
    text-decoration: underline; /* 悬停时添加下划线 */
}
</style>

<script>
function toggleToc() {
    var tocButton = document.querySelector('.toc-button');
    var toc = document.querySelector('.toc .toc-container');

    // 清空 TOC 内容
    toc.innerHTML = '';

    // 获取所有 <h2>, <h3>, <h4> 标签
    var headers = document.querySelectorAll('h2, h3, h4');

    headers.forEach(function(header) {
        var titleText = header.innerText.trim();
        var headerId = titleText.replace(/\s+/g, '-').toLowerCase(); // 创建锚点 ID
        header.id = headerId; // 为每个标题设置相应的 ID

        var tocItem;
        if (header.tagName === 'H2') {
            tocItem = `<div><a href="#${headerId}">┗${titleText}</a></div>`;
        } else if (header.tagName === 'H3') {
            tocItem = `<div style="padding-left: 20px;"><a href="#${headerId}">┗${titleText}</a></div>`;
        } else if (header.tagName === 'H4') {
            tocItem = `<div style="padding-left: 40px;"><a href="#${headerId}">┗${titleText}</a></div>`;
        }

        toc.innerHTML += tocItem; // 将符合条件的标题加入 TOC
    });

    // 切换显示/隐藏 TOC
    if (toc.parentElement.style.display === "none" || toc.parentElement.style.display === "") {
        toc.parentElement.style.display = "block"; // 显示 TOC
        tocButton.innerHTML = "❌"; // 更新按钮为关闭图标
    } else {
        toc.parentElement.style.display = "none"; // 隐藏 TOC
        tocButton.innerHTML = "🗺️目录"; // 更新按钮为打开图标
    }
}

// 初始状态
document.querySelector('.toc').style.display = "none"; // 初始化时隐藏 toc
</script>

```

<h3 class="long-cang">💊未解决的小问题：</h3>

暂时仅在iPad上发现

- 跳转偶尔会失灵，错位
- 整toc偶尔会卡死

<h3 class="long-cang">📖小调整，toc默认显示：</h3>

```JavaScript
<aside>
    <div class="sidebar">
        <div class="sidebar-container">
            {% for imp in dynamics.sidebar.top %}
                {% include imp %}
            {% endfor %}

            <div class="toc-wrapper">
                <div class="toc-button" onclick="toggleToc()">❌</div> <!-- 点击按钮 -->
                <div class="toc">
                    <div class="toc-title-container">
                        <div class="toc-title">
                            🗺️本页面包含的内容：
                        </div>
                    </div>
                    <div class="toc-container">
                        <!-- 这里的内容将通过 JavaScript 动态生成 -->
                    </div>
                </div>
            </div>

            {% for imp in dynamics.sidebar.bottom %}
                {% include imp %}
            {% endfor %}
        </div>
    </div>
</aside>

<style>
.sidebar-container {
    position: relative; /* 改为 relative，确保其他内容正常流动 */
}

.toc-wrapper {
    position: relative; /* 保持相对定位，便于子元素定位 */
}

/* 按钮样式 */
.toc-button {
    position: fixed; /* 固定定位 */
    right: 20px; /* 距离右边的距离 */
    top: 100px; /* 距离顶部的距离，向下移动了 100px 的位置 */
    display: inline-block; /* 默认状态显示为按钮 */
    width: 75px; /* 按钮宽度 */
    height: 30px; /* 按钮高度 */
    background-color: rgba(255, 255, 255, 0.8); /* 磨砂白色背景 */
    color: #007bff; /* 按钮文字颜色 */
    text-align: center; /* 文字居中 */
    line-height: 30px; /* 行高使文字居中 */
    cursor: pointer; /* 鼠标移上去显示手形光标 */
    border: none; /* 去除边框 */
    z-index: 100; /* 确保按钮在最上层 */
    border-radius: 15px; /* 圆角效果 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}

/* 长方形的样式 */
.toc {
    display: block; /* 默认隐藏 toc */
    width: 300px !important; /* 点击后宽度 */
    height: auto; /* 高度自动调整 */

    background-image: url('https://ice.frostsky.com/2024/11/02/80d7b4bc93547e56a76a8625a26a7461.jpeg'); /* 添加背景图片 */
    background-size: 456%; /* 背景大小 */
    background-position: center; /* 背景中心对齐 */
    
    border: 1px solid #ccc; /* 边框 */
    position: fixed; /* 固定定位以便不被遮挡 */
    z-index: 99; /* z-index 值低于按钮 */
    right: 80px; /* 不与按钮重叠，距离右边的距离 */
    top: 100px; /* 与按钮的顶部位置一致 */
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 1.23); /* 保留文本阴影 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
}

.toc-container {
    color: white !important;

    background-color: rgba(0, 0, 0, 0.3); /* 磨砂黑色背景 */
    backdrop-filter: brightness(0.96) blur(1.23px); /* 应用亮度和模糊效果*/
    
    border-radius: 6px; /* 圆角效果 */
    
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 1.23); /* 保留文本阴影 */
    padding-left: 10px; /* 添加一些左内边距 */
}
.toc-title{
    color: white !important;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 1.23); /* 保留文本阴影 */
}
/* 为不同级别的标题设置不同的缩进 */
.toc-container h2 {
    margin: 5px 0; /* 添加上下边距 */
}

.toc-container h3 {
    margin: 5px 0; /* 添加上下边距 */
    padding-left: 15px; /* 垂直缩进 */
}

.toc-container h4 {
    margin: 5px 0; /* 添加上下边距 */
    padding-left: 30px; /* 更深的缩进 */
}

.toc-container a {
    color: white; /* TOC 中链接的文字颜色 */
    text-size:80;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 1.23); /* 保留文本阴影 */
    text-decoration: none; /* 取消下划线 */
}

.toc-container a:hover {
    text-decoration: underline; /* 悬停时添加下划线 */
}
</style>

<script>
function toggleToc() {
    var tocButton = document.querySelector('.toc-button');
    var toc = document.querySelector('.toc .toc-container');

    // 清空 TOC 内容
    toc.innerHTML = '';

    // 获取所有 <h2>, <h3>, <h4> 标签
    var headers = document.querySelectorAll('h2, h3, h4');

    headers.forEach(function(header) {
        var titleText = header.innerText.trim();
        var headerId = titleText.replace(/\s+/g, '-').toLowerCase(); // 创建锚点 ID
        header.id = headerId; // 为每个标题设置相应的 ID

        var tocItem;
        if (header.tagName === 'H2') {
            tocItem = `<div><a href="#${headerId}">┗${titleText}</a></div>`;
        } else if (header.tagName === 'H3') {
            tocItem = `<div style="padding-left: 20px;"><a href="#${headerId}">┗${titleText}</a></div>`;
        } else if (header.tagName === 'H4') {
            tocItem = `<div style="padding-left: 40px;"><a href="#${headerId}">┗${titleText}</a></div>`;
        }

        toc.innerHTML += tocItem; // 将符合条件的标题加入 TOC
    });

    // 切换显示/隐藏 TOC
    if (toc.parentElement.style.display === "none" || toc.parentElement.style.display === "") {
        toc.parentElement.style.display = "block"; // 显示 TOC
        tocButton.innerHTML = "❌"; // 更新按钮为关闭图标
    } else {
        toc.parentElement.style.display = "none"; // 隐藏 TOC
        tocButton.innerHTML = "🗺️目录"; // 更新按钮为打开图标
    }
}

// 初始状态
//document.querySelector('.toc').style.display = "none"; // 初始化时隐藏 toc

// 初始状态，确保 TOC 默认可见
toggleToc();
</script>

```
