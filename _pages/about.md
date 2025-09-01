---
permalink: /
title: "Xavier Juanola Molet"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I'm Xavier, and my academic journey began with a Bachelor's degree in **Physics** from the [Universitat de Barcelona (UB)](https://www.ub.edu) in 2018, followed by a **Master's in Artificial Intelligence** from [Universitat Pompeu Fabra (UPF)](https://www.upf.edu/) in 2019. I further expanded my expertise by pursuing advanced studies with a **Master's in High Energy Physics, Astrophysics, and Cosmology** at [Universitat Autonoma de Barcelona](https://www.uab.cat/web/universitat-autonoma-de-barcelona-1345467950436.html).

For the past three and a half years, I've worked as a Data Scientist in industry, applying my skills in real-world scenarios. Currently, I'm in the third year of my PhD at UPF, focusing on **Audio-Visual Sound Source Localization** within the [Intelligent Multimodal Vision Analysis (IMVA)](https://www.upf.edu/en/web/universitat/-/grup-de-recerca-en-processament-d-imatges-i-visio-per-computador) group under Professor [Gloria Haro](https://www.upf.edu/web/gloria-haro)'s supervision. My research integrates multimodal deep learning techniques—leveraging both video and audio—to push the boundaries of computer vision. An enriching stint at New York University also broadened my perspective and deepened my research experience.

My work is driven by a passion for deep learning and computer vision, and I’m excited to continue contributing to the advancement of artificial intelligence through innovative research and practical applications.

<!-- Publications Section -->
## Publications

<ul class="publication-list">
  {% assign sorted_publications = site.publications | sort: 'date' | reverse %}
  {% for post in sorted_publications %}
  <li class="publication-item">
    <div class="publication-image">
      <img src="{% if post.image and post.image != "" %}{{ post.image }}{% else %}/assets/images/publications/blank.png{% endif %}" alt="thumbnail" width="100px" height="100px">
    </div>
    <div class="publication-content">
      <!-- Title as a link to project or arXiv -->
      <h3>
        <a href="{% if post.projecturl and post.projecturl != "" %}{{ post.projecturl }}{% else %}{{ post.arxivurl }}{% endif %}" class="publication-title">
          {{ post.title }}
        </a>
      </h3>
      <p class="authors"><strong>Authors:</strong> 
        {% for author in post.authors %}
          <a href="{{ author.website }}" class="author-link" target="_blank">{{ author.name }}</a>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
      </p>
      <p class="venue"><strong>{{ post.venue }}</strong></p>
      <div class="publication-links">
        {% if post.projecturl and post.projecturl != "" %}
        <a href="{{ post.projecturl }}" target="_blank" class="publication-link">
          <img src="/assets/images/icons/globe.png" alt="Project icon" width="16px" height="16px"> Project page
        </a>
        {% endif %}
        
        {% if post.proceedings and post.proceedings != "" %}
        <a href="{{ post.proceedings }}" target="_blank" class="publication-link">
          <img src="/assets/images/icons/proceedings.png" alt="Proceedings icon" width="16px" height="16px"> Proceedings
        </a>
        {% endif %}

        {% if post.arxivurl and post.arxivurl != "" %}
        <a href="{{ post.arxivurl }}" target="_blank" class="publication-link">
          <img src="/assets/images/icons/arxiv.png" alt="arXiv icon" width="16px" height="16px"> arXiv
        </a>
        {% endif %}

        {% if post.paperpdf and post.paperpdf != "" %}
        <a href="{{ post.paperpdf }}" target="_blank" class="publication-link">
          <img src="/assets/images/icons/pdf.png" alt="PDF icon" width="16px" height="16px"> PDF
        </a>
        {% endif %}
        
        {% if post.githuburl and post.githuburl != "" %}
        <a href="{{ post.githuburl }}" target="_blank" class="publication-link">
          <img src="/assets/images/icons/github.png" alt="GitHub icon" width="16px" height="16px"> Code
        </a>
        {% endif %}
      </div>
    </div>
  </li>
  {% unless forloop.last %}
    <hr class="publication-divider">
  {% endunless %}
  {% endfor %}
</ul>

<style>
.publication-divider {
  border: none;
  border-top: 1.5px dashed #cfd8dc; /* subtle, light blue-grey */
  margin: 18px 0 18px 0;
  width: 100%;
  opacity: 0.5;
}
</style>

<style>
  .publication-list {
    list-style: none;
    padding: 0;
  }
  .publication-item {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
  }
  .publication-image {
    margin-right: 20px;
  }
  .publication-content {
    max-width: 80%;
    font-size: 0.85em;
  }
  /* Style for author and venue elements to reduce space between them */
.authors {
  margin-bottom: 5px; /* Reduce the bottom margin to bring venue closer */
}

.venue {
  margin-top: 0; /* Remove any top margin to reduce space */
}
  .publication-links {
    margin-top: 8px;
  }
  
  /* Style for author links to look like normal text but be clickable */
.author-link {
  color: inherit;
  text-decoration: none; /* Ensure links are not underlined by default */
  cursor: pointer;
}
.author-link:hover {
  text-decoration: underline; /* Only underline on hover */
}

/* Style for title to be a link but not underlined */
.publication-title {
  color: inherit;
  text-decoration: none; /* Ensure titles are not underlined by default */
}
.publication-title:hover {
  text-decoration: underline; /* Only underline on hover */
}
  
  .publication-link {
    font-size: 0.75em;
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
  }
  .publication-link img {
    margin-right: 5px;
  }
</style>
