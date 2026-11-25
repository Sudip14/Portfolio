<?php
header("Content-Type: text/plain; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    header("Allow: POST");
    exit("Please submit the contact form.");
}

$name = isset($_POST["name"]) && is_string($_POST["name"]) ? trim($_POST["name"]) : "";
$email = isset($_POST["email"]) && is_string($_POST["email"]) ? trim($_POST["email"]) : "";
$subject = isset($_POST["subject"]) && is_string($_POST["subject"]) ? trim($_POST["subject"]) : "";
$message = isset($_POST["message"]) && is_string($_POST["message"]) ? trim($_POST["message"]) : "";

if ($name === "" || $subject === "" || $message === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit("Please provide your name, a valid email address, a subject, and a message.");
}

$to = "bhasimasudeep@gmail.com";
$mailSubject = "Portfolio contact: " . preg_replace('/[\r\n]+/', " ", $subject);
$body = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";
$headers = "From: bhasimasudeep@gmail.com\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $mailSubject, $body, $headers)) {
    echo "Message sent successfully!";
} else {
    http_response_code(500);
    echo "Sorry, your message could not be sent. Please try again later.";
}
?>
