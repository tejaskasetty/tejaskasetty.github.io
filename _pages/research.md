---
layout: page
title: Research
section: Research
permalink: /research
order: 4
---

### Recent Publications

{% assign google_scholar = site.data.media | where: "name", "Google Scholar" | first %}

For the most up-to-date list of publications, see my [Google Scholar profile]({{ google_scholar.url }}).

{% assign publication_list = site.data.publications %}
{% if publication_list != empty %}
    {% assign publications = publication_list | sort: "date" | reverse %}
    {% include table.html %}
{% else %}
   <i class="message">Will be updated soon...</i>
{% endif %}


