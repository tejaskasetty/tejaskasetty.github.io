---
layout: page
title: Research
section: Research
permalink: /research
order: 4
---

### Recent Publications


{% assign google_scholar = site.data.media | where: "name", "Google Scholar" | first %}

For an up-to-date list of publications, see my [google scholar](https://scholar.google.co.in/citations?user=Tg-bMK0AAAAJ&hl=en){:target="_blank"}.

{% assign publication_list = site.data.publications %}
{% if publication_list != empty %}
    {% assign publications = publication_list | sort: "date" | reverse %}
    {% include table.html %}
{% else %}
   <i class="message">Will be updated soon...</i>
{% endif %}


