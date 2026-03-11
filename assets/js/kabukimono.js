document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");

    const sidebarLinks = document.querySelectorAll(".floating-ict-sidebar a");
    sidebarLinks.forEach(anchor => {
        anchor.addEventListener("click", e => {
            const href = anchor.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

    const lessonCards = document.querySelectorAll(".lesson-card");
    const modal = document.getElementById("lesson-modal");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.querySelector(".modal-close");

    if (modalClose) {
        modalClose.addEventListener("click", () => { modal.style.display = "none"; });
    }

    if (modal) {
        window.addEventListener("click", (e) => {
            if (e.target === modal) { modal.style.display = "none"; }
        });
    }

    lessonCards.forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            const lessonId = card.getAttribute("data-lesson");
            if (lessonId && lessonData[lessonId]) {
                renderLessonModal(lessonData[lessonId]);
                modal.style.display = "block";
            }
        });
    });

    function renderLessonModal(lesson) {
        modalBody.innerHTML = `
            <div class="lesson-detail">
                <h2>${lesson.title}</h2>
                <div class="lesson-content">${lesson.content}</div>
                ${lesson.code ? `
                <div class="code-demo">
                    <div class="code-box"><h4>Sample Code:</h4><pre><code>${lesson.code}</code></pre></div>
                    <div class="output-box"><h4>Sample Output:</h4><div class="demo-display">${lesson.output}</div>
                </div>` : ''}
            </div>`;
    }

    const otherLessonCards = document.querySelectorAll(".lesson-card:not([data-lesson])");
    otherLessonCards.forEach(card => {
        card.addEventListener("click", e => {
            const href = card.getAttribute("href");
            if (href && href !== "javascript:void(0);") {
                e.preventDefault();
                card.classList.add("grow");
                setTimeout(() => {
                    document.body.classList.remove("fade-in");
                    document.body.classList.add("fade-out");
                    setTimeout(() => { window.location.assign(href); }, 500);
                }, 400);
            }
        });
    });

    document.querySelectorAll("a").forEach(link => {
        if (!link.classList.contains("lesson-card") && !link.closest(".floating-ict-sidebar")) {
            link.addEventListener("click", e => {
                const href = link.getAttribute("href");
                if (href && !href.startsWith("#") && href !== "javascript:void(0);") {
                    e.preventDefault();
                    document.body.classList.remove("fade-in");
                    document.body.classList.add("fade-out");
                    setTimeout(() => { window.location.assign(href); }, 500);
                }
            });
        }
    });
});

const lessonData = {
    // ICT FIRST QUARTER
    "q1-lesson1": {
        title: "Lesson 1: Introduction to HTML Links",
        content: `<h3>Hyperlinks</h3><p>A hyperlink is a connection from one web page to another.</p><h4>Types:</h4><ul><li><strong>Absolute Links</strong> - Complete URL</li><li><strong>Relative Links</strong> - Same site</li><li><strong>Named Anchor</strong> - Within page (#section)</li></ul><h4>Attributes:</h4><ul><li><strong>href</strong> - URL</li><li><strong>target</strong> - Where to open</li></ul>`,
        code: `<a href="http://www.example.com">Link</a>
<a href="about.html">About</a>
<a href="#chapter1">Go to Chapter</a>
<a href="https://youtube.com" target="_blank">YouTube</a>`,
        output: `<a href="#" style="color:#2c3a5e;text-decoration:underline;">Link</a>`
    },
    "q1-lesson2": {
        title: "Lesson 2: Hyperlinks and Target Attributes",
        content: `<h3>Target Attributes</h3><ul><li><strong>_self</strong> - Same window</li><li><strong>_blank</strong> - New tab</li><li><strong>_parent</strong> - Parent frame</li><li><strong>_top</strong> - Full window</li></ul><h4>Email Links:</h4><p>Use mailto: for email links</p>`,
        code: `<a href="mailto:teacher@school.edu">Email Teacher</a>
<a href="https://google.com" target="_blank">Google</a>`,
        output: `<a href="mailto:test@test.com">Email Teacher</a>`
    },
    "q1-lesson3": {
        title: "Lesson 3: HTML Links and Forms",
        content: `<h3>Types of Links</h3><ul><li><strong>External</strong> - Other websites</li><li><strong>Internal</strong> - Same website</li><li><strong>Dead</strong> - Non-existent (#)</li></ul><h3>Forms</h3><p>Collects user input</p><h4>Attributes:</h4><ul><li><strong>action</strong> - Processing URL</li><li><strong>method</strong> - GET or POST</li></ul>`,
        code: `<form action="submit.php" method="POST">
  <input type="text" name="name">
  <input type="submit" value="Submit">
</form>`,
        output: `<form onsubmit="return false"><input type="text" name="name"></form>`
    },
    "q1-lesson4": {
        title: "Lesson 4: HTML5 Input Types",
        content: `<h3>HTML5 Input Types</h3><ul><li><strong>color</strong> - Color picker</li><li><strong>date</strong> - Date picker</li><li><strong>email</strong> - Email validation</li><li><strong>number</strong> - Numeric input</li><li><strong>range</strong> - Slider</li><li><strong>search</strong> - Search field</li></ul>`,
        code: `<form>
  <input type="email" placeholder="Enter email" required>
  <input type="number" min="1" max="100">
  <input type="submit" value="Submit">
</form>`,
        output: `<form onsubmit="return false"><input type="email" placeholder="Enter email"></form>`
    },
    "q1-lesson5": {
        title: "Lesson 5: Input Elements",
        content: `<h3>Input Types</h3><ul><li><strong>text</strong> - Text input</li><li><strong>password</strong> - Hidden text</li><li><strong>checkbox</strong> - Multiple selection</li><li><strong>radio</strong> - Single selection</li><li><strong>file</strong> - File upload</li></ul>`,
        code: `<form>
  <input type="text" name="username">
  <input type="password" name="pass">
  <input type="checkbox" name="agree"> I agree
  <input type="radio" name="gender" value="male"> Male
</form>`,
        output: `<form onsubmit="return false"><input type="text"><br><input type="checkbox"> I agree</form>`
    },
    "q1-lesson6": {
        title: "Lesson 6: Radio Buttons, Checkboxes & Dropdowns",
        content: `<h3>Radio Buttons</h3><p>Select ONE option - same name groups them</p><h3>Checkboxes</h3><p>Select MULTIPLE options</p><h3>Dropdowns</h3><p>Using <select> and <option> tags</p>`,
        code: `<form>
  <select name="country">
    <option value="ph">Philippines</option>
    <option value="us">USA</option>
  </select>
</form>`,
        output: `<select><option>Philippines</option><option>USA</option></select>`
    },
    "q1-lesson7": {
        title: "Lesson 7: Feedback Forms and File Upload",
        content: `<h3>Feedback Form</h3><p>action="mailto:email" sends form via email</p><h3>File Upload</h3><p>accept attribute specifies file types</p><ul><li>image/*</li><li>.pdf</li></ul>`,
        code: `<form action="mailto:feedback@school.edu" method="post" enctype="text/plain">
  <input type="file" accept="image/*,.pdf">
</form>`,
        output: `<form onsubmit="return false"><input type="file" accept="image/*"></form>`
    },

    // ICT SECOND QUARTER
    "q2-lesson1": {
        title: "Lesson 1: Introduction to CSS",
        content: `<h3>CSS Definition</h3><p><strong>CSS (Cascading Style Sheets)</strong> describes presentation of HTML.</p><h3>Why Use CSS?</h3><ul><li>Consistency</li><li>Saves Time</li><li>Responsiveness</li></ul><h3>Types:</h3><ul><li><strong>External</strong> - .css file</li><li><strong>Embedded</strong> - <style> tag</li><li><strong>Inline</strong> - style attribute</li></ul>`,
        code: `<!-- External -->
<link rel="stylesheet" href="style.css">
<!-- Embedded -->
<style>p { color: blue; }</style>
<!-- Inline -->
<p style="color:red;">Red Text</p>`,
        output: `<p style="color:blue;">Blue Text</p>`
    },
    "q2-lesson2": {
        title: "Lesson 2: Structure of CSS",
        content: `<h3>CSS Structure</h3><p><strong>Selector</strong> - element to style<br><strong>Declaration</strong> - property and value<br><strong>{ }</strong> - declaration block</p><h3>Comments:</h3><p>/* This is a comment */</p>`,
        code: `p {
    color: green;
    font-size: 18px;
}`,
        output: `<p style="color:green;font-size:18px;">Green Text</p>`
    },
    "q2-lesson3": {
        title: "Lesson 3: Display Property and Layout",
        content: `<h3>Display Values</h3><ul><li><strong>block</strong> - Full width</li><li><strong>inline</strong> - Only needed width</li><li><strong>none</strong> - Hidden</li></ul><h3>Div and Span</h3><p><strong>div</strong> - Block element<br><strong>span</strong> - Inline element</p>`,
        code: `<style>.block {display:block;background:lightblue;}
.inline {display:inline;background:lightgreen;}</style>
<span class="block">Block Span</span>
<div class="inline">Inline Div</div>`,
        output: `<span style="display:block;background:lightblue;padding:10px;">Block Span</span>`
    },
    "q2-lesson4": {
        title: "Lesson 4: CSS Classes and Selectors",
        content: `<h3>Classes</h3><p>.classname - Selects all with class<br>element.classname - Specific element with class</p><h3>Grouping</h3><p>h1, h2, h3 { } - Multiple selectors</p>`,
        code: `<style>.highlight {background:yellow;}
p.highlight {font-size:20px;}</style>
<p class="highlight">Highlighted</p>`,
        output: `<p style="background:yellow;padding:5px;">Highlighted</p>`
    },
    "q2-lesson5": {
        title: "Lesson 5: CSS Selectors",
        content: `<h3>Types of Selectors</h3><ul><li><strong>Element</strong> - p, h1, div</li><li><strong>Class</strong> - .classname</li><li><strong>ID</strong> - #idname</li><li><strong>Universal</strong> - *</li><li><strong>Attribute</strong> - [attribute]</li></ul>`,
        code: `<style>#header {background:navy;color:white;}</style>
<div id="header">Header</div>`,
        output: `<div style="background:navy;color:white;padding:20px;">Header</div>`
    },
    "q2-lesson6": {
        title: "Lesson 6: Dimensions and Pseudo-Classes",
        content: `<h3>CSS Dimensions</h3><ul><li><strong>width, height</strong></li><li><strong>visibility</strong> - visible/hidden</li><li><strong>line-height</strong></li></ul><h3>Pseudo-Classes</h3><ul><li><strong>:link</strong></li><li><strong>:visited</strong></li><li><strong>:hover</strong></li><li><strong>:active</strong></li></ul>`,
        code: `<style>a:hover {color:red;font-size:18px;}</style>
<a href="#">Hover Me!</a>`,
        output: `<a href="#" style="color:#2c3a5e;">Hover Me!</a>`
    },

    // ICT THIRD QUARTER
    "q3-lesson1": {
        title: "Lesson 1: Formatting Text with CSS",
        content: `<h3>Font Properties</h3><ul><li><strong>font-family</strong></li><li><strong>font-size</strong></li><li><strong>font-weight</strong></li><li><strong>font-style</strong></li></ul><h3>Text Properties</h3><ul><li>line-height</li><li>letter-spacing</li><li>text-align</li><li>text-indent</li></ul>`,
        code: `<style>.demo {font-family:Georgia;font-size:18px;font-weight:bold;}</style>
<p class="demo">Bold Text</p>`,
        output: `<p style="font-family:Georgia;font-size:18px;font-weight:bold;">Bold Text</p>`
    },
    "q3-lesson2": {
        title: "Lesson 2: Formatting Text (Continued)",
        content: `<h3>Bold and Italic</h3><ul><li>font-weight: bold</li><li>font-style: italic</li></ul><h3>Alignment</h3><ul><li>text-align: left/center/right/justify</li></ul><h3>Text Shadow</h3><p>text-shadow: 2px 2px 4px #888;</p>`,
        code: `<style>.bold {font-weight:bold;}
.center {text-align:center;}</style>
<p class="bold">Bold</p>
<p class="center">Center</p>`,
        output: `<p style="font-weight:bold;">Bold</p><p style="text-align:center;">Center</p>`
    },
    "q3-lesson3": {
        title: "Lesson 3: Formatting Layout with CSS",
        content: `<h3>Box Model</h3><ol><li><strong>Content</strong></li><li><strong>Padding</strong></li><li><strong>Border</strong></li><li><strong>Margin</strong></li></ol><h3>Position</h3><ul><li>static, relative, absolute, fixed</li></ul>`,
        code: `<style>.box {margin:20px;border:5px solid #333;padding:20px;background:lightblue;}</style>
<div class="box">Box Model</div>`,
        output: `<div style="margin:20px;border:5px solid #333;padding:20px;background:lightblue;">Box Model</div>`
    },
    "q3-lesson4": {
        title: "Lesson 4: Formatting Border & Table with CSS",
        content: `<h3>Border Properties</h3><ul><li>border-width, border-color, border-style</li></ul><h3>Shorthand</h3><p>border: width style color;</p><h3>Table</h3><ul><li>border-collapse</li><li>border-spacing</li></ul>`,
        code: `<style>table {width:100%;border-collapse:collapse;}
th,td {border:2px solid #333;padding:12px;}</style>
<table><tr><th>Name</th><th>Age</th></tr><tr><td>John</td><td>15</td></tr></table>`,
        output: `<table style="width:100%;border-collapse:collapse;"><tr><th style="border:2px solid #333;padding:12px;background:#2c3a5e;color:white;">Name</th><th style="border:2px solid #333;padding:12px;background:#2c3a5e;color:white;">Age</th></tr><tr><td style="border:2px solid #333;padding:12px;">John</td><td style="border:2px solid #333;padding:12px;">15</td></tr></table>`
    },

    // ICT FOURTH QUARTER
    "q4-lesson1": {
        title: "Lesson 1: JavaScript Introduction",
        content: `<h3>JavaScript Purpose</h3><ul><li>UI rendering</li><li>Content loading</li><li>Real-time updates</li></ul><h3>Static vs Dynamic</h3><ul><li><strong>Static</strong> - As stored</li><li><strong>Dynamic</strong> - Interactive</li></ul><h3>Difference</h3><ul><li>HTML - Structure</li><li>CSS - Style</li><li>JavaScript - Interactivity</li></ul>`,
        code: `<script>document.write("Hello!");</script>
<button onclick="alert('Click!')">Click Me</button>`,
        output: `<button onclick="alert('Hello!')" style="padding:10px;">Click Me</button>`
    },
    "q4-lesson2": {
        title: "Lesson 2: Where to Place Scripts",
        content: `<h3>Script Placement</h3><ul><li><strong>In head</strong> - Pre-loaded</li><li><strong>In body</strong> - When page loads</li><li><strong>External</strong> - .js file</li></ul><h3>Comments</h3><ul><li>// single-line</li><li>/* multi-line */</li></ul>`,
        code: `<script>var x=5;var y=6;document.write(x+y);</script>`,
        output: `<p>Result: <span id="demo"></span></p><script>document.getElementById("demo").innerHTML=5+6</script>`
    },
    "q4-lesson3": {
        title: "Lesson 3: Characteristics of JavaScript",
        content: `<h3>Key Characteristics</h3><ul><li><strong>Interpreted</strong> - No compilation</li><li><strong>Client-side</strong> - Runs in browser</li><li><strong>Object-oriented</strong> - Objects with methods</li></ul><h3>Variables</h3><ul><li>var, let, const</li><li>Data types: string, number, boolean</li></ul>`,
        code: `<script>var name="John";var age=15;document.write(name+" is "+age+" years old");</script>`,
        output: `<p>John is 15 years old</p>`
    },
    "q4-lesson4": {
        title: "Lesson 4: Events, Popup Boxes & Variables",
        content: `<h3>Events</h3><ul><li>onclick, onmouseover, onfocus</li></ul><h3>Popup Boxes</h3><ul><li><strong>alert()</strong> - Message</li><li><strong>prompt()</strong> - User input</li><li><strong>confirm()</strong> - OK/Cancel</li></ul><h3>Operators</h3><ul><li>+, -, *, /, %</li><li>==, !=, >, <</li></ul>`,
        code: `<button onclick="alert('Clicked!')">Click</button>
<script>var a=10,b=3;document.write(a%b);</script>`,
        output: `<button onclick="alert('Clicked!')">Click</button><p>Modulus: 1</p>`
    },

    // AP QUARTER 2
    "ap-q2-lesson1": {
        title: "Lesson 1: Demand",
        content: `<h3>Ano ang Demand?</h3><p>Ang <strong>demand</strong> ay dami ng produkto na kayang bilhin sa takdang presyo.</p><h4>Batas ng Demand:</h4><ul><li>Tumataas presyo → Bumababa demand</li><li>Bumababa presyo → Tumataas demand</li></ul><h4>Mga Salik:</h4><ul><li>Presyo ng produkto</li><li>Kita ng consumer</li><li>Presyo ng kahalili</li></ul>`,
        code: `Formula: Qd = a - bP
Halimbawa: Qd = 100 - 2P
Kung P = ₱10, Qd = 80`,
        output: `<table><tr><th>Presyo</th><th>Demand</th></tr><tr><td>₱10</td><td>100</td></tr><tr><td>₱20</td><td>80</td></tr></table>`
    },
    "ap-q2-lesson2": {
        title: "Lesson 2: Demand Function",
        content: `<h3>Demand Function</h3><p><strong>Qd = a - bP</strong></p><ul><li>Qd = Daming demand</li><li>a = Intercept</li><li>b = Slope</li><li>P = Presyo</li></ul><h4>Demand Curve</h4><p>Grap na nagpapakita ng relasyon ng presyo at demand</p>`,
        code: `Qd = 100 - 2P
Kung P = ₱10
Qd = 100 - 2(10) = 80`,
        output: `<p>Demand Function: Qd = 100 - 2P</p><p>Kapag P = ₱10, Qd = 80</p>`
    },
    "ap-q2-lesson3": {
        title: "Lesson 3: Supply",
        content: `<h3>Ano ang Supply?</h3><p>Ang <strong>Supply</strong> ay dami ng produkto na handang ipagbili.</p><h4>Batas ng Supply:</h4><ul><li>Tumataas presyo → Tumataas supply</li><li>Bumababa presyo → Bumababa supply</li></ul><h4>Mga Salik:</h4><ul><li>Teknolohiya</li><li>Gastos sa produksyon</li></ul>`,
        code: `Formula: Qs = c + dP
Halimbawa: Qs = 10 + 2P`,
        output: `<table><tr><th>Presyo</th><th>Supply</th></tr><tr><td>₱10</td><td>30</td></tr><tr><td>₱20</td><td>50</td></tr></table>`
    },
    "ap-q2-lesson4": {
        title: "Lesson 4: Supply Function",
        content: `<h3>Supply Function</h3><p><strong>Qs = c + dP</strong></p><ul><li>Qs = Daming supply</li><li>c = Intercept</li><li>d = Slope</li><li>P = Presyo</li></ul><h4>Mga Salik:</h4><ul><li>Teknolohiya</li><li>Gastos sa Produksyon</li><li>Bilang ng Nagbebenta</li></ul>`,
        code: `Qs = 10 + 2P
Kung P = ₱10
Qs = 10 + 2(10) = 30`,
        output: `<p>Supply Function: Qs = 10 + 2P</p><p>Kapag P = ₱10, Qs = 30</p>`
    },
    "ap-q2-lesson5": {
        title: "Lesson 5: Elastisidad",
        content: `<h3>Elastisidad</h3><p>Sukatan ng pagtugon ng demand/supply sa pagbabago ng presyo.</p><h4>Formula:</h4><p>Ed = % change sa Qd / % change sa P</p><h4>Mga Uri:</h4><ul><li><strong>Elastic</strong> (Ed > 1)</li><li><strong>Inelastic</strong> (Ed < 1)</li><li><strong>Unit Elastic</strong> (Ed = 1)</li></ul>`,
        code: `PED = -10% / +20% = -0.5
Result: Inelastic`,
        output: `<p><strong>Formula:</strong> Ed = (% change sa Qd) / (% change sa P)</p><p><strong>Result:</strong> Ed = -0.5 = <strong>Inelastic</strong></p>`
    },
    "ap-q2-lesson6": {
        title: "Lesson 6: Ekwilibriyo",
        content: `<h3>Ekwilibriyo</h3><p>Ang kalagayan kung saan ang demand ay katumbas ng supply.</p><h4>Equilibrium Point</h4><p>Punto kung saan nagkakatagpo ang demand at supply curve</p><h4>Surplus</h4><p>Presyo mas mataas sa equilibrium</p><h4>Shortage</h4><p>Presyo mas mababa sa equilibrium</p>`,
        code: `Demand: Qd = 100 - 2P
Supply: Qs = 20 + 2P
Ekwilibriyo: P = ₱20, Q = 60`,
        output: `<p><strong>Equilibrium Price:</strong> ₱20</p><p><strong>Equilibrium Quantity:</strong> 60</p>`
    },

    // AP QUARTER 4
    "ap-q4-lesson1": {
        title: "Lesson 1: Pambansang Kaunlaran",
        content: `<h3>Pambansang Kaunlaran</h3><p>Estado ng bansa kung saan tinatamasa ng mga tao ang pagbabago sa ekonomiya.</p><h4>Mga Konsepto:</h4><ul><li><strong>Pagbabago</strong> - Maging iba</li><li><strong>Pag-unlad</strong> - Mababa sa mataas</li><li><strong>Pagsulong</strong> - Pag-usad sa layunin</li></ul><h4>Sukatan:</h4><p>Human Development Index (HDI)</p><h4>Antas:</h4><ul><li>Maunlad na Bansa</li><li>Umuunlad na Bansa</li><li>Papaunlad na Bansa</li></ul>`,
        code: `Mga Tungkulin:
1. Suportahan ang pamahalaan
2. Sundin ang batas
3. Alagaan ang kapaligiran`,
        output: `<ul><li>Mapanagutan</li><li>Makialam</li><li>Maabilidad</li><li>Makabansa</li></ul>`
    },
    "ap-q4-lesson2": {
        title: "Lesson 2: Agrikultura",
        content: `<h3>Agrikultura</h3><p>Agham at sining sa pagpaparami ng hayop at tanim.</p><h4>Mga Gawain:</h4><ul><li><strong>Pagsasaka</strong> - palay, mais, niyog</li><li><strong>Pangingisda</strong> - komersiyal, munisipal</li><li><strong>Paghahayupan</strong> - karne, gatas, itlog</li><li><strong>Paggugubat</strong> - troso, plywood</li></ul><h4>Kahalagahan:</h4><ul><li>Pinagmumulan ng pagkain</li><li>Nagkakaloob ng trabaho</li></ul>`,
        code: `Mga Sangay ng Pamahalaan:
- Department of Agriculture (DA)
- Bureau of Fisheries (BFAR)`,
        output: `<ul><li>CARL - R.A. 6657</li><li>Philippine Fisheries Code</li></ul>`
    },
    "ap-q4-lesson3": {
        title: "Lesson 3: Industriya",
        content: `<h3>Industriya</h3><p>Pagproseso ng hilaw na materyal at paggawa ng mga produkto.</p><h4>Sub-sektor:</h4><ul><li><strong>Pagmimina</strong> - minerals</li><li><strong>Pagmamanupaktura</strong> - produkto</li><li><strong>Konstruksyon</strong> - gusali</li><li><strong>Utilities</strong> - kuryente, tubig</li></ul><h4>Mga Patakarang Pang-ekonomiya:</h4><ul><li>Filipino First Policy</li><li>Oil Deregulation Law</li></ul>`,
        code: `Pagkakaugnay ng Agrikultura at Industriya:
- Hilaw na materyal mula sa agrikultura`,
        output: `<ul><li>Pondo at kompetisyon</li><li>Paghina ng lokal na industriya</li></ul>`
    },
    "ap-q4-lesson4": {
        title: "Lesson 4: Paglilingkod",
        content: `<h3>Sektor ng Paglilingkod</h3><p>Umaalalay sa produksyon, distribusyon, at kalakalan.</p><h4>Formal na Sektor:</h4><ul><li>Transportasyon, Komunikasyon</li><li>Kalakalan</li><li>Pananalapi</li><li>Paglilingkod ng Pampubliko</li></ul><h4>Mga Batas sa Manggagawa:</h4><ul><li>Holiday Pay</li><li>Overtime Pay</li><li>Maternity Leave</li></ul>`,
        code: `Kontraktuwalisasyon:
- 5 buwan na kontrata

Brain Drain:
- Pagkaubos ng manggagawa`,
        output: `<ul><li>Nagbibigay ng trabaho</li><li>Nagpapasok ng dolyar</li></ul>`
    },
    "ap-q4-lesson5": {
        title: "Lesson 5: Impormal na Sektor",
        content: `<h3>Impormal na Sektor</h3><p>Walang pormal na dokumentong kailangan. Kilala rin na Underground Economy.</p><h4>Mga Halimbawa:</h4><ul><li>Nagtitinda sa kalsada</li><li>Pedicab driver</li><li>Karpintero</li></ul><h4>Mga Katangian:</h4><ul><li>Hindi nakarehistro</li><li>Hindi nagbabayad ng buwis</li></ul><h4>Dahilan:</h4><ul><li>Makaligtas sa buwis</li><li>Makaiwas sa proseso</li></ul>`,
        code: `Iba't ibang Anyo:
1. Sa loob ng tahanan
2. Sari-sari stores
3. Ilegal na gawain`,
        output: `<ul><li>Sinasalo ang walang regular na empleyo</li><li>Nagbibigay ng pagkakataon</li></ul>`
    },
    "ap-q4-lesson6": {
        title: "Lesson 6: Patakarang Panlabas",
        content: `<h3>Patakarang Panlabas</h3><p>Palitan ng produkto sa pagitan ng mga bansa.</p><h4>Mga Uri ng Kalakalan:</h4><ul><li><strong>Bilateral</strong> - 2 bansa</li><li><strong>Bloc</strong> - Organisasyon</li></ul><h4>Export at Import:</h4><ul><li><strong>Export</strong> - Pagpapadala sa ibang bansa</li><li><strong>Import</strong> - Pagbili sa ibang bansa</li></ul><h4>Patakarang Umaapekto:</h4><ul><li>Taripa/Tariff</li><li>Kota (Quota)</li><li>Subsidy</li></ul><h4>Samahang Pandaigdig:</h4><ul><li>WTO</li><li>APEC</li><li>ASEAN</li></ul>`,
        code: `Mga Programang Nagtataguyod:
- Liberalisasyon sa Pagbabangko`,
        output: `<ul><li>Mas maraming produkto</li><li>Napapataas ang kalidad</li></ul>`
    }
};
