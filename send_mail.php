<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars(trim($_POST['name']));
    $email   = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Your email where you want to receive messages
    $to = "bhasimasudeep@gmail.com";  
    $subject = "New Contact Form Message from Portfolio Website";

    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo " Message sent successfully!";
    } else {
        echo " Sorry, your message could not be sent. Please try again later.";
    }
}
?>
