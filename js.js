var $ = document.querySelector.bind(document)

var app = (() => {
    const listCourses = $('#list-courses')
    const nameCourse = $('#name-course')
    const addBtn = $('#add')

    var storagekey = "courses"
    var dataString = localStorage.getItem(storagekey)
    var courses 

    if (dataString) {
        courses = JSON.parse(dataString)
    } else {
        courses = []
    }
    
    return {
        add(course) {
            courses.push(course)
            app.saveToStorage(course)
        },
        remove(index) {
            courses.splice(index, 1)
            app.removeStorage(index)
        },
        render() {
            var htmls = courses.map((course, index) => `
                <li>${course}
                    <span data-index="${index}" class="delete">
                        <i class="fa-solid fa-xmark">
                    </i></span>
                </li>
            `).join('')

            listCourses.innerHTML = htmls
        },
        init() {
            addBtn.onclick = () => {
                var value = nameCourse.value
                this.add(value)
                this.render()
                nameCourse.value = null
                nameCourse.focus()
            }

            listCourses.onclick = this.handleEvent.bind(this)

            this.render()
        },
        saveToStorage(value) {
            localStorage.setItem(storagekey, JSON.stringify(courses))
        },
        removeStorage(index) {
            localStorage.removeItem(courses[index])
            localStorage.setItem(storagekey, courses)
        },
        handleEvent(e) {
            var deleteBtn = e.target.closest('.delete')

            if (deleteBtn) {
                const index = deleteBtn.dataset.index
                this.remove(index)
                this.render()
            }
        }
    }
})()

app.init()