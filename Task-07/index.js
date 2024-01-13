// ========= OOP Concept ==========



// ========= OOP Testimonial ==========

class testimonial {
    constructor(author, content, image) {
        this.author = author
        this.content = content
        this.image = image
    }

    // set author(val) {
    //     this.author = val
    // }
    // set content(val) {
    //     this.content = val
    // }
    // set image(val) {
    //     this.image = val
    // }

    // get author() {
    //     return this.author
    // }
    // get content() {
    //     return this.content
    // }
    // get image() {
    //     return this.image
    // }

    html() {
        return `<div class="image">
        <img src="${this.image}" alt="">
        <span>"${this.content}"</span>
        <h2>${this.author}</h2>
    </div>`
    }
}

const haidar = new testimonial(
    "Haidar", "SiipppLahhh", "Task 1.PNG"
)
const iNyooman = new testimonial(
    "I Nyooman", "Semangaaaaaatttt", "Task 2.PNG"
)
const rinaldi = new testimonial(
    "Rinaldi", "Gaaaaaaaasssssssss", "Task 3.PNG"
)

const testimonials = [haidar, iNyooman, rinaldi]
let htmltes = ""

testimonials.forEach((item, index) => {
    htmltes += testimonials[index].html()
})

document.getElementById("testi-tampil").innerHTML = htmltes