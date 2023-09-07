<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Your email address where you want to receive the form data
    $to = "jrdndnh@gmail.com";

    // Subject of the email
    $subject = "New Contact Form Submission";

    // Message to be sent
    $message = "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Message:\n$message";

    // Additional headers
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you for contacting us! We will get back to you shortly.";
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
} else {
    // If the form is not submitted, you can redirect the user or show an error message
    echo "Access denied!";
}
?>
