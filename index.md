---
layout: main
title: Home
permalink: /
---

<div class="page">
  {% assign page = site.pages | first %}
  <h1 class="page-title">{{ page.title }}</h1>
  {{ page.content }}
</div>