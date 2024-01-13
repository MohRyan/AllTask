const hoftesti = [{
        author: "Haidar",
        content: "siiiipppplaaaahahhaha",
        img: "Task 1.PNG",
        rating: 5,

    },
    {
        author: "I Nyooman",
        content: "Semangaaaaaatttt",
        img: "Task 2.PNG",
        rating: 4,
    },
    {
        author: "Rinaldi",
        content: "Gaaaaaaaasssssssss",
        img: "Task 3.PNG",
        rating: 3,
    },
    {
        author: "Moh Ryan",
        content: "Lanjutkaaannn",
        img: "Task 6.PNG",
        rating: 2,
    },
]


function All() {
    let htmltes = hoftesti.map((e) => {
        return `<div class="image">
        <img src="${e.img}" alt="">
        <span>"${e.content}"</span>
        <h2>${e.author}</h2>
    </div>`
    })
    document.getElementById("testi-tampil").innerHTML = htmltes.join(" ")
}


function filter(rating) {
    let ratingtesti = hoftesti.filter((value) => value.rating === rating).map((i) => {
        return `<div class="image">
        <img src="${i.img}" alt="">
        <span>"${i.content}"</span>
        <h2>${i.author}</h2>
        </div>`
    })

    document.getElementById("testi-tampil").innerHTML = ratingtesti.join(" ")
}
All()