document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/data/course.json");
  const { courses } = await response.json();

  courses.forEach(({ category, image, courses }) => {
    const container = [...document.querySelectorAll(".course-container")]
      .find(c => c.querySelector(".course-category")?.textContent.trim() === category);

    if (container) {
      container.querySelector(".course-list").innerHTML = courses.map(course => `
        <div class="course-item">
          <img src="${image}" alt="Course Image" />
          <p class="course-level">Level ${course.level}</p>
          <h6 class="course-title">${course.title}</h6>
          <p class="course-description">${course.description}</p>
          <div class="more">
            <a class="shape-btn ${course.enroll_button === "locked" ? "locked" : ""}">
              Enroll Now
            </a>
            <p class="course-sessions">${course.sessions} Sessions</p>
          </div>
        </div>
      `).join("");
    }
  });
});