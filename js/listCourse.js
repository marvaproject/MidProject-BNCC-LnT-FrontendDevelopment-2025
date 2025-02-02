document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/data/course.json");
    if (!response.ok) {
      throw new Error("Gagal memuat data course");
    }
    const courseData = await response.json();

    function generateCourseCard(im, course) {
      return `
          <div class="course-item">
            <img src="${im}" alt="Course Image" />
            <p class="course-level">Level ${course.level}</p>
            <h6 class="course-title">${course.title}</h6>
            <p class="course-description">${course.description}</p>
            <div class="more">
              <a href="#" class="shape-btn ${
                course.enroll_button === "locked" ? "locked" : ""
              }">
                Enroll Now
              </a>
              <p class="course-sessions">${course.sessions} Sessions</p>
            </div>
          </div>
        `;
    }

    function populateCourses() {
      const containers = document.querySelectorAll(".course-container");

      courseData.courses.forEach((category) => {
        const targetContainer = Array.from(containers).find((container) => {
          return (
            container.querySelector(".course-category").textContent ===
            category.category
          );
        });

        if (targetContainer) {
          const courseList = targetContainer.querySelector(".course-list");
          let cardsHTML = "";

          category.courses.forEach((course) => {
            cardsHTML += generateCourseCard(category.image, course);
          });

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
    document.getElementById("course").appendChild(errorContainer);
  }
});
