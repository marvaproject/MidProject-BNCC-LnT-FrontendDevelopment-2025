document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/data/course.json");
    if (!response.ok) throw new Error("Gagal memuat data course");
    const courseData = await response.json();

    function generateCourseCard(categoryImage, course) {
      return `
        <div class="course-item">
          <img src="${categoryImage}" alt="Course Image" />
          <p class="course-level">Level ${course.level}</p>
          <h6 class="course-title">${course.title}</h6>
          <p class="course-description">${course.description}</p>
          <div class="more">
            <a href="#" class="shape-btn ${course.enroll_button === "locked" ? "locked" : ""}">
              Enroll Now
            </a>
            <p class="course-sessions">${course.sessions} Sessions</p>
          </div>
        </div>`;
    }

    function populateCourses() {
      const containers = document.querySelectorAll(".course-container");
      const containerMap = new Map();

      containers.forEach(container => {
        const categoryName = container.querySelector(".course-category").textContent;
        containerMap.set(categoryName, container);
      });

      courseData.courses.forEach((category) => {
        const targetContainer = containerMap.get(category.category);
        
        if (targetContainer) {
          const courseList = targetContainer.querySelector(".course-list");
          const cardsHTML = category.courses
            .map(course => generateCourseCard(category.image, course))
            .join("");
            
          courseList.innerHTML = cardsHTML;
        }
      });
    }

    populateCourses();
  } catch (error) {
    console.error("Error:", error);
    const errorContainer = document.createElement("div");
    errorContainer.style.color = "red";
    errorContainer.textContent = "Gagal memuat data course. Silakan coba lagi.";
    document.getElementById("home").appendChild(errorContainer);
  }
});