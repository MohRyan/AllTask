const blogAdd = []

function add(notRefresh) {
    notRefresh.preventDefault()

    let projectName = document.getElementById("projectName").value
    // ===============Date=================

    let startDate = new Date(document.getElementById("startDate").value)
    let endDate = new Date(document.getElementById("endDate").value)
    let decription = document.getElementById("description").value
    // ===============ChexBox=================
    let NodeJs = document.getElementById("NodeJs").checked
    let Html5 = document.getElementById("Html5").checked
    let ReactJs = document.getElementById("ReactJs").checked
    let JavaScript = document.getElementById("JavaScript").checked
    let Java = document.getElementById("Java").checked
    let VueJs = document.getElementById("VueJs").checked
    let Unity = document.getElementById("Unity").checked
    let Docker = document.getElementById("Docker").checked
    // ===============Image=================
    let image = document.getElementById("image").files
    let linkImage = URL.createObjectURL(image[0])

    // ===============Date=================
    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(0, 0, 0, 0)

    let oneDay = 24 * 60 * 60 * 1000
    let oneMonth = 31 * 24 * 60 * 60 * 1000
    let oneYear = 12 * 31 * 24 * 60 * 60 * 1000

    let selisih = Math.abs(endDate - startDate)
    let day = Math.round(selisih / oneDay)
    let month = Math.round(selisih / oneMonth)
    let year = Math.round(selisih / oneYear)

    let durasi = ""

    if (day < 30) {
        durasi += day + " day"

    } else if (month < 12) {
        durasi += month + " month"
    } else {
        durasi += year + " year"
    }



    let add = {
        projectName,
        decription,
        durasi,
        // ===============ChexBox=================
        NodeJs,
        Html5,
        ReactJs,
        JavaScript,
        Java,
        VueJs,
        Unity,
        Docker,
        // ===============Image=================
        linkImage
    }



    // ============.push = berurutan 1,2,3, dst ==========
    blogAdd.push(add)
    // ============.unshift = menggeser 3,2,1, dst ==========
    // blogAdd.unshift(add)
    clickAdd()
    // console.log(day)
    console.log(blogAdd)



}



function clickAdd() {
    let blog = ``

    blogAdd.forEach((item, index) => {
        blog += `<div class="blog-conten">
        <!-- ============ image ================ -->
        <div class="image-conten-blog">
            <img src="${blogAdd[index].linkImage}" alt="">
        </div>
        <!-- ============ data-blog ================ -->
        <div class="data-blog">
            <!-- ============ title ================ -->
            <div class="title">
                <span>${blogAdd[index].projectName}</span>
            </div>
            <div class="durasi">
             <span>durasi : ${blogAdd[index].durasi}</span>
             <!-- <span>durasi : ${new Date()}</span>  -->
            </div>
            <!-- ============ article ================ -->
            <span class="article">${blogAdd[index].decription}</span>
            <!-- ============ icon ================ -->
            <div class="icon-conten-blog">
                ${blogAdd[index].NodeJs ? `<i class="fa-brands fa-node-js"></i>` : '' }
                ${blogAdd[index].Html5 ? `<i class="fa-brands fa-html5"></i>` : ''}
                ${blogAdd[index].ReactJs ? `<i class="fa-brands fa-react"></i>` : ''}
                ${blogAdd[index].JavaScript ? `<i class="fa-brands fa-js"></i>` : ''}
                ${blogAdd[index].Java ? `<i class="fa-brands fa-java"></i>` : ''}
                ${blogAdd[index].VueJs ? `<i class="fa-brands fa-vuejs"></i>` : ''}
                ${blogAdd[index].Unity ? `<i class="fa-brands fa-unity"></i>` : ''}
                ${blogAdd[index].Docker ? `<i class="fa-brands fa-docker"></i>` : ''}
            </div>
            <!-- ============ button ================ -->
            <div class="btn-conten-blog">
                <a href="/01vidpres.html" class="btn">Edit</a>
                <a href="/index.html" class="btn">Delete</a>

            </div>
        </div>
        <!-- ======================================== -->
    </div>`
    })

    document.getElementById("conten-blog").innerHTML = blog
}



clickAdd()