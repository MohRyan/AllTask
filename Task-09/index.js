// const hoftesti = [{
//         author: "Haidar",
//         content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, beatae assumenda. Hic laboriosam magnam minus fuga!",
//         img: "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         rating: 5,
//     },
//     {
//         author: "I Nyooman",
//         content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, beatae assumenda. Hic laboriosam magnam minus fuga!",
//         img: "https://images.pexels.com/photos/3074949/pexels-photo-3074949.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 4,
//     },
//     {
//         author: "Rinaldi",
//         content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, beatae assumenda. Hic laboriosam magnam minus fuga!",
//         img: "https://images.pexels.com/photos/590471/pexels-photo-590471.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 3,
//     },
//     {
//         author: "Iqbal",
//         content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, beatae assumenda. Hic laboriosam magnam minus fuga!",
//         img: "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 2,
//     },
//     {
//         author: "Fikron",
//         content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, beatae assumenda. Hic laboriosam magnam minus fuga!",
//         img: "https://images.pexels.com/photos/301977/pexels-photo-301977.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 1,
//     },
//     {
//         author: "Fiki",
//         content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, beatae assumenda. Hic laboriosam magnam minus fuga!",
//         img: "https://images.pexels.com/photos/4473405/pexels-photo-4473405.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 5,
//     },
// ]



function getData() {
    return new Promise((resolve, reject) => {
        const npoint = new XMLHttpRequest()
        npoint.open("GET", "https://api.npoint.io/27d4495cb782c0f26006", true)
        npoint.onload = () => {
            if (npoint.status === 200) {
                const response = JSON.parse(npoint.responseText)
                resolve(response)
            } else {
                reject(`<div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`)
            }

        }

        npoint.onerror = () => {
            reject("Network Error!")
        }

        npoint.send()
    })
}


async function All() {
    const hoftesti = await getData()
    document.getElementById("testi-tampil").innerHTML = `<div class="spinner-grow text-success" role="status">
    <span class="visually-hidden">Loading...</span>
</div>`
    setTimeout(() => {
        const htmltes = hoftesti.map((e) => {
            return `<div class="image">
                    <img src="${e.img}" alt="">
                    <span>"${e.content}"</span>
                    <h2>${e.author}</h2>
                    </div>`
        })
        document.getElementById("testi-tampil").innerHTML = htmltes.join(" ")
    }, 2000)
}


async function filter(rating) {
    const hoftesti = await getData()
    document.getElementById("testi-tampil").innerHTML = `<div class="spinner-border text-success" role="status">
    <span class="visually-hidden">Loading...</span>
</div>`

    setTimeout(() => {
        let ratingtesti = hoftesti.filter((value) => value.rating === rating).map((i) => {
            return `<div class="image">
        <img src="${i.img}" alt="">
        <span>"${i.content}"</span>
        <h2>${i.author}</h2>
        </div>`
        })
        if (ratingtesti.length === 0) {
            return document.getElementById("testi-tampil").innerHTML = "Data Not Found"
        }
        document.getElementById("testi-tampil").innerHTML = ratingtesti.join(" ")
    }, 2000)
}


All()