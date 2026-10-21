---
layout: main
title: Home
permalink: /
---

{% for section in site.data.sections %}
<section id="{{ section.id }}" class="section" aria-labelledby="{{ section.id }}-title">
  <h2 class="section-title" id="{{ section.id }}-title">{{ section.title }}</h2>
  {% capture body %}{% include sections/{{ section.include }} %}{% endcapture %}
  {% if section.include contains ".md" %}{{ body | markdownify }}{% else %}{{ body }}{% endif %}
</section>
{% endfor %}
