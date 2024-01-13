function sendMail() {
    let data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        want: document.getElementById("want").value,
        message: document.getElementById("message").value,
    }
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phoneNumber = document.getElementById("phone").value;
    let subject = document.getElementById("want").value;
    let massage = document.getElementById("message").value;

    let inputData = "Name : " + name + "\n" + "Email : " + email + "\n" + "Phone Number : " + phoneNumber + "\n" + "Subject : " + subject + "\n" + "Massage : " + massage


    const serviceID = "service_g1i120q";
    const templateID = "template_yz9pc56";


    emailjs.send(serviceID, templateID, data)
        .then(
            res => {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("phone").value = "";
                document.getElementById("want").value = "";
                document.getElementById("message").value = "";
                console.log(res)
                alert("Thankyou your massage has been sent to me!")
                return (
                    alert(inputData)
                )
            }

        )
        .catch(err => console.log(err))
    console.log(inputData)
    alert(inputData)
}