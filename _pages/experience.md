---
layout: page
title: Experience
section: Experience
permalink: /experience
order: 3
---

{% assign experience = site.data.experience | sort: "date" | reverse %}
<div>
    {% include workinfobox.html %}
</div>