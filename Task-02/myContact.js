function input() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let subject = document.getElementById("subject").value;
    let massage = document.getElementById("massage").value;

    let inputData = "Name : " + name + "\n" + "Email : " + email + "\n" + "Phone Number : " + phoneNumber +
        "\n" + "Subject : " + subject + "\n" + "Massage : " + massage

    // console.log(inputData)
    alert(inputData)
}